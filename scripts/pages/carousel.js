// carousel.js
import { createMedia } from './media.js';
import { photographerPhotos } from './data.js';

// Global DOM variables
const imageCarousel = document.getElementById('image-carousel');
const overlay = document.querySelector('.overlay');
const closeCarouselButton = document.querySelector('.carousel-close');
const prevButton = document.querySelector('.carousel-prev');
const nextButton = document.querySelector('.carousel-next');
const carouselContent = document.querySelector('.carousel-content');

let currentImageIndex = 0;

// Function to open the image carousel with media data
export function openCarousel(mediaData) {
  imageCarousel.style.display = 'block';
  // Accessibilité : annonce l’ouverture de la lightbox aux technologies d’assistance.
  imageCarousel.setAttribute('aria-hidden', 'false');
  overlay.style.display = 'block';
  currentImageIndex = photographerPhotos.findIndex(item => item.id === mediaData.id);
  loadCurrentImage();
  // Accessibilité : place le focus dans la lightbox dès son ouverture.
  closeCarouselButton.focus();
  document.addEventListener('keydown', handleKeyDown);
}


function closeImageCarousel() {
  imageCarousel.style.display = 'none';
  // Accessibilité : masque la lightbox aux lecteurs d’écran après fermeture.
  imageCarousel.setAttribute('aria-hidden', 'true');
  overlay.style.display = 'none';
  // Accessibilité : évite de garder les raccourcis clavier actifs après fermeture.
  document.removeEventListener('keydown', handleKeyDown);
}


function loadCurrentImage() {
  carouselContent.innerHTML = '';

  const media = createMedia(photographerPhotos[currentImageIndex]);
  const mediaElement = media.createMediaElement();
  mediaElement.classList.add('lightbox-media');
  carouselContent.appendChild(mediaElement);
  // Accessibilité : le titre du média devient un paragraphe lisible plutôt qu’un div neutre.
  const mediaTitle = document.createElement('p');
  mediaTitle.classList.add('media-title');
  mediaTitle.textContent = media.title;
  carouselContent.appendChild(mediaTitle);
}



// Handle previous button click
// Accessibilité : même logique utilisée au clic et au clavier pour le média précédent.
prevButton.addEventListener('click', showPreviousMedia);

// Handle next button click
// Accessibilité : même logique utilisée au clic et au clavier pour le média suivant.
nextButton.addEventListener('click', showNextMedia);

// Handle close button click
closeCarouselButton.addEventListener('click', closeImageCarousel);
overlay.addEventListener('click', closeImageCarousel);

// Add click event listeners to open the image carousel
const mediaGridItems = document.querySelectorAll('.photo');
mediaGridItems.forEach((mediaItem, index) => {
  mediaItem.addEventListener('click', () => {
    currentImageIndex = index;
    openCarousel(photographerPhotos[index], photographerPhotos); // Pass the media data and the photos array
  });
});


// Accessibilité : fonction réutilisable pour les boutons et les flèches clavier.
function showPreviousMedia() {
  if (currentImageIndex > 0) {
    currentImageIndex--;
    loadCurrentImage();
  }
}

// Accessibilité : fonction réutilisable pour les boutons et les flèches clavier.
function showNextMedia() {
  if (currentImageIndex < photographerPhotos.length - 1) {
    currentImageIndex++;
    loadCurrentImage();
  }
}

function handleKeyDown(event) {
  switch (event.key) {
    case 'ArrowLeft':
      showPreviousMedia();
      break;
    case 'ArrowRight':
      showNextMedia();
      break;
    case 'Escape':
      closeImageCarousel();
      break;
  }
}
