const typesOfBets = ['exacta','trifecta','show','place','win'];
let Player = {
	prompt: require('prompt-sync')({sigint: true}),
	money: 10,
	bet: {},
	logMoney() {
		console.log(`You have $${this.money}`);
	},
	hasMoney() {
		if(this.money > 0) {
			return true;
		} else {
			console.log('You\'re out of money!');
		}
	},
	checkBetAndCollectWinnings(winningRacers) {
		let cashWon = 0;
		switch (this.bet.type) {
			case 'show':
				if(winningRacers[0].color === this.bet.snail || 
					winningRacers[1].color === this.bet.snail || 
					winningRacers[2].color === this.bet.snail) 
				{
					cashWon = Math.floor(Math.random()) + 2;
					this.money += cashWon;
					console.log(`You won $${cashWon}!`);
					return true;
				}
				break;
			case 'place':
				if(winningRacers[0].color === this.bet.snail[0] || winningRacers[1].color === this.bet.snail[0]) {
					cashWon = Math.floor(Math.random() * 2) + 2;
					this.money += cashWon;
					console.log(`You won $${cashWon}!`);
					return true;
				}
				break;
			case 'win':
				if(winningRacers[0].color === this.bet.snail[0]) {
					cashWon = Math.floor(Math.random() * 4) + 2;
					this.money += cashWon;
					console.log(`You won $${cashWon}!`);
					return true;
				}
				break;
			case 'exacta':
				if(winningRacers[0].color === this.bet.snail[0] && winningRacers[1].color === this.bet.snail[1]) {
					cashWon = Math.floor(Math.random() * 6) + 2;
					this.money += cashWon;
					console.log(`You won $${cashWon}!`);
					return true;					
				}
				break;
			case 'trifecta':
				if(winningRacers[0].color === this.bet.snail[0] && 
					winningRacers[1].color === this.bet.snail[1] && 
					winningRacers[2].color === this.bet.snail[2]) 
				{
					cashWon = Math.floor(Math.random() * 8) + 3;
					this.money += cashWon;
					console.log(`You won $${cashWon}!`);
					return true;
				}
				break;
		}
		this.money -= this.bet.wager;
		console.log(`You lost $${this.bet.wager}`);
		return false;
	},
	placeBet(snailArray) {
		let wager = null;
		let chosenType = null;
		let chosenSnails = [];
		// Place wager amount
		do {
			wager = this.prompt('Wager $');

		} while(wager > this.money || isNaN(wager));
		// Select type of wager
		do {
			console.log(`Types of bets: ${typesOfBets.join(' ')}`);
			chosenType = this.prompt('Type: ');

		} while(typesOfBets.includes(chosenType) === false);
		// Select snails
		const getValidSnailInput = (consolePrompt) =>{
			let invalidInput = true;
			let playerInput = null;
			do {
				playerInput = this.prompt(consolePrompt);
				snailArray.forEach(snail => {
					if( snail.color === playerInput && (chosenSnails.includes(playerInput) === false) ) {
						invalidInput = false;
					}
				});
			} while(invalidInput);
			return playerInput;
		}
		let firstPlaceSnail = getValidSnailInput('First pick: ');
		chosenSnails.push(firstPlaceSnail);
		if(chosenType === 'exacta' || chosenType === 'trifecta') {
			let secondPlaceSnail = getValidSnailInput('Second pick: ');
			chosenSnails.push(secondPlaceSnail);
			if(chosenType === 'trifecta') {
				let thirdPlaceSnail = getValidSnailInput('Third pick: ');
				chosenSnails.push(thirdPlaceSnail);
			} 
		}
		this.bet = {
			type: chosenType,
			snail: chosenSnails,
			wager: wager
		}
	}
}

module.exports = Player;