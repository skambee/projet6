// =========================
// Récupération des données d’un photographe
// =========================


// Import des fonctions nécessaires
import { createAndRenderMedia, sortPhotos } from './photographer.js';
import { photographerPhotos } from './data.js';


// =========================
// Fonction principale
// =========================

// Récupère les données d’un photographe via son ID
export async function fetchPhotographerData(id) {

  try {

    // Récupère le fichier JSON
    const response = await fetch('data/photographers.json');

    // Vérifie si la requête a réussi
    if (!response.ok) {
      throw new Error('Failed to fetch photographer data');
    }

    // Transforme la réponse en objet JS
    const data = await response.json();

    // Filtre les médias du photographe sélectionné
    const filteredPhotos = data.media.filter(
      photo => photo.photographerId === parseInt(id)
    );

    // Vide le tableau global des photos
    photographerPhotos.length = 0;

    // Ajoute les photos du photographe
    photographerPhotos.push(...filteredPhotos);

    // Affiche les médias dans la page
    createAndRenderMedia(photographerPhotos);

    // Tri par défaut (popularité)
    sortPhotos('popularite');

    // Retourne les infos du photographe
    return data.photographers.find(
      photographer => photographer.id === parseInt(id, 10)
    );

  } catch (error) {

    // Affiche / renvoie l’erreur si problème
    throw error;
  }
}