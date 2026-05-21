// index.js

import { createUserCardDOM } from '../templates/photographer.js';

async function getPhotographers() {
  try {
    const response = await fetch('data/photographers.json');
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching photographers data:', error);
  }
}

async function displayData(photographers, photographersSection) {
  photographers.forEach((photographer) => {
    const userCardDOM = createUserCardDOM(photographer);
    photographersSection.appendChild(userCardDOM);
  });
}


async function init() {
  const { photographers } = await getPhotographers();
  const photographersSection = document.querySelector(".photographer_section");
  displayData(photographers, photographersSection);
  // Accessibilité : l’ancien listener clavier a été supprimé car les profils sont déjà dans des liens natifs accessibles.
}

init();
