//Player

var Player = function() {
	this.pos = new Vector2(5*617,7*617);
	this.direction = new Vector2(0,1);
	var vit = 30;
	var rotation = Math.PI/180;
	var cosAlpha = Math.cos(rotation);
	var sinAlpha = Math.sin(rotation);
	
	
	this.update = function() {
		if(controls.up == 1) {
			this.pos.x += vit*this.direction.x;
			this.pos.y += vit*this.direction.y;
		}
		else if(controls.down == 1) {
			this.pos.x -= vit*this.direction.x;
			this.pos.y -= vit*this.direction.y;
		}
		if(controls.right == 1) {
			this.direction.x = this.direction.x * cosAlpha - this.direction.y * sinAlpha;
			this.direction.y = this.direction.x * sinAlpha + this.direction.y * cosAlpha;
		}
		else if(controls.left == 1) {
			this.direction.x = this.direction.x * cosAlpha + this.direction.y * sinAlpha;
			this.direction.y = this.direction.y * cosAlpha - this.direction.x * sinAlpha;
		}
	}
	
	this.drawHud = function() {
		context.fillStyle = "rgba(0,255,0,1)";
		context.fillRect(0,0,10,50);
	}
}