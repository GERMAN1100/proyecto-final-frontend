import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const HistorialWrapper = styled.div`
  margin: auto;
  width: 80%;
  border: 2px solid #ccc;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  text-align: center;
  background-color: #f2f2f2;
`;

const HistorialTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
`;

const HistorialTh = styled.th`
  background-color: #34bfb2;
  color: #ffffff;
  padding: 10px;
  border: 1px solid #ddd;
`;

const HistorialTd = styled.td`
  padding: 10px;
  border: 1px solid #ddd;
`;

const Historial = () => {
  const [historialCotizaciones, setHistorialCotizaciones] = useState([]);

  useEffect(() => {
    const storedHistorial =
      JSON.parse(localStorage.getItem('historialCotizaciones')) || [];
    console.log('Historial Cotizaciones:', storedHistorial);
    setHistorialCotizaciones(storedHistorial);
  }, []);




  const retornoTablaHTML = (fila) => {
    return (
      <tr key={fila.fechaCotizacion}>
        <HistorialTd>
          {fila.fechaCotizacion ? new Date(fila.fechaCotizacion).toLocaleString() : ''}
        </HistorialTd>
        <HistorialTd>{fila.propiedad}</HistorialTd>
        <HistorialTd>{fila.ubicacion}</HistorialTd>
        <HistorialTd>{fila.metrosCuadrados}</HistorialTd>
        <HistorialTd>{fila.poliza ? fila.poliza.name : ''}</HistorialTd>
        <HistorialTd>${fila.poliza && fila.poliza.cost ? fila.poliza.cost.toLocaleString() : ''}</HistorialTd>
      </tr>
    );
  };

  return (
    <HistorialWrapper>
      <h2>Historial de Cotizaciones:</h2>
      <HistorialTable>
        <thead>
          <tr>
            <HistorialTh>Fecha Cotización</HistorialTh>
            <HistorialTh>Propiedad</HistorialTh>
            <HistorialTh>Ubicación</HistorialTh>
            <HistorialTh>Metros Cuadrados</HistorialTh>
            <HistorialTh>Poliza</HistorialTh>
            <HistorialTh>Cotización</HistorialTh>
            
          </tr>
        </thead>
        <tbody>{historialCotizaciones.map(retornoTablaHTML)}</tbody>
      </HistorialTable>
    </HistorialWrapper>
  );
};

export default Historial;