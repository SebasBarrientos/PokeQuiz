const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");
const questionContainerElement = document.getElementById("question-container");
const answerButtonsElement = document.getElementById("answer-buttons");
const pictures = document.getElementById("pictures");
const medals = document.getElementById("medals");
const quest = document.getElementById("quest");
const meme = document.getElementById("meme");
const userName = document.getElementById("nameUser");
const btnCreateUser = document.getElementById("btnCreateUsers");
const btnUsers = document.getElementById("btnUsers");
const btnDeleteUsers = document.getElementById("btnDeleteUsers");
const formUser = document.getElementById("formUser");
const game = document.getElementById("game");
const charts = document.getElementById("charts");
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
let chainPokemones = [];
let rtaCorrecta;
let pokemones = [];

let labels = [];
let valores = [];
const chartValuesFilter = () => {
  let keys = Object.keys(localStorage);
  keys.forEach((key) => {
    if (key != "Puntuacion") {
      labels.push(key);
    }
  });
};
const obteniendoPromedios = () => {
  let keys = Object.keys(localStorage);
  keys.forEach((key) => {
    if (key != "Puntuacion") {
      let playerPunctuation = JSON.parse(localStorage.getItem(key));
      if (playerPunctuation.score == "") {
        valores.push(0);
      } else {
        let arrPrimedio = playerPunctuation.score;
        const sum = arrPrimedio.reduce((a, b) => a + b);
        valores.push(sum / arrPrimedio.length);
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
      data: valores,
    },
  ],
};

const config = {
  type: "bar",
  data: data,
  options: {
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
  obteniendoPromedios();
  chartValuesFilter();
  myChart.data = data;
  data.datasets[0].data = valores;
  myChart.update();
  labels = [];
  valores = [];
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
const cargarPuntaje = () => {
  let puntuacion = Number(localStorage.getItem("Puntuacion"));
  let playerPunctuation = JSON.parse(localStorage.getItem(player));
  playerPunctuation.score.push(puntuacion);
  localStorage.setItem(player, JSON.stringify(playerPunctuation));
};

const endGame = () => {
  startButton.innerText = "Restart";
  pictures.innerHTML = "";
  startButton.classList.remove("d-none");
  startButton.setAttribute("disabled", "");
  cargarPuntaje();

  updateCharts(myChart);
  setTimeout(() => {
    answerButtonsElement.classList.add("d-none");
    quest.classList.add("d-none");
    startButton.removeAttribute("disabled", "");
    medals.classList.add("d-none");
    charts.classList.remove("d-none");
  }, 3000);
};
const selectAnswer = (answerSelected) => {
  Array.from(answerButtonsElement.children).forEach((button) => {
    backGroundColorAns(button);
  });
  if (answerSelected != "") {
    let puntuacion = Number(localStorage.getItem("Puntuacion"));
    puntuacion += 1;
    document
      .getElementById(`img${currentQuestionIndex}`)
      .classList.remove("blackImage");
    document
      .getElementById(`medal${currentQuestionIndex}`)
      .classList.remove("blackImage");
    localStorage.setItem("Puntuacion", puntuacion);
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
const answersButtons = (chainPokemones, rtaCorrecta) => {
  chainPokemones.forEach((pokebutton) => {
    const button = document.createElement("button");
    button.innerText = pokebutton.toUpperCase();
    button.classList.add("btn", "btn-warning", "m-1");
    if (pokebutton == rtaCorrecta) {
      button.dataset.correct = true;
      button.id = "correcto";
    }
    button.addEventListener("click", () => {
      selectAnswer(button.id);
    });
    answerButtonsElement.appendChild(button);
  });
};

const pokeFalse = (pokemones, numeroPokemon) => {
  let numberPokemonFalse = number();
  if (numeroPokemon == numberPokemonFalse) {
    pokeFalse(pokemones, numeroPokemon);
  } else {
    let pokemonFalse = pokemones[numberPokemonFalse - 1].name;
    chainPokemones.push(pokemonFalse);
    if (chainPokemones.length < 3) {
      pokeFalse(pokemones, numeroPokemon);
    } else if (chainPokemones.length == 3) {
      chainPokemones.sort();
      answersButtons(chainPokemones, rtaCorrecta);
    }
  }
};
const pokemonCorrect = (pokemones, arrPokemonQuestion) => {
  let numeroPokemon = arrPokemonQuestion[currentQuestionIndex];
  let pokemonCorrect = pokemones[numeroPokemon - 1].name;
  chainPokemones.push(pokemonCorrect);
  rtaCorrecta = pokemonCorrect;
  pokeFalse(pokemones, numeroPokemon);
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

const arrPokemonQuestionFiller = (pokemones) => {
  if (arrPokemonQuestion.length < 10) {
    arrPokemonQuestion.push(number());
    arrPokemonQuestionFiller(pokemones);
  } else {
    imgCharge(arrPokemonQuestion);
    pokemonCorrect(pokemones, arrPokemonQuestion);
  }
};

const obteniendoPokemons = () => {
  axios
    .get(`https://pokeapi.co/api/v2/pokemon?offset=0&limit=151`)
    .then((res) => {
      pokemones = res.data.results;
      arrPokemonQuestionFiller(pokemones);
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
  localStorage.setItem("Puntuacion", "0");
  currentQuestionIndex = 0;
  arrPokemonQuestion = [];
  medals.innerHTML = "";
  obteniendoPokemons();
};
const resetState = () => {
  nextButton.classList.add("d-none");
  formUser.classList.add("d-none");
  charts.classList.add("d-none");
  startButton.classList.add("d-none");
  answerButtonsElement.innerHTML = "";
  chainPokemones = [];
};
const mostrarOcultarImgId = (currentQuestionIndex) => {
  let lastImg = currentQuestionIndex - 1;
  document.getElementById(`img${lastImg}`).classList.add("d-none");
  document
    .getElementById(`img${currentQuestionIndex}`)
    .classList.remove("d-none");
};

function setNextQuestion() {
  resetState();
  mostrarOcultarImgId(currentQuestionIndex);
  pokemonCorrect(pokemones, arrPokemonQuestion);
}

startButton.addEventListener("click", () => {
  startGame(player);
});
nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  setNextQuestion();
});

const createUserOrSelect = () => {
  if (
    userName.value === undefined ||
    userName.value == "Puntuacion" ||
    userName.value === ""
  ) {
    alert("Tu usuario no se puede llamar Puntuacion ni estar vacio");
  } else if (localStorage.getItem(userName.value) == null) {
    User = {
      nameUser: userName.value,
      score: [],
    };
    localStorage.setItem(userName.value, JSON.stringify(User));
    startGame(userName.value);
  } else {
    startGame(userName.value);
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
    if (key != "Puntuacion") {
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
    if (key != "Puntuacion") {
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
btnCreateUser.addEventListener("click", createUserOrSelect);
charts.classList.add("d-none");
