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

/**
 * function to start the new game
 */
const newGame = () => {
  initGame();
  resultMessageElement.innerText = "";
};

/**
 *
 * @param {SubmitEvent} e
 * this function gets called when user press enters or
 * click the submit button. It checks if the provided input
 * is the correct solution and based on that updates the score.
 * It also stops the timer if the answers is correct or wrong.
 */
const onSubmit = (e) => {
  e.preventDefault(); // used for preventing the page reload on form submission
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

/**
 *
 * @param {*}} data
 * function displays the form and and extracts the
 * question and solution from the tomato api response
 * . It display the question image and starts the timer.
 */
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

/**
 * Function to fetch the new question from tomato api
 * and displays hide the loading spinner.
 * this function throws error in case of any failure
 * while fetching teh data from tomato api
 */
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

/**
 * Function to start the game
 */
const initGame = () => {
  fetchQuestion();
  resultMessageElement.innerText = "";
};

/**
 * Function to start and display timer of 30 seconds
 */
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

/**
 * Function displays the time out message on screen
 * with the correct answer, also updates the score
 */
const handleTimeout = () => {
  resultMessageElement.innerText =
    "Time's up! The correct answer is " + solution;
  score--;
  displayResult();
  updateScore();
};

/**
 * Function to display the current score
 */
const updateScore = () => {
  scoreElement.innerText = score;
};

/**
 * Function to dispaly/hide input form and new game button
 * on every correct/incorrect/time's up.
 */
const displayResult = () => {
  inputForm.style.display = "none";
  newGameButton.style.display = "block";
};

// Starting the game
initGame();

// binding event listeners to their respetive dom element
inputForm.addEventListener("submit", onSubmit);
newGameButton.addEventListener("click", newGame);
