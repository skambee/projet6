// photographer.js

export function createPhotographerCard(data) {
  const { name, portrait, city, country, tagline, price, altname, id } = data;
  const picture = `assets/photographers/${portrait}`;

  const img = createImage(picture, altname);
  const h2 = createHeading('h2', name);
  const h3 = createHeading('h3', `${city}, ${country}`);
  const tag = createParagraph(tagline);
  const prix = createParagraph(`${price}€/jour`);
  const imgcontainer = createCardContainer([img]);

  const content = [imgcontainer, h2, h3, tag, prix];
  const article = createArticleWithLink(id, content, name);

  return article;
}

export function createImage(src, alt) {
  const img = document.createElement('img');
  img.setAttribute('src', src);
  img.setAttribute('alt', alt);
  return img;
}

export function createHeading(headingType, text) {
  const heading = document.createElement(headingType);
  heading.textContent = text;
  return heading;
}

export function createParagraph(text) {
  const paragraph = document.createElement('p');
  paragraph.textContent = text;
  return paragraph;
}

export function createCardContainer(children) {
  const imgcontainer = document.createElement('div');
  imgcontainer.classList.add('photographer_card');
  imgcontainer.setAttribute('tabindex', '0');
  children.forEach((child) => {
    imgcontainer.appendChild(child);
  });
  return imgcontainer;
}

function createArticleWithLink(id, content, name) {
  const article = document.createElement('article');
  const link = createLinkWithHref(`photographer.html?id=${id}`);
  const ariaLabel = `View Photographer Profile: ${name}`;
  link.setAttribute('aria-label', ariaLabel);
  content.forEach((element) => {
    link.appendChild(element);
  });

  article.appendChild(link);
  return article;
}

function createLinkWithHref(href) {
  const link = document.createElement('a');
  link.setAttribute('href', href);
  return link;
}

export function createUserCardDOM(data) {
  return createPhotographerCard(data);
}
