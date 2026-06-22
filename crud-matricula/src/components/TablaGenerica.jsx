import './TablaGenerica.css';

function TablaGenerica({ columnas, datos, onEditar, onEliminar, accionesExtra = [] }) {
  return (
    <div className="tabla-wrapper">
      <table className="tabla">
        <thead>
          <tr>
            {columnas.map((col) => (
              <th key={col.key}>{col.label}</th>
            ))}
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {datos.length > 0 ? (
            datos.map((item, index) => (
              <tr key={item.id} className={index % 2 === 0 ? 'fila-par' : 'fila-impar'}>
                {columnas.map((col) => (
                  <td key={col.key}>{item[col.key]}</td>
                ))}
                <td className="tabla__acciones">
                  {accionesExtra.map(({ label, onClick, className }) => (
                    <button key={label} className={className} onClick={() => onClick(item)}>{label}</button>
                  ))}
                  <button className="btn-editar" onClick={() => onEditar(item)}>Editar</button>
                  <button className="btn-eliminar" onClick={() => onEliminar(item.id)}>Eliminar</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columnas.length + 1} className="tabla__vacia">
                <div className="tabla__vacia-inner">
                  <span className="tabla__vacia-icono">📭</span>
                  <p>No se encontraron registros</p>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default TablaGenerica;
