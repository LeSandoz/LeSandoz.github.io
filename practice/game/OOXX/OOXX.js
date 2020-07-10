var times = 0



$(".box").click(function(){
    var click = $(this).attr("data-click")

    if(click == "t"){
        if((times % 2) !== 1){
            $(this).text("O")
            $("h1").text("XXX Turn!")
        }else{
            $(this).text("X")
            $("h1").text("OOO Turn!")
        }
        $(this).attr("data-click","f")
        times++
    }else if(click == "f"){
        alert("已經點過了喔")
    }else{
        alert("遊戲結束，請按Again!")
    }
        //OO
    if(      ($(".box1-1").text() == "X" && $(".box1-2").text() == "X" && $(".box1-3").text() == "X") ||
             ($(".box2-1").text() == "X" && $(".box2-2").text() == "X" && $(".box2-3").text() == "X") ||
             ($(".box3-1").text() == "X" && $(".box3-2").text() == "X" && $(".box3-3").text() == "X") ||
             ($(".box1-1").text() == "X" && $(".box2-1").text() == "X" && $(".box3-1").text() == "X") ||
             ($(".box1-2").text() == "X" && $(".box2-2").text() == "X" && $(".box3-2").text() == "X") ||
             ($(".box1-3").text() == "X" && $(".box2-3").text() == "X" && $(".box3-3").text() == "X") ||
             ($(".box1-1").text() == "X" && $(".box2-2").text() == "X" && $(".box3-3").text() == "X") ||
             ($(".box1-3").text() == "X" && $(".box2-2").text() == "X" && $(".box3-1").text() == "X")){
                $("h1").text("XXX Win!")
                $(".box").attr("data-click","over")

    }else if(($(".box1-1").text() == "O" && $(".box1-2").text() == "O" && $(".box1-3").text() == "O") ||
             ($(".box2-1").text() == "O" && $(".box2-2").text() == "O" && $(".box2-3").text() == "O") ||
             ($(".box3-1").text() == "O" && $(".box3-2").text() == "O" && $(".box3-3").text() == "O") ||
             ($(".box1-1").text() == "O" && $(".box2-1").text() == "O" && $(".box3-1").text() == "O") ||
             ($(".box1-2").text() == "O" && $(".box2-2").text() == "O" && $(".box3-2").text() == "O") ||
             ($(".box1-3").text() == "O" && $(".box2-3").text() == "O" && $(".box3-3").text() == "O") ||
             ($(".box1-1").text() == "O" && $(".box2-2").text() == "O" && $(".box3-3").text() == "O") ||
             ($(".box1-3").text() == "O" && $(".box2-2").text() == "O" && $(".box3-1").text() == "O")){
                $("h1").text("OOO Win!")
                $(".box").attr("data-click","over") 
    }else if(times == 9){
                $("h1").text("Drew!!")
    }
    console.log(click)
    console.log(times)

})
$("#again").click(function(){
    $(".box").text("")
    $(".box").attr("data-click","t")
    times = 0
    $("h1").text("GO")
})

