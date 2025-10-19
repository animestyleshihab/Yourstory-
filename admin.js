document.addEventListener('DOMContentLoaded', () => {
    const loginSection = document.getElementById('login-section');
    const dashboardSection = document.getElementById('dashboard-section');
    const passwordInput = document.getElementById('password');
    const loginBtn = document.getElementById('login-btn');
    const a_pass = "your_secret_password"; // Change this password

    loginBtn.addEventListener('click', () => {
        if (passwordInput.value === a_pass) {
            loginSection.style.display = 'none';
            dashboardSection.style.display = 'block';
            loadAdminData();
        } else {
            alert('Incorrect Password');
        }
    });

    const db = firebase.database();
    const questionsRef = db.ref('questions');
    const answersRef = db.ref('answers');

    const addQuestionBtn = document.getElementById('add-question-btn');
    const newQuestionText = document.getElementById('new-question-text');

    // Add new question
    addQuestionBtn.addEventListener('click', () => {
        const text = newQuestionText.value.trim();
        if (text) {
            const newQuestionRef = questionsRef.push();
            newQuestionRef.set({ text: text });
            newQuestionText.value = '';
        }
    });

    function loadAdminData() {
        // Load questions
        const questionsAdminList = document.getElementById('questions-admin-list');
        questionsRef.on('value', (snapshot) => {
            questionsAdminList.innerHTML = '';
            const questions = snapshot.val();
            if (questions) {
                Object.keys(questions).forEach(key => {
                    const li = document.createElement('li');
                    li.textContent = questions[key].text;
                    const deleteBtn = document.createElement('button');
                    deleteBtn.textContent = 'Delete';
                    deleteBtn.classList.add('delete-btn');
                    deleteBtn.onclick = () => {
                        questionsRef.child(key).remove();
                    };
                    li.appendChild(deleteBtn);
                    questionsAdminList.appendChild(li);
                });
            }
        });

        // Load answers
        const answersAdminList = document.getElementById('answers-admin-list');
        answersRef.on('value', (snapshot) => {
            answersAdminList.innerHTML = '';
            const answers = snapshot.val();
            if (answers) {
                Object.keys(answers).forEach(key => {
                    const li = document.createElement('li');
                    li.textContent = answers[key].text;
                    const deleteBtn = document.createElement('button');
                    deleteBtn.textContent = 'Delete';
                    deleteBtn.classList.add('delete-btn');
                    deleteBtn.onclick = () => {
                        answersRef.child(key).remove();
                    };
                    li.appendChild(deleteBtn);
                    answersAdminList.appendChild(li);
                });
            }
        });
    }
});
