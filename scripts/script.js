const startButton = document.getElementById('startButton');
const herhaaldeOutput = document.getElementById('herhaaldeOutput');

// Modal popup
const modal = document.querySelector('.modal-popup');
const btnCorrect = document.querySelector('.modal-popup .correct-button');
const btnIncorrect = document.querySelector('.modal-popup .incorrect-button');

// Controleer of de browser spraakherkenning ondersteunt
if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
    const recognition = new(window.SpeechRecognition || window.webkitSpeechRecognition)();

    // Stel de taal in voor spraakherkenning
    recognition.lang = 'nl-NL';

    // Event listener voor wanneer spraak wordt herkend
    recognition.onresult = async function (event) {
        const speechToText = event.results[0][0].transcript;

        // Uitspraak van de ingevoerde tekst
        const speakTextResult = await speakText(speechToText);

        // Als dit compleet is dan modal pop up open
        openModalPopup(speakTextResult);

        // Bepaal het humeur van de gebruiker
        determineMood(speakTextResult);
    };

    // Event listener voor fouten
    recognition.onerror = function (event) {
        console.error('Speech recognition error:', event.error);
    };

    // Variabele om de timer bij te houden
    let recognitionTimer;

    // Event listener voor het klikken op de start knop
    startButton.addEventListener('click', function (event) {
        // Voorkom standaard klikgedrag
        event.preventDefault();

        // Vibratriceer de telefoon
        navigator.vibrate(100);

        // Start spraakherkenning
        recognition.start();

        // Start een timer van 5 seconden voor spraakherkenning
        recognitionTimer = setTimeout(function () {
            // Stop spraakherkenning als er geen spraak is gedetecteerd na 5 seconden
            recognition.stop();
            clearTimeout(recognitionTimer); // Wis de timer
        }, 5000);
    });

    // Event listener voor het loslaten van de start knop
    startButton.addEventListener('click', function (event) {
        // Voorkom standaard klikgedrag
        event.preventDefault();

        // Stop spraakherkenning
        recognition.stop();

        // Wis de timer als de gebruiker handmatig stopt met opnemen
        clearTimeout(recognitionTimer);
    });

} else {}

// Functie om tekst uit te spreken
async function speakText(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'nl-NL';
    speechSynthesis.speak(utterance);

    return text;
}

// Functie om humeur te bepalen
function determineMood(text) {
    console.log('Tekst:', text);

    // Vrolijk - vrolijke, heldere kleuren en lichte, vrolijke stoffen en patronen
    // Kalm - koelere, rustige kleuren en eenvoudige, minimalistische stijlen
    // Energiek - heldere, levendige kleuren en actieve, sportieve stijlen
    // Romantisch - zachte tinten, pastelkleuren, en delicate stoffen zoals kant en zijde
    // Neutraal - donkere of gedempte kleuren en eenvoudige, klassieke stijlen
    // Comfortabel - zachte, comfortabele stoffen en losse, relaxte stijlen
    // Elegant - Verfijnde stijlen met hoogwaardige stoffen en een klassieke uitstraling, vaak in donkere of neutrale kleuren.

    // Vrolijk
    if (text.includes('vrolijk')) {
        document.body.style.backgroundColor = '#FFD700';

        // Array van kleuren die vrolijkheid uitstralen
        const kleuren = ['rood', 'oranje', 'geel', 'groen', 'blauw', 'indigo', 'violet'];
    }

    // Kalm
    if (text.includes('kalm')) {
        document.body.style.backgroundColor = '#87CEEB';

        // Array van kleuren die kalmte uitstralen
        const kleuren = ['blauw', 'groen', 'paars', 'wit', 'grijs', 'zilver', 'turquoise'];
    }

    // Energiek
    if (text.includes('energiek')) {
        document.body.style.backgroundColor = '#FF6347';

        // Array van kleuren die energie uitstralen
        const kleuren = ['rood', 'oranje', 'geel', 'groen', 'blauw', 'indigo', 'violet'];
    }

    // Romantisch
    if (text.includes('romantisch')) {
        document.body.style.backgroundColor = '#FF69B4';

        // Array van kleuren die romantiek uitstralen
        const kleuren = ['roze', 'rood', 'paars', 'zilver', 'goud', 'ivoor', 'perzik'];

        // Stuur deze kleuren naar de API om kledingstukken te filteren
        
    }

    // Neutraal
    if (text.includes('neutraal')) {
        document.body.style.backgroundColor = '#808080';

        // Array van kleuren die neutraliteit uitstralen
        const kleuren = ['wit', 'zwart', 'grijs', 'bruin', 'beige', 'taupe', 'ivoor'];
    }

    // Comfortabel
    if (text.includes('comfortabel')) {
        document.body.style.backgroundColor = '#FFA07A';

        // Array van kleuren die comfort uitstralen
        const kleuren = ['grijs', 'rood', 'groen', 'blauw', 'indigo'];
    }

}

function openModalPopup(speakTextResult) {
    modal.classList.add('active');
    herhaaldeOutput.innerHTML = speakTextResult;

    // Voeg een event listener toe aan de knoppen in de modale venster om de modale venster te sluiten
    btnCorrect.addEventListener('click', nextPage);
    btnIncorrect.addEventListener('click', closeModalPopup);
}

function closeModalPopup() {
    modal.classList.remove('active');
}

function nextPage() {
    window.location.href = 'hetweer.html';
}