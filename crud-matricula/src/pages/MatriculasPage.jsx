import { useState, useCallback, useMemo } from 'react';
import { useCRUD } from '../hooks/useCRUD';
import TablaGenerica from '../components/TablaGenerica';
import Modal from '../components/Modal';
import Toast from '../components/Toast';
import ReciboModal from '../components/ReciboModal';
import './Page.css';

const columnas = [
  { key: 'numero',           label: 'N° Matrícula' },
  { key: 'fecha',            label: 'Fecha' },
  { key: 'codigoAlumno',     label: 'Alumno' },
  { key: 'codigoSecretaria', label: 'Secretaria' },
  { key: 'codigoCarrera',    label: 'Carrera' },
  { key: 'total',            label: 'Total $' },
];

export default function MatriculasPage() {
  const { datos: alumnos }     = useCRUD('/alumnos');
  const { datos: secretarias } = useCRUD('/secretarias');
  const { datos: carreras }    = useCRUD('/carreras');
  const { datos, agregar, editar, eliminar, loading } = useCRUD('/matriculas');

  const [modalAbierto, setModalAbierto] = useState(false);
  const [itemEditando, setItemEditando] = useState(null);
  const [reciboAbierto, setReciboAbierto] = useState(false);
  const [matriculaRecibo, setMatriculaRecibo] = useState(null);
  const [busqueda, setBusqueda] = useState('');
  const [filtroEstado, setFiltroEstado] = useState('todas');
  const [toast, setToast] = useState({ visible: false, mensaje: '' });

  const mostrarToast = (mensaje) => setToast({ visible: true, mensaje });
  const ocultarToast = useCallback(() => setToast({ visible: false, mensaje: '' }), []);

  // Campos construidos dinámicamente para tener las opciones relacionadas
  const campos = useMemo(() => [
    { key: 'numero',           label: 'N° Matrícula',     tipo: 'code'   },
    { key: 'fecha',            label: 'Fecha',             tipo: 'date'   },
    {
      key: 'codigoAlumno', label: 'Alumno', tipo: 'select',
      opciones: alumnos.map((a) => ({ value: a.codigo, label: `${a.codigo} — ${a.nombre} ${a.apellido}` })),
    },
    {
      key: 'codigoSecretaria', label: 'Secretaria', tipo: 'select',
      opciones: secretarias.map((s) => ({ value: s.codigo, label: `${s.codigo} — ${s.nombre} ${s.apellido}` })),
    },
    {
      key: 'codigoCarrera', label: 'Carrera', tipo: 'select',
      opciones: carreras.map((c) => ({ value: c.codigo, label: `${c.codigo} — ${c.nombre}` })),
    },
    { key: 'numeroRecibo',  label: 'N° Recibo',       tipo: 'code'     },
    { key: 'fechaRecibo',   label: 'Fecha Recibo',    tipo: 'date'     },
    { key: 'total',         label: 'Total $',         tipo: 'readonly' },
    { key: 'codigoConcepto', label: 'Código Concepto', tipo: 'code'    },
  ], [alumnos, secretarias, carreras]);

  const calcularCampos = useCallback((form) => {
    const carrera = carreras.find((c) => c.codigo === form.codigoCarrera);
    return carrera ? { total: carrera.arancel } : {};
  }, [carreras]);

  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);

  const datosFiltrados = datos
    .filter((item) => {
      if (filtroEstado === 'todas') return true;
      const fecha = new Date(item.fecha + 'T00:00:00');
      return filtroEstado === 'vigentes' ? fecha >= hoy : fecha < hoy;
    })
    .filter((item) =>
      Object.values(item).some((valor) =>
        String(valor).toLowerCase().includes(busqueda.toLowerCase())
      )
    );

  const handleAgregar = () => { setItemEditando(null); setModalAbierto(true); };
  const handleEditar = (item) => { setItemEditando(item); setModalAbierto(true); };
  const handleVerRecibo = (item) => { setMatriculaRecibo(item); setReciboAbierto(true); };

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

  const accionesExtra = [
    { label: '🧾 Ver Recibo', onClick: handleVerRecibo, className: 'btn-recibo' },
  ];

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
          <input type="text" className="page__busqueda" placeholder="Buscar..."
            value={busqueda} onChange={(e) => setBusqueda(e.target.value)} />
        </div>
        <div className="page__filtro-estado">
          {['todas', 'vigentes', 'vencidas'].map((estado) => (
            <button key={estado}
              className={`page__filtro-btn ${filtroEstado === estado ? 'activo' : ''} page__filtro-btn--${estado}`}
              onClick={() => setFiltroEstado(estado)}>
              {estado.charAt(0).toUpperCase() + estado.slice(1)}
            </button>
          ))}
        </div>
        <button className="page__btn-agregar" onClick={handleAgregar}>+ Agregar nuevo</button>
      </div>

      {loading ? (
        <p className="page__loading">Cargando...</p>
      ) : (
        <TablaGenerica columnas={columnas} datos={datosFiltrados}
          onEditar={handleEditar} onEliminar={handleEliminar}
          accionesExtra={accionesExtra} />
      )}

      <Modal isOpen={modalAbierto} onClose={() => setModalAbierto(false)}
        onGuardar={handleGuardar}
        titulo={itemEditando ? 'Editar Matrícula' : 'Agregar Matrícula'}
        campos={campos} datosIniciales={itemEditando}
        calcularCampos={calcularCampos} />

      <ReciboModal isOpen={reciboAbierto} onClose={() => setReciboAbierto(false)}
        matricula={matriculaRecibo} />

      <Toast mensaje={toast.mensaje} visible={toast.visible} onOcultar={ocultarToast} />
    </div>
  );
}
