function Target() {
	this.x = width/2;
	this.y = 50;
	this.diameter = 16;

	this.show = function() {
		fill(255);
		//createVector(this.x, this.y);
		ellipse(this.x, this.y, this.diameter, this.diameter);
	}
	
	this.update = function() {

	}
}