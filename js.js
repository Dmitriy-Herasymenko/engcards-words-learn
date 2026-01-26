
const words = [
  {id: 1, wordEng: "hello", wordUA: "привіт"},
  {id: 2, wordEng: "thank you", wordUA: "дякую"},
  {id: 3, wordEng: "please", wordUA: "будь ласка (прохання)"},
  {id: 4, wordEng: "you're welcome", wordUA: "будь ласка (відповідь)"},
  {id: 5, wordEng: "excuse me", wordUA: "перепрошую"},
  {id: 6, wordEng: "sorry", wordUA: "вибачте"},
  {id: 7, wordEng: "yes", wordUA: "так"},
  {id: 8, wordEng: "no", wordUA: "ні"},
  {id: 9, wordEng: "maybe", wordUA: "можливо"},
  {id: 10, wordEng: "goodbye", wordUA: "до побачення"},
  {id: 11, wordEng: "help", wordUA: "допомога"},
  {id: 12, wordEng: "I don't know", wordUA: "я не знаю"},
  {id: 13, wordEng: "I understand", wordUA: "я розумію"},
  {id: 14, wordEng: "I don't understand", wordUA: "я не розумію"},
  {id: 15, wordEng: "what", wordUA: "що / який"},
  {id: 16, wordEng: "where", wordUA: "де / куди"},
  {id: 17, wordEng: "when", wordUA: "коли"},
  {id: 18, wordEng: "why", wordUA: "чому"},
  {id: 19, wordEng: "who", wordUA: "хто"},
  {id: 20, wordEng: "how", wordUA: "як"},
  {id: 21, wordEng: "how much", wordUA: "скільки (ціна)"},
  {id: 22, wordEng: "how many", wordUA: "скільки (кількість)"},
  {id: 23, wordEng: "what time is it", wordUA: "котра година"},
  {id: 24, wordEng: "where is", wordUA: "де знаходиться"},
  {id: 25, wordEng: "I need", wordUA: "мені потрібно"},
  {id: 26, wordEng: "I want", wordUA: "я хочу"},
  {id: 27, wordEng: "I'd like", wordUA: "я б хотів"},
  {id: 28, wordEng: "can I", wordUA: "можна мені / чи можу я"},
  {id: 29, wordEng: "could you", wordUA: "не могли б ви"},
  {id: 30, wordEng: "give me", wordUA: "дайте мені"},
  {id: 31, wordEng: "show me", wordUA: "покажіть мені"},
  {id: 32, wordEng: "wait", wordUA: "чекати"},
  {id: 33, wordEng: "look", wordUA: "дивитися"},
  {id: 34, wordEng: "listen", wordUA: "слухати"},
  {id: 35, wordEng: "stop", wordUA: "зупинитися"},
  {id: 36, wordEng: "go", wordUA: "йти / їхати"},
  {id: 37, wordEng: "come", wordUA: "приходити"},
  {id: 38, wordEng: "eat", wordUA: "їсти"},
  {id: 39, wordEng: "drink", wordUA: "пити"},
  {id: 40, wordEng: "sleep", wordUA: "спати"},
  {id: 41, wordEng: "buy", wordUA: "купувати"},
  {id: 42, wordEng: "sell", wordUA: "продавати"},
  {id: 43, wordEng: "open", wordUA: "відчинено"},
  {id: 44, wordEng: "closed", wordUA: "зачинено"},
  {id: 45, wordEng: "push", wordUA: "від себе"},
  {id: 46, wordEng: "pull", wordUA: "на себе"},
  {id: 47, wordEng: "today", wordUA: "сьогодні"},
  {id: 48, wordEng: "tomorrow", wordUA: "завтра"},
  {id: 49, wordEng: "yesterday", wordUA: "вчора"},
  {id: 50, wordEng: "now", wordUA: "зараз"},
  {id: 51, wordEng: "later", wordUA: "пізніше"},
  {id: 52, wordEng: "always", wordUA: "завжди"},
  {id: 53, wordEng: "never", wordUA: "ніколи"},
  {id: 54, wordEng: "often", wordUA: "часто"},
  {id: 55, wordEng: "sometimes", wordUA: "інколи"},
  {id: 56, wordEng: "good", wordUA: "добре / хороший"},
  {id: 57, wordEng: "bad", wordUA: "погано / поганий"},
  {id: 58, wordEng: "hot", wordUA: "гарячий / жарко"},
  {id: 59, wordEng: "cold", wordUA: "холодний / холодно"},
  {id: 60, wordEng: "big", wordUA: "великий"},
  {id: 61, wordEng: "small", wordUA: "маленький"},
  {id: 62, wordEng: "fast", wordUA: "швидко"},
  {id: 63, wordEng: "slow", wordUA: "повільно"},
  {id: 64, wordEng: "easy", wordUA: "легко"},
  {id: 65, wordEng: "difficult", wordUA: "важко"},
  {id: 66, wordEng: "cheap", wordUA: "дешево"},
  {id: 67, wordEng: "expensive", wordUA: "дорого"},
  {id: 68, wordEng: "new", wordUA: "новий"},
  {id: 69, wordEng: "old", wordUA: "старий"},
  {id: 70, wordEng: "beautiful", wordUA: "красивий"},
  {id: 71, wordEng: "happy", wordUA: "щасливий"},
  {id: 72, wordEng: "sad", wordUA: "сумний"},
  {id: 73, wordEng: "tired", wordUA: "втомлений"},
  {id: 74, wordEng: "hungry", wordUA: "голодний"},
  {id: 75, wordEng: "thirsty", wordUA: "хоче пити"},
  {id: 76, wordEng: "ready", wordUA: "готовий"},
  {id: 77, wordEng: "here", wordUA: "тут"},
  {id: 78, wordEng: "there", wordUA: "там"},
  {id: 79, wordEng: "left", wordUA: "ліворуч"},
  {id: 80, wordEng: "right", wordUA: "праворуч / правильно"},
  {id: 81, wordEng: "straight", wordUA: "прямо"},
  {id: 82, wordEng: "early", wordUA: "рано"},
  {id: 83, wordEng: "late", wordUA: "пізно"},
  {id: 84, wordEng: "very", wordUA: "дуже"},
  {id: 85, wordEng: "too", wordUA: "занадто / також"},
  {id: 86, wordEng: "enough", wordUA: "достатньо"},
  {id: 87, wordEng: "and", wordUA: "і / та"},
  {id: 88, wordEng: "but", wordUA: "але"},
  {id: 89, wordEng: "or", wordUA: "або"},
  {id: 90, wordEng: "because", wordUA: "тому що"},
  {id: 91, wordEng: "with", wordUA: "з"},
  {id: 92, wordEng: "without", wordUA: "без"},
  {id: 93, wordEng: "about", wordUA: "про"},
  {id: 94, wordEng: "for", wordUA: "для"},
  {id: 95, wordEng: "from", wordUA: "від / з"},
  {id: 96, wordEng: "to", wordUA: "до / напрямок"},
  {id: 97, wordEng: "at", wordUA: "в (точці) / біля"},
  {id: 98, wordEng: "on", wordUA: "на"},
  {id: 99, wordEng: "in", wordUA: "в (всередині)"},
  {id: 100, wordEng: "by the way", wordUA: "до речі"}
];

    let currentIndex = 0;
    const card = document.getElementById('card');
    const cardFront = document.getElementById('cardFront');
    const cardBack = document.getElementById('cardBack');

    function getRandomIndex() {
      return Math.floor(Math.random() * words.length);
    }

    function showCard(index) {
      card.classList.remove('flipped'); 
      cardFront.textContent = words[index].wordEng;
      cardBack.textContent = words[index].wordUA;
    }

    card.addEventListener('click', () => {
      card.classList.toggle('flipped');
    });

    document.getElementById('prevBtn').addEventListener('click', () => {
      currentIndex = getRandomIndex();
      showCard(currentIndex);
    });

    document.getElementById('nextBtn').addEventListener('click', () => {
      currentIndex = getRandomIndex();
      showCard(currentIndex);
    });


    currentIndex = getRandomIndex();
    showCard(currentIndex);
