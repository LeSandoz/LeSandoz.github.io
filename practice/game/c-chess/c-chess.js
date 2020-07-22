let moveBefore = ''
let moveAfter = ''
let sizeBefore = ''
let sizeAfter = ''
let colorBefore = ''
let colorAfter = ''
// let black_chessman = ["卒","卒","卒","卒","卒","馬","馬","車","車","包","包","象","象","士","士","將"]
// let red_chessman   = ["兵","兵","兵","兵","兵","傌","傌","俥","俥","炮","炮","相","相","仕","仕","帥"]
let all_chessman   = ["兵","兵","兵","兵","兵","傌","傌","俥","俥","炮","炮","相","相","仕","仕","帥","卒","卒","卒","卒","卒","馬","馬","車","車", "包","包","象","象","士","士","將"]
// let black_result = []
// let red_result = []
let all_result = []
for (var i = 0; i < 32; i++) {
    // var black_index = Math.floor((Math.random()*black_chessman.length));
    // black_result.push(black_chessman.splice(black_index, 1)[0]); //舊陣列去除數字轉移到新陣列
    // var red_index = Math.floor((Math.random()*red_chessman.length));
    // red_result.push(red_chessman.splice(red_index, 1)[0]); //舊陣列去除數字轉移到新陣列
    var all_index = Math.floor((Math.random()*all_chessman.length));
    all_result.push(all_chessman.splice(all_index, 1)[0]); //舊陣列去除數字轉移到新陣列
};
// console.log(all_result)
for(let i = 0; i < $(".chessman").length; i++){
    // $(".chessman").eq(i).text(all_result[i])
    $(".chessmanBack").eq(i).text(all_result[i])
    var color = $(".chessmanBack").eq(i).text()
    // console.log(color)
    if(color == "卒" || color == "馬" || color == "車" || color == "包" || color == "象" || color == "士" || color == "將"){
        $(".chessman").eq(i).css("color", "black")
        $(".chessmanBack").eq(i).css("color", "black")
        if(color == "卒"){
            $(".chessman").eq(i).attr("data-size", "1")
            $(".chessmanBack").eq(i).attr("data-size", "1")
        }else if(color == "馬"){
            $(".chessman").eq(i).attr("data-size", "2")
            $(".chessmanBack").eq(i).attr("data-size", "2")
        }else if(color == "車"){
            $(".chessman").eq(i).attr("data-size", "3")
            $(".chessmanBack").eq(i).attr("data-size", "3")
        }else if(color == "象"){
            $(".chessman").eq(i).attr("data-size", "4")
            $(".chessmanBack").eq(i).attr("data-size", "4")
        }else if(color == "士"){
            $(".chessman").eq(i).attr("data-size", "5")
            $(".chessmanBack").eq(i).attr("data-size", "5")
        }else if(color == "包"){
            $(".chessman").eq(i).attr("data-size", "0")
            $(".chessmanBack").eq(i).attr("data-size", "0")
        }else if(color == "將"){
            $(".chessman").eq(i).attr("data-size", "6")
            $(".chessmanBack").eq(i).attr("data-size", "6")
        }
    }else{
        $(".chessman").eq(i).css("color", "red")
        $(".chessmanBack").eq(i).css("color", "red")
        if(color == "兵"){
            $(".chessman").eq(i).attr("data-size", "1")
            $(".chessmanBack").eq(i).attr("data-size", "1")
        }else if(color == "傌"){
            $(".chessman").eq(i).attr("data-size", "2")
            $(".chessmanBack").eq(i).attr("data-size", "2")
        }else if(color == "俥"){
            $(".chessman").eq(i).attr("data-size", "3")
            $(".chessmanBack").eq(i).attr("data-size", "3")
        }else if(color == "相"){
            $(".chessman").eq(i).attr("data-size", "4")
            $(".chessmanBack").eq(i).attr("data-size", "4")
        }else if(color == "仕"){
            $(".chessman").eq(i).attr("data-size", "5")
            $(".chessmanBack").eq(i).attr("data-size", "5")
        }else if(color == "炮"){
            $(".chessman").eq(i).attr("data-size", "0")
            $(".chessmanBack").eq(i).attr("data-size", "0")
        }else if(color == "帥"){
            $(".chessman").eq(i).attr("data-size", "6")
            $(".chessmanBack").eq(i).attr("data-size", "6")
        }
    }
}



$(document).on("change", ".moveBefore", function(){
    moveBefore = $(".moveBefore").val()
    $("." + moveBefore).children(".chessmanBack").css("transform", "translate(8px,-12px)")
})

$(document).on("change", ".moveAfter", function(){
    moveAfter = $(".moveAfter").val()
    $("." + moveAfter).children(".chessmanBack").css("transform", "translate(8px,-12px)")
})

$(".move").on("click", function(){
    moveBefore = $(".moveBefore").val()
    moveAfter = $(".moveAfter").val()
    sizeBefore = $("." + moveBefore).children(".chessmanBack").attr("data-size")
    sizeAfter =  $("." + moveAfter).children(".chessmanBack").attr("data-size")
    colorBefore = $("." + moveBefore).children(".chessmanBack").css("color")
    colorAfter = $("." + moveAfter).children(".chessman").css("color")
    let item = $("." + moveBefore).children(".chessmanBack").html()
    let newChessman = `
                        <div class="chessmanBack" data-size="${sizeBefore}" style="color:${colorBefore}">${item}</div></div> 
                      `
    console.log(item)
    console.log(newChessman)
    // console.log(sizeBefore)
    // console.log(sizeAfter)
    if(colorBefore !== colorAfter){
        if( (sizeBefore == "1" && sizeAfter == "6") || 
            (sizeBefore > sizeAfter) ||
            (sizeBefore == "0") ||
            (sizeAfter == undefined) ||
            (sizeBefore == sizeAfter)
        ){
            if(sizeBefore == "6" && sizeAfter =="1"){
                alert("吃不掉喔1")
                $("." + moveAfter).children(".chessmanBack").css("transform", "")
                $("." + moveBefore).children(".chessmanBack").css("transform", "")
            }else{
                $("." + moveBefore).children(".chessmanBack").remove()
                $("." + moveAfter).children(".chessmanBack").remove()
                $("." + moveAfter).append(newChessman)
            }
        }else{
            alert("吃不掉喔2")
            $("." + moveAfter).children(".chessmanBack").css("transform", "")
            $("." + moveBefore).children(".chessmanBack").css("transform", "")
        }

    }else{
        if( (sizeBefore == "1" && sizeAfter == "6") || 
            (sizeBefore > sizeAfter) ||
            (sizeBefore == "0") ||
            (sizeAfter == undefined) ||
            (sizeBefore == sizeAfter)
        ){
            if(sizeBefore == "6" && sizeAfter =="1"){
                alert("吃不掉喔3")
                $("." + moveAfter).children(".chessmanBack").css("transform", "")
                $("." + moveBefore).children(".chessmanBack").css("transform", "")
            }else{
                $("." + moveBefore).children(".chessmanBack").remove()
                $("." + moveAfter).children(".chessmanBack").remove()
                $("." + moveAfter).append(newChessman)
            }
        }else{
            alert("吃不掉喔4")
            $("." + moveAfter).children(".chessmanBack").css("transform", "")
            $("." + moveBefore).children(".chessmanBack").css("transform", "")
            console.log(sizeAfter)
        }
    }
    $("input").val('')
    moveAfter = ''
    moveBefore = ''
})

$(".chessman").on("click", function(){
    $(this).addClass("disappear")
    $(this).parent().find(".chessmanBack").removeClass("d-none")
})