// Cookie banner
// Variables & Constants
const cookiePrefs = document.getElementById("cookie-preferences");
const cookieBanner = document.getElementById("cookies-banner");
const cookieChoices = document.getElementById("cookie-preferences--menu");
const cookieConsent = document.getElementById("cookie-consent");
const scripts = document.getElementById("scripts");
const strictConsent = document.getElementById("strictly-necessary");
const analyticsConsent = document.getElementById("analytics");
const marketingConsent = document.getElementById("marketing");
let savedPrefs = sessionStorage.getItem("consent");

// function to create DOM element
// const cookiesJSON = require('./_data/cookies.json')
// console.log(cookiesJSON)

const cookies = [
  {
    type: "strictly-necessary",
    path: [],
  },
  {
    type: "analytics",
    path: [],
  },
  {
    type: "marketing",
    path: [],
  },
];

// Set cookies that have the same data-cookie-type than data-consent-type
const checkboxes = cookieChoices.querySelectorAll("input");

// For banner preferences
let clicks = 0;

// **** Callback functions ****

/* create element */
const createEl = function (p, t) {
  const el = document.createElement("script");
  const att = document.createAttribute("data-cookie-type");
  const src = document.createAttribute("src");
  src.value = p;
  att.value = t;
  el.setAttributeNode(att);
  el.setAttributeNode(src);
  return scripts.appendChild(el);
};

/* Set cookies according to preferences with the cookies array */
function setCookie(arr, type) {
  arr.forEach(function (obj) {
    if (obj.type === type) {
      let paths = obj.path;
      paths.forEach(function (path) {
        createEl(path, type);
      });
    };
  });
};

/* check preferences */
function checkPrefs(checkbox) {
  if (checkbox.checked) {
    let type = checkbox.dataset.consentType;
    let index = consents.indexOf(type);
    if (index === -1) {
      consents.push(type);
      sessionStorage.clear();
      sessionStorage.setItem("consents", consents);
    }
  } else if (!checkbox.checked) {
    let type = checkbox.dataset.consentType;
    let index = consents.indexOf(type);
    if (index !== -1) {
      consents.splice(index, 1);
      sessionStorage.clear();
      sessionStorage.setItem("consents", consents);
    }
  }
}

let consents = []

let activeScripts = scripts.children;

// Need to write a code to check sessionStorage for content and then parse it, render scripts and hide cookie banner


// Preferences
cookiePrefs.addEventListener("click", function () {
  clicks++;
  function isOdd(clicks) {
    return clicks % 2 == 1;
  }
  // If clicks are odd, then update button text content
  if (isOdd(clicks)) {
    this.textContent = "Save and Close";
    cookieChoices.classList.remove("hide");
    // When clicking on the "Save & Close" button, clear the container innerHTML, check which checkboxes are checked and then set the cookies inside the container, reset the click count
    this.addEventListener("click", function () {
      scripts.innerHTML = ''
      // Checks the consent status and updates the sessionStorage
      checkboxes.forEach(function (checkbox) {
        checkPrefs(checkbox)       
      });
      let preferences = sessionStorage.getItem('consents').split(',')
      preferences.forEach(function(type){
        setCookie(cookies, type)
      })
      let clicks = 0
    });
  } else if ((clicks === 0)) {
    this.textContent = "Configure";
  } else {
    this.textContent = "Configure";
    cookieBanner.classList.add("hide");
    cookieChoices.classList.add("hide");
  }
});
// Consent to all cookies
cookieConsent.addEventListener("click", function () {
  let consents = []
  scripts.innerHTML = "";
  cookies.forEach(function (cookie) {
    const cPaths = cookie.path;
    const cType = cookie.type;
    for (let i = 0; i < cPaths.length; i++) {
      createEl(cPaths[i], cType);
    }
    consents.push(cType);
  });
  sessionStorage.setItem('consents', consents);
  cookieBanner.classList.add('hide');
});

