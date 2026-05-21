// carousel.js
import { createMedia } from './media.js';
import { photographerPhotos } from './data.js';

// Récupération des éléments HTML du DOM
const imageCarousel = document.getElementById('image-carousel');
const overlay = document.querySelector('.overlay');
const closeCarouselButton = document.querySelector('.carousel-close');
const prevButton = document.querySelector('.carousel-prev');
const nextButton = document.querySelector('.carousel-next');
const carouselContent = document.querySelector('.carousel-content');

// Index de l’image actuellement affichée
let currentImageIndex = 0;

// Ouvre la lightbox (carrousel)
export function openCarousel(mediaData) {
  imageCarousel.style.display = 'block'; // Affiche la lightbox
  imageCarousel.setAttribute('aria-hidden', 'false'); // Rend visible pour les lecteurs d’écran
  overlay.style.display = 'block'; // Affiche le fond sombre

  // Trouve l’index de l’image cliquée dans la liste
  currentImageIndex = photographerPhotos.findIndex(item => item.id === mediaData.id);

  loadCurrentImage(); // Charge l’image actuelle

  closeCarouselButton.focus(); // Met le focus sur le bouton fermer (accessibilité)

  document.addEventListener('keydown', handleKeyDown); // Active les touches clavier
}

// Ferme la lightbox
function closeImageCarousel() {
  imageCarousel.style.display = 'none'; // Cache la lightbox
  imageCarousel.setAttribute('aria-hidden', 'true'); // Cache pour les lecteurs d’écran
  overlay.style.display = 'none'; // Cache le fond sombre

  document.removeEventListener('keydown', handleKeyDown); // Désactive les touches clavier
}

// Charge et affiche l’image actuelle
function loadCurrentImage() {
  carouselContent.innerHTML = ''; // Vide le contenu précédent

  // Crée le média (image ou vidéo)
  const media = createMedia(photographerPhotos[currentImageIndex]);
  const mediaElement = media.createMediaElement();

  mediaElement.classList.add('lightbox-media'); // Ajoute un style CSS
  carouselContent.appendChild(mediaElement); // Ajoute le média au DOM

  // Ajoute le titre du média
  const mediaTitle = document.createElement('p');
  mediaTitle.classList.add('media-title');
  mediaTitle.textContent = media.title;
  carouselContent.appendChild(mediaTitle);
}

// Bouton précédent
prevButton.addEventListener('click', showPreviousMedia);

// Bouton suivant
nextButton.addEventListener('click', showNextMedia);

// Bouton fermer + clic sur l’overlay
closeCarouselButton.addEventListener('click', closeImageCarousel);
overlay.addEventListener('click', closeImageCarousel);

// Ajout d’un clic sur chaque image de la galerie pour ouvrir le carrousel
const mediaGridItems = document.querySelectorAll('.photo');
mediaGridItems.forEach((mediaItem, index) => {
  mediaItem.addEventListener('click', () => {
    currentImageIndex = index; // Définit l’image cliquée
    openCarousel(photographerPhotos[index], photographerPhotos); // Ouvre la lightbox
  });
});

// Affiche l’image précédente
function showPreviousMedia() {
  if (currentImageIndex > 0) {
    currentImageIndex--; // Recule dans la liste
    loadCurrentImage(); // Recharge l’image
  }
}

// Affiche l’image suivante
function showNextMedia() {
  if (currentImageIndex < photographerPhotos.length - 1) {
    currentImageIndex++; // Avance dans la liste
    loadCurrentImage(); // Recharge l’image
  }
}

// Gestion du clavier (flèches + Escape)
function handleKeyDown(event) {
  switch (event.key) {
    case 'ArrowLeft':
      showPreviousMedia(); // Image précédente
      break;

    case 'ArrowRight':
      showNextMedia(); // Image suivante
      break;

    case 'Escape':
      closeImageCarousel(); // Ferme la lightbox
      break;
  }
}