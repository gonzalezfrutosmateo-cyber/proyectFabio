import { useEffect } from 'react';
import './Toast.css';

function Toast({ mensaje, visible, onOcultar }) {
  useEffect(() => {
    if (!visible) return;
    const timer = setTimeout(onOcultar, 3000);
    return () => clearTimeout(timer);
  }, [visible, onOcultar]);

  if (!visible) return null;

  return (
    <div className="toast">
      {mensaje}
    </div>
  );
}

export default Toast;
