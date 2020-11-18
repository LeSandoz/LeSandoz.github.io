
$(".zh-tw").css("display", "none");

$(document).scroll(function(){
    var scroH = $(document).scrollTop();  //�u�ʰ���
    var viewH = $(window).height();  //�i������ 
    var contentH = $(document).height();  //���e����
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

$(document).on("change","#colorSelectorIcon", function(){
    let color = $("#colorSelectorIcon").val();
    $(".item .wrap .draggable_new .icon_new").css("background-color", color);
})
$(document).on("change","#colorSelectorTshirt", function(){
    let color = $("#colorSelectorTshirt").val();
    $(".item .wrap .shirt-bg").css("background-color", color);
})




function uploadFile(){
    window.open('https://driveuploader.com/upload/P3bXC1HZlF/');
}
function noFile(){
    window.open('./no_file.html');
}
function home(){
    window.location.replace('./index.html');
}



$(function(){
    $(".draggable").on("mousedown", function(){
        $(this).clone().appendTo(".drag_wrap").addClass("draggable_new");
        $(".draggable_new").draggable();
    })
});






