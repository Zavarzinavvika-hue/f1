let selectedFood = "";

const btnStart = document.getElementById('btn-start');
const btnRunaway = document.getElementById('btn-runaway');
const btnNext2 = document.getElementById('btn-next-2');
const btnNext3 = document.getElementById('btn-next-3');
const btnNext4 = document.getElementById('btn-next-4');
const btnMemeBack = document.getElementById('btn-meme-back');

const foodCards = document.querySelectorAll('.food-card-item');

function openScreen(currentId, nextId) {
    document.getElementById(currentId).classList.remove('active');
    document.getElementById(nextId).classList.add('active');
    
    const container = document.querySelector('.game-container');
    if (nextId === 'screen-2' || nextId === 'screen-meme') {
        container.classList.add('yellow-alert');
    } else {
        container.classList.remove('yellow-alert');
    }

    if (nextId === 'screen-1') {
        document.body.className = 'bg-page-1';
    } else if (nextId === 'screen-2' || nextId === 'screen-meme') {
        document.body.className = 'bg-page-2';
    } else {
        document.body.className = 'bg-page-3';
    }

    // Автоматически прокручиваем страницу наверх при смене экрана на телефоне
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ЭКРАН 1 -> ЭКРАН 2
btnStart.addEventListener('click', () => openScreen('screen-1', 'screen-2'));

// УБЕГАЮЩАЯ КНОПКА (ПК + Телефон)
function moveRunawayButton(e) {
    if (e) e.preventDefault();
    const container = document.querySelector('.game-container');
    
    const randomX = Math.floor(Math.random() * (container.clientWidth - btnRunaway.clientWidth - 40)) + 20;
    const randomY = Math.floor(Math.random() * (container.clientHeight - btnRunaway.clientHeight - 60)) + 20;
    
    btnRunaway.style.position = 'absolute';
    btnRunaway.style.left = randomX + 'px';
    btnRunaway.style.top = randomY + 'px';
}

btnRunaway.addEventListener('mouseover', moveRunawayButton);
btnRunaway.addEventListener('touchstart', moveRunawayButton);
btnRunaway.addEventListener('click', (e) => {
    e.preventDefault();
    openScreen('screen-2', 'screen-meme');
});

// НАЗАД ИЗ МЕМА
btnMemeBack.addEventListener('click', () => openScreen('screen-meme', 'screen-2'));

// ЭКРАН 2 -> ЭКРАН 3
btnNext2.addEventListener('click', () => openScreen('screen-2', 'screen-3'));

// НАДЕЖНЫЙ ВЫБОР ЕДЫ (Поддерживает и клики мышей, и тапы пальцем)
foodCards.forEach(card => {
    const handleFoodSelect = (e) => {
        e.preventDefault();
        foodCards.forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        
        selectedFood = card.getAttribute('data-food');
        btnNext3.disabled = false;
    };

    card.addEventListener('click', handleFoodSelect);
    card.addEventListener('touchend', handleFoodSelect);
});

// ЭКРАН 3 -> ЭКРАН 4
btnNext3.addEventListener('click', () => openScreen('screen-3', 'screen-4'));

// ЭКРАН 4 -> ЭКРАН 5 (ФИНАЛ)
btnNext4.addEventListener('click', () => {
    const dateInput = document.getElementById('date-picker').value;
    const timeInput = document.getElementById('time-picker').value;

    if (!dateInput || !timeInput) {
        alert("Пилот! Сначала настройте тайминг квалификации (выберите дату и время)!");
        return;
    }

    const dateParts = dateInput.split('-');
    const formattedDate = `${dateParts[2]}.${dateParts[1]}.${dateParts[0]}`;

    document.getElementById('final-date').innerText = formattedDate;
    document.getElementById('final-time').innerText = timeInput;
    document.getElementById('final-food').innerText = selectedFood;

    openScreen('screen-4', 'screen-5');
});

// Инициализация при старте
document.body.className = 'bg-page-1';
