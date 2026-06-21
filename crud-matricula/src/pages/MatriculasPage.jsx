import { useState, useCallback } from 'react';
import { useCRUD } from '../hooks/useCRUD';
import TablaGenerica from '../components/TablaGenerica';
import Modal from '../components/Modal';
import Toast from '../components/Toast';
import datosIniciales from '../data/matriculas.json';
import './Page.css';

const columnas = [
  { key: 'numero', label: 'N° Matrícula' },
  { key: 'fecha', label: 'Fecha' },
  { key: 'codigoAlumno', label: 'Alumno' },
  { key: 'codigoSecretaria', label: 'Secretaria' },
  { key: 'codigoCarrera', label: 'Carrera' },
  { key: 'total', label: 'Total $' },
];

const campos = [
  { key: 'numero', label: 'N° Matrícula', tipo: 'text' },
  { key: 'fecha', label: 'Fecha', tipo: 'date' },
  { key: 'codigoAlumno', label: 'Código Alumno', tipo: 'text' },
  { key: 'codigoSecretaria', label: 'Código Secretaria', tipo: 'text' },
  { key: 'codigoCarrera', label: 'Código Carrera', tipo: 'text' },
  { key: 'numeroRecibo', label: 'N° Recibo', tipo: 'text' },
  { key: 'fechaRecibo', label: 'Fecha Recibo', tipo: 'date' },
  { key: 'total', label: 'Total $', tipo: 'number' },
  { key: 'codigoConcepto', label: 'Código Concepto', tipo: 'text' },
];

export default function MatriculasPage() {
  const { datos, agregar, editar, eliminar } = useCRUD(datosIniciales);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [itemEditando, setItemEditando] = useState(null);
  const [busqueda, setBusqueda] = useState('');
  const [toast, setToast] = useState({ visible: false, mensaje: '' });

  const mostrarToast = (mensaje) => setToast({ visible: true, mensaje });
  const ocultarToast = useCallback(() => setToast({ visible: false, mensaje: '' }), []);

  const datosFiltrados = datos.filter((item) =>
    Object.values(item).some((valor) =>
      String(valor).toLowerCase().includes(busqueda.toLowerCase())
    )
  );

  const handleAgregar = () => { setItemEditando(null); setModalAbierto(true); };
  const handleEditar = (item) => { setItemEditando(item); setModalAbierto(true); };

  const handleEliminar = (id) => {
    if (window.confirm('¿Estás seguro de que querés eliminar este registro?')) {
      eliminar(id);
      mostrarToast('🗑️ Registro eliminado');
    }
  };

  const handleGuardar = (datos) => {
    if (itemEditando) {
      editar(itemEditando.id, datos);
      mostrarToast('✅ Registro actualizado correctamente');
    } else {
      agregar(datos);
      mostrarToast('✅ Registro agregado correctamente');
    }
    setModalAbierto(false);
  };

  return (
    <div className="page">
      <div className="page__header">
        <h2 className="page__title">Gestión de Matrículas</h2>
        <p className="page__subtitle">Fichas y recibos de pago de matrículas.</p>
        <p className="page__count">
          {busqueda ? `${datosFiltrados.length} registros encontrados` : `${datosFiltrados.length} registros en total`}
        </p>
      </div>

      <div className="page__toolbar">
        <div className="page__busqueda-wrapper">
          <span className="page__busqueda-icono">🔍</span>
          <input
            type="text"
            className="page__busqueda"
            placeholder="Buscar..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
        </div>
        <button className="page__btn-agregar" onClick={handleAgregar}>+ Agregar nuevo</button>
      </div>

      <TablaGenerica
        columnas={columnas}
        datos={datosFiltrados}
        onEditar={handleEditar}
        onEliminar={handleEliminar}
      />

      <Modal
        isOpen={modalAbierto}
        onClose={() => setModalAbierto(false)}
        onGuardar={handleGuardar}
        titulo={itemEditando ? 'Editar Matrícula' : 'Agregar Matrícula'}
        campos={campos}
        datosIniciales={itemEditando}
      />

      <Toast mensaje={toast.mensaje} visible={toast.visible} onOcultar={ocultarToast} />
    </div>
  );
}
