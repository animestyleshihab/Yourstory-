document.addEventListener('DOMContentLoaded', () => {
    const questionsContainer = document.getElementById('questions-container');
    const backgroundMusic = document.getElementById('background-music');

    // Play background music on user interaction
    document.body.addEventListener('click', () => {
        if (backgroundMusic.paused) {
            backgroundMusic.play();
        }
    }, { once: true });

    // Petal Animation
    const petalContainer = document.querySelector('.petal-container');
    for (let i = 0; i < 30; i++) {
        const petal = document.createElement('div');
        petal.classList.add('petal');
        petal.style.left = `${Math.random() * 100}vw`;
        petal.style.animationDuration = `${Math.random() * 5 + 5}s`;
        petal.style.animationDelay = `${Math.random() * 5}s`;
        petal.style.width = `${Math.random() * 15 + 10}px`;
        petal.style.height = petal.style.width;
        petalContainer.appendChild(petal);
    }

    // Fetch questions from Firebase
    const db = firebase.database();
    const questionsRef = db.ref('questions');
    const answersRef = db.ref('answers');

    questionsRef.on('value', (snapshot) => {
        const questions = snapshot.val();
        questionsContainer.innerHTML = '';
        if (questions) {
            Object.keys(questions).forEach(key => {
                const questionData = questions[key];
                const questionCard = document.createElement('div');
                questionCard.classList.add('question-card');
                questionCard.innerHTML = `
                    <h2>${questionData.text}</h2>
                    <div class="answers-list" id="answers-for-${key}"></div>
                    <textarea class="answer-input" placeholder="Your answer..."></textarea>
                    <button class="submit-btn" data-question-id="${key}">Submit ❤️</button>
                `;
                questionsContainer.appendChild(questionCard);

                // Fetch and display answers for this question
                answersRef.orderByChild('questionId').equalTo(key).on('value', (answerSnapshot) => {
                    const answersList = document.getElementById(`answers-for-${key}`);
                    answersList.innerHTML = '';
                    const answers = answerSnapshot.val();
                    if (answers) {
                        Object.values(answers).forEach(answer => {
                            const answerItem = document.createElement('div');
                            answerItem.classList.add('answer-item');
                            answerItem.textContent = answer.text;
                            answersList.appendChild(answerItem);
                        });
                    }
                });
            });
        }
    });

    // Handle answer submission
    questionsContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('submit-btn')) {
            const questionId = e.target.dataset.questionId;
            const answerInput = e.target.previousElementSibling;
            const answerText = answerInput.value.trim();

            if (answerText) {
                const newAnswerRef = answersRef.push();
                newAnswerRef.set({
                    questionId: questionId,
                    text: answerText,
                    timestamp: firebase.database.ServerValue.TIMESTAMP
                });
                answerInput.value = '';
            }
        }
    });
});
