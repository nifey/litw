var height=44;
var width=44;
var chanceToStartAlive = 0.39;
var deathlimit = 3;
var birthlimit = 4;
var cellMap=[];
             
function clearMap(){
  cellMap=[];
  for(var i=0;i<width;i++){
    cellMap[i]=[];
  }
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

function generateGameMap() {
  do{
   generateMap();
  } while(!floodFill())
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
        ctx.fillRect(10+(i*10),10+(j*10),10,10);
      } else {
        ctx.fillStyle="blue";
        ctx.fillRect(10+(i*10),10+(j*10),10,10);
      }
    }
  }
}

window.onload= function game(){
  generateGameMap();
  displayMap();
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
  cellMap=tempMap;
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
  var tempMap = cellMap;
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
      tempMap[x][y]=2;
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
