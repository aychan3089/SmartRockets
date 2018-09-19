var population;
var obstacle;
var target;
var lifespan = 200;
var count = 0

function setup() {
	createCanvas(600, 500);
	obstacle = new Obstacle();
	population = new Population();
	target = new Target();
}

function draw() {
	background(0);
	obstacle.show();
	obstacle.update();
	target.show();
	target.update();
	population.run(target, obstacle);
	
	count++;
	if (count == lifespan) {
		population.evaluate(target);
		population.selection();
		count = 0;
	}	
}

function mousePressed() {
	obstacle.clicked();
	target.clicked();
}

function mouseReleased() {
	obstacle.release();
	target.release();
}

function doubleClicked() {
	obstacle.dclicked();
}