import React, { Component } from 'react';
import ATestComp from "./ATestComp";
var list = {'ATestComp': ATestComp};
class App extends Component {
	super(props) {
		
	};
	construct() {
		this.start = this.start.bind(this);
		this.la1 = this.la1.bind(this);
	};
	la1() {
		var cUser=document.getElementById("userEntryCanv");
	    var ctxUser=cUser.getContext("2d");
	    var imgDataUser=ctxUser.getImageData(0,0,300,300);
		
	    var cBase1=document.getElementById("baseCanv1");
	    var ctxBase1=cBase1.getContext("2d");
		var img1=document.getElementById("baseImg1");
	    ctxBase1.drawImage(img1,0,0);
		var imgDataBase1=ctxBase1.getImageData(0,0,300,300);

		var cBase2=document.getElementById("baseCanv2");
	    var ctxBase2=cBase2.getContext("2d");
		var img2=document.getElementById("baseImg2");
	    ctxBase2.drawImage(img2,0,0);
		var imgDataBase2=ctxBase2.getImageData(0,0,300,300);
		
		var cBase3=document.getElementById("baseCanv3");
	    var ctxBase3=cBase3.getContext("2d");
		var img3=document.getElementById("baseImg3");
	    ctxBase3.drawImage(img3,0,0);
		var imgDataBase3=ctxBase3.getImageData(0,0,300,300);
		
		var BASE1 = [];


		var match1 = 0;
		var match2 = 0;
		var match3 = 0;
		for(var l=0;l<1200;l+=4)
		{
			var t=0;
			for(var k=0;k<300;k++)
			{
				for(var z=0;(z+l+3)<1200 && (k*1200+z+l+3) < imgDataBase1.data.length && (k*1200+z+3) < imgDataUser.data.length;z+=4)
				{
					if(imgDataUser.data[k*1200+z] === imgDataBase1.data[k*1200+l+z]
						&& imgDataUser.data[k*1200+z+1] === imgDataBase1.data[k*1200+z+l+1]
						&& imgDataUser.data[k*1200+z+2] === imgDataBase1.data[k*1200+z+l+2])
						t++;
					else t--;
				}
			}
			match1 = match1 < t ? t : match1;
			console.log(l, match1);
		}

		for(var l=0;l<1200;l+=4)
		{
			var t=0;
			for(var k=0;k<300;k++)
			{
				for(var z=0;(z+l+3)<1200 && (k*1200+z+l+3) < imgDataBase2.data.length && (k*1200+z+3) < imgDataUser.data.length;z+=4)
				{
					if(imgDataUser.data[k*1200+z] === imgDataBase2.data[k*1200+l+z]
						&& imgDataUser.data[k*1200+z+1] === imgDataBase2.data[k*1200+z+l+1]
						&& imgDataUser.data[k*1200+z+2] === imgDataBase2.data[k*1200+z+l+2])
						t++;
					else t--;
				}
			}
			match2 = match2 < t ? t : match2;	
		}

		for(var l=0;l<1200;l+=4)
		{
			var t=0;
			for(var k=0;k<300;k++)
			{
				for(var z=0;(z+l+3)<1200 && (k*1200+z+l+3) < imgDataBase3.data.length && (k*1200+z+3) < imgDataUser.data.length;z+=4)
				{
					if(imgDataUser.data[k*1200+z] === imgDataBase3.data[k*1200+l+z]
						&& imgDataUser.data[k*1200+z+1] === imgDataBase3.data[k*1200+z+l+1]
						&& imgDataUser.data[k*1200+z+2] === imgDataBase3.data[k*1200+z+l+2])
						t++;
					else t--;
				}
			}
			match3 = match3 < t ? t : match3;	
		}
		var result = 'ITS ONE';
		if(match2 >= match1)
		{
			if(match2 >= match3) {
				result = 'ITS TWO Macha';
			} else {
				result = 'ITS THREE Macha';
			}
		}
		if(match2 <= match1)
		{
			if(match3 <= match1) {
				result = 'ITS ONE Macha';
			} else {
				result = 'ITS THREE Macha';
			}
		}
		console.log(match1,match2, match3, result);
	};
	start() {
		var c=document.getElementById("userEntryCanv");
	    var ctx=c.getContext("2d");
	    var img=document.getElementById("userImg");
	    ctx.drawImage(img,0,0);

	    var imgData=ctx.getImageData(0,0,300,300);
		console.log(imgData);
		for(var l=0;l<imgData.data.length;l+=4)
		{
			if((imgData.data[l]<=20&&imgData.data[l+1]<=20&&imgData.data[l+2]<=20))
			{
				imgData.data[l]=imgData.data[l+1]=imgData.data[l+2]=20;
				imgData.data[l+3]=255;
			} else {
				imgData.data[l]=255;
				imgData.data[l+1]=imgData.data[l+2]=imgData.data[l+3]=255;
			}
		}
		ctx.putImageData(imgData, 0, 0);
	};
	render() {
      return (
      	<div>
      		<button onClick={this.start} > start </button>
      		<button onClick={this.la1} >Match</button>
      		<img src='/testImg.jpg' id='baseImg1' />
      		<img src='/testImg2.jpg' id='baseImg2' />
      		<img src='/testImg3.jpg' id='baseImg3' />

      		<img src='/testImg3.jpg' id='userImg' />

      		<canvas id="baseCanv1" width="300" height="300"></canvas>
      		<canvas id="baseCanv2" width="300" height="300"></canvas>
      		<canvas id="baseCanv3" width="300" height="300"></canvas>
      		<canvas id="userEntryCanv" width="300" height="300"></canvas>
      	</div>
      )
   	}
}
export default App;