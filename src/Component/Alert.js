import react, { useEffect } from 'react';
import reactDom from 'react-dom';
function Alert({ message, type, removeAlert }) {
  useEffect(() => {
    const timeout = setTimeout(() => {
      removeAlert();
    }, 1000);
    return () => {
      clearTimeout(timeout);
    };
  });

  return (
    <div className={`alert ${type}`}>
      <p>{message}</p>
    </div>
  );
}

export default Alert;
