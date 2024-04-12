const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");
const questionContainerElement = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");
const pictures = document.getElementById("pictures");

//<img class="active" src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png" alt="Bulbasaur">
let numero = Math.floor(Math.random() * 12 + 1);
let numeroFormateado = numero.toString().padStart(3, "0"); //padStart rellena la cadena con "0" si el lenght es menor a 3
let idPokemonSearched = Math.ceil(numero / 3);

const respuestasBtn = () => {
  axios
    .get(`https://pokeapi.co/api/v2/evolution-chain/${idPokemonSearched}`)
    .then((res) => {
      let pokemon1 = res.data.chain.species.name;
      let pokemon2 = res.data.chain.evolves_to[0].species.name;
      let pokemon3 = res.data.chain.evolves_to[0].evolves_to[0].species.name;
      chainPokemones = [pokemon1, pokemon2, pokemon3];
      console.log(pokemon1);
      console.log(pokemon2);
      console.log(pokemon3);
    })
    .catch((err) => console.error(err));
};
respuestasBtn();

const respuestaCorrecta = () => {
  axios
    .get(`https://pokeapi.co/api/v2/pokemon/${numero}`)
    .then((res) => {
      let rtaCorrecta = res.data.name;

      console.log(rtaCorrecta);
    })
    .catch((err) => console.error(err));
};
respuestaCorrecta();
const fotoPokemon = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${numeroFormateado}.png`;
pictures.innerHTML = `<img class="active" src="${fotoPokemon}" alt="Bulbasaur">`;

console.log(numero);
console.log(numeroFormateado);
console.log(idPokemonSearched);

const questions = [
  {
    question: "What is 2 + 2?",
    answers: [
      { text: "4", correct: true },
      { text: "22", correct: false },
    ],
  },
  {
    question: "Is web development fun?",
    answers: [
      { text: "Kinda", correct: false },
      { text: "YES!!!", correct: true },
      { text: "Um no", correct: false },
      { text: "IDK", correct: false },
    ],
  },
  {
    question: "What is 4 * 2?",
    answers: [
      { text: "6", correct: false },
      { text: "8", correct: true },
      { text: "Yes", correct: false },
    ],
  },
];

let currentQuestionIndex;

function startGame() {
  startButton.classList.add("d-none");
  currentQuestionIndex = 0;
  questionContainerElement.classList.remove("d-none");
  setNextQuestion();
}

function showQuestion(question) {
  questionElement.innerText = question.question;
  question.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerText = answer.text;

    if (answer.correct) {
      button.dataset.correct = true;
    }
    button.addEventListener("click", selectAnswer);
    answerButtonsElement.appendChild(button);
  });
}
function resetState() {
  nextButton.classList.add("d-none");
  answerButtonsElement.innerHTML = "";
}

function setNextQuestion() {
  resetState();
  showQuestion(questions[currentQuestionIndex]);
}

function setStatusClass(element) {
  if (element.dataset.correct == "true") {
    element.classList.add("bg-success");
  } else {
    element.classList.add("bg-danger");
  }
}

function selectAnswer() {
  Array.from(answerButtonsElement.children).forEach((button) => {
    setStatusClass(button);
  });
  if (questions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove("d-none");
  } else {
    startButton.innerText = "Restart";
    startButton.classList.remove("d-none");
  }
}

startButton.addEventListener("click", startGame);
nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  setNextQuestion();
});
