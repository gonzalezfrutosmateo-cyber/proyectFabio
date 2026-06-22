import { useState, useEffect, useCallback } from 'react';

const BASE = 'http://localhost:3001';

export function useCRUD(endpoint) {
  const [datos, setDatos] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchDatos = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`${BASE}${endpoint}`);
      setDatos(await res.json());
    } catch (e) {
      console.error(`Error al cargar ${endpoint}:`, e);
    } finally {
      setLoading(false);
    }
  }, [endpoint]);

  useEffect(() => { fetchDatos(); }, [fetchDatos]);

  const agregar = async (nuevoItem) => {
    try {
      const res = await fetch(`${BASE}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevoItem),
      });
      const creado = await res.json();
      setDatos((prev) => [...prev, creado]);
    } catch (e) {
      console.error(`Error al agregar en ${endpoint}:`, e);
    }
  };

  const editar = async (id, itemActualizado) => {
    try {
      const res = await fetch(`${BASE}${endpoint}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...itemActualizado, id }),
      });
      const actualizado = await res.json();
      setDatos((prev) => prev.map((d) => (d.id === id ? actualizado : d)));
    } catch (e) {
      console.error(`Error al editar en ${endpoint}:`, e);
    }
  };

  const eliminar = async (id) => {
    try {
      await fetch(`${BASE}${endpoint}/${id}`, { method: 'DELETE' });
      setDatos((prev) => prev.filter((d) => d.id !== id));
    } catch (e) {
      console.error(`Error al eliminar en ${endpoint}:`, e);
    }
  };

  return { datos, agregar, editar, eliminar, loading };
}
