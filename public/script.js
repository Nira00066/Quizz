document.addEventListener("DOMContentLoaded", function () {
  const theme = document.body.dataset.theme;
  let currentQuestionIndex = 0;
  let userAnswers = [];
  let questions;
  let correctAnswers;

  // Fonction pour fetch le fichier questions.json
  function fetchQuestions() {
    fetch("/api/questions")
      .then((response) => response.json())
      .then((data) => {
        questions = data.filter((question) => question.theme === theme);
        correctAnswers = questions.map((question) => question.answer);
        // Appeler displayQuestion seulement si questionsContainer existe
        if (questionsContainer) {
          displayQuestion(questions[currentQuestionIndex]);
          updateScore(calculateScore());
        }
      })
      .catch((error) => console.error("Error fetching questions:", error));
  }

  // Fonction pour afficher une question unique
  function displayQuestion(question) {
    updateScore(calculateScore());
    questionsContainer.innerHTML = ""; // Nettoie la question precedente
    const questionElement = document.createElement("article");
    questionElement.classList.add("question");
    questionElement.innerHTML = `
    <div class="quest">
    <img src="${question.picture_url}" alt="Question Image" class="picture">
    ${question.question}
    </div>
        <div class="options-container">
            <ul class="options-group-1">
                ${question.options
                  .slice(0, 2)
                  .map(
                    (option, index) =>
                      `<li class="list"><button class="option-btn" data-index="${index}">${option}</button></li>`
                  )
                  .join("")}
            </ul>
            <ul class="options-group-2">
                ${question.options
                  .slice(2, 4)
                  .map(
                    (option, index) =>
                      `<li class="list"><button class="option-btn" data-index="${
                        index + 2
                      }">${option}</button></li>`
                  )
                  .join("")}
            </ul>
        </div>
    `;
    questionsContainer.appendChild(questionElement);
  }

  // Vérifie si questionsContainer existe avant l'ajout de l'event listener
  const questionsContainer = document.getElementById("questions-container");
  questionsContainer.addEventListener("click", function (event) {
    if (event.target.classList.contains("option-btn")) {
      const selectedOption = event.target.textContent;
      userAnswers.push(selectedOption);

      // Incremente currentQuestionIndex uniquement si l'utilisateur choisit une option
      currentQuestionIndex++;

      // Vérifie s'il y a d'autres questions
      if (currentQuestionIndex < questions.length) {
        displayQuestion(questions[currentQuestionIndex]);
      } else {
        // Plus de question, affiche le resultat
        displayResults();
      }
    }
  });

  // Fonction pour récupérer les resultats
  function displayResults() {
    let score = calculateScore();
    updateScore(score);
    // Prépare les données à transmettre à result.html
    const resultData = {
      userAnswers: userAnswers,
      correctAnswers: correctAnswers,
      score: score,
      questions: questions, // Inclut les questions
    };
    // Stock la data dans le localStorage
    localStorage.setItem("resultData", JSON.stringify(resultData));
    // Redirect to result.html
    window.location.href = "/result";
  }

  // Fonction pour calculer le score
  function calculateScore() {
    return userAnswers.reduce(
      (score, answer, index) =>
        answer === correctAnswers[index] ? score + 1 : score,
      0
    );
  }

  function updateScore(score) {
    const scoreElement = document.getElementById("score");
    if (scoreElement) {
      scoreElement.textContent = `Score: ${score}`;
    }
  }

  // Vient chercher les questions quand la page est chargée
  fetchQuestions();
});
