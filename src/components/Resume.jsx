import React, { useEffect } from 'react';
import styled from 'styled-components';

const ResumeWrapper = styled.div`
  background-color: #f2f2f2;
  border: 2px solid #ccc;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin: auto;
  text-align: center;
`;

const Resume = ({ formData, quote }) => {
  // Verificar si formData está definido
  if (!formData) {
    return null;
  }

  const { category, type, squareMeters } = formData;

  // Verificar si category, type y squareMeters están definidos y no son nulos
  if (!category || !type || squareMeters == null) {
    return null;
  }

  useEffect(() => {
    // Verificar si category y type son cadenas no vacías
    if (category.trim() !== '' && type.trim() !== '') {
      const cotizacion = {
        fechaCotizacion: new Date().toLocaleString(),
        propiedad: category,
        ubicacion: type,
        metrosCuadrados: squareMeters,
        poliza: quote,
       
      };
      console.log('Cotización a guardar:', cotizacion);


      const historialCotizaciones = JSON.parse(localStorage.getItem('historialCotizaciones')) || [];
      console.log('Historial Cotizaciones antes:', historialCotizaciones);

      const isDuplicate = historialCotizaciones.some(
        (item) =>
          item.fechaCotizacion === cotizacion.fechaCotizacion &&
          item.propiedad === cotizacion.propiedad &&
          item.ubicacion === cotizacion.ubicacion &&
          item.metrosCuadrados === cotizacion.metrosCuadrados &&
          item.poliza === cotizacion.poliza
      );

      if (!isDuplicate) {
        historialCotizaciones.push(cotizacion);

        // Guardar el historial actualizado en localStorage
        localStorage.setItem('historialCotizaciones', JSON.stringify(historialCotizaciones));
      }
    }
  }, [category, type, squareMeters, quote]);

  return (
    <ResumeWrapper>
      <h2>Resumen cotización:</h2>
      <p>Categoría: {category}</p>
      <p>Tipo: {type}</p>
      <p>Metros Cuadrados: {squareMeters}</p>
      <p>Cotización: ${quote}</p>
    </ResumeWrapper>
  );
};

export default Resume;
