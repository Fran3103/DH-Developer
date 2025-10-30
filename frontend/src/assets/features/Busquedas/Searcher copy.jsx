// import { FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa";
// import "../../styles/search.css";
// import "react-date-range/dist/styles.css"; // main style file
// import "react-date-range/dist/theme/default.css"; // theme css file
// import { DateRange } from "react-date-range";
// import { addDays } from "date-fns";
// import { useEffect, useRef, useState } from "react";
// import { getLocation } from "./search";

// const Searcher = () => {
//   // Estado para manejar la selección de fechas
//   // Se inicializa con un rango de fechas de 7 días a partir de hoy
//   const [selection, setSelection] = useState([
//     {
//       startDate: new Date(),
//       endDate: addDays(new Date()),
//       key: "selection",
//     },
//   ]);

//   const dateRef = useRef(null);
//   const inputRef = useRef(null);
//   const [date, setDate] = useState(false);
//   const [dataLabel, setDataLabel] = useState("");
//   const [search, setSearch] = useState("");
//   const [suggestions, setSuggestions] = useState([]);
//   const [open, setOpen] = useState(false);
//   const [highlight, setHighlight] = useState(-1); // para teclado
//   const boxRef = useRef(null); // contenedor input + lista

//   // Actualiza el label de fechas cuando se selecciona un rango
//   const handleRangeChange = (item) => {
//     const sel = item.selection;
//     setSelection([sel]);
//     if (sel.startDate && sel.endDate) {
//       setDataLabel(
//         `${sel.startDate.toLocaleDateString()} - ${sel.endDate.toLocaleDateString()}`
//       );
//     }
//   };

//   // Cierra el calendario al hacer click fuera de él
//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       // 1) Cerrar sugerencias si están abiertas y el click fue fuera del box del buscador
//       if (open && boxRef.current && !boxRef.current.contains(e.target)) {
//         setOpen(false);
//         setHighlight(-1);
//       }

//       // 2) Cerrar calendario si está abierto y el click fue fuera del calendario y del input
//       if (
//         date &&
//         dateRef.current &&
//         !dateRef.current.contains(e.target) &&
//         inputRef.current &&
//         !inputRef.current.contains(e.target)
//       ) {
//         setDate(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, [open, date]);

//   // Busca ubicación predictiva al escribir en el input
//   useEffect(() => {
//     if (search.trim().length < 3) {
//       setSuggestions([]);
//       setOpen(false);
//       return;
//     }
//     const t = setTimeout(async () => {
//       try {
//         const data = await getLocation({ location: search.trim() });
//         const opciones = [
//           ...new Set(
//             (data.content || []).map((i) => i.location).filter(Boolean)
//           ),
//         ];
//         setSuggestions(opciones);
//         setOpen(opciones.length > 0);
//         setHighlight(-1);
//       } catch (e) {
//         setSuggestions([]);
//         setOpen(false);
//       }
//     }, 300);
//     return () => clearTimeout(t);
//   }, [search]);

//   const selectOption = (opt) => {
//     setSearch(opt);
//     setOpen(false);
//     setHighlight(-1);
//   };

//   const onKeyDown = (e) => {
//     if (!open || suggestions.length === 0) return;
//     if (e.key === "ArrowDown") {
//       e.preventDefault();
//       setHighlight((h) => (h + 1) % suggestions.length);
//     } else if (e.key === "ArrowUp") {
//       e.preventDefault();
//       setHighlight((h) => (h <= 0 ? suggestions.length - 1 : h - 1));
//     } else if (e.key === "Enter") {
//       e.preventDefault();
//       if (highlight >= 0) selectOption(suggestions[highlight]);
//     } else if (e.key === "Escape") {
//       setOpen(false);
//       setHighlight(-1);
//     }
//   };

//   // Funcion para buscar ofertas en base a la ubicación y fechas seleccionadas
//   const handleSearch = () => {
//     // Aquí puedes implementar la lógica para buscar ofertas
//     console.log("Buscar ofertas en:", selection);
//     console.log("Ubicación:", search);
//   };

//   return (
//     <div className=" flex flex-col items-center z-0 relative bg-celesteOscuro  p-3 gap-5  py-4 pb-2 top-[70px] md:top-[90px] ">
//       <h1 className="text-white text-xl text-center px-2  md:text-2xl lg:text-3xl ">
//         Busca oferta en casas, departamentos, hoteles y más
//       </h1>

//       <div className="flex flex-col gap-2 items-center sm:flex-row">
//         <div
//           ref={boxRef}
//           className="flex items-center gap-2  p-1 rounded-lg bg-blanco relative  "
//         >
//           <FaMapMarkerAlt className="text-gray-400 absolute top-4 left-2 z-10" />
//           <input
//             className="p-2 rounded-lg pl-6 sm:w-40 md:w-64  lg:w-80"
//             placeholder="¿A dónde vamos?"
//             aria-label="Username"
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             onFocus={() => suggestions.length && setOpen(true)}
//             onKeyDown={onKeyDown}
//             role="combobox"
//             aria-autocomplete="list"
//             aria-expanded={open}
//             aria-controls="location-listbox"
//           />
//           {open && suggestions.length > 0 && (
//             <ul
//               id="location-listbox"
//               className="absolute z-20 mt-20 w-full bg-white border rounded shadow max-h-60 overflow-auto"
//               role="listbox"
//             >
//               {suggestions.slice(0, 8).map((opt, idx) => (
//                 <li
//                   key={opt}
//                   role="option"
//                   aria-selected={idx === highlight}
//                   // onMouseDown para no perder el foco antes de seleccionar
//                   onMouseDown={() => {
//                     selectOption(opt);
//                     setOpen(false);
//                   }}
//                   className={`px-3 py-2 cursor-pointer ${
//                     idx === highlight ? "bg-gray-100" : ""
//                   }`}
//                 >
//                   {opt}
//                 </li>
//               ))}
//             </ul>
//           )}
//         </div>
//         <div className="flex items-center gap-2   p-1 rounded-lg  bg-blanco relative">
//           <FaCalendarAlt className="text-gray-400  absolute top-4 left-2 z-10" />
//           <input
//             ref={inputRef}
//             className="p-2 rounded-lg pl-6 md:w-64 lg:w-80 "
//             placeholder="Check-in - Check-out"
//             type="text"
//             readOnly
//             value={dataLabel}
//             aria-label="Username"
//             aria-describedby="basic-addon1"
//             onClick={() => setDate(!date)}
//           />
//           {date && (
//             <div
//               ref={dateRef}
//               className="absolute top-12 md:top-12 lg:top-12 flex flex-col  z-10 bg-white rounded-lg shadow-lg first-child:display-none"
//             >
//               <DateRange
//                 ranges={selection}
//                 onChange={handleRangeChange}
//                 editableDateInputs={true}
//                 moveRangeOnFirstSelection={false}
//                 months={2}
//                 direction="horizontal"
//               />
//             </div>
//           )}
//         </div>

//         <button
//           type="submit"
//           className="flex flex-row items-center gap-2 bg-celeste w-52 sm:w-40  md:w-52
//             m-auto justify-center rounded-lg  p-2 text-white"
//           onClick={handleSearch}
//         >
//           Buscar
//         </button>
//       </div>
//       <p className="-mt-4">Indica lugar y fecha para buscar alojamiento</p>
//     </div>
//   );
// };

// export default Searcher;
