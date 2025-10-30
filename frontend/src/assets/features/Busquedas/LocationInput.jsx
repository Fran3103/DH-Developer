import { FaMapMarkerAlt } from "react-icons/fa";
import PropTypes from "prop-types";
import { useCallback, useMemo, useRef, useState } from "react";
import { getLocation } from "./search";
import useOutsideClick from "../../Hooks/useClickOutside";
import useSuggestions from "../../Hooks/useSuggestions";

const LocationInput = ({ value, onChange, onSelect }) => {
  const [highlight, setHighlight] = useState(-1); // para teclado
  const boxRef = useRef(null); // contenedor input + lista
  const inputRef = useRef(null); // referencia al input

  // Selecciona una opción de la lista
  // y llama a onChange y onSelect si están definidos
  const selectOption = (opt) => {
    onChange(opt);
    onSelect?.(opt);
    setOpen(false);
    setHighlight(-1);
  };

  // Función fetcher para obtener sugerencias
  const fetcher = useCallback(async (q) => {
    const data = await getLocation({ location: q });
    return (data?.content || []).map((i) => i.location);
  }, []);

  // Hook para manejar sugerencias
  const { open, setOpen, suggestions, loading } = useSuggestions(
    value,
    fetcher,
    { minChars: 2, debounceMs: 300, limit: 8 }
  );

  // Cierra las sugerencias al hacer click fuera del box
  useOutsideClick(boxRef, () => {
    if (open) {
      setOpen(false);
      setHighlight(-1);
    }
  });

  // Maneja las teclas de navegación en la lista
  const handleKeyDown = (e) => {
    if (open && suggestions.length > 0) {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setHighlight((h) => Math.min(h + 1, suggestions.length - 1));
        return;
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setHighlight((h) => Math.max(h - 1, 0));
        return;
      }
      if (e.key === "Enter" && highlight >= 0) {
        e.preventDefault();
        selectOption(suggestions[highlight]);
        return;
      }
    }

    if (e.key === "Enter" && inlineSuggestion) {
      e.preventDefault();
      acceptInline();
      return;
    }

    if (e.key === "Tab" && inlineSuggestion) {
      e.preventDefault();
      acceptInline();
      return;
    }

    if (e.key === "ArrowRight" && suffix && caretAtEnd()) {
      e.preventDefault();
      acceptInline();
      return;
    }

    if (e.key === "Escape") {
      setOpen(false);
      setHighlight(-1);
    }
  };

  // Normaliza el texto para comparar sin acentos ni mayúsculas
  const normalize = (s) =>
    (s ?? "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/\p{Diacritic}/gu, "");

  // Obtiene la sugerencia en línea
  // que coincide con el valor actual del input
  const inlineSuggestion = useMemo(() => {
    const q = normalize(value);
    if (!q || !suggestions?.length) return "";
    const found = suggestions.find((opt) => normalize(opt).startsWith(q));
    // Si no hay coincidencia, retorna vacío
    return found || "";
  }, [value, suggestions]);
  // Muestra el sufijo de la sugerencia en línea
  // que no coincide con el valor actual del input
  const suffix = inlineSuggestion ? inlineSuggestion.slice(value.length) : "";

  const caretAtEnd = () => {
    const el = inputRef.current;
    if (!el) return false;
    return (
      el.selectionStart === value.length && el.selectionEnd === value.length
    );
  };

  // aceptar sugerencia fantasma
  const acceptInline = () => {
    if (!inlineSuggestion) return;
    onChange(inlineSuggestion);
    onSelect?.(inlineSuggestion);
    setOpen(false);
    setHighlight(-1);
  };

  return (
    <div className="flex flex-col gap-2 items-center sm:flex-row relative">
      <div
        className="flex flex-col items-center gap-2   rounded-lg bg-white relative  "
        ref={boxRef}
      >
        <div className=" absolute inset-0 p-2 rounded-lg pl-6 sm:w-40 md:w-64  lg:w-80 pointer-events-none text-gray-400 overflow-hidden whitespace-nowrap">
          <span>{value}</span>
          {suffix}
        </div>
        <FaMapMarkerAlt className="text-gray-400 absolute top-3 left-1 z-10" />
        <input
          ref={inputRef}
          className="p-2 rounded-lg pl-6 sm:w-40 md:w-64  lg:w-80 relative bg-transparent z-10"
          placeholder="¿A dónde vamos?"
          aria-label="Username"
          role="combobox"
          value={value ?? ""}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => suggestions.length && setOpen(true)}
          onKeyDown={handleKeyDown}
          aria-autocomplete="both"
          aria-expanded={open}
          aria-controls="location-listbox"
        />

        {open && (
          <ul
            id="location-listbox"
            className="z-20 w-full mt-10 absolute bg-white border rounded shadow max-h-60 overflow-auto"
            role="listbox"
          >
            {loading && <li className="px-3 py-2 text-gray-500">Buscando…</li>}
            {!loading &&
              suggestions.map((opt, idx) => (
                <li
                  key={opt}
                  role="option"
                  aria-selected={idx === highlight}
                  // onMouseDown para no perder el foco antes de seleccionar
                  onMouseDown={() => {
                    selectOption(opt);
                  }}
                  className={`px-3 py-2 cursor-pointer   ${
                    idx === highlight ? "bg-gray-100" : ""
                  }`}
                >
                  {opt}
                </li>
              ))}
          </ul>
        )}
      </div>
    </div>
  );
};

LocationInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onSelect: PropTypes.func,
};

export default LocationInput;
