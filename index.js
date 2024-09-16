"use strict"

// función async para obtener datos desde URL
const getAllDonuts = async () => {
  // usar función fetch para realizar solicitud HTTP. Devuelve una promesa
  return fetch('https://gist.githubusercontent.com/Oskar-Dam/62e7175dc542af53a9d18cb292422425/raw/a6cce2b68ea13a77ec5ea7bdfb4df8f23f9ae95f/donuts.json')
    // usar método .json para convertir la respuesta 'response' en un objeto javascript
    .then(response => response.json())
}

// función async devolver array de objetos donuts
const fetchAsyncData = async () => {
  try {
    // recibir datos llamando a función que devuelve promesa. Con await espera a que se resuelva la promesa
    const data = await getAllDonuts()
    // acceder a la propiedad items.item del json
    const donuts = data.items.item
    return donuts
  }
  catch (error) {
    // mostrar error
    console.log(error.message);
  }
}

// ***** FASE 1 DEL CONJURO *****
// encontrar donut con más azucar, hierro, proteina y menos fibra. Toma array 'donuts' como parametro
function findDonutMaxMin(donuts) {

  // inicializar listas para almacenar los donuts con valores máximos y mínimos
  let maxSugarDonuts = [donuts[0]]
  let maxIronDonuts = [donuts[0]]
  let maxProteinDonuts = [donuts[0]]
  let minFibreDonuts = [donuts[0]]

  // iterar sobre el array
  for (let index = 0; index < donuts.length; index++) {

    // asignar a 'currentDonut' el donut 'index' del array
    const currentDonut = donuts[index]

    // ----- AZUCAR
    // obtener y parsear valor del AZUCAR del donut actual
    const currentSugar = parseFloat(currentDonut.nutrition_facts.nutrition.carbohydrate.carbs_detail.type.sugars)
    const maxSugar = parseFloat(maxSugarDonuts[0].nutrition_facts.nutrition.carbohydrate.carbs_detail.type.sugars)

    // comparar la cantidad de AZÚCAR
    if (currentSugar > maxSugar) {
      // reemplazar la lista con nuevo máximo
      maxSugarDonuts = [currentDonut]
    } else if (currentSugar === maxSugar) {
      // añadir a la lista valor igual al máximo
      maxSugarDonuts.push(currentDonut)
    }

    // ----- HIERRO
    // obtener y parsear valor del HIERRO del donut actual
    const currentIron = parseFloat(currentDonut.nutrition_facts.nutrition.vitamines
      .find(vitamines => vitamines.type === "Iron").percent)
    const maxIron = parseFloat(maxIronDonuts[0].nutrition_facts.nutrition.vitamines
      .find(vitamines => vitamines.type === "Iron").percent)

    // comparar la cantidad de HIERRO
    if (currentIron > maxIron) {
      // reemplazar la lista con nuevo máximo
      maxIronDonuts = [currentDonut]
    } else if (currentIron === maxIron) {
      // añadir a la lista valor igual al máximo
      maxIronDonuts.push(currentDonut)
    }

    // ----- PROTEINAS
    // obtener y parsear valor del PROTEINAS del donut actual
    const currentProtein = parseFloat(currentDonut.nutrition_facts.nutrition.proteine)
    const maxProtein = parseFloat(maxProteinDonuts[0].nutrition_facts.nutrition.proteine)

    // comparar la cantidad de PROTEÍNAS
    if (currentProtein > maxProtein) {
      // reemplazar la lista con nuevo máximo
      maxProteinDonuts = [currentDonut]
      // añadir a la lista valor igual al máximo
    } else if (currentProtein === maxProtein) {
      maxProteinDonuts.push(currentDonut)
    }

    // ----- FIBRA
    // obtener y parsear valor del FIBRA del donut actual
    const currentFibre = parseFloat(currentDonut.nutrition_facts.nutrition.carbohydrate.carbs_detail.type.fibre)
    const minFibre = parseFloat(minFibreDonuts[0].nutrition_facts.nutrition.carbohydrate.carbs_detail.type.fibre)

    // comparar la cantidad de FIBRA
    if (currentFibre < minFibre) {
      // reemplazar la lista con nuevo máximo
      minFibreDonuts = [currentDonut]
      // añadir a la lista valor igual al máximo
    } else if (currentFibre === minFibre) {
      minFibreDonuts.push(currentDonut)
    }
  }

  // devolver los datos en un objeto
  return {
    maxSugarDonuts,
    maxIronDonuts,
    maxProteinDonuts,
    minFibreDonuts
  }
}

