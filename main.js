const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");
const questionContainerElement = document.getElementById("question-container");
const pokeOptions = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");
const pictures = document.getElementById("pictures");

let currentQuestionIndex;

//<img class="active" src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png" alt="Bulbasaur">
const game = () => {
  let numero = Math.floor(Math.random() * 12 + 1);
  let numeroFormateado = numero.toString().padStart(3, "0"); //padStart rellena la cadena con "0" si el lenght es menor a 3
  let idPokemonSearched = Math.ceil(numero / 3);
  const fotoPokemon = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${numeroFormateado}.png`;

  let chainPokemones = [];
  let rtaCorrecta;

  const respuestaCorrecta = () => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${numero}`)
      .then((res) => {
        rtaCorrecta = res.data.name;
        // let rtaCorrectaID = res.data.id;

        console.log("Respuesta Correcta", rtaCorrecta);
      })
      .catch((err) => console.error(err));
  };
  respuestaCorrecta();

  const respuestasBtn = () => {
    axios
      .get(`https://pokeapi.co/api/v2/evolution-chain/${idPokemonSearched}`)
      .then((res) => {
        let pokemon1 = res.data.chain.species.name;
        let pokemon2 = res.data.chain.evolves_to[0].species.name;
        let pokemon3 = res.data.chain.evolves_to[0].evolves_to[0].species.name;
        chainPokemones.push(pokemon1, pokemon2, pokemon3);
        answer(chainPokemones, rtaCorrecta);
        console.log(pokemon1);
        console.log(pokemon2);
        console.log(pokemon3);
      })
      .catch((err) => console.error(err));
  };
  respuestasBtn();
  console.log(chainPokemones);

  //Hay que resolver como le paso el valor seleccionado
  //Me quede en answer. Estoy tratando de que aparezcan los botones
  function answer(chainPokemones, rtaCorrecta) {
    console.log(chainPokemones);
    console.log("ANS ",rtaCorrecta);
    //Ver como conecto el dom y los botones aca!!
    chainPokemones.forEach((pokebutton) => {
      console.log(pokebutton);
      const button = document.createElement("button");
      button.innerText = pokebutton;

      if (pokebutton == rtaCorrecta) {
        button.dataset.correct = true;
      }
      button.addEventListener("click", selectAnswer);
      answerButtonsElement.appendChild(button);
    });

    function backGroundColorAns(button) {
      if (button.dataset.correct == "true") {
        button.classList.add("bg-success");
      } else {
        button.classList.add("bg-danger");
      }
    }
    function selectAnswer() {
      Array.from(answerButtonsElement.children).forEach((button) => {
        backGroundColorAns(button);
      });
    }
    pictures.innerHTML = `<img class="active" src="${fotoPokemon}" alt="pokemon">`;
    pictures.classList.remove("d-none");
  }
};
//en el click de next debo hacer un if que si el currentQuestionIndex = 9 se detenga y muestre el resultado
function startGame() {
  startButton.classList.add("d-none");
  currentQuestionIndex = 0;
  game();
}

function resetState() {
  nextButton.classList.add("d-none");
  answerButtonsElement.innerHTML = "";
}

startButton.addEventListener("click", startGame);
