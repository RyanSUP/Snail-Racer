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

for(color of ['Green', 'Red', 'Blue', 'Purple', 'Orange', 'Yellow']) { // <-- Add or remove colors to race here
	snailRacers.push( snailFactory(color) );
}

// Generate snapshots until there are 3 winners.
while ( winners.length < 3 ) {
	snapshots.push(generateRound());
}

// After the timer expires it prints the snap and returns a resolved promise.
const delayPrint = (snap, delayMultiplier) => {
	return new Promise(resolved => setTimeout(() => {
		console.log(snap);
		resolved('');
	}, delayMultiplier * 500));
};

// Print every snapshot.
for(let i = 0; i < snapshots.length; i++) {
	for(snapshot of snapshots[i]) {
		snapshotPromises.push(delayPrint(snapshot, i));
	}
}

// Do stuff after all snapshots have been printed.
Promise.all(snapshotPromises)
	.then(()=> {
		console.log(`  ${winners[0].snailToken}`);
		console.log(`  []${winners[1].snailToken}`);
		console.log(`${winners[2].snailToken}[][]`);
	});



