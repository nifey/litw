var height=50;
var width=50;
var chanceToStartAlive = 0.39;
var deathlimit = 3;
var birthlimit = 4;
var cellMap=[];
var visibility = 4;

function generateGameMap() {
  do{
   generateMap();
  } while(!floodFill())
}

function generateMap(){
  clearMap();
  for (var i = 0; i < width; i++) {
    for (var j = 0; j < height; j++) {
      if (Math.random()<chanceToStartAlive){
        cellMap[i][j]=1;
      } else{
        cellMap[i][j]=0;
      }
    }
  }
  runSimulation();
  runSimulation();
  runSimulation();
  runSimulation();
  for(var i=0;i<5;i++){
    if(floodFill())
      break;
    else 
      runSimulation();
  }
}

function clearMap(){
  cellMap=[];
  for(var i=0;i<width;i++){
    cellMap[i]=[];
  }
}
  
function runSimulation(){
  var tempMap = [];
  for(var i=0;i<width;i++){
    tempMap[i]=[];
  }
  for(var i=0;i<width;i++){
    for(var j=0;j<height;j++){
      if(i==0||j==0||i==width-1||j==height-1){
        tempMap[i][j]=1;
      } else if(cellMap[i][j]==1) {
        if(countAliveNeighbours(i,j)<deathlimit) 
          tempMap[i][j]=0;
        else 
          tempMap[i][j]=1;
      } else {
        if(countAliveNeighbours(i,j)>birthlimit)
          tempMap[i][j]=1;
        else
          tempMap[i][j]=0;
      }
    }
  }
  cellMap=JSON.parse(JSON.stringify(tempMap));
}

function countAliveNeighbours(x,y){
  var count=0;
  for (var i=x-1;i<=x+1;i++){
    for (var j=y-1;j<=y+1;j++){
      if(!((i==x)&&(j==y)) && cellMap[i][j]==1)
        count++;
    }
  }
  return count;
}

function floodFill(){
  var x;
  var y;
  var t;
  var queue = [];
  var tempMap = JSON.parse(JSON.stringify(cellMap));
  outerloop:
  for(var i=0;i<width;i++){
    for(var j=0;j<height;j++){
      if(cellMap[i][j]==0){
        queue.push([i,j]);
        break outerloop;
      }
    }
  }
  while(queue.length>0) {
    t= queue.pop();
    x=t[0]; y=t[1];
    if(tempMap[x][y]==0){
      tempMap[x][y]=3;
      queue.push([x-1,y],[x+1,y],[x,y-1],[x,y+1]);
    }
  } 
  for(var i=0;i<width;i++){
    for(var j=0;j<height;j++){
      if(tempMap[i][j]==0)
        return false;
    }
  }
  return true;
}

function getVisibleMap(x,y){
	var visibleMap = [];
	var tempx;
	var tempy;
	for(var i=0;i<(2*visibility+1);i++){
		visibleMap[i]=[];
	}
	for(var i=0;i<(2*visibility+1);i++){	
		for(var j=0;j<(2*visibility+1);j++){	
			tempx= x-visibility+i;
			tempy= y-visibility+j;
			if(tempx<0||tempy<0||tempx>=width||tempy>=height){
				visibleMap[i][j]=1;	
			} else {
				visibleMap[i][j]=cellMap[tempx][tempy];	
			}	
		}
	}
	return visibleMap;
}

function displayMap(){
  var canvas= document.getElementById("p1");
  var ctx=canvas.getContext("2d");
  ctx.fillStyle="white";
  ctx.fillRect(10,10,width*10,height*10);
  for (var i = 0; i < width; i++) {
    for (var j = 0; j < height; j++) {
      if (cellMap[i][j]==1) {
        ctx.fillStyle="black";
        ctx.fillRect((i*10),(j*10),10,10);
      } else if (cellMap[i][j]==0) {
        ctx.fillStyle="blue";
        ctx.fillRect((i*10),(j*10),10,10);
      } else {
        ctx.fillStyle="white";
        ctx.fillRect((i*10),(j*10),10,10);
      }
    }
  }
}

function displayVisibleMap(pnum){
  var canvas= document.getElementById("pl"+pnum);
  var ctx=canvas.getContext("2d");
  var visiMap = getVisibleMap(playerPosition[pnum][0],playerPosition[pnum][1]);
  ctx.fillStyle="white";
  ctx.fillRect(10,10,width*10,height*10);
  for (var i = 0; i < 2*visibility+1 ; i++) {
    for (var j = 0; j <2*visibility+1 ; j++) {
      if (visiMap[i][j]==1) {
        ctx.fillStyle="black";
        ctx.fillRect((i*50),(j*50),50,50);
      } else if (visiMap[i][j]==0) {
        ctx.fillStyle="blue";
        ctx.fillRect((i*50),(j*50),50,50);
      } else {
        ctx.fillStyle="white";
        ctx.fillRect((i*50),(j*50),50,50);
      }
    }
  }
}

function display(){
	displayMap();
	displayVisibleMap(0);
	displayVisibleMap(1);
}

function gameOver(){
	alert("game Over");
	gameStart();
}
