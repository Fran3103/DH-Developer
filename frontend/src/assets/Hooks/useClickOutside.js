import { useEffect } from "react";
// Hook personalizado para manejar clics fuera de los refs especificados
export default function useOutsideClick(
  refs,
  handler,
  events = ["mousedown", "touchstart"]
) {
  // Asegura que refs sea un array
  useEffect(() => {
    // Si refs es un solo ref, lo convertimos a un array
    const r = Array.isArray(refs) ? refs : [refs];
    // Verifica que todos los refs sean válidos
    const listener = (e) => {
      const clickedInside = r.some(
        (ref) => ref?.current && ref.current.contains(e.target)
      );
      if (!clickedInside) handler(e);
    };
    // Agrega los listeners a cada evento especificado
    events.forEach((ev) => document.addEventListener(ev, listener));
    return () =>
      // Limpia los listeners al desmontar el componente
      events.forEach((ev) => document.removeEventListener(ev, listener));
  }, [refs, handler, events]);
}
