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
				if(winningRacers[0].color === this.bet.snail || winningRacers[1].color === this.bet.snail) {
					cashWon = Math.floor(Math.random() * 2) + 2;
					this.money += cashWon;
					console.log(`You won $${cashWon}!`);
					return true;
				}
				break;
			case 'win':
				if(winningRacers[0].color === this.bet.snail) {
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
	placeBet() {
		let snail;
		let wager = this.prompt('Wager $');
		console.log('Bet types: win, place, show, trifecta, exacta');
		let type = this.prompt('Type: ');
		if(type === 'exacta') {
			let exactaWager = [];
			let firstPlaceSnail = this.prompt('First place pick: ');
			let secondPlaceSnail = this.prompt('Second place pick: ');
			exactaWager.push(firstPlaceSnail);
			exactaWager.push(secondPlaceSnail);
			snail = exactaWager;
		} else if(type === 'trifecta') {
			let trifectaWager = [];
			let firstPlaceSnail = this.prompt('First place pick: ');
			let secondPlaceSnail = this.prompt('Second place pick: ');
			let thirdPlaceSnail = this.prompt('Third place pick: ');
			trifectaWager.push(firstPlaceSnail);
			trifectaWager.push(secondPlaceSnail);
			trifectaWager.push(thirdPlaceSnail);
			snail = trifectaWager;
		} else {
			snail = this.prompt('Snail: ');
		}
		this.bet = {
			type: type,
			snail: snail,
			wager: wager
		}
	}
}

module.exports = Player;