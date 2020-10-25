// Snail =================================================================================================
// snailFactory returns an object that represents the snail on its own rail
const snailFactory = (color) => {
	return {
		color: color,
		snailToken: '@' + color[0],
		position: 0,
		rail: ['@' + color[0],' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','|'],
		finishedRace: false,
		moveVerySlowly() { // A method that updates the snails position on the rail. (https://www.youtube.com/watch?v=H6A8pvPL_dQ)
			if( this.finishedRace === false ) {
				this.position++;
				this.rail[ (this.position) ] = this.snailToken;
				this.rail[this.position - 1] = '~';
				if( this.position === this.rail.length - 1) { // The snail finishes the race when it reaches the finish line |
					this.finishedRace = true;
				}
			}
		}
	}
}

// Returns a random snail.
const pickRandomSnail = () => snailObjects[Math.floor( Math.random() * snailObjects.length )];
// End snail ====================================================================================================



// 1 easy $25
// 2 medium $50
// 3 hard $100
const selectDifficulty = () => {
	console.log('1: An afternoon at the track. Goal $20 (EASY)');
	console.log('2: Enthusiast. Goal $50 (MEDIUM)');
	console.log('3: You owe some serius cash to some serius people. Goal $100 (HARD)');
	let choice = prompt('Select a game mode: ');
	switch (choice) {
		case 1:
			return 25;
		case 2:
			return 50;
		case 3:
			return 100;
	}
}



// Race ==================================================================================================
// generateRound returns an array representing a 'snapshot' of the round.
// The race is actually completed within a second and later simulated by delaying the print time between each snapshot.
const generateRound = () => {
	let roundArray = [];
	for(let i = 0; i < 100; i++) {
		roundArray.push('');
	}
	roundArray.push('========================');
	snailObjects.forEach(snail => {
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


const runRaceAnimaiton = async () => {
	const snapshotPromises = [];
	const snapshots = []; // A 2D array
	// Generate snapshots until there are 3 winners.
	while ( winners.length < 3 ) {
		snapshots.push(generateRound());
		pickRandomSnail().moveVerySlowly();
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
// End race =======================================================================



let player = {
	money: 10,
	bet: {
		snail: null,
		amount: null
	},
	placeBet() {
		this.bet.snail = prompt('Pick a snail ');
		this.bet.amount = prompt('Place a bet $');
	},
	logMoney() {
		console.log(`You have $${this.money}`);
	},
	checkBet(winningSnails) {
		if(winningSnails[0].color === this.bet.snail) {
			let winnings = this.bet.amount * 2;
			console.log(`You won $${winnings}!`);
			this.money += winnings;
		} else {
			console.log(`You lost $${player.bet.amount}.`);
			this.money -= this.bet.amount;
		}	
	},
	hasMoney() {
		if(player.money > 0) {
			return true;
		} else {
			console.log('You\'re out of money!');
		}
	}
};


const playRound = async () => {
	for(color of raceColors) { // <-- Add or remove colors to race here
		snailObjects.push( snailFactory(color) );
	}

	console.log(`Race ${raceNumber}: ${raceColors.join(' ')}`);
	player.logMoney();
	player.placeBet();
	runRaceAnimaiton()
		.then(()=> {
			printPodium();
			player.checkBet(winners);
			player.logMoney();
			raceNumber++;
			if(player.hasMoney()) {	
				if(player.money < amountOfMoneyNeededToWin) {
					if(prompt('Bet on the next race? y/n: ') === 'y') {
						winners = [];
						snailObjects = [];
						playRound();
					}
				} else {
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
const raceColors = ['Green', 'Red', 'Blue']
let raceNumber = 1;
let snailObjects = [];
let winners = [];
let amountOfMoneyNeededToWin = selectDifficulty();


playRound();