const selectDifficulty = () => {
	console.log('1: An afternoon at the track. Goal $20 (EASY)');
	console.log('2: Enthusiast. Goal $50 (MEDIUM)');
	console.log('3: You owe some serius cash to some serius people. Goal $100 (HARD)');
	let choice = prompt('Select a game mode: ');
	switch (choice) {
		case '1':
			return 25;
		case '2':
			return 50;
		case '3':
			return 100;
	}
};


// generateRound returns an array representing a 'snapshot' of the round.
// The race is actually completed within a second and later simulated by delaying the print time between each snapshot.
const generateRound = () => {
	let roundArray = [];
	for(let i = 0; i < 100; i++) {
		roundArray.push('');
	}
	roundArray.push('========================');
	SnailSystem.snailObjects.forEach(snail => {
		roundArray.push( snail.rail.join(' ') );
		if( snail.finishedRace && winners.includes(snail) === false ) winners.push(snail);
	});
	roundArray.push('========================');
	return roundArray;
};


// After the timer expires it prints the snap and returns a resolved promise.
const delayPrint = (data, delayMultiplier) => {
	return new Promise(resolved => setTimeout(() => {
		console.log(data);
		resolved('Passed');
	}, delayMultiplier * 1000));
};


const runRaceAnimaiton = () => {
	const snapshotPromises = [];
	const snapshots = []; // A 2D array
	// Generate snapshots until there are 3 winners.
	while ( winners.length < 3 ) {
		snapshots.push(generateRound());
		SnailSystem.moveRandomSnail();
	}
	// Print every snapshot. (run the race animation)
	for(let i = 0; i < snapshots.length; i++) {
		for(snapshot of snapshots[i]) {
			snapshotPromises.push(delayPrint(snapshot, i)); // <- change i to 0 to speed up testing
		}
	}
	return Promise.all(snapshotPromises);
};

const printPodium = () => {
	console.log(`  ${winners[0].snailToken}`);
	console.log(`  []${winners[1].snailToken}`);
	console.log(`${winners[2].snailToken}[][]`);
};


const playRound = () => {

	SnailSystem.generateSnailObjects(raceColors);

	Player.logMoney();
	console.log(`Race ${raceNumber}/9: ${raceColors.join(' ')}`);
	Player.placeBet();
	runRaceAnimaiton()
		.then(()=> {
			printPodium();
			Player.checkBetAndCollectWinnings(winners);
			Player.logMoney();
			raceNumber++;
			if(Player.hasMoney() && raceNumber < 10) {	
				if(Player.money < amountOfMoneyNeededToWin) {
					if(prompt('Bet on the next race? y/n: ') === 'y') {
						winners = [];
						playRound();
					}
				} else {
					Player.logMoney();
					console.log('You won!');
				}
			}
		});
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
const raceColors = ['Green', 'Red', 'Blue'];
let raceNumber = 1;
let winners = [];

playRound();