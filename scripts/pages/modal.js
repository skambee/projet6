// =========================
// Gestion de la fenêtre modale (contact)
// =========================


// Sélection des éléments HTML
const modal = document.getElementById('contact_modal'); // fenêtre modale
const openModalBtn = document.querySelector('.contact_button'); // bouton ouvrir
const closeModalBtn = document.querySelector('.modal-close-btn'); // bouton fermer
const overlay = document.querySelector('.overlay'); // fond sombre


// =========================
// Ouvrir la modale
// =========================
function displayModal() {

  modal.style.display = 'block'; // affiche la modale
  modal.setAttribute('aria-hidden', 'false'); // accessibilité : visible

  openModalBtn.setAttribute('aria-expanded', 'true'); // bouton actif

  closeModalBtn.focus(); // place le focus dans la modale

  document.body.style.overflow = 'hidden'; // bloque le scroll de la page

  overlay.style.display = 'block'; // affiche le fond sombre
}


// =========================
// Fermer la modale
// =========================
function closeModal() {

  modal.style.display = 'none'; // cache la modale
  modal.setAttribute('aria-hidden', 'true'); // accessibilité : cachée

  openModalBtn.setAttribute('aria-expanded', 'false'); // bouton inactif

  openModalBtn.focus(); // retourne le focus au bouton ouvrir

  document.body.style.overflow = 'auto'; // réactive le scroll

  overlay.style.display = 'none'; // cache le fond sombre
}


// =========================
// Événements ouverture / fermeture
// =========================
openModalBtn.addEventListener('click', displayModal);
closeModalBtn.addEventListener('click', closeModal);


// Fermer avec la touche Échap
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal.getAttribute('aria-hidden') === 'false') {
    closeModal();
  }
});


// =========================
// Formulaire
// =========================

// Récupération du formulaire
const form = document.getElementById('contact-form');


// Empêche le rechargement lors de l'envoi
form.addEventListener('submit', (e) => {
  e.preventDefault(); // stop recharge page
  validate(); // lance la validation
});


// =========================
// VALIDATION DES CHAMPS
// =========================


// Vérifie le prénom et nom (minimum 2 lettres)
function validateName(input) {

  const regex = /^[A-Za-zÀ-ÖØ-öø-ÿ]{2,}$/;

  if (!regex.test(input.value)) {

    input.classList.add("field-error"); // affiche erreur
    input.setAttribute('aria-invalid', 'true'); // accessibilité
    return false;

  } else {

    input.classList.remove("field-error"); // enlève erreur
    input.setAttribute('aria-invalid', 'false'); // champ valide
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


// Vérifie le message (ne doit pas être vide)
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
// Champs du formulaire
// =========================

const firstNameInput = document.getElementById("first-name");
const lastNameInput = document.getElementById("last-name");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");


// Validation en temps réel (quand on tape)
firstNameInput.addEventListener("input", () => validateName(firstNameInput));
lastNameInput.addEventListener("input", () => validateName(lastNameInput));
emailInput.addEventListener("input", () => validateEmail(emailInput));
messageInput.addEventListener("input", () => validateMessage(messageInput));


// =========================
// Validation globale du formulaire
// =========================
function validate() {

  // Vérifie tous les champs
  const firstNameValid = validateName(firstNameInput);
  const lastNameValid = validateName(lastNameInput);
  const emailValid = validateEmail(emailInput);
  const messageValid = validateMessage(messageInput);

  // Résultat final
  const isValid =
    firstNameValid &&
    lastNameValid &&
    emailValid &&
    messageValid;

  // Si tout est valide
  if (isValid) {

    // Affiche les données dans la console
    console.log(
      "First name: " + firstNameInput.value + "\n" +
      "Last name: " + lastNameInput.value + "\n" +
      "Email: " + emailInput.value + "\n" +
      "Message: " + messageInput.value
    );

    closeModal(); // ferme la modale
    return true;

  } else {

    return false; // erreur dans le formulaire
  }
}