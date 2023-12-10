import React, { useState } from 'react';
import getFinalBudget from '../Helper';
import datos from '../datos.json';

const Form = ({ setBudgetObj }) => {
  const [formData, setFormData] = useState({
    category: '',
    type: '',
    squareMeters: '',
    plan: 'basic', 
  });

  const [error, setError] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null); 

  const { category, type, squareMeters, plan } = formData;

  const fieldHandle = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const submitForm = (e) => {
    e.preventDefault();
    if (category.trim() === '' || type.trim() === '' || squareMeters.trim() === '') {
      setError(true);
      return;
    }
    setError(false);

    const selectedProperty = datos.find(
      (item) => item.categoria === category && item.tipo === type
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
      getFinalBudget(2000, category, type) * factor * parseFloat(squareMeters) * 35.86;
    const totalCost = baseCost * currentSelectedPlan.costMultiplier;

    setSelectedPlan(currentSelectedPlan);

    setBudgetObj({
      formData,
      budgetAmount: totalCost,
      selectedPlan: currentSelectedPlan,
    });

    setFormData({
      category: '',
      type: '',
      squareMeters: '',
      plan: 'basic',
    });
  };

  return (
    <div>
      <form onSubmit={submitForm}>
        <div>
          <label>Categoría:</label>
          <select name="category" value={category} onChange={fieldHandle}>
            <option value="">-- Seleccione --</option>
            <option value="propiedad">Propiedad</option>
            <option value="ubicacion">Ubicación</option>
          </select>
        </div>

        <div>
          <label>Tipo:</label>
          <select name="type" value={type} onChange={fieldHandle}>
            <option value="">-- Seleccione --</option>
            <option value="Casa">Casa</option>
            <option value="P.H.">P.H.</option>
            <option value="Depto. Edificio">Depto. Edificio</option>
            <option value="Barrio Privado">Barrio Privado</option>
            <option value="Oficina">Oficina</option>
            <option value="Local Comercial">Local Comercial</option>
            <option value="Depósito Logística">Depósito Logística</option>
            <option value="CABA">CABA</option>
            <option value="Tandil">Tandil</option>
            <option value="Costa Atlántica">Costa Atlántica</option>
            <option value="Patagonia">Patagonia</option>
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

