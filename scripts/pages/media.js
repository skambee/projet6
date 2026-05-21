// ==============================
// CLASSE POUR LES IMAGES
// ==============================

class ImageMedia {

  // Constructeur : initialise les propriétés de l'image
  constructor(data) {
    this.id = data.id; // ID du média
    this.photographerId = data.photographerId; // ID du photographe
    this.title = data.title; // Titre
    this.likes = data.likes; // Nombre de likes
    this.date = data.date; // Date
    this.price = data.price; // Prix
    this.type = 'image'; // Type (image)
    
    // Construction de l'URL de l'image
    this.url = `assets/images/${data.photographerId}/${data.image}`;
  }

  // Méthode pour créer l'élément HTML <img>
  createMediaElement() {
    const mediaElement = document.createElement('img');
    mediaElement.src = this.url; // Source de l'image
    mediaElement.alt = this.title; // Texte alternatif (accessibilité)
    return mediaElement;
  }
}


// ==============================
// CLASSE POUR LES VIDÉOS
// ==============================

class VideoMedia {

  // Constructeur : initialise les propriétés de la vidéo
  constructor(data) {
    this.id = data.id;
    this.photographerId = data.photographerId;
    this.title = data.title;
    this.likes = data.likes;
    this.date = data.date;
    this.price = data.price;
    this.type = 'video'; // Type (vidéo)

    // Construction de l'URL de la vidéo
    this.url = `assets/images/${data.photographerId}/${data.video}`;
  }

  // Méthode pour créer l'élément HTML <video>
  createMediaElement() {
    const mediaElement = document.createElement('video');

    // Ajoute les contrôles (play, pause, etc.)
    mediaElement.setAttribute('controls', '');

    // Création de la source vidéo
    const sourceElement = document.createElement('source');
    sourceElement.src = this.url;
    sourceElement.type = 'video/mp4';

    // Ajoute la source dans la balise <video>
    mediaElement.appendChild(sourceElement);

    return mediaElement;
  }
}


// ==============================
// FACTORY FUNCTION
// ==============================

// Fonction qui crée le bon type de média (image ou vidéo)
export function createMedia(data) {

  // Si le média contient une image
  if (data.image) {
    return new ImageMedia(data);

  // Si le média contient une vidéo
  } else if (data.video) {
    return new VideoMedia(data);

  // Si aucun type valide
  } else {
    throw new Error('Invalid media data: Neither image nor video specified.');
  }
}