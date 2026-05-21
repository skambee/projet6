// =========================
// Page photographe - création des cartes HTML
// =========================


// =========================
// Carte complète photographe
// =========================

// Crée une carte complète pour un photographe
export function createPhotographerCard(data) {

  const { name, portrait, city, country, tagline, price, altname, id } = data;

  const picture = `assets/photographers/${portrait}`;

  // Image du photographe
  const img = createImage(picture, altname);

  // Textes du photographe
  const h2 = createHeading('h2', name);
  const h3 = createHeading('h3', `${city}, ${country}`);
  const tag = createParagraph(tagline);
  const prix = createParagraph(`${price}€/jour`);

  // Conteneur image
  const imgcontainer = createCardContainer([img]);

  // Regroupe tout le contenu de la carte
  const content = [imgcontainer, h2, h3, tag, prix];

  // Crée une carte cliquable avec lien
  const article = createArticleWithLink(id, content, name);

  return article;
}


// =========================
// Création image
// =========================

export function createImage(src, alt) {

  const img = document.createElement('img');

  img.setAttribute('src', src); // chemin image
  img.setAttribute('alt', alt); // texte alternatif

  return img;
}


// =========================
// Création titre (h1, h2, h3...)
// =========================

export function createHeading(headingType, text) {

  const heading = document.createElement(headingType);
  heading.textContent = text;

  return heading;
}


// =========================
// Création paragraphe
// =========================

export function createParagraph(text) {

  const paragraph = document.createElement('p');
  paragraph.textContent = text;

  return paragraph;
}


// =========================
// Conteneur image
// =========================

export function createCardContainer(children) {

  const imgcontainer = document.createElement('div');

  imgcontainer.classList.add('photographer_card');

  // Ajoute les éléments dans le conteneur
  children.forEach(child => {
    imgcontainer.appendChild(child);
  });

  return imgcontainer;
}


// =========================
// Carte avec lien cliquable
// =========================

function createArticleWithLink(id, content, name) {

  const article = document.createElement('article');

  // Crée un lien vers la page photographe
  const link = createLinkWithHref(`photographer.html?id=${id}`);

  // Accessibilité : description du lien
  link.setAttribute('aria-label', `Voir le profil de ${name}`);

  // Ajoute tout le contenu dans le lien
  content.forEach(element => {
    link.appendChild(element);
  });

  article.appendChild(link);

  return article;
}


// =========================
// Création lien HTML
// =========================

function createLinkWithHref(href) {

  const link = document.createElement('a');

  link.setAttribute('href', href);

  return link;
}


// =========================
// Fonction principale utilisée ailleurs
// =========================

// Retourne simplement une carte photographe
export function createUserCardDOM(data) {
  return createPhotographerCard(data);
}