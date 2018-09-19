function Obstacle() {
	this.x = 100;
	this.y = 150;
	this.w = 200;
	this.h = 10;

	this.show = function() {
		fill(255);
		rect(this.x, this.y, this.w, this.h);
	}

	this.update = function() {

	}
}