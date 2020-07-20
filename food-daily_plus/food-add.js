let sendButton = document.querySelector('#send');
let today = new Date();
let datetime = today.getFullYear()+ "/" + (today.getMonth()+1) + "/" + today.getDate() + " " + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
// console.log($('input:text[name="breakfastText[]"]')[0].value)
function send() {
    alert("已新增")
    window.setTimeout(" window.location.href = 'https://lesandoz.nctu.me/food-daily_plus/food-daily'", 1000)

    let name = document.querySelector('#name').value;
    let date = document.querySelector('#date').value;
    let weight = document.querySelector('#weight').value;
    let fat = document.querySelector('#fat').value;
    let breakfast = ''
    let lunch = ''
    let dinner = ''
    let snack = ''
    breakfast += $('input:checkbox:checked[name="breakfast[]"]').map(function() { return $(this).val(); }).get();
    for(let i = 0; i < $('input:text[name="breakfastText[]"]').length; i++){
        if(breakfast == ''){
            if($('input:text[name="breakfastText[]"]')[i].value == ''){
                breakfast += ''
            }else{
                breakfast += $('input:text[name="breakfastText[]"]')[i].value
                breakfast += "：" + $('input:text[name="breakfastCal[]"]')[i].value
            }
        }else{
            if($('input:text[name="breakfastText[]"]')[i].value == ''){
                breakfast += ''
            }else{
                breakfast += "," + $('input:text[name="breakfastText[]"]')[i].value
                breakfast += "：" + $('input:text[name="breakfastCal[]"]')[i].value
            }

        }

    }
    lunch += $('input:checkbox:checked[name="lunch[]"]').map(function() { return $(this).val(); }).get();
    for(let i = 0; i < $('input:text[name="lunchText[]"]').length; i++){
        if(lunch == ''){
            if($('input:text[name="lunchText[]"]')[i].value == ''){
                lunch += ''
            }else{
                lunch += $('input:text[name="lunchText[]"]')[i].value
                lunch += "：" + $('input:text[name="lunchCal[]"]')[i].value
            }
        }else{
            if($('input:text[name="lunchText[]"]')[i].value == ''){
                lunch += ''
            }else{
                lunch += "," + $('input:text[name="lunchText[]"]')[i].value
                lunch += "：" + $('input:text[name="lunchCal[]"]')[i].value
            }

        }

    }
    dinner += $('input:checkbox:checked[name="dinner[]"]').map(function() { return $(this).val(); }).get();
    for(let i = 0; i < $('input:text[name="dinnerText[]"]').length; i++){
        if(dinner == ''){
            if($('input:text[name="dinnerText[]"]')[i].value == ''){
                dinner += ''
            }else{
                dinner += $('input:text[name="dinnerText[]"]')[i].value
                dinner += "：" + $('input:text[name="dinnerCal[]"]')[i].value
            }
        }else{
            if($('input:text[name="dinnerText[]"]')[i].value == ''){
                dinner += ''
            }else{
                dinner += "," + $('input:text[name="dinnerText[]"]')[i].value
                dinner += "：" + $('input:text[name="dinnerCal[]"]')[i].value
            }

        }

    }
    snack += $('input:checkbox:checked[name="snack[]"]').map(function() { return $(this).val(); }).get();
    for(let i = 0; i < $('input:text[name="snackText[]"]').length; i++){
        if(snack == ''){
            if($('input:text[name="snackText[]"]')[i].value == ''){
                snack += ''
            }else{
                snack += $('input:text[name="snackText[]"]')[i].value
                snack += "：" + $('input:text[name="snackCal[]"]')[i].value
            }
        }else{
            if($('input:text[name="snackText[]"]')[i].value == ''){
                snack += ''
            }else{
                snack += "," + $('input:text[name="snackText[]"]')[i].value
                snack += "：" + $('input:text[name="snackCal[]"]')[i].value
            }

        }

    }
    let water = document.querySelector('#water').value;
    let fit = document.querySelector('#fit').value;
    let sleep = document.querySelector('#sleep').value;
    console.log("breakfast: " + breakfast)
    $.ajax({
        url: "https://script.google.com/macros/s/AKfycbx7aV1yqwC-iho3TjiDDdIklkeigOnXgQnYRIcQrMq_dd2OqeSS/exec",
        data: {
            "time": datetime,
            "name": name,
            "date": date,
            "weight": weight,
            "fat": fat,
            "breakfast": breakfast,
            "lunch": lunch,
            "dinner": dinner,
            "snack": snack,
            "water": water,
            "fit": fit,
            "sleep": sleep
        },
        success: function(response) {
        if(response == "成功"){
            alert("成功");

        }
        },
    });
};

$(document).on("click", ".add", function(){
    let parent = $(this).parent()
    let parentHtml = `<div class="d-flex">${parent.html()}</div>`
    $(this).addClass("d-none")
    parent.parent().append(parentHtml)
})
sendButton.addEventListener('click', send);