let savedWords = JSON.parse(localStorage.getItem('savedWords')) || [];
let currentWords = typeof beginnerWords !== 'undefined' ? beginnerWords : [];
let currentIndex = 0;
let isFinished = false;

let currentQuizData = [];
let quizIndex = 0;

const card = document.getElementById('card');
const viewTitle = document.getElementById('view-title');
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
const learningSection = document.getElementById('learning-section');
const quizSection = document.getElementById('quiz-section');
const savedSection = document.getElementById('savedSection');
const openManagerBtn = document.getElementById('openManagerBtn');
const savedTableBody = document.getElementById('savedTableBody');
const burgerBtn = document.getElementById('burgerBtn');
const navMenu = document.getElementById('navMenu');
const toBeAllBtn = document.getElementById('toBeAllBtn');
const pronounsBtn = document.getElementById('pronounsBtn');
const articlesBtn = document.getElementById('articlesBtn');
const theoryToBe = document.getElementById('theory-toBe');
const theoryPronouns = document.getElementById('theory-pronouns');
const theoryArticles = document.getElementById('theory-articles');


function switchView(section, title) {
  [learningSection, quizSection, savedSection].forEach(s => s.classList.add('hidden'));
  section.classList.remove('hidden');
  viewTitle.textContent = title;
  if (window.innerWidth <= 850) {
    burgerBtn.classList.remove('open');
    navMenu.classList.remove('open');
    document.body.classList.remove('menu-open');
  }
}

function updateActiveMenu(btn) {
  document.querySelectorAll('.nav-link, .dropdown-content button').forEach(el => el.classList.remove('active'));
  if (btn) {
    btn.classList.add('active');
    const dropdown = btn.closest('.dropdown');
    if (dropdown) dropdown.querySelector('.nav-link').classList.add('active');
  }
}

function updateUI() {
  if (savedCountLabel) savedCountLabel.textContent = savedWords.length;
  prevBtn.disabled = currentIndex === 0;
  nextBtn.disabled = isFinished;
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
  if (index >= currentWords.length) {
    isFinished = true;
    wordText.textContent = "Вітаємо! 🎉";
    wordTransc.textContent = "";
    cardBack.textContent = "Всі слова пройдено!";
    card.classList.add('flipped');
    updateUI();
    return;
  }
  wordText.textContent = currentWords[index].wordEng;
  wordTransc.textContent = currentWords[index].transcription || "";
  cardBack.textContent = currentWords[index].wordUA;
  exampleText.textContent = currentWords[index].example || "";
  updateUI();
}

function renderSavedTable() {
  savedTableBody.innerHTML = '';
  savedWords.forEach(word => {
    const row = document.createElement('tr');
    row.innerHTML = `<td data-label="English"><b>${word.wordEng}</b></td><td data-label="Українською">${word.wordUA}</td><td data-label="Дія"><button class="delete-cell-btn" onclick="deleteSavedWord(${word.id})">Видалити</button></td>`;
    savedTableBody.appendChild(row);
  });
}

window.deleteSavedWord = function (id) {
  savedWords = savedWords.filter(w => w.id !== id);
  localStorage.setItem('savedWords', JSON.stringify(savedWords));
  renderSavedTable();
  updateUI();
};

function startQuiz(quizArray) {
  quizIndex = 0;
  currentQuizData = [...quizArray].sort(() => Math.random() - 0.5);
  loadQuizQuestion();
}

function loadQuizQuestion() {
  const q = currentQuizData[quizIndex];
  const quizQuestion = document.getElementById('quizQuestion');
  const quizOptions = document.getElementById('quizOptions');
  const quizFeedback = document.getElementById('quizFeedback');
  quizFeedback.innerHTML = `<span style="color: #94a3b8; margin-top: 20px; display: block; text-align: center;">Питання ${quizIndex + 1} з ${currentQuizData.length}</span>`;
  quizQuestion.textContent = q.question;
  quizOptions.innerHTML = "";
  q.options.forEach(opt => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.textContent = opt;
    btn.onclick = () => {
      if (opt === q.answer) {
        btn.classList.add('correct');
        quizFeedback.innerHTML = "✨ Правильно!";
        setTimeout(() => {
          quizIndex++;
          if (quizIndex < currentQuizData.length) loadQuizQuestion();
          else quizQuestion.innerHTML = "🎉 Тренування завершено!";
        }, 800);
      } else {
        btn.classList.add('wrong');
        quizFeedback.innerHTML = "❌ Спробуй ще раз";
      }
    };
    quizOptions.appendChild(btn);
  });
}

