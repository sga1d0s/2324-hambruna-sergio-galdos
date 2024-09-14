"use strict"

// función asincrona para obtener datos desde URL
const getAllDonuts = async () => {
  // usar función fetch para realizar solicitud HTTP. Devuelve una promesa
  return fetch ('https://gist.githubusercontent.com/Oskar-Dam/62e7175dc542af53a9d18cb292422425/raw/a6cce2b68ea13a77ec5ea7bdfb4df8f23f9ae95f/donuts.json')
  // usar método .json para convertir la respuesta 'response' en un objeto javascript
  .then(response => response.json())
}

// función encontrar donut con más azucar toma array 'donuts' como parametro
const findDonutMoreSugar =  (donuts) => {

  // usar método .reduce para iterar sobre el array donuts y comparar max con current
  return donuts.reduce((maxSugarDonut, currentDonut) => {

    // extraer la cantidad de azucar de 'currentItem' y parsear a float el dato 'sugars' 
    const currentSugar = parseFloat(currentDonut.nutrition_facts.nutrition.carbohydrate.carbs_detail.type.sugars)
    const maxSugar = parseFloat(maxSugarDonut.nutrition_facts.nutrition.carbohydrate.carbs_detail.type.sugars)
    
    // comparar cantidad de azucar de los donut
    if (currentSugar > maxSugar) {
      maxSugarDonut = currentDonut;
    }
    
    // devuelve el donut con más azucar
    return maxSugarDonut
  });
};

// función asincrona para obtener datos
const fetchAsyncData = async () => {
  
  // manejo de herrores
  try {
    
    // recibir datos llamando a función que devuelve promesa. Con await espera a que se resuelva la promesa
    const data = await getAllDonuts()
    
    // acceder a la propiedad items.item del json
    const donuts = data.items.item
    
    // llamar a funcion pasando array donuts como parametro y guardamos en 'donutMoreSugar'
    const donutMoreSugar = findDonutMoreSugar(donuts)
    console.log(`El donut con más azucar es ${donutMoreSugar.name}`);
    
    // capturar el herror
  } catch (error) {
    
    // pintar herror
    console.log(error.message);
  }
}

fetchAsyncData()