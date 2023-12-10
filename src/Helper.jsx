import propertyData from './datos.json';

function getPropertyFactor(category, type) {
  const property = propertyData.find(item => item.categoria === category && item.tipo === type);
  return property ? property.factor : 1.0;
}

function brandBudget(budget, category, type, squareMeters) {
  const factor = getPropertyFactor(category, type);
  const costPerSquareMeter = 35.86;

  
  if (isNaN(budget) || isNaN(factor) || isNaN(squareMeters)) {
    console.error("Error: Los valores no son numéricos");
    return 0; 
  }

  
  const budgetWithSquareMeters = budget + (budget * factor * squareMeters * costPerSquareMeter);
  
  return parseFloat(budgetWithSquareMeters).toFixed(2);
}

export default function getFinalBudget(budget, category, type, squareMeters) {
  
  squareMeters = parseFloat(squareMeters) || 0;

  
  return brandBudget(budget, category, type, squareMeters);
}
