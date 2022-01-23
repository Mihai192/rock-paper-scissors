const scoareboard = {
	"player" : 0,
	"computer" : 0
};

const dict = {
	1 : "rock",
	2 : "paper",
	3 : "scissors"
}

let reverseDict = {
	"rock" : 1,
	"paper" : 2,
	"scissors" : 3
}

const handsImages = document.querySelectorAll(".hands > div > img");

function userPlay(choice) {
	return reverseDict[choice.className];
}

function computerPlay() {
	return Math.floor(Math.random() * 3) + 1;
}

function winner(player1, player2) {
	const player1Wins = 0;
	const player2Wins = 1;
	const draw = 2;

	const rock = 1;
	const paper = 2;
	const scissors = 3;

	if (player1 == player2)
		return draw;
	
	if (player1 == rock && player2 == scissors)
		return player1Wins;
	else if (player1 == rock && player2 == paper)
		return player2Wins;					
	else if (player1 == scissors && player2 == paper)
		return player1Wins;
	else if (player1 == scissors && player2 == rock)
		return player2Wins;
	else if (player1 == paper && player2 == rock)
		return player1Wins;
	else
		return player2Wins;
}

function startAnimation(symbols, hands, handsImages) {
	handsChoiceMode(symbols, "none");

	handsImages[0].src = "img/rock.png";
	handsImages[1].src = "img/left-rock.png";

	if (hands[0].classList.contains("right-hand-animate"))
	{
		hands[0].classList.remove("right-hand-animate");
		hands[0].offsetLeft;
	}
			
	hands[0].classList.add("right-hand-animate");

	if (hands[1].classList.contains("left-hand-animate"))
	{
		hands[1].classList.remove("left-hand-animate");
		hands[1].offsetLeft;
	}
	
	hands[1].classList.add("left-hand-animate");
}

function printText(displayText) {
	let p = document.querySelector(".winner > p");
	p.innerHTML = displayText;

	let playerScore = document.querySelector(".player-score");
	let computerScore = document.querySelector(".computer-score");
	
	if (scoareboard["player"] == 5 || scoareboard["computer"] == 5) {
		playerScore.innerHTML = 0;
		computerScore.innerHTML = 0;

		let displayWinner = document.querySelector(".round-winner");

		if (scoareboard["player"] == 5)
			displayWinner.innerHTML = "You Won!";
		else
			displayWinner.innerHTML = "Computer Won!";

		scoareboard["player"] = 0;
		scoareboard["computer"] = 0;
	} else {
		playerScore.innerHTML = scoareboard["player"];
		computerScore.innerHTML = scoareboard["computer"];
	}
}


function runRound(choice) {
	let displayText = "";
	let getUserPlay = userPlay(choice);
	let getComputerPlay = computerPlay();
	let win = winner(getUserPlay, getComputerPlay);

	if (!win) {
		displayText += `You won ${dict[getUserPlay]} beats ${dict[getComputerPlay]}!`;
		scoareboard["player"] = scoareboard["player"] + 1;
	} else if (win == 1) {
		displayText += `You lost ${dict[getComputerPlay]} beats ${dict[getUserPlay]}!`;
		scoareboard["computer"] = scoareboard["computer"] + 1;
	} else
		displayText += `It's a draw!`;

	return [displayText, win, getUserPlay, getComputerPlay];
}

function changeHands(userPlay, computerPlay, handsImages) {
	handsImages[0].src = `img/${dict[userPlay]}.png`;
	handsImages[1].src = `img/left-${dict[computerPlay]}.png`;
}

function handsChoiceMode(hands, mode) {
	hands.forEach(function(hand) {
		hand.style.pointerEvents = mode;
	});
}

function onAnimationEnd(symbols, userPlay, computerPlay, 
	displayText, right_hand_animated, left_hand_animated) {
	right_hand_animated.addEventListener( "animationend", function() {
		left_hand_animated.addEventListener("animationend", function() {
			handsChoiceMode(symbols, "auto");

			changeHands(userPlay, computerPlay, handsImages);

			printText(displayText);
		});
	});
}

function main() {
	let hands = document.querySelectorAll(".hands > div");
	let symbols = document.querySelectorAll(".player-choice > div");
	
	symbols.forEach(function(symbol) {
		symbol.addEventListener("click", function() {
			startAnimation(symbols, hands, handsImages);

			let [displayText, winner, userPlay, computerPlay] = runRound(this);

			const right_hand_animated = document.querySelector('.right-hand-animate');
			const left_hand_animated  = document.querySelector('.left-hand-animate');
			
			onAnimationEnd(symbols, userPlay, computerPlay, displayText, right_hand_animated, left_hand_animated)
		});
	});
}

main();

