fetch("https://spreadsheets.google.com/feeds/list/1-wq8eoxaqm27o0PPeF36RONth1Ze28d50qDAB0qzOFA/od6/public/values?alt=json")
.then(res => {
    return res.json();
}).then(result => {
//   console.log(result)
//   console.log(result.feed.entry.length)
  let contentHo = ''
  for(let i = 0; i < result.feed.entry.length; i++){
    let date = (result.feed.entry[i].gsx$日期.$t)
    let weight = (result.feed.entry[i].gsx$體重.$t)
    let fat = (result.feed.entry[i].gsx$體脂.$t)
    let reg = /;/g
    let breakfast = (result.feed.entry[i].gsx$早餐內容.$t).replace(reg,"<br>")
    let lunch = (result.feed.entry[i].gsx$午餐內容.$t).replace(reg,"<br>")
    let dinner = (result.feed.entry[i].gsx$晚餐內容.$t).replace(reg,"<br>")
    let snack = (result.feed.entry[i].gsx$點心宵夜.$t).replace(reg,"<br>")
    let water = (result.feed.entry[i].gsx$飲水量.$t)
    let fit = (result.feed.entry[i].gsx$運動內容.$t)
    let sleep = (result.feed.entry[i].gsx$睡覺時間.$t)
    let BreakfastCalories = result.feed.entry[i].gsx$早餐內容.$t.replace(/[^0-9;]/ig,"")
    let LunchCalories = result.feed.entry[i].gsx$午餐內容.$t.replace(/[^0-9;]/ig,"")
    let DinnerCalories = result.feed.entry[i].gsx$晚餐內容.$t.replace(/[^0-9;]/ig,"")
    let SnackCalories = result.feed.entry[i].gsx$點心宵夜.$t.replace(/[^0-9;]/ig,"")

    let totalBreakfastCalories = eval(BreakfastCalories.replace(/;/g, '+'))
    let totalLunchCalories = eval(LunchCalories.replace(/;/g, '+'))
    let totalDinnerCalories = eval(DinnerCalories.replace(/;/g, '+'))
    let totalSnackCalories = eval(SnackCalories.replace(/;/g, '+'))

    if(totalBreakfastCalories == undefined){
        totalBreakfastCalories = 0
    }
    if(totalLunchCalories == undefined){
        totalLunchCalories = 0
    }
    if(totalDinnerCalories == undefined){
        totalDinnerCalories = 0
    }
    if(totalSnackCalories == undefined){
        totalSnackCalories = 0
    }

    let totalCalories = totalBreakfastCalories + totalLunchCalories + totalDinnerCalories + totalSnackCalories
    contentHo += `
                    <tr>
                        <td>${date}</td>
                        <td>${weight}</td>
                        <td>${fat}</td>
                        <td>${breakfast}</td>
                        <td>${lunch}</td>
                        <td>${dinner}</td>
                        <td>${snack}</td>
                        <td>${totalCalories}大卡</td>
                        <td>${water}</td>
                        <td>${fit}</td>
                        <td>${sleep}</td>
                    </tr>
                `
  


    // console.log(contentHo);
    // console.log(lunch);
    // console.log(LunchCalories);
    // console.log(totalCalories);
  }
  document.querySelector("#Ho").innerHTML = contentHo;

}).catch(function(err) {

});
fetch("https://spreadsheets.google.com/feeds/list/1-wq8eoxaqm27o0PPeF36RONth1Ze28d50qDAB0qzOFA/2/public/values?alt=json")
.then(res => {
    return res.json();
}).then(result => {
//   console.log(result)
//   console.log(result.feed.entry.length)
  let contentLiu = ''
  for(let i = 0; i < result.feed.entry.length; i++){
    let date = (result.feed.entry[i].gsx$日期.$t)
    let weight = (result.feed.entry[i].gsx$體重.$t)
    let fat = (result.feed.entry[i].gsx$體脂.$t)
    let reg = /;/g
    let breakfast = (result.feed.entry[i].gsx$早餐內容.$t).replace(reg,"<br>")
    let lunch = (result.feed.entry[i].gsx$午餐內容.$t).replace(reg,"<br>")
    let dinner = (result.feed.entry[i].gsx$晚餐內容.$t).replace(reg,"<br>")
    let snack = (result.feed.entry[i].gsx$點心宵夜.$t).replace(reg,"<br>")
    let water = (result.feed.entry[i].gsx$飲水量.$t)
    let fit = (result.feed.entry[i].gsx$運動內容.$t)
    let sleep = (result.feed.entry[i].gsx$睡覺時間.$t)
    let BreakfastCalories = result.feed.entry[i].gsx$早餐內容.$t.replace(/[^0-9;]/ig,"")
    let LunchCalories = result.feed.entry[i].gsx$午餐內容.$t.replace(/[^0-9;]/ig,"")
    let DinnerCalories = result.feed.entry[i].gsx$晚餐內容.$t.replace(/[^0-9;]/ig,"")
    let SnackCalories = result.feed.entry[i].gsx$點心宵夜.$t.replace(/[^0-9;]/ig,"")

    let totalBreakfastCalories = eval(BreakfastCalories.replace(/;/g, '+'))
    let totalLunchCalories = eval(LunchCalories.replace(/;/g, '+'))
    let totalDinnerCalories = eval(DinnerCalories.replace(/;/g, '+'))
    let totalSnackCalories = eval(SnackCalories.replace(/;/g, '+'))

    if(totalBreakfastCalories == undefined){
        totalBreakfastCalories = 0
    }
    if(totalLunchCalories == undefined){
        totalLunchCalories = 0
    }
    if(totalDinnerCalories == undefined){
        totalDinnerCalories = 0
    }
    if(totalSnackCalories == undefined){
        totalSnackCalories = 0
    }

    let totalCalories = totalBreakfastCalories + totalLunchCalories + totalDinnerCalories + totalSnackCalories
    // console.log(contentHo);
    // console.log(lunch);
    contentLiu += `
                    <tr>
                        <td>${date}</td>
                        <td>${weight}</td>
                        <td>${fat}</td>
                        <td>${breakfast}</td>
                        <td>${lunch}</td>
                        <td>${dinner}</td>
                        <td>${snack}</td>
                        <td>${totalCalories}大卡</td>
                        <td>${water}</td>
                        <td>${fit}</td>
                        <td>${sleep}</td>
                    </tr>
                `

  }
  document.querySelector("#Liu").innerHTML = contentLiu;

}).catch(function(err) {

});

        $(".Ho").on("click", function(){
            console.log('Ho')
            $(".Ho").css("color", "red")
            $(".Liu").css("color", "black")
            $("#Ho").removeClass("d-none")
            $("#Liu").addClass("d-none")
        })
    
        $(".Liu").on("click", function(){
            console.log('Liu')
            $(".Liu").css("color", "red")
            $(".Ho").css("color", "black")
            $("#Liu").removeClass("d-none")
            $("#Ho").addClass("d-none")
        })