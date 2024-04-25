// Vraag om toestemming voor de locatie
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
        const {
            latitude,
            longitude
        } = position.coords;

        // Krijg de huidige datum in het formaat "YYYY-MM-DD"
        const today = new Date().toISOString().slice(0, 10);

        // Fetch het weer voor de huidige dag met unit group metric
        fetchWeatherData(latitude, longitude, today);
    });
} else {
    console.error("Geolocatie wordt niet ondersteund in deze browser");
}

// Functie om weerdata op te halen en weer te verwerken
function fetchWeatherData(latitude, longitude, today) {
    fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${latitude},${longitude}/${today}?unitGroup=metric&key=ZHST95398H9SG362E8R38PZAY`)
        .then(response => response.json())
        .then(data => {
            processWeatherData(data, today);
        })
        .catch(error => {
            console.error('Fout bij het ophalen van weerdata:', error);
        });
}

// Functie om weerdata te verwerken en weer te tonen in de HTML
function processWeatherData(data, today) {
    const {
        temp,
        tempmin,
        tempmax,
        description
    } = data.days[0];
    const {
        timezone
    } = data;

    const city = timezone.split("/").pop();
    const tempRounded = Math.round(temp);
    const tempMinRounded = Math.round(tempmin);
    const tempMaxRounded = Math.round(tempmax);

    // Voeg de weerdata toe aan de HTML
    const weerBeschrijvingDiv = document.querySelector('#weer-beschrijving');
    const weerBeschrijving = document.createElement('p');
    weerBeschrijving.textContent = `Het weer vandaag in ${city} is ${description.toLowerCase()} met een temperatuur van ${tempRounded}°C. De minimum temperatuur zal rond de ${tempMinRounded}°C liggen en de maximum temperatuur zal rond de ${tempMaxRounded}°C zijn.`;
    weerBeschrijvingDiv.appendChild(weerBeschrijving);

    // sla de beschrijving van het weer op in de localStorage
    localStorage.setItem('weerBeschrijving', weerBeschrijving.textContent);

    // Check de temperatuur categorie
    checkTempCategory(tempRounded);
}

// Functie om de temperatuur categorie te bepalen
function checkTempCategory(temp) {
    // de categorieën voor de temperatuur samenstellen
    const tempkoud = temp < 10;
    const tempgematigd = temp >= 10 && temp <= 15;
    const tempwarm = temp > 15;

    // de temperatuur categorieën controleren
    if (tempkoud) {
        // De filters die mee moeten worden gegeven aan de kledingkast
        const seizoen = ['alle seizoenen', 'winter', 'herfst'];
        const types = ['trui', 'jas', 'vest', 'shirt', 'trui', 'broek', 'schoenen'];

        // sla de temperatuur categorie op in de localStorage
        localStorage.setItem('tempCategory', 'tempkoud');

        handleFilters(seizoen, types);
    } else if (tempgematigd) {
        // De filters die mee moeten worden gegeven aan de kledingkast
        const seizoen = ['alle seizoenen', 'lente', 'herfst'];
        const types = ['shirt', 'broek', 'schoenen', 'jas'];

        handleFilters(seizoen, types);
    } else if (tempwarm) {
        // De filters die mee moeten worden gegeven aan de kledingkast
        const seizoen = ['alle seizoenen', 'zomer'];
        const types = ['shirt', 'korte broek', 'schoenen', 'jas'];

        handleFilters(seizoen, types);
    }
}

// Functie om de filters te verwerken en door te sturen naar de kledingkast
function handleFilters(seizoen, types) {
    // Haal de bestaande data op uit de localStorage
    const gefilterdeDataMood = JSON.parse(localStorage.getItem('gefilterdeDataMood'));

    console.log('Gefilterde data op mood:', gefilterdeDataMood);

    // Filter de kledingstukken op basis van het type
    const gefilterdeKledingType = gefilterdeDataMood.filter(kledingstuk => {
        // Controleer of het kledingstuk een 'shirt' is
        if (kledingstuk.type.trim() === 'shirt') {
            // Controleer of het kledingstuk verbonden is met een ander type
            return types.some(type => kledingstuk.type.includes(type));
        } else {
            // Controleer op de overige kledingstukken
            if (kledingstuk.type.includes('+')) {
                // Als het kledingstuk meerdere types heeft, split deze dan en controleer of ten minste één type overeenkomt
                const typeArray = kledingstuk.type.split('+');
                return typeArray.some(type => types.includes(type.trim()));
            } else {
                // Als het kledingstuk slechts één type heeft, controleer dan direct
                return types.includes(kledingstuk.type.trim());
            }
        }
    });

    // Filter de kledingstukken op basis van de kleur
    const gefilterdeKledingSeizoen = gefilterdeKledingType.filter(kledingstuk => {
        if (kledingstuk.seizoen.includes(',')) {
            // Als het kledingstuk meerdere seizoenen heeft, split deze dan en controleer of ten minste één seizoen overeenkomt
            const seizoenenArray = kledingstuk.seizoen.split('/');
            return seizoen.includes(seizoenenArray.some(seizoen => seizoen.trim()));
        } else {
            // Als het kledingstuk slechts één seizoen heeft, controleer dan direct
            return seizoen.includes(kledingstuk.seizoen.trim());
        }
    });

    console.log('Gefilterde kleding op seizoen:', gefilterdeKledingSeizoen);

    // Krijg de buttons voor het aanpassen van het weer
    const btnAanpassen = document.querySelector('.aanpassen');
    const btnNietAanpassen = document.querySelector('.nietaanpassen');

    // Event listener voor het aanpassen van het weer
    btnAanpassen.addEventListener('click', function () {
        // Sla de gefilterde kleding en de waarde van de knop op in de localStorage
        localStorage.setItem('gefilterdeKledingSeizoen', JSON.stringify(gefilterdeKledingSeizoen));
        localStorage.setItem('buttonValue', this.value);

        // Redirect naar de outfit pagina met mood en weer
        // Ophalen van parameters uit de URL
        const urlParams = new URLSearchParams(window.location.search);
        const mood = urlParams.get('mood');

        // Navigeer naar de volgende pagina met parameters
        window.location.href = `outfit.html?mood=${mood}`;
    });

    // Event listener voor niet aanpassen van het weer
    btnNietAanpassen.addEventListener('click', function () {
        // Sla de gefilterde kleding en de waarde van de knop op in de localStorage
        localStorage.setItem('gefilterdeKledingSeizoen', JSON.stringify(gefilterdeDataMood));
        localStorage.setItem('buttonValue', this.value);

        // Redirect naar de outfit pagina
        window.location.href = 'outfit.html';
    });

}