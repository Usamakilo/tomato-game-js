let question = "";
let solution = -1;
let score = 0;
let timerInterval;
const inputForm = document.getElementById("inputForm");
const input = document.getElementById("input");
const newGameButton = document.getElementById("newGameButton");
const scoreElement = document.getElementById("score");
const secondsElement = document.getElementById("seconds");
const questionImage = document.getElementById("question");
const resultMessageElement = document.getElementById("result-message");
const loadingSpinner = document.getElementById("loading-spinner");

const newGame = () => {
  initGame();
  resultMessageElement.innerText = "";
};

const onSubmit = (e) => {
  e.preventDefault();
  clearInterval(timerInterval);

  if (input.value == solution) {
    score++;
    resultMessageElement.innerText = "Correct!";
  } else {
    score--;
    resultMessageElement.innerText = "Incorrect!";
  }

  updateScore();
  displayResult();
};

const startGame = (data) => {
  newGameButton.style.display = "none";
  inputForm.style.display = "block";
  inputForm.reset();
  ({ question, solution } = data);
  loadingSpinner.classList.add("hidden");
  questionImage.src = question;
  countdownTimer();
};

const showLoading = () => {
  loadingSpinner.classList.remove("hidden");
};

const fetchQuestion = async () => {
  try {
    showLoading();
    const response = await fetch("https://marcconrad.com/uob/tomato/api.php");
    const data = await response.json();
    startGame(data);
  } catch (error) {
    console.error("Error fetching question:", error);
    loadingSpinner.classList.add("hidden");
  }
};

const initGame = () => {
  fetchQuestion();
  resultMessageElement.innerText = "";
};

const countdownTimer = () => {
  let seconds = 30;

  timerInterval = setInterval(() => {
    secondsElement.innerText = seconds;

    if (seconds === 0) {
      clearInterval(timerInterval);
      handleTimeout();
    } else {
      seconds--;
    }
  }, 1000);
};

const handleTimeout = () => {
  resultMessageElement.innerText =
    "Time's up! The correct answer is " + solution;
  score--;
  inputForm.style.display = "none";
  newGameButton.style.display = "block";
  updateScore();
};

const updateScore = () => {
  scoreElement.innerText = score;
};

const displayResult = () => {
  inputForm.style.display = "none";
  newGameButton.style.display = "block";
};

initGame();
inputForm.addEventListener("submit", onSubmit);
newGameButton.addEventListener("click", newGame);
