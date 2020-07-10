

var num = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
var result = [];//開另一個空陣列
var ranNum = 24;

for (var i = 0; i < ranNum; i++) {
    var ran = Math.floor(Math.random() * num.length);
    result.push(num.splice(ran, 1)[0]); //舊陣列去除數字轉移到新陣列
};
// console.log(result)

$(".cards-back").each(function(){
    for(var i = 0; i < 24; i++){
        document.getElementsByClassName("cards-back")[i].style.background = "#ffffff url(/practice/game/card/images/"+ result[i] +".png) center";
        document.getElementsByClassName("cards-back")[i].style.backgroundSize = "cover";
    }
})

$(".cards-head").click(function(){
    $(this).css({"transform":"rotateY(180deg)",
                    "opacity":"0",
                    "z-index":"-1"})
    $(this).next(".cards-back").css({"transform":"rotateY(180deg)",
                    "opacity":"1",
                    "z-index":"1"})
                    console.log($(this).attr("class"))
})
$(".cards-back").click(function(){
    $(this).css({"transform":"rotateY(0deg)",
                    "opacity":"0",
                    "z-index":"-1"})
    $(this).prev(".cards-head").css({"transform":"rotateY(0deg)",
                    "opacity":"1",
                    "z-index":"1"})
})