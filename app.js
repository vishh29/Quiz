const amount = document.getElementById("amount");
const category = document.getElementById("category");
const difficulty = document.getElementById("difficulty");
const type = document.getElementById("type");
const startQuizBtn = document.getElementById("startQuizBtn");

const formDiv = document.getElementById("form-div");

let currentQue = 0;
let questions;
let correctAns;

document.getElementById("startQuizBtn").addEventListener("click", async () => {
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

    questions = await fetchUrl(Url);
    createQue(questions);
});

async function fetchUrl(url) {
  const response = await fetch(url);
  const data = await response.json();
  // console.log(data);
    return data.results
}

function createQue(arr) {
  //   console.log(arr);
  var queObj = arr[currentQue];
//   console.log(queObj);
  //   q.textContent = que.question;
  let question = queObj.question;

    var options = queObj.incorrect_answers;
    correctAns = queObj.correct_answer;
  options.splice(
    Math.floor(Math.random() * options.length + 1),
    0,
    correctAns
    );
    // console.log(options);
  setQueOps(question, options);
}

function setQueOps(q, o) {
    formDiv.style.display = "none";
    let queDiv = document.getElementById("question-div");
    queDiv.style.display = 'flex'
  let question = `<h4> ${q} </h4>`
  
  queDiv.innerHTML = o.map((e) => {
      return `
      <div>
      <input type="radio" id="option" name="option" value="${e}" />  
      <label for="option" name="optionLabel">${e}</label>
      </div>`
  }).join('');
  
    queDiv.insertAdjacentHTML("afterbegin", question);
    let submitBtn = `<button id="ansSubmit"> Submit </button>`
    queDiv.insertAdjacentHTML("beforeend", submitBtn);
    document.getElementById("ansSubmit").addEventListener('click', answerSubmit)
}

function answerSubmit() {
    console.log('submitting');
    let option = document.querySelector('input[name="option"]:checked').value;
    
}