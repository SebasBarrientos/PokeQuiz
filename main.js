const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");
const questionContainerElement = document.getElementById("question-container");
const pokeOptions = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");
const pictures = document.getElementById("pictures");

let currentQuestionIndex;
let arrPokemonQuestion = [];
const game = () => {
  const number = () => {
    let number = Math.floor(Math.random() * 151 + 1);
    return number;
  };
  let chainPokemones = [];
  let rtaCorrecta;
  let pokemon = [];
  console.log(number());

  function backGroundColorAns(button) {
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
    console.log(answerSelected);
    if (answerSelected != "") {
      let puntuacion = Number(localStorage.getItem("Puntuacion"));
      console.log(puntuacion);
      puntuacion += 1;
      localStorage.setItem("Puntuacion", puntuacion);
      nextButton.classList.remove("d-none");
      //AGREGARLE A LOS BOTONES que queden bloquados!!!
      //USAR
      //Array.from(answerButtonsElement.children).forEach((button) => {

      console.log("SUMASTE UN PUNTO!");
    }
  }
  const answersButtons = (chainPokemones, rtaCorrecta) => {
    console.log(chainPokemones);
    console.log("ANS ", rtaCorrecta);
    chainPokemones.forEach((pokebutton) => {
      console.log(pokebutton);
      const button = document.createElement("button");
      button.innerText = pokebutton;

      if (pokebutton == rtaCorrecta) {
        button.dataset.correct = true;
        button.id = "correcto";
      }
      button.addEventListener("click", () => {
        selectAnswer(button.id);
        console.log(button.id);
      });
      answerButtonsElement.appendChild(button);
    });
  };

  const pokeFalse = (pokemon, numeroPokemon) => {
    let numberPokemonFalse = number();
    if (numeroPokemon == numberPokemonFalse) {
      pokeFalse(pokemon, numeroPokemon);
    } else {
      let pokemonFalse = pokemon[numberPokemonFalse].name;
      chainPokemones.push(pokemonFalse);
      if (chainPokemones.length < 3) {
        pokeFalse(pokemon, numeroPokemon); //COMO HAGO PARA QUE NO SEAN IGUALES LOS 2 FALSOS NOMBRES
      } else {
        answersButtons(chainPokemones, rtaCorrecta);
      }
    }
  };
  const pokemonCorrect = (pokemon, arrPokemonQuestion) => {
    let numeroPokemon = arrPokemonQuestion[currentQuestionIndex];
    console.log(pokemon);
    let pokemonCorrect = pokemon[numeroPokemon - 1].name;
    chainPokemones.push(pokemonCorrect);
    rtaCorrecta = pokemonCorrect;
    console.log("Rta Correcta", chainPokemones);
    console.log("Rta Correcta", rtaCorrecta);
    console.log(numeroPokemon);

    // pictures.innerHTML = `<img class="active" src="${fotoPokemon}" alt="pokemon">`;
    pokeFalse(pokemon, numeroPokemon);
  };
  const imgCharge = (arrPokemonQuestion) => {
    arrPokemonQuestion.forEach((numberImgQuestion) => {
      imgID = 0;
      let numberFormateado = numberImgQuestion.toString().padStart(3, "0"); //padStart rellena la cadena con "0" si el lenght es menor a 3
      const fotoPokemon = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${numberFormateado}.png`;
      console.log(fotoPokemon);
      pictures.innerHTML += `<img class="active d-none" id= "img${imgID}" src="${fotoPokemon}" alt="pokemon">`;
      imgID += 1;
    });
    document.getElementById("img0").classList.remove("d-none");
  };

  const arrPokemonQuestionFiller = (pokemon) => {
    console.log(arrPokemonQuestion);
    if (arrPokemonQuestion.length < 10) {
      arrPokemonQuestion.push(number());
      arrPokemonQuestionFiller(pokemon);
    } else {
      //EJECUTAR CARGA DE IMAGENES
      imgCharge(arrPokemonQuestion);
      pokemonCorrect(pokemon, arrPokemonQuestion);
    }
  };

  const obteniendoPokemons = () => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon?offset=0&limit=151`)
      .then((res) => {
        pokemon = res.data.results;
        console.log(pokemon);
        arrPokemonQuestionFiller(pokemon);
      })
      .catch((err) => console.error(err));
  };

  obteniendoPokemons();

  pictures.classList.remove("d-none");
};

//en el click de next debo hacer un if que si el currentQuestionIndex = 9 se detenga y muestre el resultado
const startGame = () => {
  startButton.classList.add("d-none");
  //   localStorage.setItem("Puntuacion", '0')
  currentQuestionIndex = 0;
  game();
};
const resetState = () => {
  nextButton.classList.add("d-none");
  answerButtonsElement.innerHTML = "";
};

startButton.addEventListener("click", startGame);
