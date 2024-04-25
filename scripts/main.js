const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");
const questionContainerElement = document.getElementById("question-container");
const answerButtonsElement = document.getElementById("answer-buttons");
const pictures = document.getElementById("pictures");
const medals = document.getElementById("medals");
const quest = document.getElementById("quest");
const meme = document.getElementById("meme");
const username = document.getElementById("nameUser");
const btnCreateUser = document.getElementById("btnCreateUsers");
const btnUsers = document.getElementById("btnUsers");
const btnDeleteUsers = document.getElementById("btnDeleteUsers");
const formUser = document.getElementById("formUser");
const game = document.getElementById("game");
const charts = document.getElementById("charts");
let refresh = document.getElementById("refresh");
const linkMedals = [
  "https://static.wikia.nocookie.net/espokemon/images/3/39/Medalla_Roca.png",
  "https://static.wikia.nocookie.net/espokemon/images/6/60/Medalla_Cascada.png",
  "https://static.wikia.nocookie.net/espokemon/images/e/e6/Medalla_Trueno.png",
  "https://static.wikia.nocookie.net/espokemon/images/0/09/Medalla_Arco%C3%ADris.png",
  "https://static.wikia.nocookie.net/espokemon/images/c/c5/Medalla_Alma.png",
  "https://static.wikia.nocookie.net/espokemon/images/9/93/Medalla_Volc%C3%A1n.png",
  "https://static.wikia.nocookie.net/espokemon/images/1/16/Medalla_Tierra.png",
  "https://static.wikia.nocookie.net/espokemon/images/e/ee/Medalla_C%C3%A9firo.png",
  "https://static.wikia.nocookie.net/espokemon/images/e/ee/Medalla_Colmena.png",
  "https://static.wikia.nocookie.net/espokemon/images/4/4d/Medalla_Drag%C3%B3n.png",
];
let currentQuestionIndex = 0;
let arrPokemonQuestion = [];
let player = "";

const number = () => {
  let number = Math.floor(Math.random() * 151 + 1);
  return number;
};
let btnPokemons = [];
let correctAns;
let pokemons = [];

let labels = [];
let values = [];
const chartLabelFilter = () => {
  let keys = Object.keys(localStorage);
  keys.forEach((key) => {
    if (key != "punctuation") {
      labels.push(key);
    }
  });
};
const averageScores = () => {
  let keys = Object.keys(localStorage);
  keys.forEach((key) => {
    if (key != "punctuation") {
      let playerPunctuation = JSON.parse(localStorage.getItem(key));
      if (playerPunctuation.score == "") {
        values.push(0);
      } else {
        let arraverage = playerPunctuation.score;
        const sum = arraverage.reduce((a, b) => a + b);
        values.push(sum / arraverage.length);
      }
    }
  });
};
let data = {
  labels: labels,
  datasets: [
    {
      label: "Pokemasters",
      backgroundColor: "white",
      borderColor: "black",
      data: values,
    },
  ],
};

const config = {
  type: "bar",
  data: data,
  options: {
    responsive: true,
    scales: {
      x: {
        ticks: {
          font: {
            size: 10,
            weight: "bolder",
          },
          color: "black",
        },
      },
      y: {
        min: 0,
        max: 10,
        ticks: {
          font: {
            size: 10,
            weight: "bolder",
          },
          color: "black",
        },
      },
    },
    bodyFont: { weight: "bolder" },
    borderWidth: 2,
    borderColor: "black",
    backgroundColor: "#FFB1C1",
    plugins: {
      legend: {
        labels: {
          footer: {
            size: 20,
            weight: "bolder",
          },
          font: {
            size: 20,
            weight: "bolder",
          },
          color: "black",
        },
      },
    },
  },
};
let myChart = new Chart("myChart", config);

const updateCharts = (myChart) => {
  averageScores();
  chartLabelFilter();
  myChart.data = data;
  data.datasets[0].data = values;
  myChart.update();
  labels = [];
  values = [];
};

const xSwitch = () => {
  document.getElementById("medal" + currentQuestionIndex).src =
    "https://png.pngtree.com/png-clipart/20230527/original/pngtree-red-cross-paint-clipart-transparent-background-png-image_9171931.png";
};
const memeApears = () => {
  meme.classList.remove("d-none");
};
const memeDisapears = () => {
  meme.classList.add("d-none");
};

