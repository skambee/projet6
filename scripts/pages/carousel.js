// Gestion du carrousel d'images et de vidéos.
// Ce fichier permet d'ouvrir une lightbox, naviguer entre les médias et la fermer.

// Import de la fonction qui crée un média (image ou vidéo)
import { createMedia } from './media.js';

// Import du tableau contenant toutes les photos
import { photographerPhotos } from './data.js';


// =========================
// Sélection des éléments HTML
// =========================

// Conteneur principal du carrousel
const imageCarousel = document.getElementById('image-carousel');

// Fond sombre derrière la fenêtre (overlay)
const overlay = document.querySelector('.overlay');

// Bouton pour fermer le carrousel
const closeCarouselButton = document.querySelector('.carousel-close');

// Bouton image précédente
const prevButton = document.querySelector('.carousel-prev');

// Bouton image suivante
const nextButton = document.querySelector('.carousel-next');

// Zone où s’affiche l’image
const carouselContent = document.querySelector('.carousel-content');


// Index de l’image affichée (position dans le tableau)
let currentImageIndex = 0;


// =========================
// Ouvrir le carrousel
// =========================
export function openCarousel(mediaData) {

  // Affiche le carrousel
  imageCarousel.style.display = 'block';

  // Affiche le fond sombre
  overlay.style.display = 'block';

  // Trouve l’index de l’image cliquée
  currentImageIndex = photographerPhotos.findIndex(
    item => item.id === mediaData.id
  );

  // Affiche l’image actuelle
  loadCurrentImage();

  // Met le focus sur le bouton fermer
  closeCarouselButton.focus();

  // Active le clavier (flèches + Escape)
  document.addEventListener('keydown', handleKeyDown);
}


// =========================
// Fermer le carrousel
// =========================
function closeImageCarousel() {

  // Cache le carrousel
  imageCarousel.style.display = 'none';

  // Cache le fond sombre
  overlay.style.display = 'none';

  // Désactive les touches clavier
  document.removeEventListener('keydown', handleKeyDown);
}


// =========================
// Charger l’image actuelle
// =========================
function loadCurrentImage() {

  // Vide l’ancien contenu
  carouselContent.innerHTML = '';

  // Crée le média actuel (image ou vidéo)
  const media = createMedia(photographerPhotos[currentImageIndex]);

  // Crée l’élément HTML du média
  const mediaElement = media.createMediaElement();

  // Ajoute le média dans la page
  carouselContent.appendChild(mediaElement);

  // Crée le titre du média
  const mediaTitle = document.createElement('p');

  // Met le texte du titre
  mediaTitle.textContent = media.title;

  // Ajoute le titre dans le carrousel
  carouselContent.appendChild(mediaTitle);
}


// =========================
// Bouton précédent
// =========================
function showPreviousMedia() {

  // Vérifie qu’on n’est pas au début
  if (currentImageIndex > 0) {

    // Recule d’une image
    currentImageIndex--;

    // Recharge l’affichage
    loadCurrentImage();
  }
}


// =========================
// Bouton suivant
// =========================
function showNextMedia() {

  // Vérifie qu’on n’est pas à la fin
  if (currentImageIndex < photographerPhotos.length - 1) {

    // Avance d’une image
    currentImageIndex++;

    // Recharge l’affichage
    loadCurrentImage();
  }
}


// =========================
// Boutons (clics)
// =========================

// Image précédente
prevButton.addEventListener('click', showPreviousMedia);

// Image suivante
nextButton.addEventListener('click', showNextMedia);

// Fermer le carrousel
closeCarouselButton.addEventListener('click', closeImageCarousel);

// Cliquer sur le fond sombre ferme aussi
overlay.addEventListener('click', closeImageCarousel);


// =========================
// Ouvrir le carrousel depuis la galerie
// =========================

// Sélection de toutes les images de la galerie
document.querySelectorAll('.photo').forEach((item, index) => {

  // Au clic sur une image
  item.addEventListener('click', () => {

    // Définit l’image cliquée
    currentImageIndex = index;

    // Ouvre le carrousel
    openCarousel(photographerPhotos[index]);
  });
});


// =========================
// Gestion du clavier
// =========================
function handleKeyDown(event) {

  // Flèche gauche → image précédente
  if (event.key === 'ArrowLeft') {
    showPreviousMedia();
  }

  // Flèche droite → image suivante
  if (event.key === 'ArrowRight') {
    showNextMedia();
  }

  // Échap → fermer le carrousel
  if (event.key === 'Escape') {
    closeImageCarousel();
  }
}