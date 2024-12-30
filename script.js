const cardGrid = document.getElementById('card-grid');
const scoreElement = document.getElementById('score');
let score = 0;

const cardImages = [
  'img/doreamon1.jpg',
  'img/doreamon2.jpg',
  'img/doreamon3.jpg',
  'img/doreamon4.png',
  'img/doreamon5.jpg',
  'img/doreamon6.png',
];

let cards = [...cardImages, ...cardImages]; // Double the images to make pairs
let flippedCards = [];
let matchedCards = [];

// Shuffle function
function shuffle(cards) {
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]]; // Swap elements
  }
}

// Initialize the board with shuffled cards
function createBoard() {
  shuffle(cards);
  cards.forEach((image, index) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.setAttribute('data-id', index);

    const img = document.createElement('img');
    img.src = image; // Image path is now directly used here
    card.appendChild(img);

    card.addEventListener('click', () => flipCard(card, image));
    cardGrid.appendChild(card);
  });
}

// Flip the card
function flipCard(card, image) {
  if (card.classList.contains('flipped') || flippedCards.length === 2 || card.classList.contains('matched')) {
    return;
  }

  card.classList.add('flipped');
  flippedCards.push(card);

  // Check for match
  if (flippedCards.length === 2) {
    const [firstCard, secondCard] = flippedCards;

    if (firstCard.querySelector('img').src === secondCard.querySelector('img').src) {
      firstCard.classList.add('matched');
      secondCard.classList.add('matched');
      score++;
      updateScore();

      matchedCards.push(firstCard, secondCard);
      flippedCards = [];

      checkWin();
    } else {
      setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        flippedCards = [];
      }, 1000);
    }
  }
}

// Update score
function updateScore() {
  scoreElement.textContent = score;
}

// Check for win condition
function checkWin() {
  if (matchedCards.length === cards.length) {
    setTimeout(() => {
      alert('Congratulations! You won the game!');
      resetGame();
    }, 500);
  }
}

// Reset the game
function resetGame() {
  matchedCards = [];
  flippedCards = [];
  score = 0;
  updateScore();
  cardGrid.innerHTML = '';
  createBoard();
}

// Initialize the board at the start
createBoard();
