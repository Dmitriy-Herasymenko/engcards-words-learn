export const BUDGET = 35

export const CHARACTERS = {
  waiter: {
    name: 'Waiter',
    photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Busy_Waiter.jpg/250px-Busy_Waiter.jpg',
  },
  date: {
    name: 'Your date',
    photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Smiling_Japanese_Woman.jpg/250px-Smiling_Japanese_Woman.jpg',
  },
}

export const DISHES = {
  lemonade:    { name: 'Lemonade',            price: 4,  hint: '🥤 Order a cold lemon drink',                  img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Lemonade_-_27682817724.jpg/250px-Lemonade_-_27682817724.jpg' },
  orangeJuice: { name: 'Orange Juice',        price: 5,  hint: '🥤 Order a fresh orange juice',                img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Orangejuice.jpg/250px-Orangejuice.jpg' },
  coffee:      { name: 'Cappuccino',          price: 5,  hint: '☕ Order a hot cappuccino',                     img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Cappuccino_in_original.jpg/250px-Cappuccino_in_original.jpg' },
  soup:        { name: 'Tomato Soup',         price: 6,  hint: '🥣 Order a warm tomato soup to start',          img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Tomato_soup%2C_plant-based_%2844040252791%29.jpg/250px-Tomato_soup%2C_plant-based_%2844040252791%29.jpg' },
  salad:       { name: 'Caesar Salad',        price: 7,  hint: '🥗 Order a fresh Caesar salad to start',        img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Caesar_salad_%282%29.jpg/250px-Caesar_salad_%282%29.jpg' },
  pizza:       { name: 'Pizza Margherita',    price: 12, hint: '🍕 Order a cheesy Italian pizza',               img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Pizza_Margherita_stu_spivack.jpg/250px-Pizza_Margherita_stu_spivack.jpg' },
  burger:      { name: 'Cheeseburger',        price: 11, hint: '🍔 Order a juicy cheeseburger',                 img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Cheeseburger.jpg/250px-Cheeseburger.jpg' },
  carbonara:   { name: 'Spaghetti Carbonara', price: 13, hint: '🍝 Order Italian pasta with bacon and egg',     img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Espaguetis_carbonara.jpg/250px-Espaguetis_carbonara.jpg' },
  steak:       { name: 'Beef Steak',          price: 18, hint: '🥩 Order a grilled beef steak',                 img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Beef_fillet_steak_with_mushrooms.jpg/250px-Beef_fillet_steak_with_mushrooms.jpg' },
  tiramisu:    { name: 'Tiramisu',            price: 6,  hint: '🍰 Order a coffee-flavoured Italian dessert',   img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Tiramisu_-_Raffaele_Diomede.jpg/250px-Tiramisu_-_Raffaele_Diomede.jpg' },
  iceCream:    { name: 'Ice Cream',           price: 5,  hint: '🍨 Order a sweet cold ice cream',               img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Ice_cream_with_whipped_cream%2C_chocolate_syrup%2C_and_a_wafer_%28cropped%29.jpg/250px-Ice_cream_with_whipped_cream%2C_chocolate_syrup%2C_and_a_wafer_%28cropped%29.jpg' },
  fries:       { name: 'French Fries',        price: 4,  hint: null,                                            img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/French_Fries.JPG/250px-French_Fries.JPG' },
}

export const RESTAURANT_STEPS = [
  {
    type: 'line', speaker: 'waiter',
    text: 'Good evening! Table for two?',
    retry: "Sorry, I didn't quite catch that. Could you say it again?",
    choices: [
      { text: 'Yes, a table for two, please.', correct: true },
      { text: 'Yes, two tables please me.', correct: false },
      { text: 'Table for two please yes.', correct: false },
    ],
  },
  {
    type: 'line', speaker: 'date',
    text: 'This place looks lovely!',
    retry: 'Sorry, what was that?',
    choices: [
      { text: "I know, I've heard great things about it.", correct: true },
      { text: 'I know, I have hear great things about it.', correct: false },
      { text: 'I know, I am hearing great things it.', correct: false },
    ],
  },
  {
    type: 'line', speaker: 'waiter',
    text: 'Here are your menus. Can I get you started with something to drink?',
    retry: 'Sorry, could you repeat that, please?',
    choices: [
      { text: 'Yes, please — that would be great.', correct: true },
      { text: 'Yes, please — that will be great.', correct: false },
      { text: 'Yes please that would being great.', correct: false },
    ],
  },
  {
    type: 'menu', speaker: 'waiter',
    pool: ['lemonade', 'orangeJuice', 'coffee'],
    retry: "Hmm, that's not quite what I have in mind — try again!",
  },
  {
    type: 'line', speaker: 'waiter',
    text: 'Great choice! Are you ready to order, or do you need a few more minutes?',
    retry: 'Sorry, one more time, please?',
    choices: [
      { text: 'We need a few more minutes, thank you.', correct: true },
      { text: 'We needs a few minutes more.', correct: false },
      { text: 'We need few more minutes, thanks.', correct: false },
    ],
  },
  {
    type: 'line', speaker: 'date',
    text: "I think I'll start with something light.",
    retry: 'Sorry, could you say that again?',
    choices: [
      { text: 'That sounds good, I might have a starter too.', correct: true },
      { text: 'That sound good, I might having a starter too.', correct: false },
      { text: 'That sounds good, I might had a starter too.', correct: false },
    ],
  },
  {
    type: 'menu', speaker: 'waiter',
    pool: ['soup', 'salad'],
    retry: "That's not the one — give it another try!",
  },
  {
    type: 'line', speaker: 'waiter',
    text: 'Excellent choice. And are you ready to order your main course?',
    retry: 'Sorry, could you repeat your order?',
    choices: [
      { text: 'Yes, we are ready to order now.', correct: true },
      { text: 'Yes, we is ready to order now.', correct: false },
      { text: 'Yes, we ready order now.', correct: false },
    ],
  },
  {
    type: 'menu', speaker: 'waiter',
    pool: ['pizza', 'burger', 'carbonara', 'steak'],
    retry: "Not quite what I'm after — try another dish!",
  },
  {
    type: 'line', speaker: 'waiter',
    text: 'Would you like anything else with that?',
    retry: 'Sorry, say that again?',
    choices: [
      { text: "No, thank you, that's all for now.", correct: true },
      { text: 'No, thanks, that is all now for.', correct: false },
      { text: 'No, thank, that all is for now.', correct: false },
    ],
  },
  {
    type: 'line', speaker: 'date',
    text: "This looks delicious. How's yours?",
    retry: 'Sorry, what did you say?',
    choices: [
      { text: "It's really tasty, thank you!", correct: true },
      { text: "It's really tasty, thanks you!", correct: false },
      { text: 'It is really tasty, thank!', correct: false },
    ],
  },
  {
    type: 'line', speaker: 'waiter',
    text: 'Would you like to see our dessert menu?',
    retry: 'Sorry, once more, please?',
    choices: [
      { text: 'Yes, please, that would be lovely.', correct: true },
      { text: 'Yes, please, that will be lovely.', correct: false },
      { text: 'Yes, please, that would lovely be.', correct: false },
    ],
  },
  {
    type: 'menu', speaker: 'waiter',
    pool: ['tiramisu', 'iceCream'],
    retry: "That's not it — have another look!",
  },
  {
    type: 'line', speaker: 'waiter',
    text: 'Would you like anything else, or just the bill?',
    retry: 'Sorry, could you say that once more?',
    choices: [
      { text: 'Just the bill, please.', correct: true },
      { text: 'Just bill the, please.', correct: false },
      { text: 'Just the bill, please me.', correct: false },
    ],
  },
  {
    type: 'line', speaker: 'waiter',
    text: "Here's your bill. How would you like to pay?",
    retry: 'Sorry, how would you like to pay?',
    choices: [
      { text: "I'll pay by card, thank you.", correct: true },
      { text: "I'll pay with card, thank you.", correct: false },
      { text: 'I pay will by card, thank you.', correct: false },
    ],
  },
  {
    type: 'line', speaker: 'date',
    text: 'Thank you for a wonderful evening!',
    retry: 'Sorry, what was that?',
    choices: [
      { text: "It was my pleasure, let's do this again soon.", correct: true },
      { text: 'It was my pleasure, let we do this again soon.', correct: false },
      { text: "It's was my pleasure, let's this do again soon.", correct: false },
    ],
  },
]
