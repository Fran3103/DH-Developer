import { useState } from "react";
import { FaHeart } from "react-icons/fa";
import { useFavorites } from "../../../Context/useFavorite";
import PropTypes from "prop-types";

export default function HeartButton({ productId }) {
  const { favIds, toggle } = useFavorites();
  const [pending, setPending] = useState(false);

  const isFav = favIds.includes(productId);

  const handleClick = async (e) => {
    e.stopPropagation();
    if (pending) return;
    setPending(true);
    console.log("Toggling favorite for productId:", e);
    try {
      await toggle(productId); // el contexto ya hace update optimista + rollback
    } catch (err) {
      console.error("toggle favorito:", err);
    } finally {
      setPending(false);
    }
  };

  return (
    <button
      aria-pressed={isFav}
      disabled={pending}
      onClick={handleClick}
      className="w-10 h-10 grid place-items-center rounded-full"
      title={isFav ? "Quitar de favoritos" : "Agregar a favoritos"}
    >
      <FaHeart className={isFav ? "opacity-100 text-red-900" : "opacity-40 text-red-300 "} />
    </button>
  );
}

HeartButton.propTypes = {
  productId: PropTypes.number.isRequired,
};