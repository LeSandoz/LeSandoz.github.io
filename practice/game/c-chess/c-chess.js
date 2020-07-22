let moveBefore = ''
let moveAfter = ''
let sizeBefore = ''
let sizeAfter = ''
let colorBefore = ''
let colorAfter = ''
let colorTurn = ''
let optionBefore = ''
let input = ''
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
    // console.log($(".checker").eq(i).children("span").text())
    $(".chessmanBack").eq(i).text(all_result[i])
    optionBefore += `    
                        <option value="${$(".checker").eq(i).children("span").text()}">${$(".checker").eq(i).children("span").text()}</option>       
                    `
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

$(".chessman").on("click", function(){
    $(this).addClass("disappear")
    $(this).parent().find(".chessmanBack").removeClass("d-none")
    let turnColor = $(this).parent().find(".chessmanBack").css("color")
    // console.log(turnColor)
    if(turnColor == "rgb(0, 0, 0)" && colorTurn == ''){
        // console.log(1)
        colorTurn = "black"
        $(".turn").removeClass("black").addClass("red").text("紅方")
    }else if(turnColor == "rgb(255, 0, 0)" && colorTurn == ''){
        // console.log(2)
        colorTurn = "red"
        $(".turn").removeClass("red").addClass("black").text("黑方")
    }else if($(".turn").css("color") == "rgb(255, 0, 0)"){
        // console.log(3)
        $(".turn").removeClass("red").addClass("black").text("黑方")
    }else if($(".turn").css("color") == "rgb(0, 0, 0)"){
        // console.log(4)
        $(".turn").removeClass("black").addClass("red").text("紅方")
    }
    // console.log(colorTurn)
})
// console.log(optionBefore)
$("#moveBefore").append(optionBefore)

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
    colorAfter = $("." + moveAfter).children(".chessmanBack").css("color")
    let item = $("." + moveBefore).children(".chessmanBack").html()
    let itemdead = $("." + moveAfter).children(".chessmanBack").html()
    let newChessman = `
                        <div class="chessmanBack" data-size="${sizeBefore}" style="color:${colorBefore}">${item}</div></div> 
                      `
    let deadChess   = `
                        <div class="chessmanBack" data-size="${sizeAfter}" style="color:${colorAfter}">${itemdead}</div></div> 
                      `
    // console.log(item)
    // console.log(newChessman)
    // console.log(deadChess)
    // console.log(sizeBefore)
    // console.log(sizeAfter)
    // console.log(colorBefore)
    // console.log(colorAfter)
    if(colorBefore !== colorAfter || colorAfter == undefined){
        if( (sizeBefore == "1" && sizeAfter == "6") || 
            (sizeBefore > sizeAfter) ||
            (sizeBefore == "0") ||
            (sizeAfter == undefined) ||
            (sizeBefore == sizeAfter)
        ){
            if(sizeBefore == "6" && sizeAfter =="1"){
                alert("小兵(卒)立大功")
                $("." + moveAfter).children(".chessmanBack").css("transform", "")
                $("." + moveBefore).children(".chessmanBack").css("transform", "")
                $("." + moveBefore).children(".chessmanBack").css("color", "")
                $("." + moveAfter).children(".chessman").css("color", "")
                input = ''
            }else{
                $("." + moveBefore).children(".chessmanBack").remove()
                $("." + moveAfter).children(".chessmanBack").remove()
                $("." + moveAfter).append(newChessman)
                input = ''
                if(colorAfter == "rgb(255, 0, 0)"){
                    $(".dead-chess-red").append(deadChess)
                }else{
                    $(".dead-chess-black").append(deadChess)
                }
            }
        }else{
            alert("怎麼可以吃比你大的呢")
            $("." + moveAfter).children(".chessmanBack").css("transform", "")
            $("." + moveBefore).children(".chessmanBack").css("transform", "")
            input = ''
        }

    }else{
        alert("不要殘殺同胞")
        $("." + moveAfter).children(".chessmanBack").css("transform", "")
        $("." + moveBefore).children(".chessmanBack").css("transform", "")
        input = ''
    }
    $("input").val('')
    moveAfter = ''
    moveBefore = ''
    // console.log($(".turn").css("color"))
    // if($(".turn").css("color") == "rgb(255, 0, 0)"){
    //     colorTurn = "black"
    //     $(".turn").css("color", "black").text("黑方")
    //     console.log(1)
    // }else if($(".turn").css("color") == "rgb(0, 0, 0)"){
    //     colorTurn = "red"
    //     $(".turn").css("color", "red").text("紅方")
    //     console.log(2)
    // }
})

$(".chessmanBack").on("click", function(){
    console.log(input)
    console.log($(this))
    $(this).css("transform", "translate(8px,-12px)")
    if(input == ''){
        input = $(this).parent().find("span").text()
        $(".moveBefore").val($(this).parent().find("span").text())
    }else{
        input = ''
        $(".moveAfter").val($(this).parent().find("span").text())
    }
})




