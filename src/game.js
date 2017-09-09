window.onload= gameStart; 

function gameStart(){
	clearKeys();
	generateGameMap();
	placePlayers();
	display();
}

setInterval("update()",100);
