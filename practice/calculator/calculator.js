$(".keyboard").on("click",function(){
    var cal = $(".output").val()
    var cal_val = $(".output").val()
    var text = $(this).text()
    var val = $(this).attr("value")
    // console.log(val)
    if(text == '='){
        var total = eval(cal_val)
        console.log(total)
        $(".output").val(total)
    }else if(text == 'C'){
        $(".output").val("0")
    }else{
        cal_val += val
        cal += text
        // console.log(cal)
        console.log(cal_val)
        $(".output").val(cal)
    }

})