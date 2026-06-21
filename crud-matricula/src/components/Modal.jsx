import { useState, useEffect } from 'react';
import './Modal.css';

const VALIDACIONES = {
  name: {
    inputType: 'text',
    regex: /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s\-]+$/,
    mensajeRegex: 'Solo se permiten letras, espacios y guiones',
  },
  code: {
    inputType: 'text',
    regex: /^[a-zA-Z0-9]+$/,
    mensajeRegex: 'Solo letras y números, sin espacios ni símbolos',
  },
  address: {
    inputType: 'text',
    regex: /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑüÜ\s.,#\-/]+$/,
    mensajeRegex: 'Solo letras, números y puntuación básica (.,#-/)',
  },
  phone: {
    inputType: 'tel',
    regex: /^\d{2}-\d{4}-\d{4}$/,
    mensajeRegex: 'Formato requerido: xx-xxxx-xxxx',
  },
  text:    { inputType: 'text',   regex: null, mensajeRegex: null },
  number:  { inputType: 'number', regex: null, mensajeRegex: null },
  date:    { inputType: 'date',   regex: null, mensajeRegex: null },
};

function validarCampo(tipo, valor) {
  const val = String(valor ?? '').trim();
  const regla = VALIDACIONES[tipo] ?? VALIDACIONES.text;

  if (val === '') return 'Este campo es obligatorio';

  if (tipo !== 'date' && tipo !== 'number' && val.length > 20)
    return 'Máximo 20 caracteres permitidos';

  if (tipo === 'number') {
    if (val === '' || isNaN(Number(val))) return 'Debe ser un número válido';
    if (Number(val) < 0) return 'El valor no puede ser negativo';
    if (val.length > 20) return 'Máximo 20 caracteres permitidos';
  }

  if (tipo === 'date') {
    if (isNaN(new Date(val).getTime())) return 'Debe ser una fecha válida';
  }

  if (regla.regex && !regla.regex.test(val)) return regla.mensajeRegex;

  return null;
}

function Modal({ isOpen, onClose, onGuardar, titulo, campos, datosIniciales }) {
  const [form, setForm] = useState({});
  const [errores, setErrores] = useState({});
  const [touched, setTouched] = useState({});

  useEffect(() => {
    if (isOpen) {
      const inicial = {};
      campos.forEach((c) => {
        inicial[c.key] = datosIniciales ? (datosIniciales[c.key] ?? '') : '';
      });
      setForm(inicial);
      setErrores({});
      setTouched({});
    }
  }, [isOpen, datosIniciales, campos]);

  if (!isOpen) return null;

  const handleChange = (key, value, tipo) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (touched[key]) {
      setErrores((prev) => ({ ...prev, [key]: validarCampo(tipo, value) }));
    }
  };

  const handleBlur = (key, tipo) => {
    setTouched((prev) => ({ ...prev, [key]: true }));
    setErrores((prev) => ({ ...prev, [key]: validarCampo(tipo, form[key]) }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const nuevosErrores = {};
    const nuevosTouched = {};
    let hayErrores = false;

    campos.forEach((c) => {
      nuevosTouched[c.key] = true;
      const error = validarCampo(c.tipo, form[c.key]);
      if (error) { nuevosErrores[c.key] = error; hayErrores = true; }
    });

    setTouched(nuevosTouched);
    setErrores(nuevosErrores);
    if (hayErrores) return;

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
            {campos.map((campo) => {
              const regla = VALIDACIONES[campo.tipo] ?? VALIDACIONES.text;
              const tieneError = !!errores[campo.key];
              const estaOk = touched[campo.key] && !tieneError;
              const usaMaxLength = campo.tipo !== 'date' && campo.tipo !== 'number';

              return (
                <div className="modal__campo" key={campo.key}>
                  <label className="modal__label" htmlFor={campo.key}>
                    {campo.label}
                    {campo.tipo === 'phone' && <span className="modal__hint"> (xx-xxxx-xxxx)</span>}
                  </label>
                  <input
                    id={campo.key}
                    type={regla.inputType}
                    value={form[campo.key] ?? ''}
                    onChange={(e) => handleChange(campo.key, e.target.value, campo.tipo)}
                    onBlur={() => handleBlur(campo.key, campo.tipo)}
                    className={`modal__input ${tieneError ? 'modal__input--error' : estaOk ? 'modal__input--ok' : ''}`}
                    placeholder={campo.tipo === 'phone' ? 'ej: 11-1234-5678' : ''}
                    maxLength={usaMaxLength ? 20 : undefined}
                  />
                  {tieneError && (
                    <span className="modal__error-msg">⚠ {errores[campo.key]}</span>
                  )}
                </div>
              );
            })}
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
