$(document).ready(function(){
    //使用getJSON方法讀取json資料,
    //注意：info.json可以是不同型別檔案，只要其中的資料為json型別即可
    $.getJSON('./Sunny_home.json',function(result){
        //main_bar header
        $(".tw_name").text(result["profile"]["name"])
        $(".main_bar_text h2").text(result["profile"]["account"])
        $(".header_head").attr("src",result["profile"]["src"])
        $(".post").before(result["profile"]["post"])
        $(".follower").before(result["profile"]["follower"])
        $(".following").before(result["profile"]["following"])

        //main
        $(".main_img_content").attr("src",result["home_img_list"]["1"]["src"])
    });

    // $(".profile_setting").on("click",function(){
    //     console.log(123)
    //     result["profile"]["name"] = 123
    // })
})