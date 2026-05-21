import { sortPhotos } from "../pages/photographer.js";

const dropdown = document.querySelector('.dropdown');
const selected = dropdown.querySelector('.selected');
const options = dropdown.querySelector('.dropdown-menu');
const dropdownIcon = dropdown.querySelector('.dropdown-icon');
const sortOptions = Array.from(options.querySelectorAll('.dropdown-option'));

// Initialize the selected option as "Popularité"
let selectedOption = 'filter-popularite';

// Function to toggle the dropdown
function toggleDropdown() {
  if (options.style.display === 'block') {
    options.style.display = 'none';
  } else {
    options.style.display = 'block';
  }
  // Accessibilité : aria-expanded doit être porté par le combobox, pas par l’élément visuel sélectionné.
  dropdown.setAttribute('aria-expanded', options.style.display === 'block' ? 'true' : 'false');
  dropdownIcon.style.transform = options.style.display === 'block' ? 'rotate(90deg)' : 'rotate(0)';
}



// Function to handle selecting an option
function selectOption(optionId) {
  // Get the previously selected option
  const previousOptionId = selectedOption;
  // Remove the previously selected option from the selected div
  if (previousOptionId !== optionId) {
    const previousOptionElement = document.getElementById(previousOptionId);
    selected.removeChild(previousOptionElement);

    // Reorder the items to reflect the new selection
    options.appendChild(previousOptionElement);
    sortOptions.filter(option => option.id !== previousOptionId).sort((a, b) => a.getAttribute('data-order') - b.getAttribute('data-order')).forEach((option, index) => {
      option.style.order = index + 1;
      
    });
  }

  // Set the new selected option
  selectedOption = optionId;
  const selectedOptionElement = document.getElementById(optionId);
  selected.appendChild(selectedOptionElement);
  // Accessibilité : annonce clairement l’option de tri actuellement sélectionnée.
  selected.setAttribute('aria-label', `Option de tri sélectionnée : ${selected.textContent.trim()}`);
  // Accessibilité : met à jour aria-selected sur les options du listbox.
  sortOptions.forEach(option => option.setAttribute('aria-selected', option.id === optionId ? 'true' : 'false'));
  options.style.display = 'none';
  dropdownIcon.style.transform = 'rotate(0)';
  
  // Correction liée au dropdown : envoie seulement la valeur attendue par le tri.
  sortPhotos(optionId.replace('filter-', ''));
}

// Add click event listeners to open/close the dropdown
selected.addEventListener('click', () => toggleDropdown());
selected.addEventListener('keydown', (e) => {
  // Accessibilité : ouverture du dropdown avec Entrée et Espace.
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    toggleDropdown();
  }
});

sortOptions.forEach((option) => {
  option.addEventListener('click', (e) => {
    selectOption(e.target.id);
  });

  option.addEventListener('keydown', (e) => {
    // Accessibilité : sélection possible avec Entrée et Espace.
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      selectOption(e.target.id);
    }
  });
});

// Set the initial selected option
selectOption(selectedOption);
