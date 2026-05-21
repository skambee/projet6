import { calculateTotalLikes, updateTotalLikes } from './likes.js';
 import { createMedia } from './media.js';
import { createImage, createCardContainer, createHeading, createParagraph } from '../templates/photographer.js';
import { photographerPhotos } from './data.js';
import { openCarousel } from './carousel.js'; 
import { fetchPhotographerData } from './photographerData.js';


const urlSearchParams = new URLSearchParams(window.location.search);
const photographerId = urlSearchParams.get('id');
const likedMedia = new Set();

if (photographerId) {
  initPhotographerProfile(photographerId);
} else {
  console.error('Photographer ID is missing or invalid.');
}

async function initPhotographerProfile(id) {
  try {
    const data = await fetchPhotographerData(id);
    createPhotographerProfile(data);
  } catch (error) {
    console.error('Error initializing photographer profile:', error);
  }
}



function createPhotographerProfile(data) {
  const { name, city, country, tagline, price, portrait, altname } = data;
  const picture = `assets/photographers/${portrait}`;

  const img = createImage(picture, altname);
  const photographHeader = document.querySelector('.photograph-header');
  const imgcontainer = createCardContainer([img]);
  // Accessibilité : évite que la photo décorative du header soit relue inutilement.
  imgcontainer.setAttribute('aria-hidden', 'true');
  photographHeader.appendChild(imgcontainer);

  const h2 = createHeading('h2', name);
  const h3 = createHeading('h3', `${city}, ${country}`);
  const tag = createParagraph(tagline);
  photographHeader.append(h2, h3, tag);
  const modalTitle = document.getElementById('contact-modal-title');
  // Accessibilité : titre de modale personnalisé et relié via aria-labelledby.
  modalTitle.textContent = `Contactez-moi ${name}`;
  const priceContainer = document.createElement('p');
  priceContainer.classList.add('price');
  priceContainer.textContent = price + '€ / jour';
  const parentContainer = document.querySelector('.price-and-likes');
  parentContainer.appendChild(priceContainer);

  const heart = createHeartIcon();
  const path = heart.querySelector('path');
  path.setAttribute('fill', 'black');
  parentContainer.appendChild(heart);
}

function createVideoElement(src, alt) {
  const video = document.createElement('video');
  video.src = src;
  video.type = 'video/mp4';
  // Accessibilité : une vidéo n’a pas d’attribut alt, on utilise aria-label.
  video.setAttribute('aria-label', alt);
  video.controls = true;
  return video;
}

export function createAndRenderMedia(photos) {
  if (!photos) {
    console.error('No media data available for this photographer.');
    return;
  }

  const photoGrid = document.querySelector('.photo-grid');
  photoGrid.innerHTML = '';

  photos.forEach(mediaData => {
    const media = createMedia(mediaData);

    const mediaCard = document.createElement('div');
    mediaCard.classList.add('photo');
  

    if (media.type === 'image') {
      // Create the image element
      const image = document.createElement('img');
      image.src = media.url;
      image.alt = media.title;
      mediaCard.appendChild(image);
      image.setAttribute('tabindex', '0');
      // Accessibilité : l’image ouvrant la lightbox est annoncée comme actionnable.
      image.setAttribute('role', 'button');
      image.setAttribute('aria-label', `Ouvrir ${media.title} dans la visionneuse`);
      image.addEventListener('click', () => openCarousel(mediaData));
      image.addEventListener('keydown', (event) => {
        // Accessibilité : ouverture possible avec Entrée et Espace.
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          openCarousel(mediaData);
        }
      });
    } else if (media.type === 'video') {
      // Create the video element
      const video = createVideoElement(media.url, media.title);
      mediaCard.appendChild(video);
    }


    const photoInfo = document.createElement('div');
    photoInfo.classList.add('photo-info');
    mediaCard.appendChild(photoInfo);
    const title = document.createElement('h3');
    title.textContent = `${media.title}`;
    photoInfo.appendChild(title);
    const likesContainer = document.createElement('div');
    likesContainer.classList.add('likes-container');
    const likes = document.createElement('p');
    likes.textContent = `${media.likes}`;
    likes.classList.add('photo-likes');

    likesContainer.appendChild(likes);
    photoInfo.appendChild(likesContainer);
    const heart = createHeartIcon();
    likesContainer.appendChild(heart);

    // Event listener for clicking the heart icon
    // Accessibilité : rend le bouton like atteignable au clavier.
    heart.setAttribute('tabindex', '0');
    heart.setAttribute('role', 'button');
    heart.setAttribute('aria-label', `Ajouter un like à ${media.title}`);
    heart.addEventListener('click', () => likeMedia(media.id, mediaCard, likes, heart));
    heart.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        likeMedia(media.id, mediaCard, likes, heart);
      }
    });
    // Render the media card
    photoGrid.appendChild(mediaCard);
  });
}

function likeMedia(mediaId, mediaCard, likesElement, heart) {
  if (!likedMedia.has(mediaId)) {
    // Media hasn't been liked yet
    const media = photographerPhotos.find(media => media.id === mediaId);
    if (media) {
      media.likes += 1;
      likedMedia.add(mediaId);
      likesElement.textContent = `${media.likes}`;
      heart.classList.add('liked');
      // Accessibilité : annonce que le like a bien été ajouté.
      heart.setAttribute('aria-label', `Like ajouté à ${media.title}`); 
      updateTotalLikes();
    }
  }
}


function createHeartIcon() {
  const heart = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  heart.setAttribute('width', '21');
  heart.setAttribute('height', '24');
  heart.setAttribute('viewBox', '0 0 21 24');
  heart.setAttribute('fill', 'none');
  // Accessibilité : autorise le focus du SVG dans les navigateurs qui le nécessitent.
  heart.setAttribute('focusable', 'true');
  const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
  g.setAttribute('clip-path', 'url(#clip0_120_561)');
  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute('d', 'M10.5 21.35L9.23125 20.03C4.725 15.36 1.75 12.28 1.75 8.5C1.75 5.42 3.8675 3 6.5625 3C8.085 3 9.54625 3.81 10.5 5.09C11.4537 3.81 12.915 3 14.4375 3C17.1325 3 19.25 5.42 19.25 8.5C19.25 12.28 16.275 15.36 11.7688 20.04L10.5 21.35Z');
  path.setAttribute('fill', '#911C1C');
  g.appendChild(path);
  heart.appendChild(g);

  return heart;
}


// Sorting functions
function sortByPopularity(photos) {
  return photos.sort((a, b) => b.likes - a.likes);
}

function sortByDate(photos) {
  return photos.sort((a, b) => new Date(a.date) - new Date(b.date));
}

function sortByTitle(photos) {
  return photos.sort((a, b) => a.title.localeCompare(b.title));
}

// Sort photos
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
    default:
      break;
  }

  createAndRenderMedia(sortedPhotos);
}


document.getElementById('filter-date').addEventListener('click', () => sortPhotos('date'));
document.getElementById('filter-date').addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    sortPhotos('date');
  }
});

document.getElementById('filter-titre').addEventListener('click', () => sortPhotos('titre'));
document.getElementById('filter-titre').addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    sortPhotos('titre');
  }
});

document.getElementById('filter-popularite').addEventListener('click', () => sortPhotos('popularite'));
document.getElementById('filter-popularite').addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    sortPhotos('popularite');
  }
});


document.addEventListener('DOMContentLoaded', async () => {

  const observer = new MutationObserver(updateTotalLikes);
  const targetNode = document.querySelector('.photo-grid');
  const config = { childList: true, subtree: true };
  observer.observe(targetNode, config);

  updateTotalLikes();
});

