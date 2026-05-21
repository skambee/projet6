// =========================
// Page photographe
// =========================


// Import des fonctions et données nécessaires
import { calculateTotalLikes, updateTotalLikes } from './likes.js';
import { createMedia } from './media.js';
import { createImage, createCardContainer, createHeading, createParagraph } from '../templates/photographer.js';
import { photographerPhotos } from './data.js';
import { openCarousel } from './carousel.js';
import { fetchPhotographerData } from './photographerData.js';


// =========================
// Récupération de l’ID dans l’URL
// =========================

const urlSearchParams = new URLSearchParams(window.location.search);
const photographerId = urlSearchParams.get('id');

// Stocke les médias déjà likés
const likedMedia = new Set();


// Si ID présent → lance la page
if (photographerId) {
  initPhotographerProfile(photographerId);
} else {
  console.error('Photographer ID is missing or invalid.');
}


// =========================
// Initialisation profil photographe
// =========================

async function initPhotographerProfile(id) {
  try {

    // Récupère les données du photographe
    const data = await fetchPhotographerData(id);

    // Crée le profil sur la page
    createPhotographerProfile(data);

  } catch (error) {
    console.error('Error initializing photographer profile:', error);
  }
}


// =========================
// Création du profil photographe
// =========================

function createPhotographerProfile(data) {

  const { name, city, country, tagline, price, portrait, altname } = data;

  const picture = `assets/photographers/${portrait}`;

  // Création image profil
  const img = createImage(picture, altname);

  const photographHeader = document.querySelector('.photograph-header');

  const imgcontainer = createCardContainer([img]);

  // Accessibilité : image décorative ignorée par lecteur d’écran
  imgcontainer.setAttribute('aria-hidden', 'true');

  photographHeader.appendChild(imgcontainer);

  // Création des textes du profil
  const h2 = createHeading('h2', name);
  const h3 = createHeading('h3', `${city}, ${country}`);
  const tag = createParagraph(tagline);

  photographHeader.append(h2, h3, tag);

  // Mise à jour du titre de la modale contact
  const modalTitle = document.getElementById('contact-modal-title');
  modalTitle.textContent = `Contactez-moi ${name}`;

  // Prix affiché
  const priceContainer = document.createElement('p');
  priceContainer.classList.add('price');
  priceContainer.textContent = price + '€ / jour';

  const parentContainer = document.querySelector('.price-and-likes');
  parentContainer.appendChild(priceContainer);

  // Ajout icône cœur
  const heart = createHeartIcon();
  const path = heart.querySelector('path');
  path.setAttribute('fill', 'black');
  parentContainer.appendChild(heart);
}


// =========================
// Création vidéo
// =========================

function createVideoElement(src, alt) {

  const video = document.createElement('video');
  video.src = src;
  video.type = 'video/mp4';

  // Accessibilité : description de la vidéo
  video.setAttribute('aria-label', alt);

  video.controls = true;

  return video;
}


// =========================
// Création et affichage des médias
// =========================

export function createAndRenderMedia(photos) {

  if (!photos) {
    console.error('No media data available for this photographer.');
    return;
  }

  const photoGrid = document.querySelector('.photo-grid');

  // Vide la galerie
  photoGrid.innerHTML = '';

  // Parcourt tous les médias
  photos.forEach(mediaData => {

    const media = createMedia(mediaData);

    const mediaCard = document.createElement('div');
    mediaCard.classList.add('photo');

    // =========================
    // IMAGE
    // =========================
    if (media.type === 'image') {

      const image = document.createElement('img');
      image.src = media.url;
      image.alt = media.title;

      mediaCard.appendChild(image);

      // Accessibilité : image cliquable
      image.setAttribute('tabindex', '0');
      image.setAttribute('role', 'button');
      image.setAttribute('aria-label', `Ouvrir ${media.title} dans la visionneuse`);

      // Ouverture carrousel au clic
      image.addEventListener('click', () => openCarousel(mediaData));

      // Ouverture clavier (Entrée / Espace)
      image.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          openCarousel(mediaData);
        }
      });

    // =========================
    // VIDEO
    // =========================
    } else if (media.type === 'video') {

      const video = createVideoElement(media.url, media.title);
      mediaCard.appendChild(video);
    }

    // =========================
    // INFOS MEDIA
    // =========================

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

    // Icône cœur
    const heart = createHeartIcon();
    likesContainer.appendChild(heart);

    photoInfo.appendChild(likesContainer);
    mediaCard.appendChild(photoInfo);

    // Like interaction
    heart.setAttribute('tabindex', '0');
    heart.setAttribute('role', 'button');
    heart.setAttribute('aria-label', `Ajouter un like à ${media.title}`);

    heart.addEventListener('click', () =>
      likeMedia(media.id, mediaCard, likes, heart)
    );

    heart.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        likeMedia(media.id, mediaCard, likes, heart);
      }
    });

    // Ajout à la grille
    photoGrid.appendChild(mediaCard);
  });
}


