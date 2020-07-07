var keys = document.querySelectorAll('.key');
var audios = document.querySelectorAll('audio');


// 鍵盤事件綁定
window.addEventListener('keydown', function(event){
    findAudio(event);
});

// 播放對應音效
function findAudio(keyDownEvent){
    audios.forEach(function(element){
      if(keyDownEvent.keyCode == element.dataset.key){
        element.currentTime = 0;  //目前播放時間設定為 0 
        element.play();  //播放音效
        findKey(keyDownEvent);  //執行動畫函數
      }
    });
}

// 對應按鍵 class 添加 .playing 改變畫面
function findKey(keyDownEvent){
    keys.forEach(function(element){
      if(keyDownEvent.keyCode == element.dataset.key){
        element.classList.add('playing');
      }
    });
}

// 對應按鍵事件綁定
keys.forEach(function(element){
    element.addEventListener('transitionend', function(){
      element.classList.remove('playing');
    })
});