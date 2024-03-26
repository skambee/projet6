// Global DOM variables
const modal = document.getElementById('contact_modal');
const openModalBtn = document.querySelector('.contact_button');
const closeModalBtn = document.querySelector('.modal-close-btn');
const dialog = document.querySelector('.modal-dialog');
const content = document.querySelector('.modal-content');
const overlay = document.querySelector('.overlay');


// Function to open the modal
function displayModal() {
  modal.style.display = 'block';
  modal.setAttribute('aria-hidden', 'false');
  openModalBtn.setAttribute('aria-expanded', 'true');
  closeModalBtn.focus();
  document.body.style.overflow = 'hidden';
  overlay.style.display = 'block';
}

// Function to close the modal
function closeModal() {
  modal.style.display = 'none';
  modal.setAttribute('aria-hidden', 'true');
  openModalBtn.setAttribute('aria-expanded', 'false');
  openModalBtn.focus();
  document.body.style.overflow = 'auto';
  overlay.style.display = 'none';
}

// Event listeners
openModalBtn.addEventListener('click', displayModal);
closeModalBtn.addEventListener('click', closeModal);

// Close modal when the Escape key is pressed
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal.getAttribute('aria-hidden') === 'false') {
    closeModal();
  }
});


const form = document.getElementById('contact-form');


form.addEventListener('submit', (e) => {
  event.preventDefault(); 
   validate();
  });


  // FORM VALIDATION 

function validateName(input) {
  const regex = /^[A-Za-zÀ-ÖØ-öø-ÿ]{2,}$/;
  if (!regex.test(input.value)) {
    input.classList.add("field-error");
    return false;
  } else {
    input.classList.remove("field-error");
    return true;
  }
}

function validateEmail(input) {
  const emailRegex = /^[A-Za-z]{1,}[A-Za-z0-9._%+-]+@[A-Za-z.-]+\.[A-Za-z]{2,}$/;
  if (!emailRegex.test(input.value)) {
    input.classList.add("field-error");
    return false;
  } else {
    input.classList.remove("field-error");
    return true;
  }
}


function validateMessage(input) {
  if (input.value === "") {
    input.classList.add("field-error");
    return false;
  } else {
    input.classList.remove("field-error");
    return true;
  }
}

// FORM VALIDATION PROCESS

const firstNameInput = document.getElementById("first-name");
const lastNameInput = document.getElementById("last-name");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");

//EVENTS LISTENERS ON CHANGE
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


  function validate() {
    const firstNameValid = validateName(firstNameInput);
    const lastNameValid = validateName(lastNameInput);
    const emailValid = validateEmail(emailInput);
    const messageValid = validateMessage(messageInput);

  
    const isValid =
      firstNameValid &&
      lastNameValid &&
      emailValid &&
      messageValid;

    if (isValid) {
   console.log(
        "First name: " + firstNameInput.value + "\n" +
        "Last name: " + lastNameInput.value + "\n" +
        "Email: " + emailInput.value + "\n" +
        "Message: " + messageInput.value
      );      
      event.preventDefault();
      closeModal();
      return true;
    } else {
      return false;
    }
  }