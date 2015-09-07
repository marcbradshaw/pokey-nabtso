// this is the highest level
var num = 25;

// this can be start level
var pokeys = 1;

var px = new Array(num);
var py = new Array(num);
var pa = new Array(num);
var ps = new Array(num);
var pm = new Array(num);
var pr = new Array(num);

var mywidth=600;
var myheight=400;

var usewidth=mywidth-50;
var minyval=120;
var useheight=myheight-50;

var winner=0;

var maxspeed=10;
var wobble=10;
var runspeed = 20;
var getup = 40;
var changespeed=20;
var stoprunning=10;
var turnaround=200;

var mytimeout=51;
var speedmin=1;
var speedmax=200;
var speedstep=2;

var alldown=0;

var standing = 0;

var urlright  = "panicr.gif";
var urlleft   = "panicl.gif";
var urlrighto = "panicra.gif";
var urllefto  = "panicla.gif";

function playsound()
{
//	win2=window.open("panic1.html","panic1");
//	win2.blur();
//	window.focus();
}

function place()
{
	document.write('<div style="background-image: url(panicb.gif);background-repeat: no-repeat;');
	document.write('width: '+mywidth+'px;height: '+myheight+'px;border: 1px solid black;position:relative;margin-left:auto;margin-right:auto;">');

	inits();
	for (i=0;i<num;i++)
	{
//		document.write('<div id="pd'+i+'" style="visibility:hidden;position:absolute;left:'+px[i]+'px;top:'+py[i]+'px;">');
//		document.write('<img onmouseover="pokeyover('+i+');" onmouseout="pokeyout('+i+');" onclick="pokeyclick('+i+');" id="pi'+i+'" src="'+url+'" />');
//		document.write('</div>');
		document.write('<img style="visibility:hidden;position:absolute;left:'+px[i]+'px;top:'+py[i]+'px;" onmouseover="pokeyover('+i+');" onmouseout="pokeyout('+i+');" onclick="pokeyclick('+i+');" id="pi'+i+'" src="'+url+'" />');
	}

	document.write('<div id="panicintro" style="text-align:center;display:block;">');
	document.write('<p>THERE IS PANIC IN THE ARCTIC CIRCLE!</p>');
	document.write('<p>STOP POKEY PANICING BY KNOCKING HIM OVER</p>');
	document.write('<p>CAN YOU GET TO LEVEL '+num+'?</p>');
	document.write('<h2><a href="#" onClick="start();return false;">START</a></h2>');
	document.write('</div>');

	document.write('<div id="panicinfo" style="text-align:center;display:none; margin-top:50px;">HOORAY</div>');

	document.write('</div>');

	document.write('<p><b>HARD </b>');
	for(i=speedmin;i<speedmax;i=i+speedstep)	
	{
		if (i==mytimeout)
		{
			document.write('<span id="speed'+i+'" onclick="respeed('+i+');">|</span>');
		}
		else
		{
			document.write('<span id="speed'+i+'" onclick="respeed('+i+');">.</span>');
		}
	}
	document.write('<b> EASY</b></p>');

	document.write('<p><a href="#" onclick="pokeys='+num+';return false;";>POKEY AND ALL HIS FRIENDS!</a></p>');
}

function respeed(i)
{
	mytimeout=i;
	for(i=speedmin;i<speedmax;i=i+speedstep)
	{
		if (i==mytimeout)
		{
			document.getElementById("speed"+i).firstChild.nodeValue = "|";
		}
		else
		{
			document.getElementById("speed"+i).firstChild.nodeValue = ".";
		}
	}
}

function inits()
{

	alldown=0;
	for (i=0;i<num;i++)
	{

                ps[i] = Math.round(Math.random() * maxspeed)+1;
		pm[i]=1;
		pr[i]=0;

                rnd = Math.round(Math.random() * 20);
                if (rnd<10)
                {
                        url = urlright;
                        pa[i] = 1;
                }
                else
                {
                        url = urlleft;
                        pa[i] = -1;
                }

		px[i]=Math.round(Math.random() * usewidth);
		py[i]=Math.round(Math.random() * ((useheight-minyval))) + minyval;
	}
}


