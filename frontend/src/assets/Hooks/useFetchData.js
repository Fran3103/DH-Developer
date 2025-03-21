// useFetchData.js
import { useState, useEffect } from 'react';

const useFetch = (url, dependencies = []) => {
    const [datos, setDatos] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`Error: ${response.status} ${response.statusText}`);
                }
                const data = await response.json();
                setDatos(data);
                setError(null);
            } catch (err) {
                setError(err.message);
                setDatos(null);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, dependencies); // El efecto se ejecutará cada vez que cambie alguna dependencia

    return { datos, error, loading };
};

export default useFetch;
