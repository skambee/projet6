// =========================
// Menu déroulant de tri
// =========================


// Import de la fonction de tri
import { sortPhotos } from "../pages/photographer.js";


// =========================
// Sélection des éléments HTML
// =========================

const dropdown = document.querySelector('.dropdown'); // menu global
const selected = dropdown.querySelector('.selected'); // option affichée
const options = dropdown.querySelector('.dropdown-menu'); // liste des choix
const dropdownIcon = dropdown.querySelector('.dropdown-icon'); // flèche
const sortOptions = Array.from(options.querySelectorAll('.dropdown-option')); // options


// Option sélectionnée par défaut
let selectedOption = 'filter-popularite';


// =========================
// Ouvrir / fermer le menu
// =========================

function toggleDropdown() {

  // Si le menu est ouvert → on le ferme
  if (options.style.display === 'block') {
    options.style.display = 'none';
  } else {
    // Sinon on l’ouvre
    options.style.display = 'block';
  }

  // Accessibilité : indique si le menu est ouvert
  dropdown.setAttribute(
    'aria-expanded',
    options.style.display === 'block' ? 'true' : 'false'
  );

  // Tourne la flèche selon l’état du menu
  dropdownIcon.style.transform =
    options.style.display === 'block' ? 'rotate(90deg)' : 'rotate(0)';
}


// =========================
// Sélection d’une option
// =========================

function selectOption(optionId) {

  // Garde l’ancienne option sélectionnée
  const previousOptionId = selectedOption;

  // Si on change d’option
  if (previousOptionId !== optionId) {

    // Retire l’ancienne option de la zone sélectionnée
    const previousOptionElement = document.getElementById(previousOptionId);
    selected.removeChild(previousOptionElement);

    // Remet l’ancienne option dans la liste
    options.appendChild(previousOptionElement);

    // Réorganise les options visuellement
    sortOptions
      .filter(option => option.id !== previousOptionId)
      .sort((a, b) => a.getAttribute('data-order') - b.getAttribute('data-order'))
      .forEach((option, index) => {
        option.style.order = index + 1;
      });
  }

  // Met à jour l’option sélectionnée
  selectedOption = optionId;

  // Ajoute la nouvelle option dans la zone sélectionnée
  const selectedOptionElement = document.getElementById(optionId);
  selected.appendChild(selectedOptionElement);

  // Accessibilité : annonce l’option choisie
  selected.setAttribute(
    'aria-label',
    `Option de tri sélectionnée : ${selected.textContent.trim()}`
  );

  // Accessibilité : met à jour les états des options
  sortOptions.forEach(option =>
    option.setAttribute(
      'aria-selected',
      option.id === optionId ? 'true' : 'false'
    )
  );

  // Ferme le menu
  options.style.display = 'none';

  // Remet la flèche droite
  dropdownIcon.style.transform = 'rotate(0)';

  // Lance le tri des photos
  sortPhotos(optionId.replace('filter-', ''));
}


// =========================
// Ouverture du menu (clic + clavier)
// =========================

// Clique sur l’option sélectionnée → ouvre/ferme menu
selected.addEventListener('click', toggleDropdown);

// Clavier (Entrée / Espace)
selected.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    toggleDropdown();
  }
});


// =========================
// Sélection des options
// =========================

sortOptions.forEach(option => {

  // clic souris
  option.addEventListener('click', (e) => {
    selectOption(e.target.id);
  });

  // clavier
  option.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      selectOption(e.target.id);
    }
  });
});


// =========================
// Initialisation
// =========================

// Définit l’option par défaut au chargement
selectOption(selectedOption);