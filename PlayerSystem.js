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
		let cashWon = Math.floor(Math.random()) + 1;
		switch (this.bet.type) {
			case 'show':
				if(winningRacers[0].color === this.bet.snail || 
					winningRacers[1].color === this.bet.snail || 
					winningRacers[2].color === this.bet.snail) 
				{
					this.money += cashWon;
					console.log(`You won $${cashWon}!`);
					return true;
				}
				break;
			case 'place':
				if(winningRacers[0].color === this.bet.snail || winningRacers[1].color === this.bet.snail) {
					this.money += (cashWon * 2);
					console.log(`You won $${cashWon}!`);
					return true;
				}
				break;
			case 'win':
				if(winningRacers[0].color === this.bet.snail) {
					this.money *= cashWon;
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
		console.log('Bet types: win, place, show');
		let type = this.prompt('Type: ');
		let snail = this.prompt('Snail: ');
		let wager = this.prompt('Wager $');
		this.bet = {
			type: type,
			snail: snail,
			wager: wager
		}
	}
}

module.exports = Player;