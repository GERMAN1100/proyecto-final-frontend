import React, { useState } from 'react';
import getFinalBudget from '../Helper';
import datos from '../datos.json';

const Form = ({ setBudgetObj }) => {
  const [formData, setFormData] = useState({
    propertyType: '',
    location: '',
    squareMeters: '',
    plan: 'basic',
  });

  const [error, setError] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  const { propertyType, location, squareMeters, plan } = formData;

  const fieldHandle = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const submitForm = (e) => {
    e.preventDefault();
    if (propertyType.trim() === '' || location.trim() === '' || squareMeters.trim() === '') {
      setError(true);
      return;
    }

    setError(false);

    const selectedProperty = datos.find(
      (item) => item.tipo === propertyType && (item.categoria === 'ubicacion' || item.tipo === location)
    );
    const factor = selectedProperty ? selectedProperty.factor : 1.0;

    const insurancePlans = {
      basic: {
        name: 'Plan Básico',
        coverage: [`Cobertura Estándar:
        Daños Estructurales: Cubre daños a la estructura de la propiedad debido a eventos como incendios, explosiones, inundaciones, etc.
        Responsabilidad Civil: Protege contra reclamaciones de terceros por daños causados por la propiedad.
      Asistencia 24/7:
        Servicio de Emergencia: Asistencia telefónica para emergencias relacionadas con la propiedad.
      Beneficios Adicionales:
        Cobertura contra Incendios: Protección específica contra incendios.`],

        costMultiplier: 1.2,
      },
      complete: {
        name: 'Plan Completo',
        coverage: [`Cobertura Ampliada: 
        Daños Estructurales: Incluye cobertura para daños estructurales y colaterales más amplios.
        Cobertura contra Robos: Protección contra robos y vandalismo.
        Daños por Fenómenos Naturales: Incluye eventos como terremotos, tormentas, y otros desastres naturales.
      Responsabilidad Extendida:
        Responsabilidad Civil Ampliada: Mayor cobertura para reclamaciones de terceros.
      Asistencia 24/7 con Servicios Adicionales:
        Servicio de Reparaciones Rápidas: Coordinación de servicios de reparación con profesionales acreditados.
        Asesoría Legal: Consultas legales relacionadas con la propiedad`],

        costMultiplier: 1.5,
      },
    };

    const currentSelectedPlan = insurancePlans[plan] || insurancePlans.basic;

    const baseCost =
      getFinalBudget(2000, propertyType, location) * factor * parseFloat(squareMeters) * 35.86;
    const totalCost = baseCost * currentSelectedPlan.costMultiplier;

    setSelectedPlan(currentSelectedPlan);

    setBudgetObj({
      formData,
      budgetAmount: totalCost,
      selectedPlan: currentSelectedPlan,
    });

    // Aquí comienza la parte del localStorage
    const historialCotizaciones = JSON.parse(localStorage.getItem('historialCotizaciones')) || [];

    const isDuplicate = historialCotizaciones.some(
      (item) =>
        item.propiedad === propertyType &&
        item.ubicacion === location &&
        item.metrosCuadrados === parseFloat(squareMeters) &&
        item.poliza === currentSelectedPlan.name
    );

    if (!isDuplicate) {
      historialCotizaciones.push({
        fechaCotizacion: new Date().toLocaleString(),
        propiedad: propertyType,
        ubicacion: location,
        metrosCuadrados: parseFloat(squareMeters),
        poliza: currentSelectedPlan.name,
      });

      localStorage.setItem('historialCotizaciones', JSON.stringify(historialCotizaciones));
    }
    // Aquí termina la parte del localStorage

    setFormData({
      propertyType: '',
      location: '',
      squareMeters: '',
      plan: 'basic',
    });
  };

  const propertyTypes = datos
    .filter((item) => item.categoria === 'propiedad')
    .map((item) => item.tipo);

  const locationTypes = datos
    .filter((item) => item.categoria === 'ubicacion')
    .map((item) => item.tipo);

  return (
    <div>
      <form onSubmit={submitForm}>
        <div>
          <label>Tipo de Propiedad:</label>
          <select name="propertyType" value={propertyType} onChange={fieldHandle}>
            <option value="">-- Seleccione --</option>
            {propertyTypes.map((propertyType) => (
              <option key={propertyType} value={propertyType}>
                {propertyType}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Ubicación:</label>
          <select name="location" value={location} onChange={fieldHandle}>
            <option value="">-- Seleccione --</option>
            {locationTypes.map((locationType) => (
              <option key={locationType} value={locationType}>
                {locationType}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Metros Cuadrados:</label>
          <input type="number" name="squareMeters" value={squareMeters} onChange={fieldHandle} />
        </div>

        <div>
          <label>Plan de Seguro:</label>
          <select name="plan" value={plan} onChange={fieldHandle}>
            <option value="basic">Plan Básico</option>
            <option value="complete">Plan Completo</option>
          </select>
        </div>

        <button type="submit">Cotizar</button>

        {error ? <div>Error: Completar los campos del formulario.</div> : null}
      </form>

      <div style={{ marginTop: '20px' }}>
        <h3>Detalles del Plan Seleccionado:</h3>
        {selectedPlan && (
          <>
            <p>
              <strong>Tipo:</strong> {selectedPlan.name}
            </p>
            <p>
              <strong>Cobertura:</strong> {selectedPlan.coverage}
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default Form;
