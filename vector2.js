//TODO : debug


var Vector2 = function(pX, pY) {
	this.x = pX;
	this.y = pY;
	
	this.getNormSquare = function() {
		return ((this.x*this.x) + (this.y*this.y));
	}
	this.getNorm = function() {
		return Math.sqrt(this.getNormSquare());
	}
	this.getNormalize = function() { //retourne le vecteur unité de Vector2
		var newVect = new Vector2(this.x/this.getNorm() , this.y/this.getNorm() );
		return newVect;
	}
}