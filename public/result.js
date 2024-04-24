document.addEventListener("DOMContentLoaded", function () {
    // Récupérer les données depuis le localStorage
    const resultDataString = localStorage.getItem("resultData");
    // Vérifier si les données existent dans le localStorage
    if (resultDataString) {
        // Décoder les données JSON
        const resultData = JSON.parse(resultDataString);
        // Afficher les données dans le DOM
        displayResults(resultData);
    } else {
        console.error("No result data found in localStorage");
    }
});

// Function pour afficher les résultats du quiz
function displayResults(data) {
    const questionsList = document.getElementById("questions-list");
    const userAnswersList = document.getElementById("user-answers");
    const correctAnswersList = document.getElementById("correct-answers");
    const scoreElement = document.getElementById("score");

    // Mettre à jour le score affiché dans le HTML
    scoreElement.textContent = `${data.score} / ${data.userAnswers.length}`;

    // Boucler à travers les questions et les réponses
    for (let i = 0; i < data.userAnswers.length; i++) {
        // Créer des éléments HTML pour la question, la réponse de l'utilisateur et la réponse correcte
        const questionElement = document.createElement("p");
        const userAnswerElement = document.createElement("p");
        const correctAnswerElement = document.createElement("p");

        // Ajouter les classes CSS
        questionElement.classList.add("question");
        userAnswerElement.classList.add("user-answer");
        correctAnswerElement.classList.add("correct-answer");


        // Ajouter le texte aux éléments
        questionElement.textContent = `${data.questions[i].question}`;
        userAnswerElement.textContent = `${data.userAnswers[i]}`;
        correctAnswerElement.textContent = `${data.correctAnswers[i]}`;

        // Ajouter les éléments au DOM
        questionsList.appendChild(questionElement);
        userAnswersList.appendChild(userAnswerElement);
        correctAnswersList.appendChild(correctAnswerElement);
    }
}
