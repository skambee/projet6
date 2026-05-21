// Import des fonctions liées aux likes
import { calculateTotalLikes, updateTotalLikes } from './likes.js';

// Import création des médias (image ou vidéo)
import { createMedia } from './media.js';

// Import des fonctions de création d’éléments HTML (template photographe)
import { createImage, createCardContainer, createHeading, createParagraph } from '../templates/photographer.js';

// Données des photos du photographe
import { photographerPhotos } from './data.js';

// Fonction d’ouverture de la lightbox / carousel
import { openCarousel } from './carousel.js'; 

// Récupération des données du photographe via API ou JSON
import { fetchPhotographerData } from './photographerData.js';


// Récupération de l'ID du photographe dans l'URL (?id=...)
const urlSearchParams = new URLSearchParams(window.location.search);
const photographerId = urlSearchParams.get('id');

// Stocke les médias déjà likés pour éviter les doubles likes
const likedMedia = new Set();


// Vérifie si un ID existe dans l’URL
if (photographerId) {
  initPhotographerProfile(photographerId);
} else {
  console.error('Photographer ID is missing or invalid.');
}


// Initialise le profil du photographe (chargement des données)
async function initPhotographerProfile(id) {
  try {
    const data = await fetchPhotographerData(id); // récupère les données
    createPhotographerProfile(data); // crée l'affichage
  } catch (error) {
    console.error('Error initializing photographer profile:', error);
  }
}


// Création de l'affichage du profil photographe
function createPhotographerProfile(data) {
  const { name, city, country, tagline, price, portrait, altname } = data;

  const picture = `assets/photographers/${portrait}`;

  // Création image photographe
  const img = createImage(picture, altname);

  const photographHeader = document.querySelector('.photograph-header');

  // Conteneur de l’image
  const imgcontainer = createCardContainer([img]);

  // Accessibilité : image décorative ignorée par lecteurs d’écran
  imgcontainer.setAttribute('aria-hidden', 'true');

  photographHeader.appendChild(imgcontainer);

  // Création des textes du profil
  const h2 = createHeading('h2', name);
  const h3 = createHeading('h3', `${city}, ${country}`);
  const tag = createParagraph(tagline);

  photographHeader.append(h2, h3, tag);

  // Titre de la modale de contact
  const modalTitle = document.getElementById('contact-modal-title');
  modalTitle.textContent = `Contactez-moi ${name}`;

  // Prix du photographe
  const priceContainer = document.createElement('p');
  priceContainer.classList.add('price');
  priceContainer.textContent = price + '€ / jour';

  const parentContainer = document.querySelector('.price-and-likes');
  parentContainer.appendChild(priceContainer);

  // Création du cœur global
  const heart = createHeartIcon();
  const path = heart.querySelector('path');

  // Couleur du cœur
  path.setAttribute('fill', 'black');

  parentContainer.appendChild(heart);
}


// Création d’un élément vidéo accessible
function createVideoElement(src, alt) {
  const video = document.createElement('video');
  video.src = src;
  video.type = 'video/mp4';

  // Accessibilité : description de la vidéo
  video.setAttribute('aria-label', alt);

  video.controls = true;
  return video;
}


// Affichage des médias du photographe
export function createAndRenderMedia(photos) {
  if (!photos) {
    console.error('No media data available for this photographer.');
    return;
  }

  const photoGrid = document.querySelector('.photo-grid');

  // Vide la grille avant affichage
  photoGrid.innerHTML = '';

  // Parcours de tous les médias
  photos.forEach(mediaData => {
    const media = createMedia(mediaData);

    const mediaCard = document.createElement('div');
    mediaCard.classList.add('photo');

    // === IMAGE ===
    if (media.type === 'image') {
      const image = document.createElement('img');
      image.src = media.url;
      image.alt = media.title;

      mediaCard.appendChild(image);

      // Accessibilité clavier
      image.setAttribute('tabindex', '0');
      image.setAttribute('role', 'button');
      image.setAttribute('aria-label', `Ouvrir ${media.title} dans la visionneuse`);

      // Ouverture carousel au clic
      image.addEventListener('click', () => openCarousel(mediaData));

      // Ouverture clavier (Enter ou espace)
      image.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          openCarousel(mediaData);
        }
      });
    } 
    
    // === VIDEO ===
    else if (media.type === 'video') {
      const video = createVideoElement(media.url, media.title);
      mediaCard.appendChild(video);
    }

    // Informations du média
    const photoInfo = document.createElement('div');
    photoInfo.classList.add('photo-info');

    const title = document.createElement('h3');
    title.textContent = media.title;
    photoInfo.appendChild(title);

    // Likes
    const likesContainer = document.createElement('div');
    likesContainer.classList.add('likes-container');

    const likes = document.createElement('p');
    likes.textContent = media.likes;
    likes.classList.add('photo-likes');

    likesContainer.appendChild(likes);
    photoInfo.appendChild(likesContainer);

    // Cœur like
    const heart = createHeartIcon();
    likesContainer.appendChild(heart);

    // Accessibilité du bouton like
    heart.setAttribute('tabindex', '0');
    heart.setAttribute('role', 'button');
    heart.setAttribute('aria-label', `Ajouter un like à ${media.title}`);

    // Click like
    heart.addEventListener('click', () =>
      likeMedia(media.id, mediaCard, likes, heart)
    );

    // Keyboard like
    heart.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        likeMedia(media.id, mediaCard, likes, heart);
      }
    });

    mediaCard.appendChild(photoInfo);
    photoGrid.appendChild(mediaCard);
  });
}


