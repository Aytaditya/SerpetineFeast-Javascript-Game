// making direction a javascript object
let inputDir = { x: 0, y: 0 };
let foodSound = new Audio("munching.mp3")
let gameOverSound = new Audio("ending.mp3")
let moveSound = new Audio("moving.mp3")
let speed = 5;
let score=0;
let lastPaintTime = 0;
// Snake Array 
let snakeArr = [
    { x: 13, y: 15 }

]

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

function isCollide(sarr){
    return false;

}

function gameEngine() {
    // Part1: updating snake and food


    if(isCollide(snakeArr)){
        gameOverSound.play();
        inputDir={x:0,y:0};
        alert("Game Over Press any Key to Play Again")
        //Reseting Snake Array
         snakeArr = [
            { x: 13, y: 15 }
        
        ]
        score=0;
    }

          //  is food eaten increment score and regenerate food
              // this means is head position is equal to food positin then
              if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
                foodSound.play();
                snakeArr.unshift({ x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y });
                 // snakeBody.unshift() adds a new element to the beginning of the snakeArr array.
            
                // Generating a random number between a to b formula
                let a = 1;
                let b = 17;
                food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) };
            }
            

          // moving snake
          for(let i=snakeArr.length-2;i>=0;i--){

            // to make a new object with same properties
            snakeArr[i+1]={...snakeArr[i]}


          }
          snakeArr[0].x=snakeArr[0].x+inputDir.x;
          snakeArr[0].y=snakeArr[0].y+inputDir.y;



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

// this will fire main function once
window.requestAnimationFrame(main);

// if  key is pressed this function will fire 
window.addEventListener('keydown', e => {
    inputDir = { x: 0, y: 1 } //Starting the Game
    moveSound.play();

    // now we will detect which key is pressed
    switch (e.key) {
        case "ArrowUp":
            inputDir.x= 0;
            inputDir.y= -1;
            break;
        case "ArrowDown":
            inputDir.x= 0;
            inputDir.y= 1;
            break;
        case "ArrowLeft":
            inputDir.x= -1;
            inputDir.y= 0;
            break;
        case "ArrowRight":
            inputDir.x= 1;
            inputDir.y= 0;
            break;
        default:
            break;
    }


})



