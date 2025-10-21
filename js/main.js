const menuBtn = document.getElementById("menu-btn");
const menuMovil = document.getElementById("mobile-menu");
const overlay = document.getElementById("menu-overlay");
const hamburguesa = document.getElementById("icon-hamburger");
const cerrar = document.getElementById("icon-close");

function toggleMenu() {
  menuMovil.classList.toggle("translate-x-full");
  overlay.classList.toggle("hidden");
  hamburguesa.classList.toggle("hidden");
  cerrar.classList.toggle("hidden");

  document.body.classList.toggle("overflow-hidden");
}

const translations = {}; 

async function loadLanguage(lang) {
  if (translations[lang]) {
    return translations[lang]; 
  }
  try {
    const response = await fetch(`locales/${lang}.json`);
    if (!response.ok) {
      throw new Error(`Failed to load ${lang}.json`);
    }
    translations[lang] = await response.json();
    return translations[lang];
  } catch (error) {
    console.error(error);
    return null;
  }
}

function applyTranslations(langData) {
  document.querySelectorAll("[data-i18n-key]").forEach((element) => {
    const key = element.getAttribute("data-i18n-key");


    let text = key
      .split(".")
      .reduce(
        (obj, k) => (obj && obj[k] !== "undefined" ? obj[k] : null),
        langData
      );

    if (text) {
      if (key === "meta.title") {
        document.title = text;
      } else {
        element.innerHTML = text;
      }
    } else {
      console.warn(`Missing translation for key: ${key}`);
    }
  });
}

function updateLanguageButtons(lang) {
  document.querySelectorAll(".lang-btn").forEach((btn) => {
    if (btn.getAttribute("data-lang") === lang) {
      btn.classList.add("text-white", "font-semibold");
      btn.classList.remove("text-gray-400");
    } else {
      btn.classList.add("text-gray-400");
      btn.classList.remove("text-white", "font-semibold");
    }
  });
}


async function setLanguage(lang) {
  const langData = await loadLanguage(lang);
  if (langData) {
    applyTranslations(langData);
    localStorage.setItem("portfolioLang", lang);
    updateLanguageButtons(lang);
  }
}

//Traducciones

function setupScrollAnimation() {
  const elementsToAnimate = document.querySelectorAll(".animate-on-scroll");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
    }
  );

  elementsToAnimate.forEach((el) => {
    observer.observe(el);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const defaultLang = localStorage.getItem("portfolioLang") || "es";
  setLanguage(defaultLang);
  setupScrollAnimation();
});
