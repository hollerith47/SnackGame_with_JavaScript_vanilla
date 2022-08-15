var canvas, scoreContainer, ctx, audioWin, audioLose;

// property canvas
const canvasSize = 400;
const canvasBorder = "3px solid red";
const canvasBgColor = "#1d1d1d";
const canvasOpacity = "0.8";

//the main div
const root = document.getElementById("root");

//score property
const scoreColorWin = "white";
const scoreColorLose = "red";
let score = 40;
const scorePlus = 10;

//snack property
const snackColor = "orange";
let snackSize = 20;
let snackSizeY = 20;
let snackBody = [];
let snackBodySize = 3;
const blockUnit = canvasSize / snackSize;
let snackX = Math.trunc(Math.random()* blockUnit) * snackSize;
let snackY = Math.trunc(Math.random()* blockUnit) * snackSize;

//step property
let stepX = 0;
let stepY = 0;

//Food property
const foodColor = "orange";
const foodSize = 20;
const rayonFood = snackSize / 2;
const foodBlockUnit = blockUnit;
let foodX = Math.trunc(Math.random()* foodBlockUnit) * foodSize + rayonFood;
let foodY = Math.trunc(Math.random()* foodBlockUnit) * foodSize + rayonFood;

export const SnackGame = {
	start: () =>{
		SnackGame.initMedia();
		SnackGame.createCanvas();
		SnackGame.createSnack();
		SnackGame.createFood();
		SnackGame.initSnackMove();
		setInterval(SnackGame.updateSnackPosition, 100)
	},
	
	createCanvas: () =>{
		// console.log("createCanvas");
		scoreContainer = document.createElement("div");
		scoreContainer.id = "score";
		scoreContainer.innerHTML = new Intl.NumberFormat("en-US", {style: "currency", currency: "USD"}).format(score);
		scoreContainer.style.color = scoreColorWin;
		
		canvas = document.createElement("canvas");
		canvas.width = canvasSize;
		canvas.height = canvasSize;
		canvas.style.border = canvasBorder;
		canvas.style.backgroundColor = canvasBgColor;
		canvas.style.opacity = canvasOpacity;
		
		ctx = canvas.getContext('2d');
		root.appendChild(scoreContainer);
		root.appendChild(canvas);
	},
	initMedia: () =>{
		audioWin = document.createElement("audio");
		audioWin.src = "/assets/media/win.mp3"
		audioLose = document.createElement("audio");
		audioLose.src = "/assets/media/lose.mp3"
	},
	createSnack: () =>{
		ctx.fillStyle = snackColor;
		ctx.clearRect(0,0, canvasSize, canvasSize);
		snackBody.push({snackX, snackY});
		if (snackBody.length > snackBodySize){
			snackBody.shift()
		}
		snackBody.forEach(body =>{
			ctx.fillRect(body.snackX,body.snackY, snackSize, snackSizeY);
		})
		SnackGame.createFood();
	},
	
	createFood: () =>{
		ctx.beginPath();
		ctx.arc(foodX, foodY, rayonFood, 0, 2 * Math.PI);
		ctx.fillStyle = foodColor;
		ctx.fill();
		ctx.closePath()
	},
	
	updateSnackPosition: ()=>{
		snackX += stepX * snackSize;
		snackY += stepY * snackSize;
		SnackGame.createSnack();
		SnackGame.checkClassse();
		
	},
	
	initSnackMove: () =>{
		document.addEventListener("keydown", (ev)=> {
			// console.log(ev.key);
			switch (ev.key) {
				case "ArrowUp":
					stepY = -1
					stepX = 0
					SnackGame.updateSnackPosition()
					break;
				case "ArrowDown":
					stepY = 1
					stepX = 0
					SnackGame.updateSnackPosition()
					break;
				case "ArrowLeft":
					stepY = 0
					stepX = -1
					// console.log({stepX, stepY})
					SnackGame.updateSnackPosition()
					break;
					
				case "ArrowRight":
					stepY = 0
					stepX = 1
					// console.log({stepX, stepY})
					SnackGame.updateSnackPosition()
					break;
				case "p":
					stepY = 0
					stepX = 0
					// console.log({stepX, stepY})
					SnackGame.updateSnackPosition()
					break;
				case "P":
					stepY = 0
					stepX = 0
					// console.log({stepX, stepY})
					SnackGame.updateSnackPosition()
					break;
				case " ":
					stepY = 0
					stepX = 0
					// console.log({stepX, stepY})
					SnackGame.updateSnackPosition()
					break;
				default:
					break;
			}
		})
	},
	setWin: ()=>{
		// console.log("WIN");
		audioWin.play();
		SnackGame.changeFoodXY();
		snackBody +=3;
		SnackGame.updateScore(score + scorePlus);
		SnackGame.updateSnackPosition();
	},
	setLose: ()=>{
		audioLose.play();
		// console.log("error")
		stepX = 0;
		stepY = 0;
		snackX = Math.trunc(Math.random()* blockUnit) * snackSize;
		snackY = Math.trunc(Math.random()* blockUnit) * snackSize;
		
		SnackGame.changeFoodXY();
		snackBody = [];
		SnackGame.updateScore(score - scorePlus);
	},
	
	checkClassse: ()=>{
		if ((snackX <0 || snackX > canvasSize - snackSize) || ((snackY<0 || snackY> canvasSize - snackSize))){
			//error
			SnackGame.setLose();
			SnackGame.changeScoreColor();
			
		} else if(((foodX - rayonFood) === snackX) && ((foodY - rayonFood) === snackY)){
			//win
			SnackGame.setWin();
			SnackGame.changeScoreColor();
			
			
		}
	},
	changeFoodXY: ()=>{
		foodX = Math.trunc(Math.random()* foodBlockUnit) * foodSize + rayonFood;
		foodY = Math.trunc(Math.random()* foodBlockUnit) * foodSize + rayonFood;
	},
	
	changeScoreColor: ()=>{
		if (score>0){
			scoreContainer.style.color = scoreColorWin;
		}else {
			scoreContainer.style.color = scoreColorLose;
		}
	},
	updateScore: (newScore)=>{
		score = newScore;
		scoreContainer.innerHTML = new Intl.NumberFormat("en-US", {style: "currency", currency: "USD"}).format(score);
		
	}
}
