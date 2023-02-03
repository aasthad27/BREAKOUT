// canvas part

var can = document.getElementById('canvas1');

var ctx = can.getContext('2d');

// canvas width and height
can.width = 600;
can.height = 600;

// create an image element
var img = new Image();

img.src = "space1.png";

// window.onload is an event that occurs when all the assets
// have been successfully loaded( in this case only the .png)
window.onload = function() {
	// the initial image height
	var imgHeight = 0;

	// the scroll speed
	// an important thing to ensure here is that can.height
	// is divisible by scrollSpeed
	var scrollSpeed = 0.5;

	// this is the primary animation loop that is called 60 times
	// per second
	function loop()
	{
		// draw image 1
		ctx.drawImage(img, 0, imgHeight);

		// draw image 2
		ctx.drawImage(img, 0, imgHeight - can.height);

		// update image height
		imgHeight += scrollSpeed;

		//resetting the images when the first image entirely exits the screen
		if (imgHeight == can.height)
			imgHeight = 0;

		// this function creates a 60fps animation by scheduling a
		// loop function call before the
		// next redraw every time it is called
		window.requestAnimationFrame(loop);
	}

	// this initiates the animation by calling the loop function
	// for the first time
	loop();

}

// game part
const grid =document.querySelector('.grid')
const scoreDisplay =document.querySelector('#score')
const FinalScoreDisplay=document.querySelector('#Finalscore')
const blockWidth=100
const blockHeight=20
const boardWidth=560
const ballDiameter=20
const boardHeight=300
let sound = document.getElementById("collisionSound")
let music =document.getElementById("Sound")
let xDirection=-2
let yDirection=2
let timerId
let score=0
let FinalScore=0
const userStart =[230, 10]
let currentPosition =userStart 
const ballStart=[230, 40]
let ballCurrentPosition=ballStart
// game music
music.currentTime = 0;
music.play();
// create Block
class Block{
    constructor(xAxis,yAxis)
    {
        this.bottomLeft=[xAxis,yAxis]
        this.bottomRight=[xAxis + blockWidth,yAxis]
        this.topLeft=[xAxis,yAxis+blockHeight]
        this.topRight=[xAxis+blockWidth,yAxis]
    }
}
//all Blocks
const blocks =[
                new Block(10,270) ,
                new Block(120,270) ,
                new Block(230,270) ,
                new Block(340,270) ,
                new Block(450,270) ,
                new Block(10,240) ,
                new Block(120,240) ,
                new Block(230,240) ,
                new Block(340,240) ,
                new Block(450,240) ,
                new Block(10,210) ,
                new Block(120,210) ,
                new Block(230,210) ,
                new Block(340,210) ,
                new Block(450,210) ,
                
]

// draw my block
function addBlocks(){
         for(let i=0;i<blocks.length;i++)
         {
            const block=document.createElement('div')
            block.classList.add('block')
            block.style.left = blocks[i].bottomLeft[0] + 'px'
            block.style.bottom = blocks[i].bottomLeft[1] + 'px'
            grid.appendChild(block)
         }
}

addBlocks()

// add user
const user = document.createElement('div')
user.classList.add('user')
user.style.left=currentPosition[0] + 'px'
user.style.bottom=currentPosition[1] + 'px'
grid.appendChild(user)
// draw the user
function drawUser(){
    user.style.left=currentPosition[0]+'px'
    user.style.bottom=currentPosition[1]+'px'
}
// draw the ball 
function drawBall(){
    ball.style.left=ballCurrentPosition[0]+'px'
    ball.style.bottom=ballCurrentPosition[1]+'px'
}  
// //move user
 function moveUser(e){
    switch(e.key){
        case 'ArrowLeft':
            if(currentPosition[0]>0){
            currentPosition[0] -=10
            drawUser()
            }
            break;
        case 'ArrowRight':
            if(currentPosition[0]<boardWidth-blockWidth)
            {
            currentPosition[0] +=10 
            drawUser()
            }
            break;
            
    }
 }

 document.addEventListener('keydown' ,moveUser)

 // add ball
const ball =document.createElement('div')
ball.classList.add('ball')
drawBall()
grid.appendChild(ball)
 

//move ball
function moveBall()
{
    ballCurrentPosition[0] += xDirection
    ballCurrentPosition[1] += yDirection
    drawBall()
    checkForCollisions()
}
timerId =setInterval(moveBall,30)

// check for collisions
function checkForCollisions()
{
    // check for ball collision 
  for(let i=0;i<blocks.length;i++)
  {
    if(
        (ballCurrentPosition[0]>blocks[i].bottomLeft[0] && ballCurrentPosition[0]<blocks[i].bottomRight[0]) &&((ballCurrentPosition[1]+ballDiameter) >blocks[i].bottomLeft[1] && ballCurrentPosition[1]<blocks[i].topLeft[1])
    ){
        // add collision music
        sound.currentTime = 0;
        sound.play();
          setTimeout(function() {
       sound.pause();
}, 1000);
        const  allBlocks=document.querySelectorAll('.block')
        allBlocks[i].classList.remove('block')
        blocks.splice(i,1)
        changeDirection()
        score++
        FinalScore=score
        scoreDisplay.innerHTML=score
    }
  }
  // check for wall collision 
  if(ballCurrentPosition[0]>=(boardWidth-ballDiameter) || ballCurrentPosition[1]>=(boardHeight-ballDiameter) || ballCurrentPosition[0]<=0)
  {
    // add collision music
      sound.currentTime = 0;
      sound.play();
      setTimeout(function() {
  sound.pause();
}, 1000);
    changeDirection()   
  } 
  // check for user collision 
  if(
  (ballCurrentPosition[0]>currentPosition[0] && ballCurrentPosition[0]<currentPosition[0]+ blockWidth)&& (ballCurrentPosition[1]>currentPosition[1] && ballCurrentPosition[1]<currentPosition[1]+blockHeight)
  )
  { // add coliision music
      sound.currentTime = 0;
      sound.play();
      setTimeout(function() {
       sound.pause();
}, 1000);
    changeDirection()
  }
  // check for game over 
  if(ballCurrentPosition[1]<=0 && score!=15)
  {
    clearInterval(timerId)
    scoreDisplay.innerHTML='Shit You Lose'
    FinalScoreDisplay.innerHTML= FinalScore
    document.removeEventListener('keydown' , moveUser) // can't move 
  }
   if(score==15)
  {
    clearInterval(timerId)
        scoreDisplay.innerHTML='YOU WON!'
      FinalScoreDisplay.innerHTML= FinalScore
      document.removeEventListener('keydown' , moveUser) // can't move 
  }
}
 
function changeDirection()
{
   if(xDirection == 2 && yDirection ==2)
   {
    yDirection =-2
    return
   }
   if(xDirection== 2 && yDirection==-2)
   {
    xDirection = -2
    return
   }
   if(xDirection == -2 && yDirection == -2)
   {
  yDirection =2
  return 
   }
   if(xDirection ==-2 && yDirection ==2)
   {
    xDirection =2
    return 
   }
}

