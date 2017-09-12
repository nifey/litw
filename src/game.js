function gameStart(){
	play=true;
	clearKeys();
	generateGameMap();
	placePlayers();
	placeMonsters();
	display();
}
var play=false;
setInterval("if(play)update()",100);
setInterval("if(play)moveMonsters();",250);
