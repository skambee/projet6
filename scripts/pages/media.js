class ImageMedia {
  constructor(data) {
    this.id = data.id;
    this.photographerId = data.photographerId;
    this.title = data.title;
    this.likes = data.likes;
    this.date = data.date;
    this.price = data.price;
    this.type = 'image';
    this.url = `assets/images/${data.photographerId}/${data.image}`;
  }

  createMediaElement() {
    const mediaElement = document.createElement('img');
    mediaElement.src = this.url;
    mediaElement.alt = this.title;
    return mediaElement;
  }
}

class VideoMedia {
  constructor(data) {
    this.id = data.id;
    this.photographerId = data.photographerId;
    this.title = data.title;
    this.likes = data.likes;
    this.date = data.date;
    this.price = data.price;
    this.type = 'video';
    this.url = `assets/images/${data.photographerId}/${data.video}`;
  }

  createMediaElement() {
    const mediaElement = document.createElement('video');
    mediaElement.setAttribute('controls', ''); // Add video controls
    const sourceElement = document.createElement('source');
    sourceElement.src = this.url;
    sourceElement.type = 'video/mp4';
    mediaElement.appendChild(sourceElement);
    return mediaElement;
  }
}

export function createMedia(data) {
  if (data.image) {
    return new ImageMedia(data);
  } else if (data.video) {
    return new VideoMedia(data);
  } else {
    throw new Error('Invalid media data: Neither image nor video specified.');
  }
}
