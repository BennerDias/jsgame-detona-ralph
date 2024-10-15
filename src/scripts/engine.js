const state = {
<<<<<<< HEAD
    view: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeleft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
        life: document.querySelector("#life"),
        gameOverScreen: document.querySelector("#game-over-screen"),
        restartButton: document.querySelector("#restart-button"),
    },
    values: {
        timerId: null,
        countDownTimerId: setInterval(countDown, 1000),
        gameVelocity: 1000,
        hitPositon: 0,
        result: 0,
        currentTime: 60,
        life: 3,
        isPaused: false, 
        gameOver: false, 
    },
};


function showAlert(message, callback) {
    const alertBox = document.getElementById('custom-alert');
    const alertMessage = document.getElementById('custom-alert-message');
    const okButton = document.getElementById('custom-alert-ok');

    alertMessage.textContent = message;
    alertBox.style.display = 'flex';

   
    state.values.isPaused = true;
    clearInterval(state.values.timerId);
    clearInterval(state.values.countDownTimerId);

    
    okButton.addEventListener('click', () => {
        alertBox.style.display = 'none';
        state.values.isPaused = false;
        callback();
    }, { once: true });
}

function countDown() {
    if (state.values.isPaused || state.values.gameOver) return; 

    state.values.currentTime--;
    state.view.timeleft.textContent = state.values.currentTime;

    if (state.values.currentTime <= 0) {
        if (state.values.gameOver) return;

        clearInterval(state.values.timerId);
        clearInterval(state.values.countDownTimerId);

        showAlert("Time Over! O seu resultado foi " + state.values.result, () => {
            if (state.values.result < 55) {
                showAlert("Game Over! O seu resultado foi " + state.values.result + ", abaixo de 55 ('o mínimo')", () => {
                    state.values.life--;
                    state.view.life.textContent = state.values.life;

                    if (state.values.life > 0) {
                        showAlert("Você tem " + state.values.life + " vidas restantes.", resetGame);
                    } else {
                        showAlert("Você perdeu todas as vidas, GAME OVER!", gameOver);
                    }
                });
            }
        });
    }
}

function playSound() {
    let audio = new Audio("./src/audios/hit.m4a");
    audio.volume = 0.05;
    audio.play();
}

function randomSquare() {
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy");
    });

    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy");
    state.values.hitPositon = randomSquare.id;
}

function moveEnemy() {
    clearInterval(state.values.timerId);
    state.values.timerId = setInterval(randomSquare, state.values.gameVelocity);
}

function addListenerHitBox() {
    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown", () => {
            if (square.id === state.values.hitPositon && !state.values.isPaused && !state.values.gameOver) {
                state.values.result++;
                state.view.score.textContent = state.values.result;
                state.values.hitPositon = null;
                playSound();

                flashBackground(square);

                if (state.values.result >= 55) {
                    state.values.gameOver = true;
                    showAlert("You win! Parabéns, você atingiu 55 pontos!", resetGame);
                }
            }
        });

        square.addEventListener("mouseup", () => {
            resetBackground(square);
        });
    });
}

function flashBackground(square) {
    square.style.backgroundColor = "red";
    setTimeout(() => {
        square.style.backgroundColor = "";
    }, 100);
}

function resetBackground(square) {
    square.style.backgroundColor = "";
}



function resetGame() {
    clearInterval(state.values.countDownTimerId);
    clearInterval(state.values.timerId);
    state.values.currentTime = 60;
    state.values.result = 0;
    state.view.score.textContent = 0;
    state.values.gameOver = false;
    state.values.countDownTimerId = setInterval(countDown, 1000);
    moveEnemy();
}

function gameOver() {
    state.view.gameOverScreen.style.display = "block";
    clearInterval(state.values.timerId);
    clearInterval(state.values.countDownTimerId);
    state.view.restartButton.addEventListener("click", restartGame);
}

function restartGame() {
    state.view.gameOverScreen.style.display = "none";
    state.values.life = 3;
    state.values.result = 0;
    state.values.currentTime = 60;
    state.view.score.textContent = state.values.result;
    state.view.life.textContent = state.values.life;

    resetGame();
}

function initialize() {
    moveEnemy();
    addListenerHitBox();
}

initialize();
state.view.restartButton.addEventListener("click", restartGame);
=======
  view: {
    squares: document.querySelectorAll(".square"),
    enemy: document.querySelector(".enemy"),
    timeLeft: document.querySelector("#time-left"),
    score: document.querySelector("#score"),
  },
  values: {
    gameVelocity: 1000,
    hitPosition: 0,
    result: 0,
    curretTime: 60,
  },
  actions: {
    timerId: setInterval(randomSquare, 1000),
    countDownTimerId: setInterval(countDown, 1000),
  },
};

function countDown() {
  state.values.curretTime--;
  state.view.timeLeft.textContent = state.values.curretTime;

  if (state.values.curretTime <= 0) {
    clearInterval(state.actions.countDownTimerId);
    clearInterval(state.actions.timerId);
    alert("Game Over! O seu resultado foi: " + state.values.result);
  }
}

function playSound(audioName) {
  let audio = new Audio(`./src/audios/${audioName}.m4a`);
  audio.volume = 0.2;
  audio.play();
}

function randomSquare() {
  state.view.squares.forEach((square) => {
    square.classList.remove("enemy");
  });

  let randomNumber = Math.floor(Math.random() * 9);
  let randomSquare = state.view.squares[randomNumber];
  randomSquare.classList.add("enemy");
  state.values.hitPosition = randomSquare.id;
}

function addListenerHitBox() {
  state.view.squares.forEach((square) => {
    square.addEventListener("mousedown", () => {
      if (square.id === state.values.hitPosition) {
        state.values.result++;
        state.view.score.textContent = state.values.result;
        state.values.hitPosition = null;
        playSound("hit");
      }
    });
  });
}

function initialize() {
  addListenerHitBox();
}

initialize();
>>>>>>> 8d11faae5a7727e6d3a7df3eaf5a2184bca63900
