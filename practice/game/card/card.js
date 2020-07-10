

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
        document.getElementsByClassName("cards-back")[i].style.background = "#ffffff url(../card/images/"+ result[i] +".png) center";
        document.getElementsByClassName("cards-back")[i].style.backgroundSize = "cover";
    }
})
var optionA = []
var times = 0
var time = setInterval(() => {
    $(".time").text(time.toFixed(2))
    time += 0.1
}, 100);
var count = 0;
$(".cards-head").click(function(){
    times++
    // console.log(times)
    $(this).css({"transform":"rotateY(180deg)",
                    "opacity":"0",
                    "z-index":"-1"})
    $(this).next(".cards-back").css({"transform":"rotateY(180deg)",
                    "opacity":"1",
                    "z-index":"1"})
    $(this).attr("data-open", "t")
    $(this).next(".cards-back").attr("data-open", "t")
    // console.log($(this).attr("data-open"))                
    optionA.push($(this).next(".cards-back").css("background-image"))
    // console.log(optionA[0])
    // console.log(optionA[1])
    if(optionA.length > 1){
        if(optionA[0] == optionA[1]){
            // $(this).css({"opacity":"0"})
            // $(this).next(".cards-back").css({"opacity":"0"})
            optionA = [];
            setTimeout(function(){
                $(".card-box").find("[data-open = 't']").css({"opacity":"0"})
                $(".card-box").find("[data-open = 't']").removeClass("cards-head","cards-back")
            },800)
            // console.log("一樣")
            count++
        }else{
            // console.log("不一樣")
            optionA = [];
            setTimeout(function(){
                $(".cards-head").css({"transform":"rotateY(0deg)",
                                      "opacity":"1",
                                      "z-index":"1"})
                $(".cards-back").css({"transform":"rotateY(0deg)",
                                      "opacity":"0",
                                      "z-index":"-1"})
                $(".card-box").find("[data-open = 't']").attr("data-open", "f") 
            },800)

        }
    }
    $(".times").text(Math.round(times/2))
    // console.log($(".card-box").find("[data-open = 't']").length)

    if(count == 12){
        console.log("End")
        clearInterval(time)
        $(".point").text(Math.round(1000-times*4-time))
        $(".time").removeClass("time")
    }

})
// $(document).ready(function(){
//     if($(".card-box").find("[data-open = 't']").length == 0){
//         alert("Game Over")
//     }
// })

