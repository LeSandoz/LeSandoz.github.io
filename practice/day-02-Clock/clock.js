// 設定計時器：每秒執行一次 timer 函式
setInterval(timer, 1000);

//宣告待會兒計時器中會用到的變數



var second;
var secondDeg;
var secondHandTw = document.querySelector('.clock-tw .second-hand');
var secondHandJp = document.querySelector('.clock-jp .second-hand');
var secondHandUSA = document.querySelector('.clock-usa .second-hand');
var secondHandUK = document.querySelector('.clock-uk .second-hand');

var min;
var minDeg;
var minHandTw = document.querySelector('.clock-tw .min-hand');
var minHandJp = document.querySelector('.clock-jp .min-hand');
var minHandUSA = document.querySelector('.clock-usa .min-hand');
var minHandUK = document.querySelector('.clock-uk .min-hand');

var hour;
var hourDeg;
var hourHandTw = document.querySelector('.clock-tw .hour-hand');
var hourHandJp = document.querySelector('.clock-jp .hour-hand');
var hourHandUSA = document.querySelector('.clock-usa .hour-hand');
var hourHandUK = document.querySelector('.clock-uk .hour-hand');

function timer(){
  now = new Date();
  //tw
  second = now.getSeconds();
  secondDeg = (second / 60) * 360;
  secondHandTw.style.transform = `rotate(${secondDeg}deg)`;
  secondHandJp.style.transform = `rotate(${secondDeg}deg)`;
  secondHandUSA.style.transform = `rotate(${secondDeg}deg)`;
  secondHandUK.style.transform = `rotate(${secondDeg}deg)`;

  min = now.getMinutes();
  minDeg = (min / 60) * 360;
  minHandTw.style.transform = `rotate(${minDeg}deg)`;
  minHandJp.style.transform = `rotate(${minDeg}deg)`;
  minHandUSA.style.transform = `rotate(${minDeg}deg)`;
  minHandUK.style.transform = `rotate(${minDeg}deg)`;

  hour = now.getHours();
  hourDeg = (hour / 12) * 360;
  hourHandTw.style.transform = `rotate(${hourDeg}deg)`;
  hourHandJp.style.transform = `rotate(${hourDeg + 30}deg)`;
  hourHandUSA.style.transform = `rotate(${hourDeg}deg)`;
  hourHandUK.style.transform = `rotate(${hourDeg + 150}deg)`;

  var time_now = hour + ':' + min + ':' + second
  console.log(time_now)
  $(".e_clock").text(time_now)
}