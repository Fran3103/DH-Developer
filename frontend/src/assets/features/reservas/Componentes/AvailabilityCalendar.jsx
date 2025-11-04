import PropTypes from "prop-types";
import { expandRangesToDates, isSameDay } from "../../../utils/dateUtils";
import { useCallback, useEffect, useMemo, useState } from "react";
import { DateRange } from "react-date-range";
import useIsMobile from "../../../Hooks/useIsMobile";

function AvailabilityCalendar({ Producto_id }) {
  const [bookedRanges, setBookedRanges] = useState([]);

  const [selectedRange, setSelectedRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const blockedDates = useMemo(
    () => expandRangesToDates(bookedRanges),
    [bookedRanges]
  );

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const isMobile = useIsMobile();
  const fetchBookedDates = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const res = await fetch(
        `http://localhost:3000/productos/${Producto_id}/availability`
      );
      if (!res.ok) {
        throw new Error("Error al obtener las fechas reservadas");
      }
      const data = await res.json();
      setBookedRanges(data);
    } catch (err) {
      setError(
        " No se pudo obtener la disponibilidad en este momento. Intentá nuevamente más tarde."
      );
    } finally {
      setLoading(false);
    }
  }, [Producto_id]);

  useEffect(() => {
    fetchBookedDates();
  }, [fetchBookedDates]);

  const isDayBlocked = (day) => {
    return blockedDates.some((blockedDate) => isSameDay(blockedDate, day));
  };

  const dayContentRenderer = (day) => {
    const blocked = isDayBlocked(day);
    return (
      <div
        style={{
          width: "28px",
          height: "28px",
          lineHeight: "28px",
          borderRadius: "6px",
          fontSize: "0.8rem",
          textAlign: "center",
          backgroundColor: blocked ? "#ff4d4f" : "transparent", // rojo suave
          color: blocked ? "#fff" : "#000",
          opacity: blocked ? 0.7 : 1,
          cursor: blocked ? "not-allowed" : "pointer",
        }}
      >
        {day.getDate()}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="calendar-wrapper">
        <p>Cargando disponibilidad...</p>
      </div>
    );
  }
  if (error) {
    return (
      <div className="calendar-wrapper border border-red-400 bg-red-50 p-4 rounded-md">
        <p className="text-red-700 text-sm font-medium mb-2">{error}</p>
        <button
          onClick={fetchBookedDates}
          className="px-3 py-2 text-sm rounded-md bg-red-600 text-white hover:bg-red-700"
        >
          Reintentar
        </button>
      </div>
    );
  }
  return (
    <div className="calendar-wrapper  p-4 flex flex-col items-center">
      <h3 className="text-lg font-semibold mb-1">Disponibilidad</h3>
      <p className="text-sm text-gray-600 mb-4">
        Seleccioná tus fechas. Los días en rojo ya están reservados.
      </p>

      <DateRange
        ranges={selectedRange}
        onChange={(item) => setSelectedRange([item.selection])}
        editableDateInputs={true}
        moveRangeOnFirstSelection={false}
        months={isMobile ? 1 : 2}
        direction={isMobile ? "vertical" : "horizontal"}
        minDate={new Date()}
        dayContentRenderer={dayContentRenderer}
        disabledDay={isDayBlocked} // algunas versiones usan `disabledDay`, otras `isDayDisabled`
        className="availability-date-range"
      />
    </div>
  );
}

AvailabilityCalendar.propTypes = {
  Producto_id: PropTypes.number.isRequired,
};

export default AvailabilityCalendar;
