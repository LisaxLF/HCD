const navigatieToggle = document.querySelector('.navigatie-open');
const navigatieMenu = document.querySelector('header');
const speachContent = document.querySelector('main');

navigatieToggle.addEventListener('click', function() {
    if (navigatieMenu.style.display === 'none' || !navigatieMenu.style.display) {
        navigatieMenu.style.display = 'flex';
        navigatieMenu.setAttribute('aria-hidden', 'false');
        navigatieToggle.innerHTML = 'Navigatiemenu sluiten';
        speachContent.setAttribute('aria-hidden', 'true');
    } else {
        navigatieMenu.style.display = 'none';
        navigatieMenu.setAttribute('aria-hidden', 'true');
        navigatieToggle.innerHTML = 'Navigatiemenu openen';
    }
});
