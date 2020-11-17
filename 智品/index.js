
$(".zh-tw").css("display", "none");

$(document).scroll(function(){
    var scroH = $(document).scrollTop();  //滾動高度
    var viewH = $(window).height();  //可見高度 
    var contentH = $(document).height();  //內容高度
    // console.log(scroH);
    if(scroH > 100 && scroH < 650){
        $(".language").css("color", "white");
    }else if(scroH < 100){
        $(".language").css("color", "black");
    }else if(scroH > 650){
        $(".language").css("color", "black");
    }
})

$(".language1").on("click", function(){
    $(".zh-tw").css("display", "");
    $(".en").css("display", "none");
})
$(".language2").on("click", function(){
    $(".en").css("display", "");
    $(".zh-tw").css("display", "none");
})
$(document).on("click", ".menu", function(){
    $(".header_list_bot_600").css("display", "block");
    $(".menu").addClass("clickOn");
});
$(document).on("click", ".clickOn", function(){
    $(".header_list_bot_600").css("display", "none");
    $(".menu").removeClass("clickOn");
});
function uploadFile(){
    window.open('https://driveuploader.com/upload/P3bXC1HZlF/');
}
function noFile(){
    window.open('./no_file.html');
}
function home(){
    window.location.replace('./index.html');
}


