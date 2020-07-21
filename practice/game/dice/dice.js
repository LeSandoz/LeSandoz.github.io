$("#start").click(function(){


    $("#start").addClass("d-none")
    $("#stop").removeClass("d-none")
    $(".player .point img").attr("src", "./images/dice-roll.gif")
    $(".computer .point img").attr("src", "./images/dice-roll.gif")
    $(".alertbox").addClass("d-none")
});
let pWin = 0
let cWin = 0
let drew = 0
$("#stop").click(function(){
    $("#stop").addClass("d-none")
    $("#start").removeClass("d-none")

    var pointArrPlayer = [1, 2, 3, 4, 5, 6]
    var pointPlayer = Math.floor((Math.random()*pointArrPlayer.length));
    var pointArrCom = [1, 2, 3, 4, 5, 6]
    var pointCom = Math.floor((Math.random()*pointArrCom.length));

    $(".player .point h3").text(pointArrPlayer[pointPlayer])
    $(".computer .point h3").text(pointArrCom[pointCom])

    $(".player .point img").attr("src", "./images/Dice-"+ (pointPlayer + 1) +".svg.png")
    $(".computer .point img").attr("src", "./images/Dice-"+ (pointCom + 1) +".svg.png")

    if(pointPlayer > pointCom){
        $(".alertbox").removeClass("d-none").text("You Win!!!")
        pWin++
        $(".total .pwin").text(pWin)
        console.log("pWin: " + pWin)
    }else if(pointPlayer == pointCom){
        $(".alertbox").removeClass("d-none").text("Drew...")
        drew++
        $(".total .drew").text(drew)
        console.log("drew: " + drew)
    }else{
        $(".alertbox").removeClass("d-none").text("You Lose!!!")
        cWin++
        $(".total .cwin").text(cWin)
        console.log("cWin: " + cWin)
    }
})
