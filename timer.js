var WINDOW_WIDTH = 900;
var WINDOW_HEIGHT = 580;
var MARGIN_LEFT = 20;
var MARGIN_TOP = 30;
var RADIUS = 7;

var time =0;

var balls = [];
const colors = ["#9da","#DDA0DD","#DB7093","rgba(255,0,0,0.5)","#1C86EE"];

window.onload=function(){
    WINDOW_WIDTH = document.body.clientWidth
    WINDOW_HEIGHT = document.body.clientHeight

    MARGIN_LEFT = Math.round(WINDOW_WIDTH*3/20);
    RADIUS = Math.round(WINDOW_WIDTH * 7 / 10 / 108)-1

    MARGIN_TOP = Math.round(WINDOW_HEIGHT /8);

var canvas=document.getElementById("canvas");
var context=canvas.getContext("2d");

canvas.width = WINDOW_WIDTH;
canvas.height = WINDOW_HEIGHT;


time=getMyTime();
setInterval(
	function(){

		drawer(context);
 	    update();
},50);
}

function drawer(ctx)
{
	ctx.clearRect(0,0,WINDOW_WIDTH,WINDOW_HEIGHT);
	var	 hour=time.getHours();
	var	 minute=time.getMinutes();
	var second=time.getSeconds();
	drawerdigit(MARGIN_LEFT,MARGIN_TOP,parseInt(hour/10),ctx);
	drawerdigit(MARGIN_LEFT+15*(RADIUS+1),MARGIN_TOP,parseInt(hour%10),ctx);
	drawerdigit(MARGIN_LEFT+30*(RADIUS+1),MARGIN_TOP,10,ctx);
	drawerdigit(MARGIN_LEFT+39*(RADIUS+1),MARGIN_TOP,parseInt(minute/10),ctx);
	drawerdigit(MARGIN_LEFT+54*(RADIUS+1),MARGIN_TOP,parseInt(minute%10),ctx);
	drawerdigit(MARGIN_LEFT+69*(RADIUS+1),MARGIN_TOP,10,ctx);
	drawerdigit(MARGIN_LEFT+78*(RADIUS+1),MARGIN_TOP,parseInt(second/10),ctx);
	drawerdigit(MARGIN_LEFT+93*(RADIUS+1),MARGIN_TOP,parseInt(second%10),ctx);
 		

 	for(var k=0;k<balls.length;k++)
 	{ 	ctx.fillStyle = balls[k].color;
 		ctx.beginPath();
 		ctx.arc(balls[k].x,balls[k].y,RADIUS,0,2*Math.PI);
 		ctx.closePath();
 		ctx.fill();
 	}
}

function drawerdigit(x,y,num,ctx)
{
	ctx.fillStyle = "rgba(255,0,0,0.5)";
	for(var i=0;i<digit[num].length;i++)
		for(var j=0;j<digit[num][i].length;j++)
		{
			if (digit[num][i][j]==1) {
				ctx.beginPath();
				ctx.arc(x+j*2*(RADIUS+1)+(RADIUS+1),
					y+i*2*(RADIUS+1)+(RADIUS+1),RADIUS,0,2*Math.PI);
				ctx.closePath();

				ctx.fill();
			}
		}
}
 function getMyTime()
 {
 		var curtime = new Date();
 		return curtime;
 }

function update()
{
	var	 hour=time.getHours();
	var	 minute=time.getMinutes();
	var second=time.getSeconds();

    var nextime = getMyTime();
	var nexhour=nextime.getHours();
	var nexminute=nextime.getMinutes();
	var nexsecond=nextime.getSeconds();

	if (nexsecond!=second) {
		if (parseInt(nexhour/10)!=parseInt(hour/10)) 
		{
			addBalls(MARGIN_LEFT,MARGIN_TOP,parseInt(hour/10));
		}
		if (parseInt(nexhour%10)!=parseInt(hour%10)) 
		{
			addBalls(MARGIN_LEFT+15*(RADIUS+1),MARGIN_TOP,parseInt(hour%10));
		}
		if (parseInt(nexminute/10)!=parseInt(minute/10)) 
		{
			addBalls(MARGIN_LEFT+39*(RADIUS+1),MARGIN_TOP,parseInt(minute/10));
		}
		if (parseInt(nexminute%10)!=parseInt(minute%10)) 
		{
			addBalls(MARGIN_LEFT+54*(RADIUS+1),MARGIN_TOP,parseInt(minute%10));
		}
		if (parseInt(nexsecond/10)!=parseInt(second/10)) 
		{
			addBalls(MARGIN_LEFT+78*(RADIUS+1),MARGIN_TOP,parseInt(second/10));
		}
		if (parseInt(nexsecond%10)!=parseInt(second%10)) 
		{
			addBalls(MARGIN_LEFT+93*(RADIUS+1),MARGIN_TOP,parseInt(second%10));
		}
	time=getMyTime();
}

	updateBalls();
	console.log(balls.length);
}


function addBalls(x,y,num)
{
	for(var i=0;i<digit[num].length;i++)
		for(var j=0;j<digit[num][i].length;j++)
			if(digit[num][i][j]==1)
			{
				var aBall= {
					x:x+2*j*(RADIUS+1)+(RADIUS+1),
					y:y+2*i*(RADIUS+1)+(RADIUS+1),
					g:1.5+Math.random(),
					vx:4-12*Math.random(),
					vy:-2,
					color:colors[Math.floor(Math.random()*colors.length)]
				}
				balls.push(aBall);
			}
}

function updateBalls()
{
	for(var i=0;i<balls.length;i++)
    {
    	balls[i].x+=balls[i].vx;
    	balls[i].y+=balls[i].vy;
    	balls[i].vy+=balls[i].g;
    	if (balls[i].y>=(WINDOW_HEIGHT-RADIUS)) {
    		balls[i].y=WINDOW_HEIGHT-RADIUS;
    		balls[i].vy=-balls[i].vy*0.8;
    	}
    }

    var counter=0;
    for(var j=0;j<balls.length;j++)
    {
    	if(balls[j].x+RADIUS>0&&balls[j].x-RADIUS<WINDOW_WIDTH)
    	{	balls[counter]=balls[j];
    	    counter++;
		}
    }
    while(balls.length>Math.min(400,counter))
   { balls.pop();}
}