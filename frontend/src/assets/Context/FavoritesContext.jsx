// FavoritesProvider.jsx (versión limpia: SOLO exporta el componente)
import { useEffect, useMemo, useState, useCallback } from "react";
import { FavoritesContext } from "./favorites-context";
import PropTypes from "prop-types";

export default function FavoritesProvider({ children }) {
  const [favIds, setFavIds] = useState([]);
  const [loadingFavs, setLoadingFavs] = useState(true);

  const authHeaders = () => {
    const token = localStorage.getItem("token");
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  const refresh = useCallback(async () => {
    setLoadingFavs(true);
    try {
      const r = await fetch(`/usuarios/me/favorites/all`, { headers: authHeaders() });
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      const ids = await r.json();
      setFavIds(Array.isArray(ids) ? ids : []);
    } catch (e) {
      console.error("refresh favoritos:", e);
      setFavIds([]);
    } finally {
      setLoadingFavs(false);
    }
  }, []);

  useEffect(() => { refresh(); }, [refresh]);

  const add = useCallback(async (productId) => {
    setFavIds(prev => (prev.includes(productId) ? prev : [...prev, productId]));
    try {
      const r = await fetch(`/usuarios/me/favorites/${productId}`, {
        method: "POST", headers: authHeaders(),
      });
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
    } catch (e) {
      setFavIds(prev => prev.filter(id => id !== productId)); // rollback
      throw e;
    }
  }, []);

  const remove = useCallback(async (productId) => {
    setFavIds(prev => prev.filter(id => id !== productId));
    try {
      const r = await fetch(`/usuarios/me/favorites/${productId}`, {
        method: "DELETE", headers: authHeaders(),
      });
      if (!r.ok && r.status !== 204) throw new Error(`HTTP ${r.status}`);
    } catch (e) {
      setFavIds(prev => [...prev, productId]); // rollback
      throw e;
    }
  }, []);

  const toggle = useCallback(async (productId) => {
    if (favIds.includes(productId)) return remove(productId);
    return add(productId);
  }, [favIds, add, remove]);

  const value = useMemo(
    () => ({ favIds, loadingFavs, refresh, add, remove, toggle }),
    [favIds, loadingFavs, refresh, add, remove, toggle]
  );

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}


FavoritesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};