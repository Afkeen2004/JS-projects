let currMoleTile; // which tile the mole is on
let currPlantTiles = []; // multiple plants as the level goes on
let score = 0; // score recorder
let gameOver = false; // checking if the game is over or not
let level = 1; // levels for making it harder
let time = 60; // total time for the game
let timerInterval; // interval for the game timer
let plantCount = 1; // initial number of plants
let moleInterval; // interval for spawning the mole
let plantInterval; // interval for spawning plants
let moleIntervalTime = 1000; // initial mole spawn time in milliseconds
let plantIntervalTime = 2000; // initial plant spawn time in milliseconds
let levelThresholds = [60, 120, 180]; // Score thresholds for leveling up
let maxScore = 200; // Maximum score limit

// setting up the game initally
window.onload = function () {
    setGame();
};

//starting the game
function setGame() {
    // setting the 9 divs for the grid
    for (let i = 0; i < 9; i++) {
        let tile = document.createElement("div");
        tile.id = i.toString();
        tile.addEventListener("click", selectTile); // event listening for  a click from the user
        tile.className = "tile";
        document.getElementById("board").appendChild(tile); // appending them as child to another tag
    }
    // setting up the timings and graphics
    updateUI();
    startTimer();
    startIntervals();
}

// setting up the metrics to be displayed
function updateUI() {
    document.getElementById("score").innerText = `Score: ${score}`;
    document.getElementById("level").innerText = `Level: ${level}`;
    document.getElementById("timer").innerText = `Time: ${time}s`;
}

// starting up the timer    
function startTimer() {
    timerInterval = setInterval(() => {
        if (time > 0) {
            time--;
            document.getElementById("timer").innerText = `Time: ${time}s`;
        } else {
            endGame();
        }
    }, 1000);
}

// setting up spawning for mole and plants
function startIntervals() {
    moleInterval = setInterval(setMole, moleIntervalTime);
    plantInterval = setInterval(setPlants, plantIntervalTime);
}

// selecting a random tile from the grid for placing the mole and plants
function getRandomTile(excludeTiles = []) {
    let num;
    do {
        num = Math.floor(Math.random() * 9).toString(); // random choosings
    } while (excludeTiles.includes(num));
    return num;
}

// setting up the mole in the random tile
function setMole() {
    if (gameOver) return; // checking if game is over

    if (currMoleTile) currMoleTile.innerHTML = ""; // replacing the old tile with empty string so there wont be multiple items

    let mole = document.createElement("img"); // creating the mole
    mole.src = "./monty-mole.png";
    mole.className = "mole";

    let num = getRandomTile(currPlantTiles.map(tile => tile.id)); //placing the mole
    currMoleTile = document.getElementById(num);
    currMoleTile.appendChild(mole);
}

// setting up the mole in the random tile
function setPlants() {
    if (gameOver) return; // checking if game is over

    currPlantTiles.forEach(tile => tile.innerHTML = ""); // replacing the old tile with empty string so there wont be multiple items
    currPlantTiles = []; // list of plants

    for (let i = 0; i < plantCount; i++) { // creating the plants
        let plant = document.createElement("img");
        plant.src = "./piranha-plant.png";
        plant.className = "plant";

        let num = getRandomTile([currMoleTile?.id, ...currPlantTiles.map(tile => tile.id)]); // placing the plants
        let plantTile = document.getElementById(num);
        plantTile.appendChild(plant);
        currPlantTiles.push(plantTile);
    }
}

// selection of the tile by user
function selectTile() {
    if (gameOver) return; // checking if game is over

    if (this === currMoleTile) { // checking if mole the adds 10 to the score
        score += 10;
        updateUI();

        // Remove the mole immediately after clicking
        currMoleTile.innerHTML = "";  
        currMoleTile = null;  

        checkLevelUp(); // checking for score benchmark for going to the next level
        checkMaxScore(); // checking if user reached max score
    } else if (currPlantTiles.includes(this)) { // checking if a plant is being clicked
        endGame(); // if so end game
    }
}

// checking for level up
function checkLevelUp() {
    if (level < 4 && score >= levelThresholds[level - 1]) {
        nextLevel();
    }
}

// checking for max game score
function checkMaxScore() {
    if (score >= maxScore) {
        endGame();
    }
}

// changing the metrics of the game for next levels
function nextLevel() {
    level++;
    document.getElementById("level").innerText = `Level: ${level}`;

    if (level === 2) {
        moleIntervalTime = 800;
        plantIntervalTime = 1500;
        plantCount = 2;
    } else if (level === 3) {
        moleIntervalTime = 600;
        plantIntervalTime = 1000;
        plantCount = 3;
    } else if (level === 4) {
        moleIntervalTime = 550;
        plantIntervalTime = 750;
        plantCount = 4;
    }

    // setting up the new metrics
    clearInterval(moleInterval);
    clearInterval(plantInterval);
    startIntervals();
}

// setting up the page for end game
function endGame() {
    gameOver = true;
    clearInterval(timerInterval);
    clearInterval(moleInterval);
    clearInterval(plantInterval);

    let scoreText = `GAME OVER: ${score}`;
    if (score >= 200) {
        scoreText += " MAXIMUM SCORE";
    }
    document.getElementById("score").innerText = scoreText;

    // Create a restart button
    let restartButton = document.createElement("button");
    restartButton.innerText = "Restart Game";
    restartButton.className = "restart-btn"; // Adding a class for styling
    restartButton.onclick = () => location.reload(); // Reload the page to restart

    // Append the button to the board or any container
    document.getElementById("board").appendChild(restartButton);
}

