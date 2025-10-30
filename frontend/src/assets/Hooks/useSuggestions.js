// hooks/useSuggestions.js
import { useEffect, useRef, useState } from "react";
// Hook personalizado para manejar sugerencias de búsqueda
export default function useSuggestions(
  // El valor actual del input
  value,
  // Función para obtener sugerencias
  fetcher,
  { minChars = 2, debounceMs = 300, limit = 8 } = {}
) {
  const [open, setOpen] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const abortRef = useRef();

  const query = value?.trim() ?? "";
  // Si el valor es menor que minChars, no hacemos nada
  useEffect(() => {
    if (query.length < minChars) {
      setSuggestions([]);
      setOpen(false);
      return;
    }
    // Si el valor es válido, iniciamos la búsqueda
    const timer = setTimeout(async () => {
      // Evita múltiples solicitudes si el valor cambia rápidamente
      try {
        setLoading(true);
        abortRef.current?.abort?.();
        abortRef.current = new AbortController();
        // Llama a la función fetcher para obtener sugerencias
        const data = await fetcher(query, { signal: abortRef.current.signal });
        // Filtra y limita las sugerencias
        const opts = [...new Set((data || []).filter(Boolean))].slice(0, limit);
        setSuggestions(opts);
        setOpen(opts.length > 0);
      } catch {
        setSuggestions([]);
        setOpen(false);
      } finally {
        setLoading(false);
      }
    }, debounceMs);
    // Limpia el timeout y aborta la solicitud si el componente se desmonta o el valor cambia
    return () => {
      clearTimeout(timer);
      abortRef.current?.abort?.();
    };
  }, [query, fetcher, minChars, debounceMs, limit]);

  return { open, setOpen, suggestions, loading };
}