if (burgerBtn) {
  burgerBtn.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('open');
    burgerBtn.classList.toggle('open');
    document.body.classList.toggle('menu-open', isOpen);
  });
}

document.querySelectorAll('.nav-item .nav-link').forEach(link => {
  link.addEventListener('click', (e) => {
    if (window.innerWidth <= 850) {
      const parent = link.parentElement;
      if (parent.classList.contains('dropdown')) {
        e.preventDefault();
        parent.classList.toggle('active-mobile');
      }
    }
  });
});

levelBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const level = btn.getAttribute('data-level');
    if (level === 'beginner') currentWords = beginnerWords;
    if (level === 'intermediate') currentWords = intermediateWords;
    if (level === 'advanced') currentWords = advancedWords;
    currentIndex = 0;
    switchView(learningSection, btn.textContent);
    updateActiveMenu(btn);
    showCard(currentIndex);
  });
});

if (toBeAllBtn) {
  toBeAllBtn.addEventListener('click', function () {
    switchView(quizSection, "Тренажер: To Be");
    updateActiveMenu(this);
    if (theoryToBe) theoryToBe.classList.remove('hidden');
    if (theoryPronouns) theoryPronouns.classList.add('hidden');
    if (typeof toBeQuiz !== 'undefined') startQuiz(toBeQuiz);
  });
}

if (pronounsBtn) {
  pronounsBtn.addEventListener('click', function () {
    switchView(quizSection, "Тренажер: Pronouns");
    updateActiveMenu(this);
    if (theoryPronouns) theoryPronouns.classList.remove('hidden');
    if (theoryToBe) theoryToBe.classList.add('hidden');
    if (typeof pronounsQuiz !== 'undefined') startQuiz(pronounsQuiz);
  });
}

if (articlesBtn) {
  articlesBtn.addEventListener('click', function () {
    switchView(quizSection, "Тренажер: Артиклі");
    updateActiveMenu(this);
    document.getElementById('theory-articles').classList.remove('hidden');
    document.getElementById('theory-toBe').classList.add('hidden');
    document.getElementById('theory-pronouns').classList.add('hidden');
    document.getElementById('quiz-game-container').classList.remove('hidden');
    
    if (typeof articlesQuiz !== 'undefined') startQuiz(articlesQuiz);
  });
}

if (showSavedBtn) {
  showSavedBtn.addEventListener('click', () => {
    currentWords = savedWords;
    currentIndex = 0;
    switchView(learningSection, "Обране");
    updateActiveMenu(showSavedBtn);
    showCard(currentIndex);
  });
}

if (openManagerBtn) {
  openManagerBtn.addEventListener('click', () => {
    renderSavedTable();
    switchView(savedSection, "Мій словник");
    updateActiveMenu(openManagerBtn);
  });
}

if (speakBtn) {
  speakBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    window.speechSynthesis.cancel();
    if (currentWords[currentIndex]) {
      const u = new SpeechSynthesisUtterance(currentWords[currentIndex].wordEng);
      u.lang = 'en-US';
      window.speechSynthesis.speak(u);
    }
  });
}

nextBtn.addEventListener('click', () => { 
  if (currentIndex < currentWords.length) { 
    currentIndex++; 
    showCard(currentIndex); 
  }
});

prevBtn.addEventListener('click', () => { 
  if (currentIndex > 0) { 
    currentIndex--; 
    showCard(currentIndex); 
  } 
});

if (card) card.addEventListener('click', () => { if (!isFinished) card.classList.toggle('flipped'); });

if (exampleBtn) {
  exampleBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    exampleText.classList.toggle('hidden');
    exampleBtn.textContent = exampleText.classList.contains('hidden') ? "Context" : "Hide";
  });
}

if (favoriteBtn) {
  favoriteBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const word = currentWords[currentIndex];
    if (!word) return;
    const idx = savedWords.findIndex(w => w.id === word.id);
    if (idx === -1) {
      savedWords = [...savedWords, { ...word }];
    } else {
      savedWords = savedWords.filter(w => w.id !== word.id);
    }
    localStorage.setItem('savedWords', JSON.stringify(savedWords));
    updateUI();
  });
}

const initialBtn = document.querySelector('[data-level="beginner"]');
if (initialBtn) {
  updateActiveMenu(initialBtn);
  showCard(currentIndex);
}