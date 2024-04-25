const startButton = document.getElementById('startButton');
const herhaaldeOutput = document.getElementById('herhaaldeOutput');

// Submit button
const submitBtn = document.querySelector('#emotie-knop');
const radioBtnMood = document.querySelectorAll('input[type="radio"]');

// Buttons voor het aanpassen van het weer
const btnAanpassen = document.querySelector('.aanpassen');
const btnNietAanpassen = document.querySelector('.nietaanpassen');

console.log(radioBtnMood);

// Als de buttons checked zijn dan moet de submit text veranderd worden
radioBtnMood.forEach((btn) => {
    const submitBtn = document.querySelector('#emotie-knop');
    const value = btn.value;

    btn.addEventListener('change', function () {
        // bij elke verandering van de radio buttons clear the localStorage
        localStorage.clear();


        submitBtn.innerHTML = `De emotie ${value} versturen`;
        submitBtn.setAttribute('aria-label', `Ga door met ${value}`);
        const mood = value;

        submitBtn.addEventListener('click', function () {
            nextPage(mood);
        });
    });
});

// Functie voor het laden van de volgende pagina
async function nextPage(mood) {
    console.log('Mood:', mood);

    // Roep bepaalHumeur aan om het humeur van de gebruiker te bepalen
    const humeurfilters = await bepaalHumeur(mood);

    // Navigeer naar de volgende pagina met parameters
    window.location.href = `hetweer.html?mood=${mood}`;
}

// Fetching the kleding kast data
function fetchKledingKastData(kleuren, patroon) {
    fetch('mijnkledingkast.json')
        .then(response => response.json())
        .then(data => {
            console.log("de data is:", data);

            // Filter de kledingstukken op basis van de kleur
            const gefilterdeKledingKleuren = data.filter(kledingstuk => {
                if (kledingstuk.kleur.includes(',')) {
                    // Als het kledingstuk meerdere kleuren heeft, split deze dan en controleer of ten minste één kleur overeenkomt
                    const kleurenArray = kledingstuk.kleur.split(',');
                    return kleurenArray.some(kleur => kleuren.includes(kleur.trim()));
                } else {
                    // Als het kledingstuk slechts één kleur heeft, controleer dan direct
                    return kleuren.includes(kledingstuk.kleur.trim());
                }
            });

            // Filter de kledingstukken op basis van het patroon
            let gefilterdeKledingPatroon = gefilterdeKledingKleuren.filter(kledingstuk => patroon.includes(kledingstuk.patroon));

            // Controleer of er minstens één kledingstuk van elke categorie is
            const categorieenSet = new Set(data.map(item => item.categorie));
            const isCompleteOutfit = Array.from(categorieenSet).every(categorie => gefilterdeKledingPatroon.some(kledingstuk => kledingstuk.categorie === categorie));

            if (isCompleteOutfit) {
                console.log('Je hebt een complete outfit!');
                const gefilterdeDataMood = gefilterdeKledingPatroon

                // Leeg de localStorage
                localStorage.clear();

                // Haal de bestaande data op uit de localStorage
                let bestaandeData = JSON.parse(localStorage.getItem('gefilterdeDataMood'));

                // Controleer of er al gegevens zijn opgeslagen
                if (bestaandeData) {
                    // Vervang de bestaande data door de nieuwe gefilterde data
                    bestaandeData = gefilterdeKledingPatroon;
                } else {
                    // Als er nog geen gegevens zijn opgeslagen, sla dan de nieuwe gefilterde data op
                    bestaandeData = gefilterdeKledingPatroon;
                }

                // Sla de bijgewerkte gegevens + mood op in de localStorage
                localStorage.setItem('gefilterdeDataMood', JSON.stringify(bestaandeData));


                console.log('Gefilterde data op mood:', gefilterdeDataMood);


            } else {
                console.log('Je hebt geen complete outfit!');
            }
        })
        .catch(error => {
            console.error('Fout bij het ophalen van kledingkastdata:', error);
        });
}

// Functie om humeur te bepalen
async function bepaalHumeur(mood) {
    // Vrolijk - vrolijke, heldere kleuren en lichte, vrolijke stoffen en patronen
    // Energiek - heldere, levendige kleuren en actieve, sportieve stijlen
    // Romantisch - zachte tinten, pastelkleuren, en delicate stoffen zoals kant en zijde
    // Comfortabel - zachte, comfortabele stoffen en losse, relaxte stijlen
    // Elegant - Verfijnde stijlen met hoogwaardige stoffen en een klassieke uitstraling, vaak in donkere of neutrale kleuren.

    // Vrolijk
    if (mood.includes('vrolijk')) {
        document.body.style.backgroundColor = '#FFD700';

        // Array van kleuren die vrolijkheid uitstralen
        const kleuren = ['rood', 'oranje', 'geel', 'groen', 'blauw', 'lichtblauw', 'donkerblauw', 'indigo', 'violet'];
        const patroon = ['effen', 'gestreept', 'wassing', 'geruit', 'bloemen', 'abstract', 'geometrisch']

        // stuur de kleuren, type kleding en patronen naar de API om kledingstukken te filteren
        fetchKledingKastData(kleuren, patroon);

    }

    // Energiek
    if (mood.includes('energiek')) {
        document.body.style.backgroundColor = '#FF6347';

        // Array van kleuren die energie uitstralen
        const kleuren = ['rood', 'oranje', 'geel', 'groen', 'blauw', 'indigo', 'violet'];
    }

    // Romantisch
    if (mood.includes('romantisch')) {
        document.body.style.backgroundColor = '#FF69B4';

        // Array van kleuren die romantiek uitstralen
        const kleuren = ['roze', 'rood', 'paars', 'zilver', 'goud', 'ivoor', 'perzik'];

        // Stuur deze kleuren naar de API om kledingstukken te filteren

    }

    // Comfortabel
    if (mood.includes('comfortabel')) {
        document.body.style.backgroundColor = '#FFA07A';

        // Array van kleuren die comfort uitstralen
        const kleuren = ['grijs', 'rood', 'groen', 'blauw', 'indigo'];
    }

    // Elegant
    if (mood.includes('elegant')) {
        document.body.style.backgroundColor = '#800080';

        // Array van kleuren die elegantie uitstralen
        const kleuren = ['zwart', 'wit', 'grijs', 'zilver', 'goud', 'ivoor', 'beige'];
    }

    return mood;
}