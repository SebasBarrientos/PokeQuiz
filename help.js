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
  //COLORES DE CORRECTO O INCORRECTO
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