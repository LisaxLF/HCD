const startButton = document.getElementById('startButton');
const herhaaldeOutput = document.getElementById('herhaaldeOutput');

// Modal popup
const modal = document.querySelector('.modal-popup');
const btnCorrect = document.querySelector('.modal-popup .correct-button');
const btnIncorrect = document.querySelector('.modal-popup .incorrect-button');

// Controleer of de browser spraakherkenning ondersteunt
if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();

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

    // Event listener for when the user holds down the start button
    startButton.addEventListener('mousedown', function () {
        // Start speech recognition
        recognition.start();
    });

    // Event listener for when the user releases the start button
    startButton.addEventListener('mouseup', function () {
        // Stop speech recognition
        recognition.stop();
    });
} else {
}

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
