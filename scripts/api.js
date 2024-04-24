// Vraag om toestemming voor de locatie
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
        const { latitude, longitude } = position.coords;

        // Console log de locatie
        console.log('Latitude:', latitude);
        console.log('Longitude:', longitude);

        // Krijg de huidige datum in het formaat "YYYY-MM-DD"
        const today = new Date().toISOString().slice(0, 10);

        // Fetch het weer voor de huidige dag met unit group metric
        fetchWeatherData(latitude, longitude, today);
    });
} else {
    console.error("Geolocatie wordt niet ondersteund in deze browser");
}

// Functie om weerdata op te halen en weer te verwerken
function fetchWeatherData(latitude, longitude, date) {
    fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${latitude},${longitude}/${date}?unitGroup=metric&key=ZHST95398H9SG362E8R38PZAY`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            processWeatherData(data);
        })
        .catch(error => {
            console.error('Fout bij het ophalen van weerdata:', error);
        });
}

// Functie om weerdata te verwerken en weer te tonen in de HTML
function processWeatherData(data) {
    const { temp, tempmin, tempmax, description } = data.days[0];
    const { timezone } = data;
    const city = timezone.split("/").pop();
    const tempRounded = Math.round(temp);
    const tempMinRounded = Math.round(tempmin);
    const tempMaxRounded = Math.round(tempmax);

    // Voeg de weerdata toe aan de HTML
    const weerBeschrijvingDiv = document.querySelector('#weer-beschrijving');
    const weerBeschrijving = document.createElement('p');
    weerBeschrijving.textContent = `Het weer vandaag in ${city} is ${description.toLowerCase()} met een temperatuur van ${tempRounded}°C. De minimum temperatuur zal rond de ${tempMinRounded}°C liggen en de maximum temperatuur zal rond de ${tempMaxRounded}°C zijn.`;
    weerBeschrijvingDiv.appendChild(weerBeschrijving);

    // Krijg de buttons voor het aanpassen van het weer
    const btnAanpassen = document.querySelector('.aanpassen');
    const btnNietAanpassen = document.querySelector('.nietaanpassen');

    // Event listener voor het aanpassen van het weer
    btnAanpassen.addEventListener('click', function () {
        // Pas filters aan voor kleding
        checkTempCategory(tempRounded);

        // ga naar het nieuwe href
        window.location.href = "outfitresult.html";
    });

    // Event listener voor niet aanpassen van het weer
    btnNietAanpassen.addEventListener('click', function () {
        // Doe hier iets anders als de gebruiker het weer niet wil aanpassen
        // Randomized filters voor de kleding
    });
}

// Functie om de temperatuur categorie te bepalen
function checkTempCategory(temp) {
    console.log('Temperatuur:', temp);
    // Bepaal de categorie voor de temperatuur
    if (temp <= 5) {
        console.log('filters zijn: lange mouwen, truien, jassen, sjaals, handschoenen');
    } else if (temp > 5 && temp <= 10) {
        console.log('filters zijn: lange mouwen, truien, jassen, sjaals');

    } else if (temp > 10 && temp <= 15) {
        console.log('filters zijn: lange mouwen, korte mouwen, truien, jassen');
    } else {
        console.log('filters zijn: korte mouwen, rokken, jurken, korte broeken, shirts');
    }
}

// Fetching the kleding kast data
function fetchKledingKastData() {
    fetch('mijnkledingkast.json')
        .then(response => response.json())
        .then(data => {
            console.log(data);

            // Verdeel de data in de verschillende categorieën

            // Doe hier iets met de verdeelde data
        })
        .catch(error => {
            console.error('Fout bij het ophalen van kledingkastdata:', error);
        });
}

// Import kleuren data
