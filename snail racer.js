// What if I push all rounds to an array, then print the array with a setTimeout delay at the end of the program.
// This will let me know how many time's I need to loop - the current issue with while is it loops forever and overflows.
// So the race finishes before it is started technically.
const snailFactory = (color) => {
	return {
		color: color,
		snailToken: '@' + color[0],
		position: 0,
		rail: [this.snailToken,' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','|'],
		finishedRace: false,
		moveVerySlowly() { // https://www.youtube.com/watch?v=H6A8pvPL_dQ
			this.position++;
			if( this.position < this.rail.length ) { // Don't move the snail if it already crossed the finish
				this.rail[ (this.position) ] = this.snailToken; // Update snail position in the array
				this.rail[this.position - 1] = '~';
			}
			if( this.position === this.rail.length - 1) { // Check if snail finished race
				this.finishedRace = true;
			}
		}
	}
}
const pickRandomSnail = () => Math.floor( Math.random() * snailRacers.length );
// Setup queue trumpets: DAT DADA DA NANA DA NANA NANANA NAAAAAA
const winners = [];
const snailRacers = [];
for(color of ['Green', 'Red', 'Blue', 'Purple', 'Orange', 'Yellow']) { // <-- Add or remove colors to race here
	snailRacers.push( snailFactory(color) );
}
// Race
while ( winners.length < 3 ) {
	console.log('========================');
	snailRacers[pickRandomSnail()].moveVerySlowly();
	snailRacers.forEach(snail => {
		console.log( snail.rail.join(' ') );
		if( snail.finishedRace && winners.includes(snail) === false ) winners.push(snail);
	});
	console.log('========================');
}
// Print podium
console.log(`  ${winners[0].snailToken}`);
console.log(`  []${winners[1].snailToken}`);
console.log(`${winners[2].snailToken}[][]`);
