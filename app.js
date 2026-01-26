let currentWords = beginnerWords;
let currentIndex = 0;
let isFinished = false;

const card = document.getElementById('card');
const wordText = document.getElementById('wordText');
const wordTransc = document.getElementById('wordTransc');
const cardBack = document.getElementById('cardBack');
const speakBtn = document.getElementById('speakBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const levelBtns = document.querySelectorAll('.level-btn');
const exampleBtn = document.getElementById('exampleBtn');
const exampleText = document.getElementById('exampleText');

function showCard(index) {
    isFinished = false;
    card.classList.remove('flipped');
    
    if (exampleText) {
        exampleText.classList.add('hidden');
        exampleBtn.textContent = "Context";
    }

    if (index >= currentWords.length) {
        isFinished = true;
        wordText.textContent = "🎉 Вітаємо!";
        wordTransc.textContent = "";
        if (speakBtn) speakBtn.style.display = "none";
        if (exampleBtn) exampleBtn.style.display = "none";
        cardBack.textContent = "Це всі слова на цій складності!";
        card.classList.add('flipped');
        nextBtn.disabled = true;
        return;
    }

    nextBtn.disabled = false;
    if (speakBtn) speakBtn.style.display = "flex";
    if (exampleBtn) exampleBtn.style.display = "block";
    
    wordText.textContent = currentWords[index].wordEng;
    wordTransc.textContent = currentWords[index].transcription || "";
    cardBack.textContent = currentWords[index].wordUA;
    if (exampleText) exampleText.textContent = currentWords[index].example || "";
}

function playAudio() {
    if (isFinished) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(currentWords[currentIndex].wordEng);
    utterance.lang = 'en-US';
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
}

if (speakBtn) {
    speakBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        playAudio();
    });
}

if (exampleBtn) {
    exampleBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        exampleText.classList.toggle('hidden');
        exampleBtn.textContent = exampleText.classList.contains('hidden') ? "Context" : "Hide";
    });
}

card.addEventListener('click', () => {
    if (!isFinished) {
        card.classList.toggle('flipped');
    }
});

levelBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const level = btn.getAttribute('data-level');
        if (level === 'beginner') currentWords = beginnerWords;
        if (level === 'intermediate') currentWords = intermediateWords;
        if (level === 'advanced') currentWords = advancedWords;
        currentIndex = 0;
        showCard(currentIndex);
        updateActiveButton(btn);
    });
});

function updateActiveButton(activeBtn) {
    levelBtns.forEach(b => b.classList.remove('active'));
    activeBtn.classList.add('active');
}

nextBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (currentIndex < currentWords.length) {
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

const defaultBtn = document.querySelector('[data-level="beginner"]');
if (defaultBtn) updateActiveButton(defaultBtn);
showCard(currentIndex);