// imprimir datos de donutsMaxMin
function printFindDonutMaxMin(donuts) {

  // guardar en 'result' el return de 'findDonutMaxMin'
  const result = findDonutMaxMin(donuts)

  try {
    // MOSTRAR DATOS EN PANTALLA
    console.log('\n\n1.-  FASE 1 DEL CONJURO');

    // AZUCAR
    // comprobar cuantos resultados para elegir el texto
    if (result.maxSugarDonuts.length > 1) {
      console.log(`\n       Los donuts con más azucar son:`)
    } else {
      console.log(`\n       El donut con más azucar es:`)
    }
    // recorrer 'la lista result.maxSugarDonuts' y mostrar el dato .name del donut con más AZUCAR
    result.maxSugarDonuts.forEach(donut => {
      console.log(`         - ${donut.name}`);
    })

    // HIERRO
    // comprobar cuantos resultados para elegir el texto
    if (result.maxIronDonuts.length > 1) {
      console.log(`       Los donuts con más hierro son:`)
    } else {
      console.log(`       El donut con más hierro es:`)
    }
    // recorrer 'la lista result.maxIronDonuts' y mostrar el dato .name del donut con más HIERRO
    result.maxIronDonuts.forEach(donut => {
      console.log(`         - ${donut.name}`)
    });

    // PROTEINA
    // comprobar cuantos resultados para elegir el texto
    if (result.maxProteinDonuts.length > 1) {
      console.log(`       Los donuts con más proteina son:`)
    } else {
      console.log(`       El donut con más proteina es:`)
    }
    // recorrer 'la lista result.maxProteinDonuts' y mostrar el dato .name del donut con más PROTEINA
    result.maxProteinDonuts.forEach(donut => {
      console.log(`         - ${donut.name}`)
    });

    // FIBRA
    // comprobar cuantos resultados para elegir el texto
    if (result.minFibreDonuts.length > 1) {
      console.log(`       Los donuts con menos fibra son:`)
    } else {
      console.log(`       El donut con menos fibra es:`)
    }
    // recorrer 'la lista result.minFibreDonuts' y mostrar el dato .name del donut con más FIBRA
    result.minFibreDonuts.forEach(donut => {
      console.log(`         - ${donut.name}`)
    });

    // capturar el error
  } catch (error) {
    // mostrar error
    console.log(error.message);
  }
}

// ***** FASE 2 DEL CONJURO *****
// mostrar la información de calorias, grasas y carbohidratos
function printCalFatCarb(donuts) {
  // MOSTRAR DATOS EN PANTALLA
  console.log('\n\n2.-  FASE 2 DEL CONJURO')

  console.log('\n   Calorías y Carbohidratos de los donuts:')
  donuts.forEach(donut => {
    // mostrar DONUTS
    console.log(`\n       Donut: ${donut.name}`)
    // mostrar CALORÍAS
    console.log(`           Calorías: ${donut.nutrition_facts.nutrition.carbohydrate.carbs_detail.amount}`)
    // mostrar CARBOHIDRATOS
    console.log(`           Carbohidratos: ${donut.nutrition_facts.nutrition.calories} kcal`)
  })

  // media calorias
  let totalCal = 0
  let totalSat = 0

  donuts.forEach(donut => {
    totalCal += parseFloat(donut.nutrition_facts.nutrition.calories)
    totalSat += parseFloat(donut.nutrition_facts.nutrition.fat.fat_type.saturated)
  })

  // mostrar media calorias
  const averageCal = totalCal / donuts.length

  console.log('\n   La media de calorías de los donuts es:')
  console.log(`       ${averageCal} kcal`);

  // mostrar grasas saturadas
  console.log('\n   La suma total de grasas saturadas es:');
  console.log(`       ${totalSat} g`);

  // media de vitaminas
  const vitA = "Vitamin A";
  const vitC = "Vitamin C";
  const vitCal = "Calcium";
  const vitIro = "Iron";

  console.log('\n   El porcentaje medio de vitaminas es el siguiente:');

  // calcular media vitaminas
  function averageVitamin(vitamin) {
    let totalPercent = 0

    donuts.forEach(donut => {
      const vitInfo = donut.nutrition_facts.nutrition.vitamines.find(vit => vit.type === vitamin)
      totalPercent += parseFloat(vitInfo.percent);
    })

    const averagePercent = totalPercent / donuts.length

    // mostrar vitaminas
    console.log(`       ${(vitamin)}: ${averagePercent}%`);
  }

  averageVitamin(vitA)
  averageVitamin(vitC)
  averageVitamin(vitCal)
  averageVitamin(vitIro)
}

// ***** FASE 3 DEL CONJURO *****
function listBatTop(donuts) {
  // MOSTRAR DATOS EN PANTALLA
  console.log('\n\n2.-  FASE 3 DEL CONJURO')
  console.log('\n   Tipos de masa y toppings:')

  // recorrer donuts para obtener 'donut.name'
  donuts.forEach(donut => {
    console.log(`\n       Donut: ${donut.name}`)
    console.log(`           Masas:`)
    // recorrer batter para obtener batter.type
    donut.batters.batter.forEach(batter => console.log(`                - ${batter.type}`))
    console.log(`           Toppings:`)
    // recorrer toping para obtener toppynt.type
    donut.topping.forEach(topping => console.log(`                - ${topping.type}`))
  })
}

// ***** FASE 4 DEL CONJURO *****
function calcPurchOpt(donuts) {
  // MOSTRAR DATOS EN PANTALLA
  console.log('\n\n2.-  FASE 3 DEL CONJURO')

  console.log('\n   Donuts que se comprarán con 4 monedas de plata:')
  // crear el array 'prices' desde donuts
  const prices = donuts.map(donut => ({
    name: donut.name,
    ppu: donut.ppu
  }))

  // recorrer prices para calcular cantidades
  prices.forEach(price => {
    const quantity = Math.floor(4 / price.ppu)
    const remainder = (4 - quantity * price.ppu).toFixed(2)
    console.log(`       Puedes comprar ${quantity} donuts de ${price.name} con ${remainder} monedas sobrantes.`)
  })
}

// FUNCIÓN PRINCIPAL
const main = async () => {

  // guardar datos en donuts
  const donuts = await fetchAsyncData()

  // FASE 1
  printFindDonutMaxMin(donuts)

  // FASE 2
  printCalFatCarb(donuts)

  // FASE 3
  listBatTop(donuts)

  // FASE 4
  calcPurchOpt(donuts)

}

main()