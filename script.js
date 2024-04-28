

function changerCouleurFondEnFonctionHeure() {
    // Obtenir l'heure actuelle
    const date = new Date();
    const heures = date.getHours();
  
    // Déterminer la couleur du fond en fonction de l'heure
    const isJournee = heures >= 6 && heures < 18;
    const couleurFond = isJournee ? "white" : "black";
  
    // Appliquer la couleur du fond au corps du document
    document.body.style.backgroundColor = couleurFond;
  }

  window.onload = function() {
    // appeler la fonction pour changer le background
    changerCouleurFondEnFonctionHeure();

  };

  // Fonction pour changer le thème et les animations en fonction de la météo
    function changeWeatherTheme(weatherCondition) {
    const body = document.querySelector('.my-body');
    const animationContainer = document.getElementById('animationContainer');
    const rainContainer = document.querySelector('.rain');
    const tRexContainer = document.querySelector('.my-anim-1');
    const pterodactylContainer = document.getElementById('pterodactylContainer');
  
    // Cacher toutes les animations par défaut
    animationContainer.hidden = true;
    rainContainer.hidden = true;
    tRexContainer.hidden = true;
    pterodactylContainer.hidden = true;
  
    // Appliquer les thèmes et animations en fonction de la condition météorologique
    switch (weatherCondition) {
      case 'Clear':
        body.classList.add('clear-weather');
        break;
      case 'Clouds':
        body.classList.add('cloudy-weather');
        break;
      case 'Rain':
        body.classList.add('rainy-weather');
        animationContainer.hidden = false;
        rainContainer.hidden = false;
        // Appel de la fonction pour générer les gouttes de pluie
        createRainAnimation();
        break;
      case 'Snow':
        body.classList.add('snowy-weather');
        break;
      case 'Thunderstorm':
        body.classList.add('stormy-weather');
        break;
      // Ajoutez d'autres conditions météorologiques si nécessaire
      default:
        body.classList.add('default-weather');
    }
  }
  
  // Fonction pour obtenir les données météorologiques de l'API OpenWeather
  function getWeatherData() {
    const apiKey = '88bc94801f231ebb90eabf0b4f4c6d5a'; // Remplacez par votre clé API
    const url = `http://api.openweathermap.org/data/2.5/weather?q=Paris&appid=${apiKey}`;
  
    fetch(url)
      .then(response => response.json())
      .then(data => {
        const weatherCondition = data.weather[0].main;
        changeWeatherTheme(weatherCondition);
      })
      .catch(error => console.error('Erreur lors de la récupération des données météo:', error));
  }
  
  // Appel de la fonction pour obtenir les données météo au chargement de la page
  document.addEventListener('DOMContentLoaded', getWeatherData);
  
  // Fonction pour créer l'animation de pluie
function createRainAnimation() {
    const rainContainer = document.querySelector('.rain');
  
    for (let i = 0; i < 50; i++) {
      const raindrop = document.createElement('div');
      raindrop.classList.add('raindrop');
      raindrop.style.left = `${Math.random() * 100}%`; // Position aléatoire en largeur
      raindrop.style.animationDuration = `${Math.random() * 2 + 1}s`; // Durée d'animation aléatoire
      rainContainer.appendChild(raindrop);
    }
  }
   


// JavaScript pour résoudre l'équation et déclencher l'animation
function resolveEquation() {
    // Récupère les valeurs des coefficients
    var aInput = document.getElementById('a').value;
    var bInput = document.getElementById('b').value;
    var cInput = document.getElementById('c').value;

    // Valide et convertit les valeurs des coefficients en parties réelle et imaginaire
    var a = parseComplexNumber(aInput);
    var b = parseComplexNumber(bInput);
    var c = parseComplexNumber(cInput);

    // Vérifie si le coefficient 'a' est différent de zéro pour une équation du second degré
    if (a.real === 0 && a.imaginary === 0) {
        alert("Le coefficient 'a' ne peut pas être égal à zéro dans une équation du second degré.");
        return;
    }

    // Calcule le discriminant
    var discriminant = b.real * b.real - 4 * a.real * c.real;

    // Calcule les racines de l'équation
    var x1, x2;

    // Si le discriminant est positif ou nul, affiche l'animation du t-rex
    if (discriminant >= 0) {
        x1 = calculateRoot((-b.real + Math.sqrt(discriminant)) / (2 * a.real), a.imaginary, b.imaginary);
        x2 = calculateRoot((-b.real - Math.sqrt(discriminant)) / (2 * a.real), a.imaginary, b.imaginary);
        document.querySelector('.animation').removeAttribute('hidden');
        document.querySelector('.my-anim-1').removeAttribute('hidden');
        var animationDuration = calculateAnimationDuration(x1, x2);
        document.querySelector('.t-rex').style.animationDuration = animationDuration;
        document.querySelector('.my-anim-2').setAttribute('hidden', true);
    } else {
        var realPart = -b.real / (2 * a.real);
        var imaginaryPart = Math.sqrt(-discriminant) / (2 * a.real);
        x1 = formatComplexNumber(realPart, imaginaryPart);
        x2 = formatComplexNumber(realPart, -imaginaryPart);

        // Affiche l'animation du pterodactyle
        document.querySelector('.animation').removeAttribute('hidden');
        document.querySelector('.my-anim-2').removeAttribute('hidden');
        document.querySelector('.my-anim-2').style.display = 'flex';
        animatePterodactyl(); // Démarre l'animation du pterodactyle
        document.querySelector('.my-anim-1').setAttribute('hidden', true);
    }

    document.getElementById('solution').innerText = `x1 = ${x1} et x2 = ${x2}`;

    var isDaytime = checkDaytime();

    fetchWeatherInfo(isDaytime);
}

