const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");
const questionContainerElement = document.getElementById("question-container");
const pokeOptions = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");
const pictures = document.getElementById("pictures");
const medals = document.getElementById("medals");
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

const number = () => {
  let number = Math.floor(Math.random() * 151 + 1);
  return number;
};
let chainPokemones = [];
let rtaCorrecta;
let pokemones = [];
// console.log(number());

function backGroundColorAns(button) {
  button.setAttribute("disabled", "");
  if (button.dataset.correct == "true") {
    button.classList.add("bg-success");
  } else {
    button.classList.add("bg-danger");
  }
}
function selectAnswer(answerSelected) {
  Array.from(answerButtonsElement.children).forEach((button) => {
    backGroundColorAns(button);
  });
  // console.log(answerSelected);
  if (answerSelected != "") {
    let puntuacion = Number(localStorage.getItem("Puntuacion"));
    // console.log(puntuacion);
    puntuacion += 1;
    document.getElementById(`medal${currentQuestionIndex}`).classList.remove("blackImage")
    localStorage.setItem("Puntuacion", puntuacion);
    if (arrPokemonQuestion.length > currentQuestionIndex + 1) {
      nextButton.classList.remove("d-none");
    } else {
      //EJECUTAR UNA FUNCION DE QUE TE MUESTRE LAS MEDALLAS Y TE DE UN MENSAJE
      startButton.innerText = "Restart";
      pictures.innerHTML = "";
      startButton.classList.remove("d-none");
    }
    //AGREGARLE A LOS BOTONES que queden bloquados!!!
    //USAR
    //Array.from(answerButtonsElement.children).forEach((button) => {

    // console.log("SUMASTE UN PUNTO!");
  } else {
    // POSIBILIDAD DE AGREGAR EN UNA SOLA FUNCION
    if (arrPokemonQuestion.length > currentQuestionIndex + 1) {
      nextButton.classList.remove("d-none");
    } else {
      startButton.innerText = "Restart";
      pictures.innerHTML = "";
      startButton.classList.remove("d-none");
    }
  }
}
const answersButtons = (chainPokemones, rtaCorrecta) => {
  // console.log("BOTONES", chainPokemones);
  console.log("ANS ", rtaCorrecta);
  chainPokemones.forEach((pokebutton) => {
    // console.log(pokebutton);
    const button = document.createElement("button");
    button.innerText = pokebutton;

    if (pokebutton == rtaCorrecta) {
      button.dataset.correct = true;
      button.id = "correcto";
    }
    button.addEventListener("click", () => {
      selectAnswer(button.id);
      // console.log(button.id);
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
      pokeFalse(pokemones, numeroPokemon); //COMO HAGO PARA QUE NO SEAN IGUALES LOS 2 FALSOS NOMBRES
    } else if (chainPokemones.length == 3) {
      chainPokemones.sort();
      answersButtons(chainPokemones, rtaCorrecta);
    }
  }
};
const pokemonCorrect = (pokemones, arrPokemonQuestion) => {
  // console.log(arrPokemonQuestion);
  let numeroPokemon = arrPokemonQuestion[currentQuestionIndex];
  // console.log(pokemones);
  // console.log(currentQuestionIndex);
  // console.log(numeroPokemon);
  let pokemonCorrect = pokemones[numeroPokemon - 1].name;
  chainPokemones.push(pokemonCorrect);
  rtaCorrecta = pokemonCorrect;
  // console.log("Rta Correcta", chainPokemones);
  // console.log("Rta Correcta", rtaCorrecta);
  // console.log(numeroPokemon);
  // pictures.innerHTML = `<img class="active" src="${fotoPokemon}" alt="pokemon">`;
  pokeFalse(pokemones, numeroPokemon);
};
const imgCharge = (arrPokemonQuestion) => {
  imgID = 0;
  arrPokemonQuestion.forEach((numberImgQuestion) => {
    let numberFormateado = numberImgQuestion.toString().padStart(3, "0"); //padStart rellena la cadena con "0" si el lenght es menor a 3
    const fotoPokemon = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${numberFormateado}.png`;
    // console.log(fotoPokemon);
    pictures.innerHTML += `<img class="active d-none" id= "img${imgID}" src="${fotoPokemon}" alt="pokemon">`;
    console.log(medals);
    console.log(linkMedals[imgID]);
    medals.innerHTML += `<img class="active blackImage" id= "medal${imgID}" src="${linkMedals[imgID]}" alt="medal1">`;

    imgID += 1;
  });
  document.getElementById("img0").classList.remove("d-none");
};

const arrPokemonQuestionFiller = (pokemones) => {
  // console.log(arrPokemonQuestion);
  if (arrPokemonQuestion.length < 10) {
    arrPokemonQuestion.push(number());
    arrPokemonQuestionFiller(pokemones);
  } else {
    //EJECUTAR CARGA DE IMAGENES
    imgCharge(arrPokemonQuestion);
    pokemonCorrect(pokemones, arrPokemonQuestion);
  }
};

const obteniendoPokemons = () => {
  axios
    .get(`https://pokeapi.co/api/v2/pokemon?offset=0&limit=151`)
    .then((res) => {
      pokemones = res.data.results;
      // console.log(pokemones);
      arrPokemonQuestionFiller(pokemones);
    })
    .catch((err) => console.error(err));
};

//en el click de next debo hacer un if que si el currentQuestionIndex = 9 se detenga y muestre el resultado
const startGame = () => {
  startButton.classList.add("d-none");
  localStorage.setItem("Puntuacion", "0");
  currentQuestionIndex = 0;
  arrPokemonQuestion = [];
  resetState();
  medals.innerHTML = ""
  obteniendoPokemons();
};
const resetState = () => {
  nextButton.classList.add("d-none");
  answerButtonsElement.innerHTML = "";
  chainPokemones = [];
};
const mostrarOcultarImgId = (currentQuestionIndex) => {
  console.log(currentQuestionIndex);
  let lastImg = currentQuestionIndex - 1;
  document.getElementById(`img${lastImg}`).classList.add("d-none");
  document
    .getElementById(`img${currentQuestionIndex}`)
    .classList.remove("d-none");
};

function setNextQuestion() {
  resetState();
  mostrarOcultarImgId(currentQuestionIndex);
  // console.log(pokemones, arrPokemonQuestion);
  pokemonCorrect(pokemones, arrPokemonQuestion);
}

startButton.addEventListener("click", startGame);
nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  setNextQuestion();
});
