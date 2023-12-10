import propertyData from './datos.json';

function getPropertyFactor(category, type) {
  const property = propertyData.find(item => item.categoria === category && item.tipo === type);
  return property ? property.factor : 1.0;
}

function brandBudget(budget, category, type, squareMeters) {
  const factor = getPropertyFactor(category, type);
  const costPerSquareMeter = 35.86;

  // Verificamos que los valores sean numéricos y no NaN
  if (isNaN(budget) || isNaN(factor) || isNaN(squareMeters)) {
    console.error("Error: Los valores no son numéricos");
    return 0; // o el valor que desees en caso de error
  }

  // Calculamos el presupuesto incluyendo metros cuadrados
  const budgetWithSquareMeters = budget + (budget * factor * squareMeters * costPerSquareMeter);
  
  return parseFloat(budgetWithSquareMeters).toFixed(2);
}

export default function getFinalBudget(budget, category, type, squareMeters) {
  // Asegurémonos de que squareMeters tenga un valor numérico
  squareMeters = parseFloat(squareMeters) || 0;

  // Llamamos a brandBudget con squareMeters
  return brandBudget(budget, category, type, squareMeters);
}
