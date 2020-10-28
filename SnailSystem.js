// update snail objets
let SnailSystem = {
	snailObjects: [],
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
		this.snailObjects = [];
		for(color of colors) { // <-- Add or remove colors to race here
			this.snailObjects.push( this.snailFactory(color) );
		}
	}

}

module.exports = SnailSystem;