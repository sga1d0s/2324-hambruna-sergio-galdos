"use strict"

// función asincrona para obtener datos desde URL
const getAllDonuts = async function() {
  // usar función fetch para realizar solicitud HTTP. Devuelve una promesa
  return fetch('https://gist.githubusercontent.com/Oskar-Dam/62e7175dc542af53a9d18cb292422425/raw/a6cce2b68ea13a77ec5ea7bdfb4df8f23f9ae95f/donuts.json')
    // usar método .json para convertir la respuesta 'response' en un objeto javascript
    .then(function(response) {
      return response.json()
    })
}

// función comparadora para usar con reduce
function compareSugar(maxSugarDonut, currentDonut) {

  // extraer la cantidad de azúcar de 'currentDonut' y parsear a float el dato 'sugars'
  var currentSugar = parseFloat(currentDonut.nutrition_facts.nutrition.carbohydrate.carbs_detail.type.sugars)

  var maxSugar = parseFloat(maxSugarDonut.nutrition_facts.nutrition.carbohydrate.carbs_detail.type.sugars)

  // comparar cantidad de azúcar de los donuts
  if (currentSugar > maxSugar) {

    // actualizar el donut con más azúcar
    maxSugarDonut = currentDonut 
  }

  // devolver el donut con más azúcar
  return maxSugarDonut
}

// función encontrar donut con más azúcar toma array 'donuts' como parámetro
function findDonutMoreSugar(items) {

  // Usar método .reduce para iterar sobre el array donuts y comparar max con current
  var maxSugarDonut = items.reduce(compareSugar)

  // devolver el donut con más azúcar
  return maxSugarDonut
}

// función asincrona para obtener datos
const fetchAsyncData = async function() {
  // manejo de errores
  try {
    // recibir datos llamando a función que devuelve promesa. Con await espera a que se resuelva la promesa
    const data = await getAllDonuts()

    // acceder a la propiedad items.item del json
    const donuts = data.items.item

    // llamar a función pasando array donuts como parámetro y guardamos en 'donutMoreSugar'
    const donutMoreSugar = findDonutMoreSugar(donuts)

    // pintamos el dato .name del donut con más azúcar
    console.log(`El donut con más azúcar es ${donutMoreSugar.name}`)
    
  } catch (error) {
    // pintar error
    console.log("Error:", error.message)
  }
}

fetchAsyncData()
