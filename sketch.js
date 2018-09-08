var population;
var lifespan = 200;
var count = 0;
var target;
var maxforce = 0.2;

function setup() {
	createCanvas(400, 300);
	rocket = new Rocket();
	population = new Population();
	target = createVector(width/2, 50);
}

function draw() {
	background(0);
	population.run();
	count++;

	if (count == lifespan) {
		population.evaluate();
		population.selection();
		count = 0;
	}

	ellipse(target.x, target.y, 16, 16);
}

function Population() {
	this.rockets = [];
	this.matingpool = [];
	this.popsize = 50;

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

	this.run = function() {
		for (var i = 0; i < this.popsize; i++) {
			this.rockets[i].update();
			this.rockets[i].show();
		}
	}

	this.evaluate = function() {
		var maxfit = 0;
		for (var i = 0; i < this.popsize; i++) {
			this.rockets[i].calcFitness();
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
		this.genes[i].setMag(maxforce);
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
				this.genes[i].setMag(maxforce);
			}
		}
	}
}



function Rocket(dna) {
	this.pos = createVector(width/2, height);
	this.vel = createVector();
	this.acc = createVector();
	if (dna) {
		this.dna = dna;
	} else {
		this.dna = new DNA();

	}
	this.fitness = 0;
	this.completed = false;

	this.applyForce = function(force) {
		this.acc.add(force);
	}

	this.calcFitness = function() {
		var d = dist(this.pos.x, this.pos.y, target.x, target.y);
		this.fitness = map(d, 0, width, width, 0);

		if (this.completed) {
			this.fitness *= 10;
		}
	}

	this.update = function() {
		var d = dist(this.pos.x, this.pos.y, target.x, target.y);
		if (d < 10) {
			this.completed = true;
			this.pos = target.copy();
		}

		this.applyForce(this.dna.genes[count]);
		if (!this.completed) {
			this.vel.add(this.acc);
			this.pos.add(this.vel);
			this.acc.mult(0);
		}
		
	}

	this.show = function() {
		push();
		noStroke();
		fill(255,150);
		translate(this.pos.x, this.pos.y);
		rotate(this.vel.heading());
		rectMode(CENTER);
		rect(0,0,25,5);
		pop();
	}


}