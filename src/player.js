var playerPosition = [];
var monsterPosition = [];
var numberOfMonsters = 7;
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

function placeMonsters(){
	monsterPosition=[];
	for(var i=0;i<numberOfMonsters;i++){
		var p = getRandomPoint();
		monsterPosition.push(p);
		cellMap[monsterPosition[i][0]][monsterPosition[i][1]]=3;
	}	
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
		if(cellMap[newx][newy]==2){
			otherPlayer=(player==0)?1:0;
			if(playerPosition[otherPlayer][0]==newx && playerPosition[otherPlayer][1]==newy){
				cellMap[newx][newy]=0;
				gameOver(0);
			}
		} else if(cellMap[newx][newy]==3){
			cellMap[tempx][tempy]=0;
			cellMap[newx][newy]=0;
			gameOver(1);
		} else if(cellMap[newx][newy]==0){
			cellMap[tempx][tempy]=0;
			cellMap[newx][newy]=2;
			playerPosition[player]=[newx,newy];
		}
}

function moveMonsters(){
	for(var i=0;i<numberOfMonsters;i++){
		var tempx=monsterPosition[i][0];
		var tempy=monsterPosition[i][1];
		var newx=tempx;
		var newy=tempy;	
		var dir=getRandomNumber(5);	
		switch(dir){	
			case 0:
			newy-=1;
			break;
			case 1:
			newy+=1;
			break;
			case 2:
			newx-=1;
			break;
			case 3:
			newx+=1;
			break;
		}
		if(cellMap[newx][newy]==2){
			if((playerPosition[0][0]==newx && playerPosition[0][1]==newy)||(playerPosition[1][0]==newx && playerPosition[1][1]==newy)){
				cellMap[newx][newy]=0;
				gameOver(1);
			}
		} else if(cellMap[newx][newy]==0){
			cellMap[tempx][tempy]=0;
			cellMap[newx][newy]=3;
			monsterPosition[i]=[newx,newy];
		}	
	}
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
