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
let step = -1;
let userhistory = [];


//滑鼠按下後
canvas.addEventListener('mousedown', (e)=> {
  isDrawing = true;
  [lastX, lastY] = [e.offsetX, e.offsetY];
}); //開始繪圖

//滑鼠放開後
canvas.addEventListener('mouseup', (e) => {
    push(); //跑進計算步數的 function 後面會提到
    isDrawing = false; //判斷是否正在畫畫
});

function draw(e){
    if (!isDrawing) return;
    ctx.beginPath();
    //開始
    ctx.moveTo(lastX, lastY);
    //結束
    ctx.lineTo(e.offsetX, e.offsetY);
    //畫圖
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
function push() {
    step++;
    console.log(step)
    if (step < userhistory.length - 1) {
        userhistory.length = step + 1
    }
    userhistory.push(canvas.toDataURL()); //當前影像存成 Base64 編碼的字串並放入陣列
}

function undo() {
    if (step > 0) {
        step--;
        let canvaspic = new Image(); //建立新的 Image
        canvaspic.src = userhistory[step]; //載入剛剛存放的影像
        canvaspic.onload = function() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(canvaspic, 0, 0) //匯出影像並從座標 x:0 y:0 開始
        }
    }
    //最後這邊是讓上一步下一步可以在不能使用時顯示灰色及更改鼠標，可以不加
    if (step < userhistory.length && step > 0) {
        // console.log("已經沒有上一步")
    }
}

function redo() {
    if (step < userhistory.length - 1) {
        step++;
        let canvaspic = new Image(); //建立新的 Image
        canvaspic.src = userhistory[step]; //載入剛剛存放的影像
        canvaspic.onload = function() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(canvaspic, 0, 0) //匯出影像並從座標 x:0 y:0 開始
        }
    }
    //最後這邊是讓上一步下一步可以在不能使用時顯示灰色及更改鼠標，可以不加
    if (step < userhistory.length && step > 0) {
        // console.log("已經是最新一步")
    }
}
function clearAll(){
    canvas.width = 800
    ctx.strokeStyle = '#000000';
    $("#color").val('#000000')
    $("#colorText").val('#000000')
    $("#size").val(12)
    ctx.lineJoin = 'round'; //round為圓弧。
    ctx.lineCap = 'round'; //round為圓弧。
    ctx.lineWidth = 12;
}
$("#color").on("change", function(){
    var color = $("#color").val()
    ctx.strokeStyle = color;
    $("#colorText").val(color)
    console.log(color)
})
$("#size").on("change", function(){
    var size = $("#size").val()
    ctx.lineWidth = size;
    // console.log(size)
})
$("#eraser").on("click",function(){
    ctx.strokeStyle = '#ffffff';
    $("#color").val('#ffffff')
    $("#colorText").val('#ffffff')
})
$("#colorText").val(ctx.strokeStyle)
$("#bg-colorText").val("#ffffff")
$("#bg-color").val("#ffffff")
$("#bg-colorText").on("change", function(){
    var bgcolorText = $("#bg-colorText").val()
    $("#bg-color").val(bgcolorText) 
    $("#draw").css("background", bgcolorText)
})
$("#colorText").on("blur", function(){
    var colorText = $("#colorText").val()
    $("#color").val(colorText) 
    ctx.strokeStyle = colorText
})

$("#bg-color").on("change", function(){
    var bgColor = $("#bg-color").val()
    $("#draw").css("background", bgColor)
    $("#bg-colorText").val(bgColor)
})
function back(){
    ctx.restore();
}

