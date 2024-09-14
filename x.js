"use strict";

const donuts = [
  { name: 'Donut A', nutrition_facts: { nutrition: { carbohydrate: { carbs_detail: { type: { sugars: '10' } } } } } },
  { name: 'Donut B', nutrition_facts: { nutrition: { carbohydrate: { carbs_detail: { type: { sugars: '20' } } } } } },
  { name: 'Donut C', nutrition_facts: { nutrition: { carbohydrate: { carbs_detail: { type: { sugars: '15' } } } } } }
];

// Función para encontrar el donut con más azúcar usando un bucle for
function findDonutMoreSugar(donuts) {
  // Inicializar el donut con más azúcar como el primer donut del array
  let maxSugarDonut = donuts[0];

  // Iterar sobre el array
  for (let i = 0; i < donuts.length; i++) {
    let currentDonut = donuts[i];
    let currentSugar = parseFloat(currentDonut.nutrition_facts.nutrition.carbohydrate.carbs_detail.type.sugars);
    let maxSugar = parseFloat(maxSugarDonut.nutrition_facts.nutrition.carbohydrate.carbs_detail.type.sugars);

    // Comparar la cantidad de azúcar
    if (currentSugar > maxSugar) {
      // Actualizar el donut con más azúcar
      maxSugarDonut = currentDonut;
    }
  }

  // Devolver el donut con más azúcar
  return maxSugarDonut;
}

// Función principal para obtener y mostrar el donut con más azúcar
function displayDonutMoreSugar() {
  // Llamar a la función que encuentra el donut con más azúcar
  const donutMoreSugar = findDonutMoreSugar(donuts);

  // Mostrar el resultado
  console.log(`El donut con más azúcar es ${donutMoreSugar.name}`);
}

// Ejecutar la función principal
displayDonutMoreSugar();
