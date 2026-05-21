// photographer.js

// Création d'une carte photographe complète
export function createPhotographerCard(data) {

  // Déstructuration des données du photographe
  const { name, portrait, city, country, tagline, price, altname, id } = data;

  // Chemin de l'image du photographe
  const picture = `assets/photographers/${portrait}`;

  // Création des éléments HTML
  const img = createImage(picture, altname); // image
  const h2 = createHeading('h2', name); // nom
  const h3 = createHeading('h3', `${city}, ${country}`); // localisation
  const tag = createParagraph(tagline); // slogan
  const prix = createParagraph(`${price}€/jour`); // prix

  // Conteneur pour l'image
  const imgcontainer = createCardContainer([img]);

  // Regroupement de tous les éléments de la carte
  const content = [imgcontainer, h2, h3, tag, prix];

  // Création de la carte cliquable (article + lien)
  const article = createArticleWithLink(id, content, name);

  return article;
}


// Création d'une image HTML
export function createImage(src, alt) {
  const img = document.createElement('img');
  img.setAttribute('src', src);
  img.setAttribute('alt', alt); // accessibilité (description image)
  return img;
}


// Création d'un titre (h1, h2, h3...)
export function createHeading(headingType, text) {
  const heading = document.createElement(headingType);
  heading.textContent = text;
  return heading;
}


// Création d'un paragraphe
export function createParagraph(text) {
  const paragraph = document.createElement('p');
  paragraph.textContent = text;
  return paragraph;
}


// Création du conteneur de carte photographe (image wrapper)
export function createCardContainer(children) {
  const imgcontainer = document.createElement('div');
  imgcontainer.classList.add('photographer_card');

  // Ajoute tous les enfants dans le conteneur
  children.forEach((child) => {
    imgcontainer.appendChild(child);
  });

  return imgcontainer;
}


// Création de la carte cliquable avec lien vers le profil
function createArticleWithLink(id, content, name) {

  const article = document.createElement('article');

  // Création du lien vers la page photographe
  const link = createLinkWithHref(`photographer.html?id=${id}`);

  // Accessibilité : description du lien pour lecteurs d’écran
  const ariaLabel = `Voir le profil de ${name}`;
  link.setAttribute('aria-label', ariaLabel);

  // Ajout de tous les éléments dans le lien
  content.forEach((element) => {
    link.appendChild(element);
  });

  // Ajout du lien dans l'article
  article.appendChild(link);

  return article;
}


// Création d'un lien HTML
function createLinkWithHref(href) {
  const link = document.createElement('a');
  link.setAttribute('href', href);
  return link;
}


// Alias (fonction utilisée ailleurs dans le projet)
export function createUserCardDOM(data) {
  return createPhotographerCard(data);
}