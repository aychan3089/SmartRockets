function Target() {
	this.x = width/2;
	this.y = 50;
	this.diameter = 16;
	this.drag = false;
	this.offsetX = 0;
	this.offsetY = 0;

	this.show = function() {
		fill(255);
		//createVector(this.x, this.y);
		ellipse(this.x, this.y, this.diameter, this.diameter);
	}
	
	this.update = function() {
		if (this.drag) {
			this.x = mouseX + this.offsetX;
			this.y = mouseY + this.offsetY;
			fill(255, 0 , 255);
			ellipse(this.x, this.y, this.diameter, this.diameter);
		} else {
			fill(255, 0 , 0);
			ellipse(this.x, this.y, this.diameter, this.diameter);
		}
	}

	this.clicked = function() {
		if (dist(mouseX, mouseY, this.x, this.y) < 9) {
    		this.drag = true;
    		this.offsetX = this.x - mouseX;
    		this.offsetY = this.y - mouseY;
  		} 
	}

	this.release = function() {
		this.drag = false;
	}
}