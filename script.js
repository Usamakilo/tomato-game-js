var question = "";
var solution = -1;

const newGame = () => {
  initGame();
};

const handleInput = (x) => {
  let inp = document.getElementById("input");
  if (inp.value == solution) {
    console.log("Correct!");
    newGame();
  } else {
    console.log("Incorrect!");
  }
};

const startGame = (data) => {
  question = data.question;
  solution = data.solution;
  let img = document.getElementById("question");
  img.src = question;
};

const fetchQuestion = async () => {
  let response = await fetch("https://marcconrad.com/uob/tomato/api.php");
  let data = await response.json();
  console.log(data);
  startGame(data);
};

const initGame = () => {
  fetchQuestion();
};

initGame();
