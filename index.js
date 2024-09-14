"use strict"

const getAllDonuts = async () => {
  return fetch ('https://gist.githubusercontent.com/Oskar-Dam/62e7175dc542af53a9d18cb292422425/raw/a6cce2b68ea13a77ec5ea7bdfb4df8f23f9ae95f/donuts.json')
  .then(response => response.json())
}

const fetchAsyncData = async () => {
  try {
    const response = await getAllDonuts()
    console.dir(response, {depth: null});
  } catch (error) {
    console.log(error.message);
  }
}

fetchAsyncData()