// photographerData.js
// Import des fonctions nécessaires depuis d'autres fichiers
import { createAndRenderMedia, sortPhotos } from './photographer.js';
import { photographerPhotos } from './data.js';

// Fonction asynchrone pour récupérer les données d'un photographe
export async function fetchPhotographerData(id) {
  try {

    // Appel API pour récupérer le fichier JSON
    const response = await fetch('data/photographers.json');

    // Vérifie si la requête a réussi
    if (!response.ok) {
      throw new Error('Failed to fetch photographer data');
    }

    // Conversion de la réponse en JSON
    const data = await response.json();

    // Filtre les médias correspondant au photographe sélectionné
    const filteredPhotos = data.media.filter(
      photo => photo.photographerId === parseInt(id)
    );

    // Vide le tableau existant (important pour éviter les doublons)
    photographerPhotos.length = 0;

    // Ajoute les nouvelles photos dans le tableau
    photographerPhotos.push(...filteredPhotos);

    // Génère et affiche les médias dans le DOM
    createAndRenderMedia(photographerPhotos);

    // Trie les photos par défaut (popularité)
    sortPhotos('popularite'); // Option par défaut

    // Retourne les informations du photographe correspondant à l'id
    return data.photographers.find(
      photographer => photographer.id === parseInt(id, 10)
    );

  } catch (error) {

    // Gestion des erreurs (renvoi de l'erreur)
    throw error;
  }
}