const form = document.getElementById("contactForm");

// CLEAR ERRORS ON INPUT

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");

nameInput.addEventListener("input", () => {
  const nameElement = document.getElementById("name-error");

  nameInput.classList.remove("input-error");
  nameInput.removeAttribute("aria-invalid");
  nameElement.textContent = "";
});

emailInput.addEventListener("input", () => {
  const emailElement = document.getElementById("email-error");

  emailInput.classList.remove("input-error");
  emailInput.removeAttribute("aria-invalid");
  emailElement.textContent = "";
});

messageInput.addEventListener("input", () => {
  const messageElement = document.getElementById("message-error");

  messageInput.classList.remove("input-error");
  messageInput.removeAttribute("aria-invalid");
  messageElement.textContent = "";
});

// VALIDATORS

function validateName(value) {
  if (!value.trim()) return "This field is required";
  if (/[\d!@#$%^&*()_=+{}[\]<>?/\\|]/.test(value))
    return "Please enter a valid name";
  return "";
}

function validateEmail(value) {
  if (!value.trim()) return "This field is required";

  const pattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

  if (/\.\./.test(value)) {
    return "Please enter a valid email address";
  }

  const domain = value.split("@")[1];

  if (/^-|-$/.test(domain)) {
    return "Please enter a valid email address";
  }

  if (!pattern.test(value)) {
    return "Please enter a valid email address";
  }

  return "";
}

function validateMessage(value) {
  if (!value.trim()) return "This field is required";
  return "";
}

const validators = {
  name: validateName,
  email: validateEmail,
  message: validateMessage,
};

// TOAST

let toastTimeout;

function showToast() {
  const toast = document.getElementById("toast");
  const overlay = document.getElementById("toast-overlay");

  if (toastTimeout) {
    clearTimeout(toastTimeout);
    toast.classList.remove("visible");
    toast.setAttribute("aria-hidden", "true");
    document.body.classList.remove("no-scroll");
    overlay.classList.remove("visible");
  }

  toast.removeAttribute("aria-hidden");
  toast.classList.add("visible");
  document.body.classList.add("no-scroll");
  overlay.classList.add("visible");

  toastTimeout = setTimeout(() => {
    toast.setAttribute("aria-hidden", "true");
    toast.classList.remove("visible");
    document.body.classList.remove("no-scroll");
    overlay.classList.remove("visible");
    toastTimeout = null;
  }, 4000);
}

// SUBMISSION HANDLING
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());

  let isValid = true;

  for (const [field, validator] of Object.entries(validators)) {
    const errorMessage = validator(data[field]);
    const errorSpan = document.getElementById(`${field}-error`);
    const inputError = document.getElementById(field);

    if (errorMessage) {
      isValid = false;
      errorSpan.textContent = errorMessage;
      inputError.setAttribute("aria-invalid", "true");
      inputError.classList.add("input-error");
    } else {
      errorSpan.textContent = "";
    }
  }

  if (isValid) {
    form.reset();
    showToast();
  }
});
