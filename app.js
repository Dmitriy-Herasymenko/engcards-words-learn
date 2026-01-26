let savedWords = JSON.parse(localStorage.getItem('savedWords')) || [];
let currentWords = beginnerWords;
let currentIndex = 0;
let isFinished = false;

const card = document.getElementById('card');
const cardContainer = document.querySelector('.card-container');
const actionButtons = document.querySelector('.buttons');
const wordText = document.getElementById('wordText');
const wordTransc = document.getElementById('wordTransc');
const cardBack = document.getElementById('cardBack');
const speakBtn = document.getElementById('speakBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const levelBtns = document.querySelectorAll('.level-btn');
const exampleBtn = document.getElementById('exampleBtn');
const exampleText = document.getElementById('exampleText');
const favoriteBtn = document.getElementById('favoriteBtn');
const showSavedBtn = document.getElementById('showSavedBtn');
const savedCountLabel = document.getElementById('savedCount');
const savedSection = document.getElementById('savedSection');
const savedTableBody = document.getElementById('savedTableBody');
const openManagerBtn = document.getElementById('openManagerBtn');
const closeSectionBtn = document.getElementById('closeSectionBtn');

function updateUI() {
    if (savedCountLabel) savedCountLabel.textContent = savedWords.length;
    if (favoriteBtn && !isFinished && currentWords[currentIndex]) {
        const isSaved = savedWords.some(w => w.id === currentWords[currentIndex].id);
        favoriteBtn.classList.toggle('active', isSaved);
    }
}

function showCard(index) {
    isFinished = false;
    card.classList.remove('flipped');
    exampleText.classList.add('hidden');
    exampleBtn.textContent = "Context";

    if (index >= currentWords.length || currentWords.length === 0) {
        isFinished = true;
        wordText.textContent = currentWords.length === 0 ? "Порожньо" : "🎉 Вітаємо!";
        wordTransc.textContent = "";
        speakBtn.style.display = "none";
        exampleBtn.style.display = "none";
        favoriteBtn.style.display = "none";
        cardBack.textContent = currentWords.length === 0 ? "Слова відсутні" : "Це всі слова!";
        card.classList.add('flipped');
        nextBtn.disabled = true;
        updateUI();
        return;
    }

    nextBtn.disabled = false;
    speakBtn.style.display = "flex";
    exampleBtn.style.display = "block";
    favoriteBtn.style.display = "block";
    
    wordText.textContent = currentWords[index].wordEng;
    wordTransc.textContent = currentWords[index].transcription || "";
    cardBack.textContent = currentWords[index].wordUA;
    exampleText.textContent = currentWords[index].example || "";
    
    updateUI();
}

function renderSavedTable() {
    savedTableBody.innerHTML = '';
    if (savedWords.length === 0) {
        savedTableBody.innerHTML = '<tr><td colspan="4" style="text-align:center; padding:20px; color:#94a3b8;">Ваш словник порожній</td></tr>';
        return;
    }
    savedWords.forEach(word => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td data-label="English"><b>${word.wordEng}</b></td>
            <td data-label="Українською">${word.wordUA}</td>
            <td data-label="Дія"><button class="delete-cell-btn" onclick="deleteSavedWord(${word.id})">Видалити</button></td>
        `;
        savedTableBody.appendChild(row);
    });
}

window.deleteSavedWord = function(id) {
    savedWords = savedWords.filter(w => w.id !== id);
    localStorage.setItem('savedWords', JSON.stringify(savedWords));
    renderSavedTable();
    updateUI();
    if (currentWords === savedWords) {
        if (currentIndex >= savedWords.length) currentIndex = Math.max(0, savedWords.length - 1);
        showCard(currentIndex);
    }
};

function toggleMainMode(show) {
    if (show) {
        cardContainer.style.display = 'block';
        actionButtons.style.display = 'flex';
        savedSection.classList.add('hidden');
    } else {
        cardContainer.style.display = 'none';
        actionButtons.style.display = 'none';
        savedSection.classList.remove('hidden');
    }
}

speakBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(currentWords[currentIndex].wordEng);
    u.lang = 'en-US';
    window.speechSynthesis.speak(u);
});

exampleBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    exampleText.classList.toggle('hidden');
    exampleBtn.textContent = exampleText.classList.contains('hidden') ? "Context" : "Hide";
});

favoriteBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const currentWord = currentWords[currentIndex];
    const indexInSaved = savedWords.findIndex(w => w.id === currentWord.id);
    if (indexInSaved === -1) savedWords.push(currentWord);
    else savedWords.splice(indexInSaved, 1);
    localStorage.setItem('savedWords', JSON.stringify(savedWords));
    updateUI();
});

card.addEventListener('click', () => { if (!isFinished) card.classList.toggle('flipped'); });

levelBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const level = btn.getAttribute('data-level');
        if (level === 'beginner') currentWords = beginnerWords;
        else if (level === 'intermediate') currentWords = intermediateWords;
        else if (level === 'advanced') currentWords = advancedWords;
        currentIndex = 0;
        toggleMainMode(true);
        showCard(currentIndex);
        updateActiveButton(btn);
    });
});

showSavedBtn.addEventListener('click', () => {
    currentWords = savedWords;
    currentIndex = 0;
    toggleMainMode(true);
    showCard(currentIndex);
    updateActiveButton(showSavedBtn);
});

openManagerBtn.addEventListener('click', () => {
    renderSavedTable();
    toggleMainMode(false);
    updateActiveButton(openManagerBtn);
});

closeSectionBtn.addEventListener('click', () => {
    toggleMainMode(true);
    const beginnerBtn = document.querySelector('[data-level="beginner"]');
    beginnerBtn.click(); 
});

function updateActiveButton(activeBtn) {
    levelBtns.forEach(b => b.classList.remove('active'));
    showSavedBtn.classList.remove('active');
    openManagerBtn.classList.remove('active');
    activeBtn.classList.add('active');
}

nextBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (currentIndex < currentWords.length - 1) {
        currentIndex++;
        showCard(currentIndex);
    }
});

prevBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (currentIndex > 0) {
        currentIndex--;
        showCard(currentIndex);
    }
});


const initialBtn = document.querySelector('[data-level="beginner"]');
updateActiveButton(initialBtn); 
showCard(currentIndex); 