// Fonction pour convertir une chaîne de caractères représentant un nombre complexe en objet contenant ses parties réelle et imaginaire
function parseComplexNumber(input) {
    var matches = input.match(/(-?\d*(?:\.\d+)?)([+-]?\d*(?:\.\d+)?i)?/);
    var real = parseFloat(matches[1]) || 0;
    var imaginary = parseFloat(matches[2]) || 0;
    return { real: real, imaginary: imaginary };
}

// Fonction pour calculer la différence entre les racines
function calculateAnimationDuration(x1, x2) {
    var difference = Math.abs(parseFloat(x1) - parseFloat(x2));
    var duration = difference * 1.5;
    return Math.max(Math.min(duration, 10), 2) + 's';
}

// Fonction pour calculer la racine en prenant en compte la partie imaginaire
function calculateRoot(realPart, imaginaryA, imaginaryB) {
    var real = realPart;
    var imaginary = imaginaryA + imaginaryB;
    return formatComplexNumber(real, imaginary);
}

// Fonction pour formater un nombre complexe sous forme de chaîne de caractères
function formatComplexNumber(real, imaginary) {
    if (imaginary === 0) {
        return real.toString();
    } else if (real === 0) {
        return `${imaginary}i`;
    } else if (imaginary > 0) {
        return `${real} + ${imaginary}i`;
    } else {
        return `${real} - ${Math.abs(imaginary)}i`;
    }
}

/* Fonction pour vérifier s'il fait jour en fonction de l'heure locale de la machine
function checkDaytime() {
    var currentHour = new Date().getHours();
    return currentHour >= 6 && currentHour < 18;
}*/






    



// Fonction pour démarrer l'animation du pterodactyle
function animatePterodactyl() {
    var pterodactylContainer = document.getElementById('pterodactylContainer');
    pterodactylContainer.style.display = 'flex';
    var position = 100;
    var animationInterval = setInterval(frame, 40);

    function frame() {
        if (position <= -100) {
            clearInterval(animationInterval);
        } else {
            position--;
            pterodactylContainer.style.left = position + '%';
        }
    }
}

// Fonction pour récupérer les informations météorologiques à partir de l'API OpenWeather
function fetchWeatherInfo(isDaytime) {
    var apiKey = '4d0168f1babd4e74801d4aa39f749660';
    // Récupère les coordonnées géographiques de l'utilisateur
    navigator.geolocation.getCurrentPosition(function(position) {
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;
        var apiUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&appid=${apiKey}&`;
        try {
            fetch(apiUrl)
                .then(response => response.json())
                .then(data => {
                    var isRaining = isRaining(data);
                    applyWeatherStyles(isDaytime, isRaining);
                })
                .catch(error => console.error('Error fetching weather data:', error));
        } catch (error) {
            alert("Impossible de récupérer les informations météorologiques. Veuillez réessayer plus tard.");
        }
    });
}

// Fonction pour vérifier s'il pleut
function isRaining(weatherData) {
    return weatherData.weather.some(weather => weather.main.toLowerCase().includes('rain'));
}

// Fonction pour appliquer les styles en fonction des conditions météorologiques
function applyWeatherStyles(isDaytime, isRaining) {
    var body = document.body;
    if (isDaytime) {
        document.querySelector('.my-body').style.backgroundColor = '#f8f8ff';
        document.querySelector('.my-body').style.color = '#000';
    } else {
        document.querySelector('.my-body').style.backgroundColor = '#000';
        document.querySelector('.my-body').style.color = '#fff';
    }
    var rainDiv = document.querySelector('.rain');
    if (isRaining) {
        rain.removeAttribute('hidden');
    } else {
        rain.setAttribute('hidden', true);
    }
}