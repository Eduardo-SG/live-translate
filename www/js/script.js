let timerId;
const dropdownContainer = document.querySelectorAll(".dropdown-container");
const inputLanguageDropdown = document.querySelector("#input-language");
const outputLanguageDropdown = document.querySelector("#output-language");

function dropdowns(dropdown, options) {
  dropdown.querySelector("ul").innerHTML = "";
  options.forEach((option) => {
    const li = document.createElement("li");
    const title = option.name + " (" + option.native + ")";
    li.innerHTML = title;
    li.dataset.value = option.code;
    li.classList.add("option");
    dropdown.querySelector("ul").appendChild(li);
  });
}

dropdowns(inputLanguageDropdown, languages);
dropdowns(outputLanguageDropdown, languages);

dropdownContainer.forEach((dropdown) => {
  dropdown.addEventListener("click", (e) => {
    dropdown.classList.toggle("active");
  });

  dropdown.querySelectorAll(".option").forEach((item) => {
    item.addEventListener("click", (e) => {
      dropdown.querySelectorAll(".option").forEach((item) => {
        item.classList.remove("active");
      });
      item.classList.add("active");
      const selected = dropdown.querySelector(".selected");
      selected.innerHTML = item.innerHTML;
      selected.dataset.value = item.dataset.value;

      //translate();
    });
  });
});

document.addEventListener("click", (e) => {
  dropdownContainer.forEach((dropdown) => {
    if (!dropdown.contains(e.target)) {
      dropdown.classList.remove("active");
    }
  });
});

const inputText = document.querySelector("#input-text");
const outputText = document.querySelector("#output-text");
const inputLanguage = inputLanguageDropdown.querySelector(".selected");
const outputLanguage = outputLanguageDropdown.querySelector(".selected");
const downloadButton = document.querySelector("#download-document-button");

function translate() {
  const text = inputText.value;
  const inputLanguage =
    inputLanguageDropdown.querySelector(".selected").dataset.value;
  const outputLanguage =
    outputLanguageDropdown.querySelector(".selected").dataset.value;
  if (!text) return;
  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${inputLanguage}&tl=${outputLanguage}&dt=t&q=${encodeURI(
    text
  )}`;
  fetch(url)
    .then((response) => response.json())
    .then((json) => {
      outputText.value = json[0][0][0];

      saveTranslation(inputText.value, outputText.value);
    });
}

function saveTranslation(inputText, outputText) {
  const formData = new FormData();
  formData.append('input-text', inputText);
  formData.append('output-text', outputText);
  
  fetch('saveTranslation.php', {
    method: 'POST',
    body: formData
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.text();
  })
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
  });
}


const noClick = document.querySelectorAll(".click");
const shareNoClick = document.querySelector(".share-no-click");
const socialIcons = document.querySelector(".share-icons");
const socialIcon = document.querySelectorAll(".share-icons ion-icon");
const shareIcons = document.querySelector(".shareWrapper");

let timeout;
inputText.addEventListener("input", (e) => {
  clearTimeout(timeout);
  timeout = setTimeout(() => {
    share();
    if (outputText.value.length > 10) {
      const link = encodeURI(window.location.href);
      const msg = encodeURIComponent(outputText.value);
      const twitter = document.querySelector(".share-icons .twitter");
    }
    if (inputText.value.length > 5000) {
      inputText.value = inputText.value.slice(0, 5000);
    }
    translate();
    chars();
  }, 1000); // Esperar 1 segundo después del último evento input
});

function shareClick() {
  () => {
    if (outputText.value.length < 10) {
      const link = encodeURI(window.location.href);
      const msg = encodeURIComponent(outputText.value);

      const twitter = document.querySelector(".share-icons .twitter");
      twitter.href = `http://twitter.com/share?&url?${link}&text=${msg}&hastags=javascript`;
    }
    socialIcons.classList.toggle("hide");
    socialIcons.addEventListener("click", () => {
      socialIcon.forEach((icon) => {
        socialIcons.classList.add("hide");
      });
    });
  };
}
function share() {
  noClick.forEach((element) => {
    element.classList.remove("click");
  });
}

const swapBtn = document.querySelector(".swap");

swapBtn.addEventListener("click", (e) => {
  const temp = inputLanguage.innerHTML;
  inputLanguage.innerHTML = outputLanguage.innerHTML;
  outputLanguage.innerHTML = temp;

  const tempValue = inputLanguage.dataset.value;
  inputLanguage.dataset.value = outputLanguage.dataset.value;
  outputLanguage.dataset.value = tempValue;

  const tempInputText = inputText.value;
  inputText.value = outputText.value;
  outputText.value = tempInputText;
});

const bottomIcon = document.querySelectorAll(".bottom-icon ion-icon");

bottomIcon.forEach((icon) => {
  icon.addEventListener("click", ({ target }) => {
    if (target.classList.contains("copy")) {
      if (target.id == "from") {
        navigator.clipboard.writeText(inputText.value);
      } else {
        navigator.clipboard.writeText(outputText.value);
      }
    } else if (target.classList.contains("volume")) {
      let uttrance;
      uttrance = new SpeechSynthesisUtterance(outputText.value);
      uttrance.lang = outputLanguage.dataset.value;
      speechSynthesis.speak(uttrance);
    } else if (target.classList.contains("shareWrapper")) {
      socialIcons.classList.remove("hide");
    }
  });
});

function chars() {
  const chars = document.querySelector(".input-chars");

  if (inputText.value.length > 4900) {
    chars.innerHTML = inputText.value.length;
    chars.style.color = "red";
  } else {
    chars.style.color = "#cdccd1";
    chars.innerHTML = inputText.value.length;
  }
}

const removeBtn = document.querySelector(".remove");

// Remove Button to remove the translate from text Areas
removeBtn.addEventListener("click", () => {
  inputText.value = "";
  outputText.value = "";
});

// Share translated text to WhatsApp
function shareText() {
  const trans = outputText.value;
  const url = "https://wa.me/?text=" + encodeURIComponent(trans);
  window.open(url);
};
// Obtenemos la referencia al botón de activar reconocimiento de voz
const startSpeechRecognitionButton = document.getElementById(
  "startSpeechRecognition"
);

// Inicializamos el reconocimiento de voz
const recognition = new webkitSpeechRecognition();
recognition.continuous = false;
recognition.interimResults = false;
recognition.lang = "es-ES"; // Configura el idioma de reconocimiento (en este caso, español)

//usar inputLanguage.dataset.value;

inputLanguage.addEventListener("change", () => {
  recognition.lang = inputLanguageDropdown.dataset.value;
});

// Cuando el usuario hable, se ejecutará esta función
recognition.onresult = (event) => {
  share();
  // Obtenemos el texto hablado por el usuario
  const spokenText = event.results[0][0].transcript;

  // Mostramos el texto hablado en la consola (para verificar que funciona)
  console.log("Texto hablado: " + spokenText);

  // Aquí puedes llamar a tu función de traducción y mostrar el resultado en la página
  inputText.value = spokenText;
  console.log(inputLanguage);
  translate();
};

// Cuando el usuario haga clic en el botón de activar reconocimiento de voz, se iniciará el reconocimiento
startSpeechRecognitionButton.addEventListener("click", () => {
  recognition.start();
});

function goBack() {
  window.location.href = "index.html";
};

const history = document.getElementById("history");

history.addEventListener("click", () => {
  window.location.href = "translationHistory.php";
});