function depthsort()
{
	for (n=(pokeys-1);n>0;n--)
	{
		for (i=0;i<n;i++)
		{
			if (py[i]>py[i+1])
			{
				temp = px[i];
				px[i]=px[i+1];
				px[i+1]=temp;

				temp = py[i];
				py[i]=py[i+1];
				py[i+1]=temp;

				temp = pa[i];
				pa[i]=pa[i+1];
				pa[i+1]=temp;

				temp = ps[i];
				ps[i]=ps[i+1];
				ps[i+1]=temp;

				temp = pm[i];
				pm[i]=pm[i+1];
				pm[i+1]=temp;

				temp = pr[i];
				pr[i]=pr[i+1];
				pr[i+1]=temp;

				temp=document.getElementById("pi"+i).src;
				document.getElementById("pi"+i).src=document.getElementById("pi"+(i+1)).src;
				document.getElementById("pi"+(i+1)).src=temp;
			}
		}
	}
}

function pokeyclick(i)
{
	pm[i]=0;
	if (pa[i]==1)
	{
		document.getElementById("pi"+i).src=urlrighto;
	}
	else
	{
		document.getElementById("pi"+i).src=urllefto;
	}
	playsound();
}
function pokeyover(i)
{
	pr[i]=1;
}
function pokeyout(i)
{
	pr[i]=2;
}

function rstart()
{
	document.getElementById("panicinfo").style.display="none";
	pokeys++;
	inits();
}

function move()
{
	standing = 0;

	depthsort();

	for (i=0;i<pokeys;i++)
	{

		if (pm[i]==0)
		{
			px[i]=px[i]+(pa[i]*ps[i]);
			if (ps[i]>0)
			{
				ps[i]=ps[i]-1;
			}
			if(px[i]<0)
			{
				pa[i]=1;
				px[i]=0;
			}
			if(px[i]>usewidth)
			{
				pa[i]=-1;
				px[i]=usewidth;
			}

			if (alldown==0)
			{
				if (ps[i]==0)
				{
					if (Math.round(Math.random() * getup)==0)
					{
						pm[i]=1;
						ps[i]=Math.round(Math.random() * maxspeed)+1;
						pr[i]=0;
					}
				}
			}
		}
		else
		{
			if (pa[i]==1)
			{
				document.getElementById("pi"+i).src=urlright;
			}
			else
			{
				document.getElementById("pi"+i).src=urlleft;
			}

			standing++;

			if (Math.round(Math.random() * turnaround)==0)
			{
				if (pa[i]==-1)
				{
					document.getElementById("pi"+i).src=urlright;
					pa[i]=1;
				}
				else
				{
					document.getElementById("pi"+i).src=urlleft;
					pa[i]=-1;
				}
			}

			if (Math.round(Math.random() * changespeed)==0)
			{
		                ps[i] = Math.round(Math.random() * maxspeed)+1;
			}

			py[i]=py[i]-(wobble/2);
			py[i]=py[i]+Math.round(Math.random()*wobble);
			if(py[i]<minyval)
			{
				py[i]=minyval;
			}
			if(py[i]>useheight)
			{
				py[i]=useheight;
			}

			mmove=ps[i];
			if (pr[i]!=0)
			{
				mmove = mmove + (runspeed);
				if (pr[i]==2)
				{
					if (Math.round(Math.random() * stoprunning)==0)
					{
						pr[i]=0;
					}
				}
			}

			px[i]=px[i]+((pa[i]*mmove));
			if(px[i] < 0)
			{
				pa[i]=1;
				px[i]=0;
				document.getElementById("pi"+i).src=urlright;
			}
			if(px[i] > usewidth)
			{
				pa[i]=-1;
				px[i]=usewidth;
				document.getElementById("pi"+i).src=urlleft;
			}
			
		}
		document.getElementById("pi"+i).style.left=px[i]+"px";
		document.getElementById("pi"+i).style.top=py[i]+"px";
		document.getElementById("pi"+i).style.visibility='visible';
	}

	if (standing==0)
	{
		if (pokeys<num)
		{
			if (alldown == 0)
			{
				alldown=1;
				document.getElementById("panicinfo").firstChild.nodeValue = "HOORAY! ON TO LEVEL "+(pokeys+1)+"!!!";
				document.getElementById("panicinfo").style.display="block";
				setTimeout("rstart()", 2000);
			}
		}
		else
		{
			if (winner==0)
			{
				document.getElementById("panicinfo").firstChild.nodeValue = "HOORAY! YOU ARE A WINNER!!!";
				document.getElementById("panicinfo").style.display="block";
				winner=1;
			}
		}
	}

	setTimeout("move()", mytimeout);
}

function start()
{
	document.getElementById("panicintro").style.display="none";
	move();
}
