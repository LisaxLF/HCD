// console log de button value
const buttonValue = localStorage.getItem('buttonValue');

// Ophalen van parameters uit de URL
const urlParams = new URLSearchParams(window.location.search);
const mood = urlParams.get('mood');

// stuur naar html
const emotie = document.querySelector('#emotie');
emotie.innerHTML = mood;

const beschrijving = localStorage.getItem('weerBeschrijving');

const weer = document.querySelector('#weer');
weer.innerHTML = beschrijving;


// Haal de gefilterde kleding op uit de localStorage op basis van value van de button
if (buttonValue === 'aanpassen') {
    const gefilterdeKledingSeizoen = JSON.parse(localStorage.getItem('gefilterdeKledingSeizoen'));
    generateOutfit(gefilterdeKledingSeizoen);
} else {
    const gefilterdeDataMood = JSON.parse(localStorage.getItem('gefilterdeDataMood'));
    generateOutfit(gefilterdeDataMood);
}

// Functie om outfit te genereren
function generateOutfit(dataset) {
    console.log('dataset:', dataset);

    // Definieer de categorieën die nodig zijn voor een complete outfit
    // standaard opties
    let categorieenSetOptie1 = ['bovenkleding', 'onderkleding', 'schoeisel', 'jassen'];
    let categorieenSetOptie2 = ['setje', 'schoeisel', 'jassen'];

    // temp uit beschrijving halen
    console.log(beschrijving);

    // als de beschrijving 'temperatuur van', haal het cijfer er na uit
    const temp = parseInt(beschrijving.match(/\d+/)[0]);

    // de categorieën voor de temperatuur samenstellen
    const tempkoud = temp && temp < 10;
    const tempgematigd = temp && temp >= 10 && temp <= 15;
    const tempwarm = temp && temp > 15;

    // Initialiseer een leeg setje kleding
    let outfit = {};

    // Controleer of categorieenSetOptie2 mogelijk is
    const categorieenSetOptie2Mogelijk = dataset.some(item => item.categorie === 'setje');

    if (!categorieenSetOptie2Mogelijk) {
        console.log('Categorie "setje" is niet mogelijk');

        // Als het koud is, voeg een extra 'bovenkleding' toe aan categorieenSetOptie1
        if (tempkoud) {
            // push naar plek 1
            categorieenSetOptie1.splice(1, 0, 'bovenkleding');

            // Selecteer kledingstukken uit optie 1
            categorieenSetOptie1.forEach(categorie => {
                if (tempkoud && categorie === 'bovenkleding') {
                    // Als het koud is, voeg een shirt en een trui of vest toe
                    const kledingstukType = Math.random() < 0.5 ? 'trui' : 'vest';
                    const kledingstuk = getRandomItemByTypeAndCategory(dataset, kledingstukType, categorie);
                    outfit[categorie] = kledingstuk;
                } else {
                    const kledingstuk = getRandomItemByCategory(dataset, categorie);
                    outfit[categorie] = kledingstuk;
                }
            });
        }

        console.log('Categorieën voor optie 1:', categorieenSetOptie1);
    } else {
        console.log('Categorie "setje" is mogelijk');

        // Kies willekeurig of optie 1 of optie 2 wordt gebruikt
        const gekozenOptie = Math.random() < 0.5 ? categorieenSetOptie1 : categorieenSetOptie2;

        gekozenOptie.forEach(categorie => {
            const kledingstuk = getRandomItemByCategory(dataset, categorie);
            outfit[categorie] = kledingstuk;
        });
    }

    // Log het gegenereerde setje kleding
    console.log('Gerandomiseerd setje:', outfit);
    // stuur naar html
    generateHTML(outfit);
}


// Functie om een willekeurig kledingstuk van een bepaalde categorie te selecteren
function getRandomItemByCategory(dataset, categorie) {
    const filteredItems = dataset.filter(item => item.categorie === categorie);
    return filteredItems[Math.floor(Math.random() * filteredItems.length)];
}

// Functie om een willekeurig kledingstuk van een bepaald type en categorie te selecteren
function getRandomItemByTypeAndCategory(dataset, type, categorie) {
    const filteredItems = dataset.filter(item => item.categorie === categorie && item.type === type);
    return filteredItems[Math.floor(Math.random() * filteredItems.length)];
}

function generateHTML(outfit) {
    const outfitContainer = document.querySelector('.gegeneerde-outfit');

    // Loop door de outfit en genereer HTML voor elk kledingstuk
    for (const categorie in outfit) {
        const kledingstuk = outfit[categorie];

        // Maak de HTML-structuur voor het kledingstuk
        const HTMLstructure = `
            <div class="outfit-part-wrapper">
                <h2 class="outfit-part-category">${categorie}</h2>
                <div class="outfit-part">
                    <p class="outfit-part-description">${kledingstuk.kleur}e ${kledingstuk.type}</p>
                </div>
            </div>
        `;

        // Voeg de HTML toe aan het outfit container element
        outfitContainer.innerHTML += HTMLstructure;
    }
}

const outfitOpniew = document.querySelector('.outfitOpnieuw');
const outfitGeslaagd = document.querySelector('.outfitGeslaagd');
const outfitAanpassen = document.querySelector('.outfitAanpassen');

outfitOpniew.addEventListener('click', function () {
    // window.location.href = 'outfit.html';
    window.location.href = 'outfit.html?mood=' + mood;
});

outfitGeslaagd.addEventListener('click', function () {
    window.location.href = 'index.html';
});

