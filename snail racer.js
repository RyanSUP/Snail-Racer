const selectDifficulty = () => {
	console.log('1: An afternoon at the track. Goal $20 (EASY)');
	console.log('2: Enthusiast. Goal $50 (MEDIUM)');
	console.log('3: You owe some serius cash to some serius people. Goal $100 (HARD)');
	let choice;
	do {
		choice = prompt('Select a game mode: ');	
	} while(choice > 3 || choice < 1 || isNaN(choice));
	switch (choice) {
		case '1':
			return 25;
		case '2':
			return 50;
		case '3':
			return 100;
	}
};

const race = () => {

	console.log(`Race ${raceNumber}/9: `);
	SnailSystem.generateSnailObjects();
	SnailSystem.printSnails();

	Player.logMoney();
	Player.placeBet(SnailSystem.snailObjects);
	return SnailSystem.runRaceAnimaiton()
};

// Structure of game will be
// 1) Place bets (eventually take input.)
// 2) then print race.
// 3) then determine if you won the bet.
// Race

// Setup queue trumpets: DAT DADA DA NANA DA NANA NANANA NAAAAAA
const prompt = require('prompt-sync')({sigint: true});
const Player = require('./PlayerSystem');
const SnailSystem = require('./SnailSystem');
let amountOfMoneyNeededToWin = selectDifficulty();

let raceNumber = 1;

race()
	.then(()=> {
		raceNumber++;
		SnailSystem.printPodium();
		Player.checkBetAndCollectWinnings(SnailSystem.winners);
		Player.logMoney();
		if(Player.hasMoney() && raceNumber < 10) {	
			if(Player.money < amountOfMoneyNeededToWin) {
				if(prompt('Bet on the next race? y/n: ') === 'y') {
					winners = [];
					race();
				}
			} else {
				Player.logMoney();
				console.log('You won!');
			}
		}
	});