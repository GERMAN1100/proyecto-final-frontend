import React, { useEffect, useState } from 'react';

const Historial = () => {
  const [historialCotizaciones, setHistorialCotizaciones] = useState([]);

  useEffect(() => {
    // Obtener el historial de cotizaciones desde localStorage al cargar el componente
    const storedHistorial = JSON.parse(localStorage.getItem('historialCotizaciones')) || [];
    console.log('Historial Cotizaciones:', storedHistorial); // Verificar datos en la consola
    setHistorialCotizaciones(storedHistorial);
  }, []);

  const retornoTablaHTML = (fila) => {
    return (
      <tr key={fila.fechaCotizacion}>
        <td>{fila.fechaCotizacion}</td>
        <td>{fila.propiedad}</td>
        <td>{fila.ubicacion}</td>
        <td>{fila.metrosCuadrados}</td>
        <td>$ {fila.poliza.toLocaleString()}</td>
      </tr>
    );
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Fecha Cotización</th>
          <th>Propiedad</th>
          <th>Ubicación</th>
          <th>Metros Cuadrados</th>
          <th>Poliza</th>
        </tr>
      </thead>
      <tbody>{historialCotizaciones.map(retornoTablaHTML)}</tbody>
    </table>
  );
};

export default Historial;