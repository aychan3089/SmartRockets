function Population() {
	this.rockets = [];
	this.matingpool = [];
	this.popsize = 30;
	this.maxforce = 0.2;

	for (var i = 0; i < this.popsize; i++) {
		this.rockets[i] = new Rocket();
	}

	this.selection = function() {
		var newRockets = [];
		for (var i = 0; i < this.rockets.length; i++) {
			var parentA = random(this.matingpool).dna;
			var parentB = random(this.matingpool).dna;
			var child = parentA.crossover(parentB);
			child.mutation();
			newRockets[i] = new Rocket(child);
		}
		this.rockets = newRockets;
	}

	this.run = function(target, obstacle) {
		for (var i = 0; i < this.popsize; i++) {
			this.rockets[i].update(target, obstacle);
			this.rockets[i].show();
		}
	}

	this.evaluate = function(target) {
		var maxfit = 0;
		for (var i = 0; i < this.popsize; i++) {
			this.rockets[i].calcFitness(target);
			if (this.rockets[i].fitness > maxfit) {
				maxfit = this.rockets[i].fitness;
			}
		}
		
		for (var i = 0; i < this.popsize; i++) {
			this.rockets[i].fitness /= maxfit;
		}
		
		this.matingpool = [];
		for (var i = 0; i < this.popsize; i++) {
			var n = this.rockets[i].fitness * 100;
			for (var j = 0; j < n; j++) {
				this.matingpool.push(this.rockets[i]);
			}
		}
	}
}

function DNA(genes) {
	if (genes) {
		this.genes = genes;
	} else {
		this.genes = [];
		for (var i = 0; i < lifespan; i++) {
		this.genes[i] = p5.Vector.random2D();
		this.genes[i].setMag(this.maxforce);
		}
	}

	this.crossover = function(partner) {
		var newgenes = [];
		var mid = floor(random(this.genes.length))
		for (var i = 0; i < this.genes.length; i++) {
			if (i > mid) {
				newgenes[i] = this.genes[i];
			} else {
				newgenes[i] = partner.genes[i];
			}
		}
		return new DNA(newgenes);
	}

	this.mutation = function() {
		for (var i = 0; i < this.genes.length; i++) {
			if (random(1) < 0.01) {
				this.genes[i] = p5.Vector.random2D();
				this.genes[i].setMag(this.maxforce);
			}
		}
	}
}