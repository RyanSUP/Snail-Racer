// update snail objets
let SnailSystem = {
	snailObjects: [],
	winners: [],
	// snailFactory returns an object that represents the snail on its own rail
	snailFactory(color) {
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
	},
	// Returns a random snail that hasn't finished the race.
	moveRandomSnail() {
		let snailsThatHaventFinished = this.snailObjects.filter(snail => {
			if(snail.finishedRace === false) {
				return true;
			}
		});
		if (snailsThatHaventFinished.length > 0) {
			let randomSnail = snailsThatHaventFinished[Math.floor( Math.random() * snailsThatHaventFinished.length )];
			randomSnail.moveVerySlowly();
		}

	},
	generateSnailObjects(colors) {
		const raceColors = ['Green', 'Red', 'Blue'];
		for(color of raceColors) { // <-- Add or remove colors to race here
			this.snailObjects.push( this.snailFactory(color) );
		}
	},
	// generateRound returns an array representing a 'snapshot' of the round.
	// The race is actually completed within a second and later simulated by delaying the print time between each snapshot.
	generateRound() {
		let roundArray = [];
		for(let i = 0; i < 100; i++) {
			roundArray.push('');
		}
		roundArray.push('========================');
		this.snailObjects.forEach(snail => {
			roundArray.push( snail.rail.join(' ') );
			if( snail.finishedRace && this.winners.includes(snail) === false ) this.winners.push(snail);
		});
		roundArray.push('========================');
		return roundArray;
	},
	delayPrint(data, delayMultiplier) {
		return new Promise(resolved => setTimeout(() => {
			console.log(data);
			resolved('Passed');
		}, delayMultiplier * 1000));
	},
	runRaceAnimaiton() {
		const snapshotPromises = [];
		const snapshots = []; // A 2D array
		// Generate snapshots until there are 3 winners.
		while ( this.winners.length < 3 ) {
			snapshots.push(this.generateRound());
			this.moveRandomSnail();
		}
		// Print every snapshot. (run the race animation)
		for(let i = 0; i < snapshots.length; i++) {
			for(snapshot of snapshots[i]) {
				snapshotPromises.push(this.delayPrint(snapshot, i)); // <- change i to 0 to speed up testing
			}
		}
		return Promise.all(snapshotPromises);
	},


	printPodium() {
		console.log(`  ${this.winners[0].snailToken}`);
		console.log(`  []${this.winners[1].snailToken}`);
		console.log(`${this.winners[2].snailToken}[][]`);
	},

	printSnails() {
		let snailNames = [];
		this.snailObjects.forEach(snail =>{
			snailNames.push(snail.color);
		});
		console.log(snailNames.join(' '));
	}
}

module.exports = SnailSystem;