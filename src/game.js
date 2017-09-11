function gameStart(){
	clearKeys();
	generateGameMap();
	placePlayers();
	placeMonsters();
	display();
}

setInterval("update()",100);
setInterval("moveMonsters();",250);
