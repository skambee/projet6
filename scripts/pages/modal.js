// =========================
// RÉCUPÉRATION DES ÉLÉMENTS DOM
// =========================

// Modale de contact
const modal = document.getElementById('contact_modal');

// Bouton pour ouvrir la modale
const openModalBtn = document.querySelector('.contact_button');

// Bouton pour fermer la modale
const closeModalBtn = document.querySelector('.modal-close-btn');

// Overlay (fond sombre)
const overlay = document.querySelector('.overlay');


// =========================
// OUVERTURE / FERMETURE MODALE
// =========================

// Ouvre la modale
function displayModal() {
  modal.style.display = 'block'; // Affiche la modale
  modal.setAttribute('aria-hidden', 'false'); // Accessible aux lecteurs d’écran
  openModalBtn.setAttribute('aria-expanded', 'true'); // Indique que la modale est ouverte
  closeModalBtn.focus(); // Met le focus sur le bouton fermer
  document.body.style.overflow = 'hidden'; // Empêche le scroll de la page
  overlay.style.display = 'block'; // Affiche l’overlay
}

// Ferme la modale
function closeModal() {
  modal.style.display = 'none'; // Cache la modale
  modal.setAttribute('aria-hidden', 'true'); // Masque pour l’accessibilité
  openModalBtn.setAttribute('aria-expanded', 'false'); // Met à jour l’état du bouton
  openModalBtn.focus(); // Retour du focus sur le bouton d’ouverture
  document.body.style.overflow = 'auto'; // Réactive le scroll
  overlay.style.display = 'none'; // Cache l’overlay
}


// =========================
// ÉVÉNEMENTS MODALE
// =========================

// Ouvrir la modale au clic
openModalBtn.addEventListener('click', displayModal);

// Fermer la modale au clic
closeModalBtn.addEventListener('click', closeModal);

// Fermer la modale avec la touche Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal.getAttribute('aria-hidden') === 'false') {
    closeModal();
  }
});


// =========================
// FORMULAIRE
// =========================

const form = document.getElementById('contact-form');

// Empêche le rechargement et lance la validation
form.addEventListener('submit', (e) => {
  e.preventDefault(); // Empêche le rechargement de la page
  validate(e); // Lance la validation du formulaire
});


// =========================
// VALIDATION DES CHAMPS
// =========================

// Vérifie le prénom et le nom
function validateName(input) {
  const regex = /^[A-Za-zÀ-ÖØ-öø-ÿ]{2,}$/;

  if (!regex.test(input.value)) {
    input.classList.add("field-error"); // Ajoute un style d’erreur
    input.setAttribute('aria-invalid', 'true'); // Accessibilité : champ invalide
    return false;
  } else {
    input.classList.remove("field-error"); // Retire l’erreur
    input.setAttribute('aria-invalid', 'false'); // Champ valide
    return true;
  }
}

// Vérifie l’email
function validateEmail(input) {
  const emailRegex = /^[A-Za-z]{1,}[A-Za-z0-9._%+-]+@[A-Za-z.-]+\.[A-Za-z]{2,}$/;

  if (!emailRegex.test(input.value)) {
    input.classList.add("field-error");
    input.setAttribute('aria-invalid', 'true');
    return false;
  } else {
    input.classList.remove("field-error");
    input.setAttribute('aria-invalid', 'false');
    return true;
  }
}

// Vérifie le message
function validateMessage(input) {
  if (input.value === "") {
    input.classList.add("field-error");
    input.setAttribute('aria-invalid', 'true');
    return false;
  } else {
    input.classList.remove("field-error");
    input.setAttribute('aria-invalid', 'false');
    return true;
  }
}


// =========================
// CHAMPS DU FORMULAIRE
// =========================

const firstNameInput = document.getElementById("first-name");
const lastNameInput = document.getElementById("last-name");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");


// Validation en temps réel (à chaque saisie)
firstNameInput.addEventListener("input", function() {
  validateName(firstNameInput);
});

lastNameInput.addEventListener("input", function() {
  validateName(lastNameInput);
});

emailInput.addEventListener("input", function() {
  validateEmail(emailInput);
});

messageInput.addEventListener("input", function() {
  validateMessage(messageInput);
});


// =========================
// VALIDATION GLOBALE DU FORMULAIRE
// =========================

function validate() {
  // Vérifie chaque champ
  const firstNameValid = validateName(firstNameInput);
  const lastNameValid = validateName(lastNameInput);
  const emailValid = validateEmail(emailInput);
  const messageValid = validateMessage(messageInput);

  // Vérifie si tout est valide
  const isValid =
    firstNameValid &&
    lastNameValid &&
    emailValid &&
    messageValid;

  // Si tout est valide
  if (isValid) {
    console.log(
      "First name: " + firstNameInput.value + "\n" +
      "Last name: " + lastNameInput.value + "\n" +
      "Email: " + emailInput.value + "\n" +
      "Message: " + messageInput.value
    );

    closeModal(); // Ferme la modale
    return true;
  } else {
    return false; // Empêche l’envoi
  }
}