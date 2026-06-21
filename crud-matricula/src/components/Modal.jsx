import { useState, useEffect } from 'react';
import './Modal.css';

function Modal({ isOpen, onClose, onGuardar, titulo, campos, datosIniciales }) {
  const [form, setForm] = useState({});
  const [errores, setErrores] = useState({});

  useEffect(() => {
    if (isOpen) {
      const inicial = {};
      campos.forEach((c) => {
        inicial[c.key] = datosIniciales ? datosIniciales[c.key] ?? '' : '';
      });
      setForm(inicial);
      setErrores({});
    }
  }, [isOpen, datosIniciales, campos]);

  if (!isOpen) return null;

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errores[key]) setErrores((prev) => ({ ...prev, [key]: false }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const nuevosErrores = {};
    campos.forEach((c) => {
      if (String(form[c.key] ?? '').trim() === '') nuevosErrores[c.key] = true;
    });
    if (Object.keys(nuevosErrores).length > 0) {
      setErrores(nuevosErrores);
      return;
    }
    onGuardar(form);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal__header">
          <h3 className="modal__titulo">{titulo}</h3>
          <button type="button" className="modal__cerrar" onClick={onClose} aria-label="Cerrar">✕</button>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <div className="modal__campos">
            {campos.map((campo) => (
              <div className="modal__campo" key={campo.key}>
                <label className="modal__label" htmlFor={campo.key}>{campo.label}</label>
                <input
                  id={campo.key}
                  type={campo.tipo}
                  value={form[campo.key] ?? ''}
                  onChange={(e) => handleChange(campo.key, e.target.value)}
                  className={`modal__input ${errores[campo.key] ? 'modal__input--error' : ''}`}
                />
              </div>
            ))}
          </div>

          <div className="modal__footer">
            <button type="button" className="modal__btn-cancelar" onClick={onClose}>Cancelar</button>
            <button type="submit" className="modal__btn-guardar">Guardar</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Modal;
