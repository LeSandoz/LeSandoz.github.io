// 設定計時器：每秒執行一次 timer 函式
setInterval(timer, 1000);

//宣告待會兒計時器中會用到的變數
var now;  //儲存當下日期時間等資料

var second;  //儲存當下秒數
var secondDeg;  // 儲存秒針的度數
var secondHand = document.querySelector('.second-hand');  // 選取器指向秒針

function timer(){
  now = new Date();  //  透過 new 一個 Date() 取得當下時間

  second = now.getSeconds();  // 使用 getSeconds() 取得當下的秒數 (0-59)
  secondDeg = ((second / 60) * 360);  // 利用秒數計算出指針的角度
  secondHand.style.transform = `rotate(${secondDeg}deg)`;  // 將資料圖像化
}

secondDeg = (second / 60) * 360;

secondHand.style.transform = `rotate(${secondDeg}deg)`;

// secondHand.css({
//     transform: `rotate(${secondDeg}deg)`
// });

var second;
var secondDeg;
var secondHand = document.querySelector('.second-hand');

var min;
var minDeg;
var minHand = document.querySelector('.min-hand');

var hour;
var hourDeg;
var hourHand = document.querySelector('.hour-hand');

function timer(){
  now = new Date();

  second = now.getSeconds();
  secondDeg = (second / 60) * 360;
  secondHand.style.transform = `rotate(${secondDeg}deg)`;

  min = now.getMinutes();
  minDeg = (min / 60) * 360;
  minHand.style.transform = `rotate(${minDeg}deg)`;

  hour = now.getHours();
  hourDeg = (hour / 12) * 360;
  hourHand.style.transform = `rotate(${hourDeg}deg)`;
  var time_now = hour + ':' + min + ':' + second
  console.log(time_now)
  $(".e_clock").text(time_now)
}