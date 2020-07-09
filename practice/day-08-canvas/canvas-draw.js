const canvas = document.querySelector('#draw');
const ctx = canvas.getContext('2d');

// canvas.width = window.innerWidth;
// canvas.height = window.innerHeight;

//ctx.strokeStyle定義繪畫的顏色，
//ctx.lineJoin定義兩線相交時的拐角練習，
//ctx.lineCap定義結束端點樣式。
//ctx.lineWidth定義寬度。

ctx.strokeStyle = '#000000';
ctx.lineJoin = 'round'; //round為圓弧。
ctx.lineCap = 'round'; //round為圓弧。
ctx.lineWidth = 12;

let isDrawing = false; //一開始先定義為false

canvas.addEventListener('mousedown', ()=>isDrawing = true); //開始繪圖]
canvas.addEventListener('mousemove', draw);//繪製圖片中
canvas.addEventListener('mouseup', ()=>isDrawing = false);//完成繪圖
canvas.addEventListener('mouseout', ()=>isDrawing = false);//取消繪圖

function draw(e){
    if (!isDrawing) return; //設定停止
    console.log(e); //此時可以打開使用者工具看看有無回傳座標相關訊息，若有則代表到目前為止皆為成功!
}

let lastX = 0;
let lastY = 0;
let hue = 0;
let direction = true;


function draw(e){
  if (!isDrawing) return;
  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(e.offsetX, e.offsetY); //畫到的位置。
  ctx.stroke();
}

canvas.addEventListener('mousedown', (e)=> {
  isDrawing = true;
  [lastX, lastY] = [e.offsetX, e.offsetY];
}); //開始繪圖

function draw(e){
    if (!isDrawing) return;
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(e.offsetX, e.offsetY); //畫到的位置。
    ctx.stroke();
    [lastX, lastY] = [e.offsetX, e.offsetY];

    // ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;//重新定義顏色
    // hue++;
    // if(hue>=360){
    //   hue = 0; //若++到360自動歸零
    // }

    // if(ctx.lineWidth >= 100 || ctx.lineWidth <= 1){
    //     direction = !direction;
    //   }
    //   if(direction){
    //     ctx.lineWidth++
    //   }else{
    //     ctx.lineWidth--
    //   }
}
function clearAll(){
    canvas.width = 800
    ctx.strokeStyle = '#000000';
    ctx.lineJoin = 'round'; //round為圓弧。
    ctx.lineCap = 'round'; //round為圓弧。
    ctx.lineWidth = 12;
}
$("input").on("change", function(){
    var size = $("#size").val()
    var color = $("#color").val()

    ctx.strokeStyle = color;
    $("#colorText").val(color)
    ctx.lineWidth = size;


    console.log(color)
    // console.log(size)
})
$("#eraser").on("click",function(){
    ctx.strokeStyle = '#ffffff';
})
$("#colorText").val(ctx.strokeStyle)
$("#colorText").on("blur", function(){
    var colorText = $("#colorText").val()
    $("#color").val(colorText) 
    ctx.strokeStyle = colorText
})