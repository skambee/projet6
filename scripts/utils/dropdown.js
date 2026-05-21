// Import de la fonction de tri des photos
import { sortPhotos } from "../pages/photographer.js";


// Récupération des éléments du dropdown dans le DOM
const dropdown = document.querySelector('.dropdown');
const selected = dropdown.querySelector('.selected');
const options = dropdown.querySelector('.dropdown-menu');
const dropdownIcon = dropdown.querySelector('.dropdown-icon');

// Liste des options de tri
const sortOptions = Array.from(options.querySelectorAll('.dropdown-option'));


// Option sélectionnée par défaut (popularité)
let selectedOption = 'filter-popularite';


// Ouvrir / fermer le dropdown
function toggleDropdown() {

  // Si le menu est ouvert → on le ferme, sinon on l’ouvre
  if (options.style.display === 'block') {
    options.style.display = 'none';
  } else {
    options.style.display = 'block';
  }

  // Accessibilité : indique si le menu est ouvert ou fermé
  dropdown.setAttribute(
    'aria-expanded',
    options.style.display === 'block' ? 'true' : 'false'
  );

  // Rotation de l’icône
  dropdownIcon.style.transform =
    options.style.display === 'block' ? 'rotate(90deg)' : 'rotate(0)';
}


// Gestion du changement d’option de tri
function selectOption(optionId) {

  // Récupère l’ancienne option sélectionnée
  const previousOptionId = selectedOption;

  // Si l’utilisateur change réellement d’option
  if (previousOptionId !== optionId) {

    const previousOptionElement = document.getElementById(previousOptionId);

    // Retire l’ancienne option du bloc "selected"
    selected.removeChild(previousOptionElement);

    // Remet l’ancienne option dans la liste déroulante
    options.appendChild(previousOptionElement);

    // Réorganise les options selon leur ordre initial
    sortOptions
      .filter(option => option.id !== previousOptionId)
      .sort((a, b) => a.getAttribute('data-order') - b.getAttribute('data-order'))
      .forEach((option, index) => {
        option.style.order = index + 1;
      });
  }

  // Mise à jour de la nouvelle option sélectionnée
  selectedOption = optionId;

  const selectedOptionElement = document.getElementById(optionId);

  // Affiche l’option choisie dans la zone sélectionnée
  selected.appendChild(selectedOptionElement);

  // Accessibilité : annonce l’option choisie
  selected.setAttribute(
    'aria-label',
    `Option de tri sélectionnée : ${selected.textContent.trim()}`
  );

  // Accessibilité : met à jour aria-selected pour chaque option
  sortOptions.forEach(option =>
    option.setAttribute(
      'aria-selected',
      option.id === optionId ? 'true' : 'false'
    )
  );

  // Ferme le dropdown après sélection
  options.style.display = 'none';

  // Reset icône
  dropdownIcon.style.transform = 'rotate(0)';

  // Lance le tri des photos
  sortPhotos(optionId.replace('filter-', ''));
}


// Ouvrir / fermer au clic sur la zone sélectionnée
selected.addEventListener('click', () => toggleDropdown());


// Ouvrir / fermer avec clavier (accessibilité)
selected.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    toggleDropdown();
  }
});


// Gestion des options du menu
sortOptions.forEach((option) => {

  // Sélection au clic
  option.addEventListener('click', (e) => {
    selectOption(e.target.id);
  });

  // Sélection au clavier
  option.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      selectOption(e.target.id);
    }
  });
});


// Initialisation : sélection de l’option par défaut
selectOption(selectedOption);