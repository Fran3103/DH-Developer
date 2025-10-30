import { FaCalendarAlt } from "react-icons/fa";
import PropTypes from "prop-types";
import { DateRange } from "react-date-range";
import { addDays } from "date-fns";
import { useEffect, useRef, useState } from "react";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import useOutsideClick from "../../Hooks/useClickOutside";
import useIsMobile from "../../Hooks/useIsMobile";


const DateRangeInput = ({ value, onChange }) => {
  const dateRef = useRef(null);
  const inputRef = useRef(null);
  const [date, setDate] = useState(false);
  const [label, setLabel] = useState("");

  const isMobile = useIsMobile();

  const fallbackRange = [
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
    },
  ];

  useEffect(() => {
    if (date && label === "") {
      const fallbackRange = [
        {
          startDate: new Date(),
          endDate: addDays(new Date(), 7),
        },
      ];
      setLabel(fallbackRange[0].startDate.toLocaleDateString() + " - " + fallbackRange[0].endDate.toLocaleDateString());
    }
  }, [date, label]);

  const ranges = [
    {
      startDate: value?.startDate || fallbackRange[0].startDate,
      endDate: value?.endDate || fallbackRange[0].endDate,
      key: "selection",
    },
  ];

  const handleRangeChange = (item) => {
    const sel = item.selection;
    onChange({ startDate: sel.startDate, endDate: sel.endDate });
    setLabel(
      `${sel.startDate.toLocaleDateString()} - ${sel.endDate.toLocaleDateString()}`
    );
  };

  useOutsideClick([dateRef, inputRef], () => setDate(false));

  return (
    <div className="flex items-center gap-2 p-1 rounded-lg  bg-blanco relative">
      <FaCalendarAlt className="text-gray-400  absolute top-4 left-2 z-10" />
      <input
        ref={inputRef}
        className="p-2 rounded-lg pl-6 md:w-64 lg:w-80 "
        placeholder="Check-in - Check-out"
        type="text"
        readOnly
        value={label}
        aria-label="Username"
        aria-describedby="basic-addon1"
        onClick={() => setDate(!date)}
      />
      {date && (
        <div
          ref={dateRef}
          className="absolute -right-14 md:-right-16 lg:-right-0  top-12 md:top-12 lg:top-12 flex flex-col  z-10 bg-white rounded-lg shadow-lg first-child:display-none"
        >
          <DateRange
            ranges={ranges}
            onChange={handleRangeChange}
            editableDateInputs={true}
            moveRangeOnFirstSelection={false}
            months={isMobile ? 1 : 2}
            direction={isMobile ? "vertical" : "horizontal"}
            className="date-range-picker "
          />
          <div className="p-3  flex  justify-center  gap-5 ">
            <button
              onClick={() => {
                
                setDate(false);
              }}
               className="bg-celeste text-white px-6 py-2 rounded-lg hover:bg-azul transition"
      >
            
              Aplicar
            </button>
            <button
              onClick={() => {
                setDate(false);
                setLabel("");
              }}
             className="bg-slate-700 text-white px-6 py-2 rounded-lg hover:bg-azul transition"
      
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

DateRangeInput.propTypes = {
  value: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default DateRangeInput;
