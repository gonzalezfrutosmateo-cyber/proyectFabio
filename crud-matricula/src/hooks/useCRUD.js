import { useState } from 'react';

export function useCRUD(datosIniciales) {
  const [datos, setDatos] = useState(datosIniciales);

  const agregar = (nuevoItem) => {
    const id = datos.length > 0 ? Math.max(...datos.map(d => d.id)) + 1 : 1;
    setDatos([...datos, { ...nuevoItem, id }]);
  };

  const editar = (id, itemActualizado) => {
    setDatos(datos.map(d => d.id === id ? { ...itemActualizado, id } : d));
  };

  const eliminar = (id) => {
    setDatos(datos.filter(d => d.id !== id));
  };

  return { datos, agregar, editar, eliminar };
}