const backGroundColorAns = (button) => {
  button.setAttribute("disabled", "");
  if (button.dataset.correct == "true") {
    button.classList.add("bg-success");
  } else {
    button.classList.add("bg-danger");
  }
};
const scoreCharge = () => {
  let punctuation = Number(localStorage.getItem("punctuation"));
  let playerPunctuation = JSON.parse(localStorage.getItem(player));
  playerPunctuation.score.push(punctuation);
  localStorage.setItem(player, JSON.stringify(playerPunctuation));
};

const endGame = () => {
  startButton.innerText = "Restart";
  pictures.innerHTML = "";
  startButton.classList.remove("d-none");
  refresh.classList.remove("d-none");
  startButton.setAttribute("disabled", "");
  refresh.setAttribute("disabled", "");
  scoreCharge();

  updateCharts(myChart);
  setTimeout(() => {
    answerButtonsElement.classList.add("d-none");
    quest.classList.add("d-none");
    startButton.removeAttribute("disabled", "");
    refresh.removeAttribute("disabled", "");
    medals.classList.add("d-none");
    charts.classList.remove("d-none");
  }, 3000);
};
const selectAnswer = (answerSelected) => {
  Array.from(answerButtonsElement.children).forEach((button) => {
    backGroundColorAns(button);
  });
  if (answerSelected != "") {
    let punctuation = Number(localStorage.getItem("punctuation"));
    punctuation += 1;
    document
      .getElementById(`img${currentQuestionIndex}`)
      .classList.remove("blackImage");
    document
      .getElementById(`medal${currentQuestionIndex}`)
      .classList.remove("blackImage");
    localStorage.setItem("punctuation", punctuation);
    if (arrPokemonQuestion.length > currentQuestionIndex + 1) {
      nextButton.classList.remove("d-none");
    } else {
      endGame();
    }
  } else {
    if (arrPokemonQuestion.length > currentQuestionIndex + 1) {
      memeApears();
      setTimeout(memeDisapears, 1500);
      nextButton.classList.remove("d-none");
      xSwitch();
      document
        .getElementById(`img${currentQuestionIndex}`)
        .classList.remove("blackImage");
    } else {
      xSwitch();
      endGame();
    }
  }
};
const answersButtons = (btnPokemons, correctAns) => {
  btnPokemons.forEach((pokebutton) => {
    const button = document.createElement("button");
    button.innerText = pokebutton.toUpperCase();
    button.classList.add("btn", "btn-warning", "m-1");
    if (pokebutton == correctAns) {
      button.dataset.correct = true;
      button.id = "correct";
    }
    button.addEventListener("click", () => {
      selectAnswer(button.id);
    });
    answerButtonsElement.appendChild(button);
  });
};

