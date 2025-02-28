document.addEventListener("DOMContentLoaded", function() {
    let scoreElement = document.getElementById("score");
    let timeElement = document.getElementById("time");
    let problemElement = document.getElementById("problem");
    let answerInput = document.getElementById("answer");
    let highScoreElement = document.getElementById("highScore");

    let score = 0;
    let highScore = localStorage.getItem("highScore") || 0;
    highScoreElement.textContent = highScore;
    let timeLeft = 10;
    let timer;
    let currentAnswer;

    function generateProblem() {
        let num1 = Math.floor(Math.random() * 10) + 1;
        let num2 = Math.floor(Math.random() * 10) + 1;
        currentAnswer = num1 + num2;
        problemElement.textContent = `${num1} + ${num2} = ?`;
    }

    answerInput.addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            let userAnswer = parseInt(answerInput.value);
            if (userAnswer === currentAnswer) {
                score++;
                scoreElement.textContent = score;
            } else {
                answerInput.value = ""; // 間違った場合は入力欄をクリア
            }
            generateProblem();
        }
    });

    function startGame() {
        console.log("ゲーム開始");
        generateProblem();
        answerInput.disabled = false;
        answerInput.focus(); // 開始時に入力欄にフォーカス

        timer = setInterval(function() {
            timeLeft--;
            timeElement.textContent = timeLeft;

            if (timeLeft <= 0) {
                clearInterval(timer);
                answerInput.disabled = true;
                if (score > highScore) {
                    highScore = score;
                    localStorage.setItem("highScore", highScore);
                    highScoreElement.textContent = highScore;
                }
                alert("ゲーム終了！スコア: " + score);
            }
        }, 1000);
    }

    startGame();
});
