import React, { useState } from 'react';

import getFinalBudget from '../Helper';
import datos from '../datos.json';



const Form = ({ setBudgetObj }) => {
  const [formData, setFormData] = useState({
    category: '',
    type: '',
    squareMeters: '',
  });

  const [error, setError] = useState(false);

  const { category, type, squareMeters } = formData;

  const fieldHandle = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const submitForm = e => {
    e.preventDefault();
    if (category.trim() === '' || type.trim() === '' || squareMeters.trim() === '') {
      setError(true);
      return;
    }
    setError(false);

    // Obtener el factor correspondiente a la categoría y tipo seleccionados
    const selectedProperty = datos.find(item => item.categoria === category && item.tipo === type);
    const factor = selectedProperty ? selectedProperty.factor : 1.0;

    // Calcular la cantidad presupuestada utilizando el factor y la cantidad de metros cuadrados
    const budgetAmount = getFinalBudget(2000, category, type) * factor * parseFloat(squareMeters) * 35.86;

    setBudgetObj({
      formData,
      budgetAmount,
    });
    setFormData({
      category: '',
      type: '',
      squareMeters: '',
    });
  };

  return (
    <form onSubmit={submitForm}>
      <div>
        <label>Categoría:</label>
        <select
          name="category"
          value={category}
          onChange={fieldHandle}
        >
          <option value="">-- Seleccione --</option>
          <option value="propiedad">Propiedad</option>
          <option value="ubicacion">Ubicación</option>
        </select>
      </div>

      <div>
        <label>Tipo:</label>
        <select
          name="type"
          value={type}
          onChange={fieldHandle}
        >
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
        <input
          type="number"
          name="squareMeters"
          value={squareMeters}
          onChange={fieldHandle}
        />
      </div>

      <button type="submit">Cotizar</button>

      {error ? <Error>Error: Completar los campos del formulario.</Error> : null}
    </form>
  );
};

export default Form;
