var playerPosition = [];
var initialDistance = 2000;

function placePlayers(){
	playerPosition=[];
	var p = getRandomPoint();
	do{
		var q= getRandomPoint();	
	}while(calculateDistance(p[0],p[1],q[0],q[1])>initialDistance);	
	playerPosition.push(p);
	playerPosition.push(q);
	cellMap[playerPosition[0][0]][playerPosition[0][1]]=2;
	cellMap[playerPosition[1][0]][playerPosition[1][1]]=2;
}

function movePlayer(player,direction){
	var tempx=playerPosition[player][0];
	var tempy=playerPosition[player][1];
	var newx=tempx;
	var newy=tempy;	
	switch(direction){
		case 'u':
		newy-=1;
		break;
		case 'd':
		newy+=1;
		break;
		case 'l':
		newx-=1;
		break;
		case 'r':
		newx+=1;
		break;
	}
	var flag=false;
	if(cellMap[newx][newy]==2){
		gameOver();
	}
	if(cellMap[newx][newy]==0){
		cellMap[tempx][tempy]=0;
		cellMap[newx][newy]=2;
		playerPosition[player]=[newx,newy];
		flag=true;
	}
	return flag;
}

function calculateDistance(x1,y1,x2,y2){
	return (x1-x2)*(x1-x2) + (y1-y2)*(y1-y2); 
}

function getRandomPoint(){
	do{
	var x = getRandomNumber(width);
	var y = getRandomNumber(height);
	}while(cellMap[x][y]!=0);	
	return [x,y];
}

function getRandomNumber(max){
	return Math.floor(Math.random()*(max));	
}