// Gestion des likes
function likeMedia(mediaId, mediaCard, likesElement, heart) {
  if (!likedMedia.has(mediaId)) {

    const media = photographerPhotos.find(m => m.id === mediaId);

    if (media) {
      media.likes += 1; // incrément like
      likedMedia.add(mediaId); // marque comme liké

      likesElement.textContent = media.likes;

      heart.classList.add('liked');

      // Accessibilité feedback
      heart.setAttribute('aria-label', `Like ajouté à ${media.title}`);

      // Mise à jour total likes
      updateTotalLikes();
    }
  }
}


// Création icône cœur SVG
function createHeartIcon() {
  const heart = document.createElementNS('http://www.w3.org/2000/svg', 'svg');

  heart.setAttribute('width', '21');
  heart.setAttribute('height', '24');
  heart.setAttribute('viewBox', '0 0 21 24');

  const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');

  // Forme du cœur
  path.setAttribute('d', 'M10.5 21.35L9.23125 20.03C4.725 15.36 1.75 12.28 1.75 8.5C1.75 5.42 3.8675 3 6.5625 3C8.085 3 9.54625 3.81 10.5 5.09C11.4537 3.81 12.915 3 14.4375 3C17.1325 3 19.25 5.42 19.25 8.5C19.25 12.28 16.275 15.36 11.7688 20.04L10.5 21.35Z');

  path.setAttribute('fill', '#911C1C');

  g.appendChild(path);
  heart.appendChild(g);

  return heart;
}


// TRI DES PHOTOS
function sortByPopularity(photos) {
  return photos.sort((a, b) => b.likes - a.likes);
}

function sortByDate(photos) {
  return photos.sort((a, b) => new Date(a.date) - new Date(b.date));
}

function sortByTitle(photos) {
  return photos.sort((a, b) => a.title.localeCompare(b.title));
}


// Fonction principale de tri
export async function sortPhotos(sortBy) {
  let sortedPhotos;

  switch (sortBy) {
    case 'popularite':
      sortedPhotos = sortByPopularity(photographerPhotos);
      break;
    case 'date':
      sortedPhotos = sortByDate(photographerPhotos);
      break;
    case 'titre':
      sortedPhotos = sortByTitle(photographerPhotos);
      break;
  }

  createAndRenderMedia(sortedPhotos);
}


// Événements des boutons de filtre
document.getElementById('filter-date').addEventListener('click', () => sortPhotos('date'));
document.getElementById('filter-titre').addEventListener('click', () => sortPhotos('titre'));
document.getElementById('filter-popularite').addEventListener('click', () => sortPhotos('popularite'));


// Accessibilité clavier pour filtres
document.getElementById('filter-date').addEventListener('keydown', (e) => {
  if (e.key === 'Enter') sortPhotos('date');
});

document.getElementById('filter-titre').addEventListener('keydown', (e) => {
  if (e.key === 'Enter') sortPhotos('titre');
});

document.getElementById('filter-popularite').addEventListener('keydown', (e) => {
  if (e.key === 'Enter') sortPhotos('popularite');
});


// Observer pour mettre à jour automatiquement les likes
document.addEventListener('DOMContentLoaded', () => {

  const observer = new MutationObserver(updateTotalLikes);
  const targetNode = document.querySelector('.photo-grid');

  observer.observe(targetNode, {
    childList: true,
    subtree: true
  });

  updateTotalLikes();
});