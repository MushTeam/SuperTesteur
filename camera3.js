//Camera
var Camera = function(level) {
	var map = level.map; // map[Y][X]
	var hauteurMap = level.map.length;
	var largeurMap = level.map[0].length;
	var widthBloc = level.widthBloc;
	this.fov = Math.PI*70/360;
	var decalageAlpha = this.fov/canvasWidth;
	var cosAlpha = Math.cos(decalageAlpha);
	var sinAlpha = Math.sin(decalageAlpha);
	var texture = [];
	texture.push([new Image(),new Image()]);
	texture[0][0].src = "img/wall1_0.png";
	texture[0][1].src = "img/wall1_1.png";
	var refDistance = widthBloc*widthBloc / ( Math.tan(this.fov/2));
	
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
		var boucle = true;
		
		for(var i=0; i < canvasWidth/2;i++) {// balayage horizontale			
			//affichage droite
			tmp.x = direction1.x * cosAlpha - direction1.y * sinAlpha; //calcul d1
			tmp.y = direction1.x * sinAlpha + direction1.y * cosAlpha; // ^
			direction1.x = tmp.x;
			direction1.y = tmp.y;
			
			// RAYCAST
			
			// Calcul prochaine collision en X
			
			if(direction1.x > 0) {
				var sensX = 1;
			}
			else {
				var sensX = -1;
			}
			if(direction1.y > 0) {
				var sensY = 1;
			}
			else {
				var sensY = -1;
			}
			
			var lastCollisionEW = false;
			var tab = new Vector2(0,0);
			tab.x = Math.floor(player.pos.x / widthBloc);
			tab.y = Math.floor(player.pos.y / widthBloc);
			var posRaycast = new Vector2(0,0);
			posRaycast.x = player.pos.x ;
			posRaycast.y = player.pos.y ;
			boucle = true;
			
			while(boucle) {
				if(direction1.x > 0) { // calcul dX
					var dX = (tab.x + 1) * widthBloc - posRaycast.x;
				}
				else {
					var dX = posRaycast.x - tab.x * widthBloc;
				}
				if(direction1.y > 0) { // calcul dY
					var dY = (tab.y + 1) * widthBloc - posRaycast.y;
				}
				else {
					var dY = posRaycast.y - tab.y * widthBloc;
				}
				// comparaison entre dX et dY puis on avance au point suivant
				if( dX / (direction1.x * sensX) < dY / direction1.y * sensY) {
					tab.x += sensX;
					posRaycast.x += dX * sensX;
					posRaycast.y += dX * direction1.y / (direction1.x * sensX) ;
					lastCollisionEW = true;
				}
				else {
					tab.y += sensY;
					posRaycast.x += dY * direction1.x / (direction1.y *sensY);
					posRaycast.y += dY * sensY ;
					lastCollisionEW = false;
				}
				// test collision
				if(map[tab.y][tab.x] != 0) {
					boucle = false;
				}
			} //fin boucle raycast
			
			// calcul distance
			var distance = (posRaycast.x - player.pos.x)*player.direction.x + (posRaycast.y - player.pos.y)*player.direction.y;
			//calcul hauteur
			//var hauteur = (canvasHeight*widthBloc)/distance; // a définir mieu !
			var hauteur = refDistance /distance;
			
			// affichage
			
			//gestion texture
			if(lastCollisionEW) { //map[tab.y][tab.x]
				//Selection texture (foncer/clair)
				if(sensX > 0) {
					var text = texture[0][0];
				}
				else {
					var text = texture[0][1];
				}
				var positionSource = Math.floor(posRaycast.y - tab.y * widthBloc);
				
			}
			else {
				//Selection texture (foncer/clair)
				if(sensY > 0) {
					var text = texture[0][0];
				}
				else {
					var text = texture[0][1];
				}
				var positionSource = Math.floor(posRaycast.x - tab.x * widthBloc);
			}
			
			context.drawImage(text , positionSource , 0 , 1 , widthBloc , canvasWidth/2+i-1 ,(canvasHeight-hauteur)/2 , 1, hauteur);
			
			
			
			//affichage gauche
			tmp.x = direction2.x * cosAlpha + direction2.y * sinAlpha;
			tmp.y = direction2.y * cosAlpha - direction2.x * sinAlpha;
			direction2.x = tmp.x;
			direction2.y = tmp.y; 
			
			
			// Calcul prochaine collision en X
			
			if(direction2.x > 0) {
				sensX = 1;
			}
			else {
				sensX = -1;
			}
			if(direction2.y > 0) {
				sensY = 1;
			}
			else {
				sensY = -1;
			}
			
			tab.x = Math.floor(player.pos.x / widthBloc);
			tab.y = Math.floor(player.pos.y / widthBloc);
			posRaycast.x = player.pos.x ;
			posRaycast.y = player.pos.y ;
			boucle = true;
			
			while(boucle) {
				if(direction2.x > 0) { // calcul dX
					dX = (tab.x + 1) * widthBloc - posRaycast.x;
				}
				else {
					dX = posRaycast.x - tab.x * widthBloc;
				}
				if(direction2.y > 0) { // calcul dY
					dY = (tab.y + 1) * widthBloc - posRaycast.y;
				}
				else {
					dY = posRaycast.y - tab.y * widthBloc;
				}
				// comparaison entre dX et dY puis on avance au point suivant
				if( dX / (direction2.x * sensX) < dY / direction2.y * sensY) {
					tab.x += sensX;
					posRaycast.x += dX * sensX;
					posRaycast.y += dX * direction2.y / (direction2.x * sensX) ;
					lastCollisionEW = true;
				}
				else {
					tab.y += sensY;
					posRaycast.x += dY * direction2.x / (direction2.y *sensY);
					posRaycast.y += dY * sensY ;
					lastCollisionEW = false;
				}
				// test collision
				if(map[tab.y][tab.x] != 0) {
					boucle = false;
				}
			} //fin boucle raycast
			
			// calcul distance
			var distance = (posRaycast.x - player.pos.x)*player.direction.x + (posRaycast.y - player.pos.y)*player.direction.y;
			//calcul hauteur
			//var hauteur = (canvasHeight*widthBloc)/distance; // a définir mieu !
			var hauteur = refDistance / distance;
			// affichage
			
			//gestion texture
			if(lastCollisionEW) { //map[tab.y][tab.x]
				//Selection texture (foncer/clair)
				if(sensX > 0) {
					text = texture[0][0];
				}
				else {
					text = texture[0][1];
				}
				positionSource = Math.floor(posRaycast.y - tab.y * widthBloc);
				
			}
			else {
				//Selection texture (foncer/clair)
				if(sensY > 0) {
					text = texture[0][0];
				}
				else {
					text = texture[0][1];
				}
				positionSource = Math.floor(posRaycast.x - tab.x * widthBloc);
			}
			
			context.drawImage(text , positionSource , 0 , 1 , widthBloc , canvasWidth/2-i-1 ,(canvasHeight-hauteur)/2 , 1, hauteur);
			
			//context.fillStyle = "rgba(255,0,0,1)";
			//context.fillRect(canvasWidth/2-i-1,(canvasHeight-hauteur)/2,1,hauteur);
			
			
		} // fin balayage 
		
	}
}

















