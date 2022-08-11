$(".img2").on("click", function(){
    $(".img2").fadeOut(500);
    $(".img1").fadeIn(500);
    console.log(123)
})
$(".img1").on("click", function(){
    $(".img1").fadeOut(500);
    $(".img2").fadeIn(500);
    console.log(123)
})
