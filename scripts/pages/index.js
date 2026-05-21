// Script principal de la page d'accueil (index)


// Import de la fonction qui crée une carte HTML pour un photographe
import { createUserCardDOM } from '../templates/photographer.js';


// =========================
// Récupération des données
// =========================

// Fonction qui récupère les photographes depuis un fichier JSON
async function getPhotographers() {
  try {

    // Récupère le fichier JSON
    const response = await fetch('data/photographers.json');

    // Vérifie si la requête a réussi
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }

    // Transforme la réponse en objet JavaScript
    const data = await response.json();

    // Retourne les données
    return data;

  } catch (error) {

    // Affiche une erreur si le chargement échoue
    console.error('Error fetching photographers data:', error);
  }
}


// =========================
// Affichage des données
// =========================

// Fonction qui affiche les cartes des photographes sur la page
async function displayData(photographers, photographersSection) {

  // Parcourt tous les photographes
  photographers.forEach((photographer) => {

    // Crée une carte HTML pour chaque photographe
    const userCardDOM = createUserCardDOM(photographer);

    // Ajoute la carte dans la section de la page
    photographersSection.appendChild(userCardDOM);
  });
}


// =========================
// Initialisation de la page
// =========================

// Fonction principale qui lance tout le site
async function init() {

  // Récupère les données des photographes
  const { photographers } = await getPhotographers();

  // Sélectionne la section HTML où afficher les cartes
  const photographersSection = document.querySelector(".photographer_section");

  // Affiche les photographes sur la page
  displayData(photographers, photographersSection);

  // Note accessibilité :
  // les profils sont déjà dans des liens HTML accessibles (pas besoin de clavier spécial)
}


// Lance le script au chargement de la page
init();