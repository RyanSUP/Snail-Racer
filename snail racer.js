const prompt = require('prompt-sync')({sigint: true});

// snailFactory returns an object that represents the snail on its own rail.
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
const pickRandomSnail = () => snailRacers[Math.floor( Math.random() * snailRacers.length )];

// generateRound returns an array representing a 'snapshot' of the round.
// The race is actually completed within a second and later simulated by delaying the print time between each snapshot.
const generateRound = () => {
	pickRandomSnail().moveVerySlowly();
	let roundArray = [];
	roundArray.push('========================');
	snailRacers.forEach(snail => {
		roundArray.push( snail.rail.join(' ') );
		if( snail.finishedRace && winners.includes(snail) === false ) winners.push(snail);
	});
	roundArray.push('========================');
	return roundArray;
};

// Setup queue trumpets: DAT DADA DA NANA DA NANA NANANA NAAAAAA
const snailRacers = [];
const snapshots = []; // A 2D array
const snapshotPromises = [];
const winners = [];

for(color of ['Green', 'Red', 'Blue']) { // <-- Add or remove colors to race here
	snailRacers.push( snailFactory(color) );
}


// After the timer expires it prints the snap and returns a resolved promise.
const delayPrint = (data, delayMultiplier) => {
	return new Promise(resolved => setTimeout(() => {
		console.log(data);
		resolved('');
	}, delayMultiplier * 500));
};

// Structure of game will be
// 1) Place bets (eventually take input.)
// 2) then print race.
// 3) then determine if you won the bet.


const race = async () => {
	// Generate snapshots until there are 3 winners.
	while ( winners.length < 3 ) {
		snapshots.push(generateRound());
	}

	// Print every snapshot. (run the race animation)
	for(let i = 0; i < snapshots.length; i++) {
		for(snapshot of snapshots[i]) {
			snapshotPromises.push(delayPrint(snapshot, i));
		}
	}

	Promise.all(snapshotPromises)
		.then(()=> {
			printPodium();
			checkBet();
		});

};

const printPodium = () => {
	console.log(`  ${winners[0].snailToken}`);
	console.log(`  []${winners[1].snailToken}`);
	console.log(`${winners[2].snailToken}[][]`);
};

const checkBet = () => {
	if(winners[0].color === playerBet.snail) {
		console.log('You won $' + playerBet.bet*10);
	} else {
		console.log('You lost!');
	}
};

// Make bets
const placeBet = (snail, bet) => {
	return {
		snail: snail,
		bet: bet
	}
};

let mySnail = prompt('Pick a snail ');
let myBet = prompt('Place a bet $');
let playerBet = placeBet(mySnail, myBet);

race();
