function Obstacle() {
	this.w = 200;
	this.h = 10;
	this.x = width / 2 - this.w/2;
	this.y = height / 2 - this.h/2;
	this.drag = false;
	this.offsetX = 0;
	this.offsetY = 0;

	this.show = function() {
		fill(255);
		rect(this.x, this.y, this.w, this.h);
	}

	this.update = function() {
		if (this.drag) {
			this.x = mouseX + this.offsetX;
			this.y = mouseY + this.offsetY;
			fill(255,255,0);
			rect(this.x, this.y, this.w, this.h);
		} else {
			fill(255);
			rect(this.x, this.y, this.w, this.h);
		}
	}

	this.clicked = function() {
		if (!this.drag && mouseX > this.x && mouseX < this.x + this.w && 
		  		mouseY > this.y && mouseY < this.y + this.h) {
    		this.drag = true;
    		this.offsetX = this.x - mouseX;
    		this.offsetY = this.y - mouseY;
  		} else {
  			this.drag = false;
  		}
	}
}