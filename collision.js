// Classe collision, gere la collision entre des rectangles
Collision = function (pX,pY,pWidth,pHeight) {
	this.x = pX;
	this.y = pY;
	this.width = pWidth;
	this.height = pHeight;
	this.checkCollision = function(target) { //target est un objet collision
		if(this.x + this.width > target.x && this.x < target.x+target.width && this.y+this.height > target.y && this.y < target.y+target.height) {
			return true;
		}
		return false;
	}
	this.getPosCenter = function() {
		return [this.x+this.width/2, this.y+this.height/2];
	}
}

var CollisionCircle = function(pX,pY,pR) {
	this.x = pX;
	this.y = pY;
	this.rayon = pR;
	
	this.checkCollision = function(target) {
		if( (this.x-target.x)*(this.x-target.x) + (this.y-target.y)*(this.y-target.y) < this.rayon*this.rayon) {
			return true;
		}
		return false;
	}
}


distanceCarree = function(p1,p2) {  //calcule la distance au carrée entre 2 points p1 = [x1,x2]
	return ((p2[0]-p1[0])*(p2[0]-p1[0]) + (p2[1]-p1[1])*(p2[1]-p1[1])); // (x2-x1)² + (y2-y1)²
}