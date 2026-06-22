import { useState, useEffect, useCallback } from 'react';

const BASE = 'http://localhost:3001';

// Hook que centraliza el CRUD contra la API (json-server).
// Recibe un endpoint (ej: '/alumnos') y devuelve los datos + las acciones.
export function useCRUD(endpoint) {
  const [datos, setDatos] = useState([]);
  const [loading, setLoading] = useState(true);

  // READ: trae la lista desde la API
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

  // Carga inicial al montar (se vuelve a ejecutar solo si cambia el endpoint)
  useEffect(() => { fetchDatos(); }, [fetchDatos]);

  // CREATE: POST y suma el item creado al estado local (sin re-fetch)
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

  // UPDATE: PUT y reemplaza solo ese item en el estado local
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

  // DELETE: borra en la API y saca el item del estado local
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
