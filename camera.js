//Camera
//TODO > regler widthbloc (perf + precision) > entraine un effet de bord
//     > intégrer la valeur widthbloc dans la camera ou ailleur mieu
var Camera = function(level) {
	var map = level.map; // map[Y][X]
	var hauteurMap = level.map.length;
	var largeurMap = level.map[0].length;
	var widthBloc = level.widthBloc;
	this.fov = Math.PI*70/360;
	var decalageAlpha = this.fov/canvasWidth;
	var cosAlpha = Math.cos(decalageAlpha);
	var sinAlpha = Math.sin(decalageAlpha);

	
	this.draw = function(player) {
	
		//affichage sol/plafond
		context.fillStyle = "rgba(0,0,0,1)";
		context.fillRect(0,0,canvasWidth,canvasHeight/2);
		context.fillStyle = "rgba(200,200,200,1)";
		context.fillRect(0,canvasHeight/2,canvasWidth,canvasHeight/2);
		
		//affichage mur
		var direction1 = new Vector2(player.direction.x,player.direction.y); // decalage a droite
		var direction2 = new Vector2(player.direction.x,player.direction.y); // decalage à gauche
		var tmp = new Vector2(1,0);
		
		for(var i=0; i < canvasWidth/2;i++) {// balayage horizontale			
			//affichage droite
			tmp.x = direction1.x * cosAlpha - direction1.y * sinAlpha;
			tmp.y = direction1.x * sinAlpha + direction1.y * cosAlpha;
			direction1.x = tmp.x;
			direction1.y = tmp.y;
			var targetPos = this.raycast(player.pos,direction1);
			//calcul distance affichage
			var distance = (targetPos.x-player.pos.x)*player.direction.x + (targetPos.y-player.pos.y)*player.direction.y;
			// affichage
			if(map[Math.floor(targetPos.y/widthBloc)][Math.floor(targetPos.x/widthBloc)] == 1) {
			
				context.fillStyle = "rgba(255,0,0,1)";
			}
			else {
				context.fillStyle = "rgba(50,0,200,1)";
			}
			//context.fillStyle = "rgba(255,0,0,1)";
			var hauteur = (canvasHeight*widthBloc)/distance;
			context.fillRect(canvasWidth/2+i,(canvasHeight-hauteur)/2,1,hauteur);
			
			
			
			
			
			/***************************************************************/
			//
			//			OLD
			//			 \/
			/***************************************************************/
			
			//affichage gauche
			tmp.x = direction2.x * cosAlpha + direction2.y * sinAlpha;
			tmp.y = direction2.y * cosAlpha - direction2.x * sinAlpha;
			direction2.x = tmp.x;
			direction2.y = tmp.y;
			var targetPos = this.raycast(player.pos,direction2);
			//calcul distance affichage
			var distance = (targetPos.x-player.pos.x)*player.direction.x + (targetPos.y-player.pos.y)*player.direction.y;
			// affichage
			//tmp
			if(map[Math.floor(targetPos.y/widthBloc)][Math.floor(targetPos.x/widthBloc)] == 1) {
			
				context.fillStyle = "rgba(255,0,0,1)";
			}
			else {
				context.fillStyle = "rgba(50,0,200,1)";
			}
			
			//end tmp
			//context.fillStyle = "rgba(255,0,0,1)";
			var hauteur = (canvasHeight*widthBloc)/distance;
			context.fillRect(canvasWidth/2-i-1,(canvasHeight-hauteur)/2,1,hauteur);
		} 
		
	}
	this.raycast = function(playerPos,direction) {
		var pos = new Vector2(playerPos.x,playerPos.y);
		while (true) {// TODO ajouter une limite pour pas bouclé indéfiniment
			pos.x += direction.x;
			pos.y += direction.y;
			if(map[Math.floor(pos.y/widthBloc)][Math.floor(pos.x/widthBloc)] != 0) {
				return pos;
				
			} 
		}
	}
}