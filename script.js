'use strict';

// Pemilihan Element
const diceEl = document.querySelector('.dice'); // Gambar Dadu
const player0El = document.querySelector('.player--0'); // Player1
const player1El = document.querySelector('.player--1'); // Player2
const curent0El = document.getElementById('current--0'); // Current Score1
const curent1El = document.getElementById('current--1'); // Current Score2
const score0El = document.querySelector('#score--0'); // Score Total1
const score1El = document.getElementById('score--1'); // Score Total2
const btnRoll = document.querySelector('.btn--roll'); // Tombol Roll
const btnNew = document.querySelector('.btn--new'); // Tombol New
const btnHold = document.querySelector('.btn--hold'); // Tombol Hold
let score, curentScore, activePlayer, playing;

/* Function Saction */
// 1. Kondisi Awal
function startKondisi() {
  score = [0, 0];
  curentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  curent0El.textContent = 0;
  curent1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
}

// 2. Switcing Player
function switcPlayer() {
  // riset curent score to 0
  curentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent = curentScore;
  // switc to next player
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
}

/* PROGAM */
// Kondisi Awal
startKondisi();

// Rolling dice fungsionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    // Generate random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    // Display dice roll
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    // Contional (Chack for rolled 1)
    if (dice !== 1) {
      // add dice to curentScore
      curentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        curentScore;
    } else {
      switcPlayer();
    }
  }
});

/* Tombol Hold */
btnHold.addEventListener('click', function () {
  if (playing) {
    // 1. Add currentScore to Total Score
    score[activePlayer] += curentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      score[activePlayer];

    // 2. Chack if player's score >= 100
    if (score[activePlayer] >= 100) {
      // Finish the game
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      // Switc the next player
      switcPlayer();
    }
  }
});

// Tombol new
btnNew.addEventListener('click', startKondisi);