const pokeFalse = (pokemons, numeroPokemon) => {
  let numberPokemonFalse = number();
  if (numeroPokemon == numberPokemonFalse) {
    pokeFalse(pokemons, numeroPokemon);
  } else {
    let pokemonFalse = pokemons[numberPokemonFalse - 1].name;
    btnPokemons.push(pokemonFalse);
    if (btnPokemons.length < 3) {
      pokeFalse(pokemons, numeroPokemon);
    } else if (btnPokemons.length == 3) {
      btnPokemons.sort();
      answersButtons(btnPokemons, correctAns);
    }
  }
};
const pokemonCorrect = (pokemons, arrPokemonQuestion) => {
  let numeroPokemon = arrPokemonQuestion[currentQuestionIndex];
  let pokemonCorrect = pokemons[numeroPokemon - 1].name;
  btnPokemons.push(pokemonCorrect);
  correctAns = pokemonCorrect;
  pokeFalse(pokemons, numeroPokemon);
};
const imgCharge = (arrPokemonQuestion) => {
  imgID = 0;
  arrPokemonQuestion.forEach((numberImgQuestion) => {
    let numberFormateado = numberImgQuestion.toString().padStart(3, "0"); //padStart rellena la cadena con "0" si el lenght es menor a 3
    const fotoPokemon = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${numberFormateado}.png`;
    pictures.innerHTML += `<img class="active d-none blackImage img-pokemon" id= "img${imgID}" src="${fotoPokemon}" alt="pokemon">`;
    medals.innerHTML += `<img class="active blackImage gap-4 m-2 img-medal p-1 border border-black border-3" id= "medal${imgID}" src="${linkMedals[imgID]}" alt="medal">`;

    imgID += 1;
  });
  medals.classList.remove("d-none");
  document.getElementById("img0").classList.remove("d-none");
};

const arrPokemonQuestionFiller = (pokemons) => {
  if (arrPokemonQuestion.length < 10) {
    arrPokemonQuestion.push(number());
    arrPokemonQuestionFiller(pokemons);
  } else {
    imgCharge(arrPokemonQuestion);
    pokemonCorrect(pokemons, arrPokemonQuestion);
  }
};

const gettingPokemons = () => {
  axios
    .get(`https://pokeapi.co/api/v2/pokemon?offset=0&limit=151`)
    .then((res) => {
      pokemons = res.data.results;
      arrPokemonQuestionFiller(pokemons);
    })
    .catch((err) => console.error(err));
};
const chargingPlayer = (playerr) => (player = playerr);

const startGame = (player) => {
  chargingPlayer(player);
  resetState();
  quest.classList.remove("d-none");
  answerButtonsElement.classList.remove("d-none");
  game.classList.remove("d-none");
  localStorage.setItem("punctuation", "0");
  currentQuestionIndex = 0;
  arrPokemonQuestion = [];
  medals.innerHTML = "";
  gettingPokemons();
};
const resetState = () => {
  nextButton.classList.add("d-none");
  refresh.classList.add("d-none");
  formUser.classList.add("d-none");
  charts.classList.add("d-none");
  startButton.classList.add("d-none");
  answerButtonsElement.innerHTML = "";
  btnPokemons = [];
};
const showHideImgId = (currentQuestionIndex) => {
  let lastImg = currentQuestionIndex - 1;
  document.getElementById(`img${lastImg}`).classList.add("d-none");
  document
    .getElementById(`img${currentQuestionIndex}`)
    .classList.remove("d-none");
};

function setNextQuestion() {
  resetState();
  showHideImgId(currentQuestionIndex);
  pokemonCorrect(pokemons, arrPokemonQuestion);
}

const createUserOrSelect = () => {
  if (
    username.value === undefined ||
    username.value == "punctuation" ||
    username.value === ""
  ) {
    alert("The user field can't be empty and the name 'punctuation' is not allowed");
  } else if (localStorage.getItem(username.value) == null) {
    User = {
      nameUser: username.value,
      score: [],
    };
    localStorage.setItem(username.value, JSON.stringify(User));
    startGame(username.value);
  } else {
    startGame(username.value);
  }
};

const deleteUser = (user) => {
  localStorage.removeItem(user);
  btnUsers.innerHTML = "";
  btnDeleteUsers.innerHTML = "";
  printUsers();
};
const printUsers = () => {
  let keys = Object.keys(localStorage);
  keys.forEach((key) => {
    if (key != "punctuation") {
      const button = document.createElement("button");
      button.innerText = key.toUpperCase();
      button.classList.add(
        "btn",
        "btn-warning",
        "m-1",
        "border",
        "border-dark"
      );
      button.id = key;
      button.addEventListener("click", () => startGame(button.id));
      btnUsers.appendChild(button);
    }
  });
  keys.forEach((key) => {
    if (key != "punctuation") {
      const button = document.createElement("button");
      button.innerText = "Delete " + key.toUpperCase();
      button.classList.add("btn", "btn-danger", "m-1", "border", "border-dark");
      button.id = key;
      button.addEventListener("click", () => deleteUser(button.id));
      btnDeleteUsers.appendChild(button);
    }
  });
};
printUsers();
startButton.addEventListener("click", () => {
  startGame(player);
});
nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  setNextQuestion();
});
refresh.addEventListener("click", () => {
  location.reload();
});

btnCreateUser.addEventListener("click", createUserOrSelect);
charts.classList.add("d-none");
if (document.getElementById("myChart").getAttribute("width") == 0) {
  location.reload();
} 