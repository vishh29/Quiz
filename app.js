const amount = document.getElementById("amount");
const category = document.getElementById("category");
const difficulty = document.getElementById("difficulty");
const type = document.getElementById("type");
const startQuizBtn = document.getElementById("startQuizBtn");

const q = document.getElementById("question");
const option = document.getElementsByName("option");
const optionLabel = document.getElementsByName("optionLabel");

const queDiv = document.getElementById("question-div");

const formDiv = document.getElementById("form-div");

let currentQue = 0;

function getFormData() {
  var Url;
  if (!amount.value) {
    console.log("error hai");
  } else {
    Url = `https://opentdb.com/api.php?amount=${amount.value}`;
  }
  if (category.value && category.value != "any") {
    Url = Url.concat("", `&category=${category.value}`);
  }
  if (difficulty.value && difficulty.value != "any") {
    Url = Url.concat("", `&difficulty=${difficulty.value}`);
  }
  if (type.value && type.value != "any") {
    Url = Url.concat("", `&type=${type.value}`);
  }

  fetchUrl(Url);
}

async function fetchUrl(url) {
  const response = await fetch(url);
  const data = await response.json();
  // console.log(data);
  setQue(data.results);
}

function setQue(arr) {
  console.log(arr);
  var que = arr[currentQue];
  console.log(que);
  q.textContent = que.question;

  var options = que.incorrect_answers;
  options.splice(Math.floor(Math.random() * options.length + 1), 0, que.correct_answer);
  setOptions(options);
}

function setOptions(opts) {
  option.forEach((e, i) => {
    e.value = opts[i];
  });

  optionLabel.forEach((e, i) => {
    e.textContent = opts[i];
  });
  formDiv.style.display = "none";
}
