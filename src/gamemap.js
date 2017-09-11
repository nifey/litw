var height=50;
var width=50;
var chanceToStartAlive = 0.39;
var deathlimit = 3;
var birthlimit = 4;
var cellMap=[];
var visibility = 3;
var bushesToTreesRatio=0.2;

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
  for (var i = 0; i < width; i++) {
    for (var j = 0; j < height; j++) {
	if(cellMap[i][j]==1){
		if(Math.random()<bushesToTreesRatio){
			cellMap[i][j]=4;
		}
	}
    }
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

/*
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
      } else if (cellMap[i][j]==3) {
        ctx.fillStyle="red";
        ctx.fillRect((i*10),(j*10),10,10);
      } else if (cellMap[i][j]==4) {
        ctx.fillStyle="orange";
        ctx.fillRect((i*10),(j*10),10,10);
      } else {
        ctx.fillStyle="white";
        ctx.fillRect((i*10),(j*10),10,10);
      }
    }
  }
}
*/

function displayVisibleMap(pnum){
  var canvas= document.getElementById("pl"+pnum);
  var ctx=canvas.getContext("2d");
  var visiMap = getVisibleMap(playerPosition[pnum][0],playerPosition[pnum][1]);
  var sprite = new Image();
  sprite.src="src/lost.png";
  ctx.fillStyle="#0c4d19";
  ctx.fillRect(0,0,canvas.width,canvas.height);
  var l= canvas.width/(2*visibility+1);
  for (var i = 0; i < 2*visibility+1 ; i++) {
    for (var j = 0; j <2*visibility+1 ; j++) {
      if (visiMap[i][j]==1) {
	ctx.drawImage(sprite,0,0,32,32,(i*l),(j*l),l,l);
      } else if (visiMap[i][j]==0) {
	ctx.drawImage(sprite,32,0,32,32,(i*l),(j*l),l,l);
      } else if (visiMap[i][j]==3) {
	ctx.drawImage(sprite,128,0,32,32,(i*l),(j*l),l,l);
      } else if (visiMap[i][j]==4) {
	ctx.drawImage(sprite,96,0,32,32,(i*l),(j*l),l,l);
      } else {
	ctx.drawImage(sprite,64,0,32,32,(i*l),(j*l),l,l);
      }
    }
  }
  var grad= ctx.createRadialGradient(canvas.width/2,canvas.height/2,20,canvas.width/2,canvas.height/2,canvas.width/1.75);
  grad.addColorStop(0,"transparent");
  grad.addColorStop(1,"#03000d");
  ctx.fillStyle= grad;
  ctx.fillRect(0,0,canvas.width,canvas.height);
}

function display(){
//	displayMap();
	displayVisibleMap(0);
	displayVisibleMap(1);
}

function gameOver(opt){
	var o = document.getElementById('g');
	o.style="display:none;";
	var r = document.getElementById('e');
	if(opt)
	r.innerHTML="<br><br><br><br>You were killed by a tree monster";
	else
	r.innerHTML="<br><br><br><br>Finally together";
	r.innerHTML+="<br><br><br><br><input type='button' value='Restart' onclick='gameStart();clearDiv();'>";
}

function clearDiv(){
	document.getElementById('e').innerHTML="";
	var o = document.getElementById('g');
	o.style="display:block;";
}
