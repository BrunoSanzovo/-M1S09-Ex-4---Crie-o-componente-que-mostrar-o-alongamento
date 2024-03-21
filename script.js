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
    }, 5 * 1000); // 5 segundos
}

function addToCompletedExercises(exercise) {
    const li = document.createElement('li');
    li.textContent = exercise;
    const img = document.createElement('img');
    img.src = 'assets/tarefaicon01.jpeg';
    img.alt = 'checkmark';
    img.className = 'task-img';
    li.appendChild(img);
    completedExercisesList.appendChild(li);
}

startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
