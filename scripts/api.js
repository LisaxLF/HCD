// // Vraag om toestemming voor de locatie
// if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition(function (position) {
//         const latitude = position.coords.latitude;
//         const longitude = position.coords.longitude;

//         // Console log de locatie
//         console.log('Latitude:', latitude);
//         console.log('Longitude:', longitude);

//         // Krijg de huidige datum in het formaat "YYYY-MM-DD"
//         const today = new Date().toISOString().slice(0, 10);

//         // Fetch het weer voor de huidige dag met unit group metric
//         fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${latitude},${longitude}/${today}?unitGroup=metric&key=ZHST95398H9SG362E8R38PZAY`)
//             .then(response => response.json())
//             .then(data => {
//                 console.log(data);
//                 // Verwerk de weerdata hier
//                 let temp = data.days[0].temp;
//                 let tempMin = data.days[0].tempmin;
//                 let tempMax = data.days[0].tempmax;

//                 // rond de temperatuur af op een geheel getal
//                 temp = Math.round(temp);
//                 tempMin = Math.round(tempMin);
//                 tempMax = Math.round(tempMax);

//                 // Krijg de omschrijving van het weer
//                 const description = data.days[0].description;

//                 // Krijg de stad via de coordinaten
//                 let city = data.timezone;
//                 city = city.split("/").pop();

//                 // Voeg de weerdata toe aan de HTML
//                 const weerBeschrijvingDiv = document.querySelector('#weer-beschrijving');
//                 const weerBeschrijving = document.createElement('p');
//                 weerBeschrijving.textContent = `Het weer vandaag in ${city} is ${description.toLowerCase()} met een temperatuur van ${temp}°C. De minimum temperatuur zal rond de ${tempMin}°C liggen en de maximum temperatuur zal rond de ${tempMax}°C zijn.`;

//                 weerBeschrijvingDiv.appendChild(weerBeschrijving);

//                 // Krijg de buttons voor aanpassen weer
//                 const btnAanpassen = document.querySelector('.aanpassen');
//                 const btnNietAanpassen = document.querySelector('.nietaanpassen');

//                 // Event listener voor aanpassen weer
//                 btnAanpassen.addEventListener('click', function () {
//                     // Pas filters aan voor kleding
//                     checkTempCategory(temp);
//                 });

//                 // Event listener voor niet aanpassen weer
//                 btnNietAanpassen.addEventListener('click', function () {
//                     // Pas filters aan voor kleding

//             })
//             .catch(error => {
//                 console.error('Error:', error);
//             });
//     });
// } else {
//     console.error("Geolocatie wordt niet ondersteund in deze browser");
// }

// Fetching the kleding kast data
fetch('mijnkledingkast.json')
    .then(response => response.json())
    .then(data => {
        console.log(data);

        // Verdeel de data in de verschillende categorieën
        const bovenkleding = data.filter(item => item.categorie === 'bovenkleding');

        // Verdeel
    })
    .catch(error => {
        console.error('Error:', error);
    });

// Functie om de temperatuur categorie te bepalen
function checkTempCategory(temp) {
    console.log('Temperatuur:', temp);
    // Bepaal de categorie voor de temperatuur
    if (temp <= 10) {
        // Neem filters mee voor koude temperaturen
        console.log('filters zijn: lange mouwen, truien, jassen, sjaals, handschoenen');
    } else if (temp > 10 && temp <= 15) {
        // Neem filters mee voor koude temperaturen
        console.log('filters zijn: lange mouwen, korte mouwen, truien, jassen');
    } else {
        console.log('filters zijn: korte mouwen, rokken, jurken, korte broeken, shirts');
    }
}