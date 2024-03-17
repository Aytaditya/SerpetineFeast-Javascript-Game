// making direction a javascript object
let inputDir = { x: 0, y: 0 };
let foodSound = new Audio("munching.mp3")
let gameOverSound = new Audio("ending.mp3")
let moveSound = new Audio("moving.mp3")
let speed = 3;
let score = 0;
let lastPaintTime = 0;
// Snake Array 
let snakeArr = [
    { x: 13, y: 15 }

]
let heading=document.getElementById("heading");
let recordScore=document.getElementById("score");
let highScore=document.getElementById("highScore");

// food will not be an array
let food = { x: 7, y: 7 }

let board = document.getElementById("board");


// Game functions here
function main(ctime) {

    // We could have used setInterval method also but we will not use it because requestAnimationFrame is better has advantages over it

    //requestAnimationFrame will be called that will call main function and that will call requestAnimationFrame making a game loop again and again
    window.requestAnimationFrame(main);

    // ctime===>   ctime stands for "current time." It's a parameter that represents the timestamp of the current frame when the main function is called. This parameter is typically used in animations and game loops to calculate the time elapsed between frames.    (NOTE ctime IS IN ms)


    //managing frames per second
    // we will change this to increase the speed of snake
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return;

    }
    lastPaintTime = ctime;
    gameEngine()

}

// when snake collides function
function isCollide(snake) {
    for (let i = 1; i < snake.length; i++) {

        // snake got bumped 
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }

    }
    //snake got out of the grid
    if (snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0) {
        
        return true;
        
    }



}

function gameEngine() {
    // Part1: updating snake and food


    if (isCollide(snakeArr)) {
        gameOverSound.play();
        inputDir = { x: 0, y: 0 };
        alert("Game Over!!!!!")
        //Reseting Snake Array
        snakeArr = [
            { x: 13, y: 15 }

        ]
        score = 0;
        speed=3;
        recordScore.innerHTML="Score:"+score;
    }

    //  is food eaten increment score and regenerate food
    // this means is head position is equal to food positin then
    if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
        foodSound.play();
        score=score+1;
       
       if(speed<10){
        speed=speed+1;
        console.log(speed);
       }

       if(score>highscoreval){
        highscoreval=score;
        localStorage.setItem("highscore",JSON.stringify(highscoreval))
        highScore.innerHTML="High Score:"+highscoreval;
       }

       
        
        recordScore.innerHTML="Score:"+score;
        
        snakeArr.unshift({ x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y });
        // snakeBody.unshift() adds a new element to the beginning of the snakeArr array.

        // Generating a random number between a to b formula
        let a = 1;
        let b = 16;

        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) };
    }


    // moving snake
    for (let i = snakeArr.length - 2; i >= 0; i--) {

        // to make a new object with same properties
        snakeArr[i + 1] = { ...snakeArr[i] }


    }
    snakeArr[0].x = snakeArr[0].x + inputDir.x;
    snakeArr[0].y = snakeArr[0].y + inputDir.y;



    // Part2: Display food and snake

    // Displaying Snake Head at start
    board.innerHTML = "";
    snakeArr.forEach((e, index) => {
        let snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;

        if (index === 0) {
            snakeElement.classList.add('head');
        }
        else {
            snakeElement.classList.add('snake');
        }

        board.appendChild(snakeElement);
    });

    // Display Food
    let foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);

}




//Main logic

let highscore=localStorage.getItem("highscore");
if(highscore===null){
    //JSON.stringify() is a method in JavaScript that converts a JavaScript object or value to a JSON string.
    var highscoreval=0;
    localStorage.setItem("highscore",JSON.stringify(highscoreval))
}
else{
    highscoreval=JSON.parse(highscore);
    highScore.innerHTML="High Score:"+highscoreval;

}



// this will fire main function once
window.requestAnimationFrame(main);

// if  key is pressed this function will fire 
window.addEventListener('keydown', e => {
    inputDir = { x: 0, y: 1 } //Starting the Game
    moveSound.play();

    // now we will detect which key is pressed
    switch (e.key) {
        case "ArrowUp":
            inputDir.x = 0;
            inputDir.y = -1;
            break;
        case "ArrowDown":
            inputDir.x = 0;
            inputDir.y = 1;
            break;
        case "ArrowLeft":
            inputDir.x = -1;
            inputDir.y = 0;
            break;
        case "ArrowRight":
            inputDir.x = 1;
            inputDir.y = 0;
            break;
        default:
            break;
    }


})



