// NODOS

const menuButton = document.getElementById("menu-button");
const menu = document.getElementById("modal");
const inputContainer = document.getElementById("input-container");
const form = document.getElementById("form");
const urlInput = document.getElementById("input-url");
const urLCardContainer = document.getElementById("url-card__container");

// EVENTO MENU MOBILE
menuButton.addEventListener("click", openMenu);

// CERRAR MENU DANDO CLICK FUERA DEL MENU
window.addEventListener("click", function (event) {
  if (event.target == menu) {
    menu.style.display = "none";
  }
});

// DESPLEGAR MENU
function openMenu() {
  if (menu.classList.contains("no-active")) {
    menu.classList.remove("no-active");
    menu.classList.add("active");
  } else {
    menu.classList.remove("active");
    menu.classList.add("no-active");
  }
}

// API
const API = "https://api.shrtco.de/v2/shorten?url=";

// EVENTO PARA REALIZAR LA PETICION O DESPLEGAR ERROR
form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!urlInput.value) {
    urlInput.classList.add("input-error");
    errorMessage("Please add a link");
  } else {
    const textError = document.getElementById("error-message");
    if (textError != null) {
      inputContainer.removeChild(textError);
    }
    urlInput.classList.remove("input-error");

    shortenUrl(urlInput.value)
      .then((data) => {
        if (!data.ok) {
          errorMessage(data.error);
        } else {
          createCopyCard(urlInput.value, data.result.short_link);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
});

// PETICION API
const shortenUrl = async (url) => {
  try {
    const response = await fetch(`${API}${url}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

// CREAR CARD
const createCopyCard = (originalUrl, shortedUrl) => {
  urlInput.classList.remove("error");

  const firstChild = urLCardContainer.firstChild;

  const cardContainer = document.createElement("div");
  const divFinaleUrl = document.createElement("div");
  const initialUrl = document.createElement("p");
  const finaleUrl = document.createElement("p");
  const copyButton = document.createElement("button");
  const line = document.createElement("hr");

  cardContainer.classList.add("card__url");
  divFinaleUrl.classList.add("card__url-short");
  copyButton.classList.add("copy");

  initialUrl.textContent = originalUrl;
  finaleUrl.textContent = shortedUrl;
  copyButton.textContent = "Copy";

  divFinaleUrl.appendChild(finaleUrl);
  divFinaleUrl.appendChild(copyButton);
  cardContainer.appendChild(initialUrl);
  cardContainer.appendChild(line);
  cardContainer.appendChild(divFinaleUrl);

  urLCardContainer.insertBefore(cardContainer, firstChild);

  copyButton.addEventListener("click", () => {
    copyButton.textContent = "";
    copyButton.textContent = "Copied!";
    copyButton.classList.remove("copy");
    copyButton.classList.add("copied");

    // Crear un elemento de texto temporal para copiar el contenido
    var tempInput = document.createElement("input");
    tempInput.setAttribute("type", "text");
    tempInput.setAttribute("value", shortedUrl);
    document.body.appendChild(tempInput);

    // Seleccionar y copiar el texto en el portapapeles
    tempInput.select();
    document.execCommand("copy");

    // Eliminar el elemento temporal
    document.body.removeChild(tempInput);
  });
};

// MOSTRAR ERROR
const errorMessage = (message) => {
  if (!document.getElementById("error-message")) {
    const text = document.createElement("p");
    text.id = "error-message";
    text.textContent = message;
    inputContainer.appendChild(text);
  }
};
