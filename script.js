const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const completedExercisesList = document.getElementById('completed-exercises-list');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');

let timer;
let isRunning = false;
let remainingTime = 25 * 60; // Inicialmente definido como 25 minutos
let stretchInterval;
let completedExercises = [];

const stretchExercises = [
    "Faça 100x flexões",
    "Faça 100x abdominais",
    "100x agachamentos",
    "Levante-se e estique os braços acima da cabeça por 10 segundos.",
    "Incline o tronco para os lados, mantendo o alongamento por 15 segundos em cada lado.",
    "Gire os ombros para trás em movimentos circulares por 20 segundos.",
    "Faça uma rotação no pescoço, movendo-o suavemente para a esquerda e para a direita por 10 segundos.",
    "Estique as pernas e toque os dedos dos pés, mantendo a posição por 15 segundos.",
    "Sente-se e estique os braços para frente, mantendo a posição por 20 segundos."
];

function startTimer() {
    if (!isRunning) {
        timer = setInterval(updateTimer, 1000);
        isRunning = true;
        showExercise();
    }
}

function pauseTimer() {
    clearInterval(timer);
    clearInterval(stretchInterval);
    isRunning = false;
}

function updateTimer() {
    remainingTime--;
    if (remainingTime >= 0) {
        const minutes = Math.floor(remainingTime / 60);
        const seconds = remainingTime % 60;
        minutesDisplay.textContent = minutes < 10 ? `0${minutes}` : minutes;
        secondsDisplay.textContent = seconds < 10 ? `0${seconds}` : seconds;
    } else {
        clearInterval(timer);
        completeExerciseButton.style.display = 'block';
    }
}

function showExercise() {
    let index = 0;
    stretchInterval = setInterval(() => {
        const currentExercise = stretchExercises[index];
        addToCompletedExercises(currentExercise);
        index = (index + 1) % stretchExercises.length;
    }, 5 * 60 * 1000); // 5 minutus
}

function completeExercise() {
    const currentExercise = stretchExercises.find(exercise => exercise === exerciseDescription.textContent.replace('Exercício de Alongamento: ', ''));
    if (currentExercise && !completedExercises.includes(currentExercise)) {
        completedExercises.push(currentExercise);
        addToCompletedExercises(currentExercise);
    }
    completeExerciseButton.style.display = 'none';
}

function addToCompletedExercises(exercise) {
    const li = document.createElement('li');
    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 60;
    const timeElapsed = `${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
    li.textContent = `${exercise} - Tempo: ${timeElapsed}`;
    const img = document.createElement('img');
    img.src = 'assets/tarefaicon01.jpeg';
    img.alt = 'checkmark';
    img.className = 'task-img';
    li.appendChild(img);
    completedExercisesList.appendChild(li);

    // Adiciona classe automaticamente para destacar exercícios concluídos após 20 segundos
    setTimeout(() => {
        li.classList.add('completed');
    }, 60000);
}

startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
