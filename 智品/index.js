// $(".start_your_project").on("click", function(){
//     window.location.href ="https://driveuploader.com/upload/P3bXC1HZlF/";
// })
$(".zh-tw").css("display", "none");

$(".language1").on("click", function(){
    $(".zh-tw").css("display", "");
    $(".en").css("display", "none");
})
$(".language2").on("click", function(){
    $(".en").css("display", "");
    $(".zh-tw").css("display", "none");
})