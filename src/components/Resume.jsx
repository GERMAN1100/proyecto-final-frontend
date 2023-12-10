import React, { useEffect } from 'react';


const Resume = ({ formData, quote }) => {
  const { category, type, squareMeters } = formData;

  useEffect(() => {
    // Guardar la cotización en localStorage al montar el componente
    if (category.trim() !== '' && type.trim() !== '') {
      const cotizacion = {
        fechaCotizacion: new Date().toLocaleString(),
        propiedad: category,
        ubicacion: type,
        metrosCuadrados: squareMeters,
        poliza: quote,
      };

      // Obtener el historial de cotizaciones desde localStorage
      const historialCotizaciones = JSON.parse(localStorage.getItem('historialCotizaciones')) || [];

      // Verificar duplicados antes de agregar la nueva cotización
      const isDuplicate = historialCotizaciones.some(
        (item) =>
          item.fechaCotizacion === cotizacion.fechaCotizacion &&
          item.propiedad === cotizacion.propiedad &&
          item.ubicacion === cotizacion.ubicacion &&
          item.metrosCuadrados === cotizacion.metrosCuadrados &&
          item.poliza === cotizacion.poliza
      );

      if (!isDuplicate) {
        // Agregar la nueva cotización al historial
        historialCotizaciones.push(cotizacion);

        // Guardar el historial actualizado en localStorage
        localStorage.setItem('historialCotizaciones', JSON.stringify(historialCotizaciones));
      }
    }
  }, [category, type, squareMeters, quote]);

  if (category.trim() === '' || type.trim() === '') return null;

  return (
    <div>
      <h2>Resumen cotización:</h2>
      <p>Categoría: {category}</p>
      <p>Tipo: {type}</p>
      <p>Metros Cuadrados: {squareMeters}</p>
      <p>Cotización: ${quote}</p>
    </div>
  );
};

export default Resume;
