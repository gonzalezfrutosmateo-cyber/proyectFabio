import './ReciboModal.css';

function ReciboModal({ isOpen, onClose, matricula }) {
  if (!isOpen || !matricula) return null;

  // Formatea el total como moneda argentina (ej: $ 15.000,00)
  const totalFormateado = Number(matricula.total).toLocaleString('es-AR', {
    style: 'currency', currency: 'ARS',
  });

  return (
    <div className="recibo-overlay" onClick={onClose}>
      <div className="recibo" onClick={(e) => e.stopPropagation()}>

        <div className="recibo__header">
          <div className="recibo__institucion">
            <span className="recibo__logo-text">MatriculaSystem</span>
            <span className="recibo__subtitulo">Sistema de Gestión Académica</span>
          </div>
          <div className="recibo__titulo-bloque">
            <h2 className="recibo__titulo">RECIBO DE PAGO</h2>
            <span className="recibo__numero">N° {matricula.numeroRecibo}</span>
          </div>
        </div>

        <div className="recibo__divider" />

        <div className="recibo__seccion-titulo">Datos de la Matrícula</div>
        <div className="recibo__grid">
          <div className="recibo__campo">
            <span className="recibo__etiqueta">N° Matrícula</span>
            <span className="recibo__valor">{matricula.numero}</span>
          </div>
          <div className="recibo__campo">
            <span className="recibo__etiqueta">Fecha de Matrícula</span>
            <span className="recibo__valor">{matricula.fecha}</span>
          </div>
          <div className="recibo__campo">
            <span className="recibo__etiqueta">Alumno</span>
            <span className="recibo__valor">{matricula.codigoAlumno}</span>
          </div>
          <div className="recibo__campo">
            <span className="recibo__etiqueta">Carrera</span>
            <span className="recibo__valor">{matricula.codigoCarrera}</span>
          </div>
        </div>

        <div className="recibo__divider" />

        <div className="recibo__seccion-titulo">Datos del Recibo</div>
        <div className="recibo__grid">
          <div className="recibo__campo">
            <span className="recibo__etiqueta">N° Recibo</span>
            <span className="recibo__valor">{matricula.numeroRecibo}</span>
          </div>
          <div className="recibo__campo">
            <span className="recibo__etiqueta">Fecha de Pago</span>
            <span className="recibo__valor">{matricula.fechaRecibo}</span>
          </div>
          <div className="recibo__campo">
            <span className="recibo__etiqueta">Código Concepto</span>
            <span className="recibo__valor">{matricula.codigoConcepto}</span>
          </div>
          <div className="recibo__campo">
            <span className="recibo__etiqueta">Secretaria</span>
            <span className="recibo__valor">{matricula.codigoSecretaria}</span>
          </div>
        </div>

        <div className="recibo__divider" />

        <div className="recibo__campo recibo__campo--total">
          <span className="recibo__etiqueta">TOTAL ABONADO</span>
          <span className="recibo__valor">{totalFormateado}</span>
        </div>

        <div className="recibo__acciones">
          <button className="recibo__btn-cerrar" onClick={onClose}>Cerrar</button>
        </div>
      </div>
    </div>
  );
}

export default ReciboModal;
