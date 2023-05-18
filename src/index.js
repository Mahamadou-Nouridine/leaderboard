import { createScore, getAll } from './modules/apiRequest.js';
import './styles.css';

const scoreListElement = document.querySelector('.score-list');
const refreshButton = document.querySelector('.refresh');
const nameInput = document.querySelector('#name-input');
const scoreInput = document.querySelector('#score-input');
const form = document.querySelector('form');
const popup = document.querySelector('.popup');

const togglePopup = (element) => {
  popup.innerHTML = element;
  popup.classList.add('popup-open');
  setTimeout(() => {
    popup.classList.remove('popup-open');
  }, 3000);
};

// Refresh scores
const refresh = async () => {
  const scores = await getAll();
  scoreListElement.innerHTML = '';
  scores.forEach((score, index) => {
    const scoreElement = document.createElement('li');
    scoreElement.classList.add('score');
    if (index % 2 !== 0) {
      scoreElement.classList.add('score-grey');
    }
    scoreElement.innerHTML = ` <p>${score.user}: ${score.score}</p>`;
    scoreListElement.appendChild(scoreElement);
  });
  return scores;
};

const loadData = async () => {
  const scores = await refresh();
  const popupElement = `
  <h3>Refresh</h3>
        <p>
            Loaded scores: ${scores.length} <br>
        </p>
  `;
  togglePopup(popupElement);
};

refreshButton.addEventListener('click', loadData);

const submit = async () => {
  const data = {
    user: nameInput.value,
    score: Number(scoreInput.value),
  };
  await createScore(data);
  await refresh();
  const popupElement = `
  <h3>One Score added</h3>
        <p>
            Player: ${nameInput.value} <br>
            Score: ${scoreInput.value}
        </p>
  `;
  togglePopup(popupElement);
};

form.addEventListener('submit', (e) => {
  e.preventDefault();
  submit().then(() => {
    nameInput.value = '';
    scoreInput.value = '';
  });
});

loadData();