// =========================
// Gestion des likes
// =========================

function likeMedia(mediaId, mediaCard, likesElement, heart) {

  if (!likedMedia.has(mediaId)) {

    const media = photographerPhotos.find(m => m.id === mediaId);

    if (media) {

      media.likes += 1; // ajoute 1 like
      likedMedia.add(mediaId);

      likesElement.textContent = media.likes;

      heart.classList.add('liked');

      heart.setAttribute('aria-label', `Like ajouté à ${media.title}`);

      updateTotalLikes(); // met à jour total
    }
  }
}


// =========================
// Icône cœur SVG
// =========================

function createHeartIcon() {

  const heart = document.createElementNS('http://www.w3.org/2000/svg', 'svg');

  heart.setAttribute('width', '21');
  heart.setAttribute('height', '24');
  heart.setAttribute('viewBox', '0 0 21 24');

  const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');

  path.setAttribute('d', 'M10.5 21.35L9.23125 20.03C4.725 15.36 1.75 12.28 1.75 8.5C1.75 5.42 3.8675 3 6.5625 3C8.085 3 9.54625 3.81 10.5 5.09C11.4537 3.81 12.915 3 14.4375 3C17.1325 3 19.25 5.42 19.25 8.5C19.25 12.28 16.275 15.36 11.7688 20.04L10.5 21.35Z');

  path.setAttribute('fill', '#911C1C');

  g.appendChild(path);
  heart.appendChild(g);

  return heart;
}


// =========================
// TRI DES PHOTOS
// =========================

// Tri par popularité
function sortByPopularity(photos) {
  return photos.sort((a, b) => b.likes - a.likes);
}

// Tri par date
function sortByDate(photos) {
  return photos.sort((a, b) => new Date(a.date) - new Date(b.date));
}

// Tri par titre
function sortByTitle(photos) {
  return photos.sort((a, b) => a.title.localeCompare(b.title));
}


// =========================
// Fonction de tri principale
// =========================

export function sortPhotos(sortBy) {

  let sortedPhotos;

  if (sortBy === 'popularite') {
    sortedPhotos = sortByPopularity(photographerPhotos);
  } else if (sortBy === 'date') {
    sortedPhotos = sortByDate(photographerPhotos);
  } else if (sortBy === 'titre') {
    sortedPhotos = sortByTitle(photographerPhotos);
  }

  createAndRenderMedia(sortedPhotos);
}


// =========================
// Boutons de filtre
// =========================

document.getElementById('filter-date').addEventListener('click', () => sortPhotos('date'));
document.getElementById('filter-titre').addEventListener('click', () => sortPhotos('titre'));
document.getElementById('filter-popularite').addEventListener('click', () => sortPhotos('popularite'));


// Support clavier (Entrée)
document.getElementById('filter-date').addEventListener('keydown', (e) => {
  if (e.key === 'Enter') sortPhotos('date');
});

document.getElementById('filter-titre').addEventListener('keydown', (e) => {
  if (e.key === 'Enter') sortPhotos('titre');
});

document.getElementById('filter-popularite').addEventListener('keydown', (e) => {
  if (e.key === 'Enter') sortPhotos('popularite');
});


// =========================
// Mise à jour automatique des likes
// =========================

document.addEventListener('DOMContentLoaded', async () => {

  const observer = new MutationObserver(updateTotalLikes);

  const targetNode = document.querySelector('.photo-grid');

  const config = { childList: true, subtree: true };

  observer.observe(targetNode, config);

  updateTotalLikes();
});