// index.js

import { createUserCardDOM } from '../templates/photographer.js';

// Récupère les données des photographes depuis le fichier JSON
async function getPhotographers() {
  try {
    const response = await fetch('data/photographers.json'); // Appel du fichier JSON

    // Vérifie si la requête a réussi
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }

    // Convertit la réponse en objet JavaScript
    const data = await response.json();

    return data; // Retourne les données
  } catch (error) {
    // Affiche une erreur si le chargement échoue
    console.error('Error fetching photographers data:', error);
  }
}

// Affiche les cartes des photographes dans la section HTML
async function displayData(photographers, photographersSection) {
  photographers.forEach((photographer) => {
    // Crée une carte HTML pour chaque photographe
    const userCardDOM = createUserCardDOM(photographer);

    // Ajoute la carte dans la section
    photographersSection.appendChild(userCardDOM);
  });
}

// Fonction principale d'initialisation de la page
async function init() {
  // Récupère les photographes depuis le JSON
  const { photographers } = await getPhotographers();

  // Sélectionne la section où afficher les photographes
  const photographersSection = document.querySelector(".photographer_section");

  // Affiche les données dans la page
  displayData(photographers, photographersSection);

  // Accessibilité : les cartes utilisent déjà des liens HTML accessibles natifs
}

init(); // Lance l'application au chargement de la page