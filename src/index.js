import { createScore, getAll } from './modules/apiRequest.js';
import './styles.css';

const scoreListElement = document.querySelector('.score-list');
const refreshButton = document.querySelector('.refresh');
const nameInput = document.querySelector('#name-input');
const scoreInput = document.querySelector('#score-input');
const form = document.querySelector('form');

// Refresh scores
const refresh = async () => {
  scoreListElement.innerHTML = '';
  const scores = await getAll();
  scores.forEach((score, index) => {
    const scoreElement = document.createElement('li');
    scoreElement.classList.add('score');
    if (index % 2 !== 0) {
      scoreElement.classList.add('score-grey');
    }
    scoreElement.innerHTML = ` <p>${score.user}: ${score.score}</p>`;
    scoreListElement.appendChild(scoreElement);
  });
};

refreshButton.addEventListener('click', refresh);

const submit = async () => {
  const data = {
    user: nameInput.value,
    score: Number(scoreInput.value),
  };
  await createScore(data);
  refresh();
};

form.addEventListener('submit', (e) => {
  e.preventDefault();
  submit();
  nameInput.value = '';
  scoreInput.value = '';
});
