// photographerData.js
import { createAndRenderMedia, sortPhotos } from './photographer.js';
import { photographerPhotos } from './data.js';

export async function fetchPhotographerData(id) {
    try {
      const response = await fetch('data/photographers.json');
      if (!response.ok) {
        throw new Error('Failed to fetch photographer data');
      }
      const data = await response.json();
      const filteredPhotos = data.media.filter(photo => photo.photographerId === parseInt(id));
      photographerPhotos.length = 0; // Clear the existing array.
      photographerPhotos.push(...filteredPhotos); // Replace the array with new data.
      createAndRenderMedia(photographerPhotos);
      sortPhotos('popularite'); // Populating the page with the default sorting option "Popularité"
      return data.photographers.find(photographer => photographer.id === parseInt(id, 10));
    } catch (error) {
      throw error;
    }
  }