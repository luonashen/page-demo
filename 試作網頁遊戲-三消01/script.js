// 開始的 HTML 代碼（請確保在 <body> 中有一個 id 為 "game-container" 的容器元素）
<div id="game-container">
     <p1>消珠計數：<span id="score">0</span></p1>
           
        <p2>倒數計時：<span id="timer">300</span>秒</p2>
          
       

</div>


const gemColors = ["red", "green", "blue", "yellow", "purple", "orange"];
const gridSize = 6;
let score = 0;
let remainingTime = 300;
let timerInterval;
let isPaused = false;
let selectedGem = null;

const gameContainer = document.getElementById('game-container');
const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('timer');
const numRows = 8;
const numCols = 8;
const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ffc9d3', '#b5b9ff'];
let gameBoard = []; // 存储珠子的二维数组

function handleDragStart(event) {
    dragStartGem = this;
    
    // 添加拖拽时的样式特效，例如设置阴影或透明度
    this.style.boxShadow = "0px 0px 10px rgba(0, 0, 0, 0.7)";

    
    // 设置拖拽的图像，这里设置为空图像以隐藏默认的拖拽图像
    event.dataTransfer.setDragImage(new Image(), 0, 0);
}



function createGem(row, col) {
    const gem = document.createElement("div");
    gem.className = "ball";
    gem.dataset.row = row;
    gem.dataset.col = col;
    gem.style.backgroundColor = gemColors[Math.floor(Math.random() * gemColors.length)];
    gem.addEventListener("mousedown", handleDragStart);
    gem.addEventListener("dragstart", handleDragStart);
    gem.addEventListener("dragover", handleDragOver);
    gem.addEventListener("dragend", handleDragEnd);
    gem.addEventListener("drag", handleDrag);
    gem.addEventListener("drop", handleDrop);
    return gem;
}


initGame();
updateScore();
updateTimer();
startTimer();

gem.addEventListener("dragenter", handleDragEnter);
gem.addEventListener("dragleave", handleDragLeave);

function initGame() {
    for (let i = 0; i < gridSize * gridSize; i++) {
        const gem = createGem(Math.floor(i / gridSize), i % gridSize);
        gameContainer.appendChild(gem);
    }
}

function updateScore() {
    scoreDisplay.textContent = score;
}    
function handleDragStart(event) {
    selectedBall = event.target;
    isDragging = true;
    event.dataTransfer.setDragImage(new Image(), 0, 0);
    startX = event.clientX;
    startY = event.clientY;
    offsetX = 0;
    offsetY = 0;
}
function targetBall(event) {
    event.preventDefault();
    const clickedTile = event.target;
    if (selectedTile === null) {
        selectedTile = clickedTile;
        clickedTile.classList.add('selected');
    } else if (selectedTile === clickedTile) {
        selectedTile.classList.remove('selected');
        selectedTile = null;
    } else {
        const selectedRow = Math.floor(selectedTile.cellIndex / gridSize);
        const selectedCol = selectedTile.cellIndex % gridSize;
        const clickedRow = Math.floor(clickedTile.cellIndex / gridSize);
        const clickedCol = clickedTile.cellIndex % gridSize;
        const isAdjacent = (Math.abs(selectedRow - clickedRow) + Math.abs(selectedCol - clickedCol)) === 1;
        if (isAdjacent) {
            if (selectedTile.style.backgroundColor === clickedTile.style.backgroundColor) {
                checkAndClearMatches();
                fillEmptySpaces();
                score += 1;
                updateScore(); // 這裡更新了計分
            }
        } else {
            selectedTile.classList.remove('selected');
            selectedTile = null;
        }
    }
}
function checkAndClearMatches() {
    const balls = document.querySelectorAll('.ball');
    let matched = false;
    
    for (let i = 0; i < balls.length - 2; i++) {
        const color = balls[i].style.backgroundColor;
        if (!color) continue;

        const horizontalMatches = [i, i + 1, i + 2].some(index => balls[index] && balls[index].style.backgroundColor === color);
        const verticalMatches = [i, i + gridSize, i + gridSize * 2].some(index => balls[index] && balls[index].style.backgroundColor === color);

        if (horizontalMatches || verticalMatches) {
            [i, i + 1, i + 2].forEach(index => {
                balls[index].style.backgroundColor = '';
            });
            matched = true;
        }
    }
    
    return matched;
}

function handleDrop(event) {
    event.preventDefault();
    const targetBall = event.target;
    if (selectedBall && selectedBall !== targetBall) {
        const tempColor = targetBall.style.backgroundColor;
        targetBall.style.backgroundColor = selectedBall.style.backgroundColor;
        selectedBall.style.backgroundColor = tempColor;

        setTimeout(() => {
            checkAndClearMatches();
            fillEmptySpaces();
            updateScore();
            
            if (!checkAndClearMatches()) {
                // 交換不成功，將滑動的珠子恢復到原始顏色
                selectedBall.style.backgroundColor = tempColor;
                targetBall.style.backgroundColor = '';
            }
        }, 300);
        
        selectedBall = null;
    }
}

            // ...（這部分代碼已修正，請複製整段到您的 <script> 標籤中）
            
            for (let i = 0; i < gridSize * gridSize; i++) {
                const ball = document.createElement('div');
                ball.classList.add('ball');
                ball.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                ball.addEventListener('dragstart', handleDragStart);
                ball.addEventListener('dragover', handleDragOver);
                ball.addEventListener('drop', handleDrop);
                ball.addEventListener('dragend', handleDragEnd);
                ball.addEventListener('drag', handleDrag);
                grid.appendChild(ball);
            }
            
            updateScore();
            updateTimer();
            const timerElement = document.getElementById('timer'); // 獲取顯示倒數計時的元素
            let remainingTime = 300; // 初始倒數計時秒數
            
            if (horizontalMatches || verticalMatches) {
                // 將連線的三個珠子設置為空
                [i, i + 1, i + 2].forEach(index => balls[index].style.backgroundColor = '');
                score += 1; // 消珠計數加一
            }    
            function updateTimer() {
                timerElement.textContent = remainingTime; // 更新顯示的秒數
            }
            
            function countdown() {
                if (remainingTime > 0) {
                    remainingTime--; // 減少剩餘秒數
                    updateTimer(); // 更新顯示的秒數
                } else {
                    clearInterval(timerInterval); // 倒數計時結束，停止計時器
                    alert('時間到！遊戲結束！');
                }
            }
            
            // 開始計時器
            const timerInterval = setInterval(countdown, 1000); // 每秒執行一次 countdown 函式