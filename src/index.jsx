import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app'; // o la ruta correcta a tu componente App
import './css/index.css'; // o la ruta correcta a tus estilos

const root = document.getElementById('root');

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);