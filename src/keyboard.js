var pressedKeys=[];

document.onkeydown = function (e) {
	if(e.keyCode==87){
		pressedKeys['87']=true;
	} else if(e.keyCode==83){
		pressedKeys['83']=true;
	} else if(e.keyCode==65){
		pressedKeys['65']=true;
	} else if(e.keyCode==68){
		pressedKeys['68']=true;
	} else if(e.keyCode==38){
		pressedKeys['38']=true;
	} else if(e.keyCode==40){
		pressedKeys['40']=true;
	} else if(e.keyCode==37){
		pressedKeys['37']=true;
	} else if(e.keyCode==39){
		pressedKeys['39']=true;
	} else if(e.keyCode==13){
		var m= document.getElementById('m');
		var e= document.getElementById('e');
		var g= document.getElementById('g');
		if(m.style.display!='none'){
			g.style.display='block';	
			m.style.display='none';	
			gameStart();
		} else if(e.style.display!='none'){
			gameStart();
			clearDiv();
		}
	}
}

document.onkeyup = function (e) {
	if(e.keyCode==87){
		pressedKeys['87']=false;
	} else if(e.keyCode==83){
		pressedKeys['83']=false;
	} else if(e.keyCode==65){
		pressedKeys['65']=false;
	} else if(e.keyCode==68){
		pressedKeys['68']=false;
	} else if(e.keyCode==38){
		pressedKeys['38']=false;
	} else if(e.keyCode==40){
		pressedKeys['40']=false;
	} else if(e.keyCode==37){
		pressedKeys['37']=false;
	} else if(e.keyCode==39){
		pressedKeys['39']=false;
	}
}

function update(){
	if(pressedKeys[87]){
		movePlayer(0,'u');
	}
	if(pressedKeys[83]){
		movePlayer(0,'d');
	}
	if(pressedKeys[65]){
		movePlayer(0,'l');
	}
	if(pressedKeys[68]){
		movePlayer(0,'r');
	}
	if(pressedKeys[38]){
		movePlayer(1,'u');
	}
	if(pressedKeys[40]){
		movePlayer(1,'d');
	}
	if(pressedKeys[37]){
		movePlayer(1,'l');
	}
	if(pressedKeys[39]){
		movePlayer(1,'r');
	}
	display();
}

function clearKeys(){
	pressedKeys=[];
}
