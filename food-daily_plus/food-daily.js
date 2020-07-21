fetch("https://spreadsheets.google.com/feeds/list/1qF0VQyE6PSVwkBZDviMitvIVfZdiAEh4YUheRPH2TK8/1/public/values?alt=json")
.then(res => {
    return res.json();
}).then(result => {
    let entry = result.feed.entry;
    // console.log(entry)
    // console.log(sleep)
    let contentHo = ''
    let contentLiu = ''
    let cardLiu = ''
    let cardHo = ''
    // for(let i = 0; i < entry.length; i++){
    for(let i = entry.length - 1; i >= 0; i--){
        // console.log(entry[i])
        let name = entry[i].gsx$名字.$t;
        let date = entry[i].gsx$日期.$t.substr(5).replace("-","/");
        let weight = entry[i].gsx$早晨體重.$t;
        let fat = entry[i].gsx$體脂.$t;
        let breakfast = entry[i].gsx$早餐.$t.replace(/,/g, '<br>');
        let lunch = entry[i].gsx$午餐.$t.replace(/,/g, '<br>');
        let dinner = entry[i].gsx$晚餐.$t.replace(/,/g, '<br>');
        let snack = entry[i].gsx$消夜點心飲料.$t.replace(/,/g, '<br>');
        let breakfastCal = eval(entry[i].gsx$早餐.$t.replace(/[^0-9,.]/ig,"").replace(/,/g, '+'))
        let breakfastName = entry[i].gsx$早餐.$t.replace(/[0-9;.]/g,"").replace(/,/g, '<br>')
        let lunchCal = eval(entry[i].gsx$午餐.$t.replace(/[^0-9,.]/ig,"").replace(/,/g, '+'))
        let dinnerCal = eval(entry[i].gsx$晚餐.$t.replace(/[^0-9,.]/ig,"").replace(/,/g, '+'))
        let snackCal = eval(entry[i].gsx$消夜點心飲料.$t.replace(/[^0-9,.]/ig,"").replace(/,/g, '+'))
        if(breakfastCal == undefined){breakfastCal = 0}
        if(lunchCal == undefined){lunchCal = 0}
        if(dinnerCal == undefined){dinnerCal = 0}
        if(snackCal == undefined){snackCal = 0}
        let totalCal = breakfastCal + lunchCal + dinnerCal + snackCal
        let  totalCalHTML = ''
        if(totalCal >= 1500){
            totalCalHTML = `<td class="totalCalories text-danger">${totalCal}大卡</td>`
        }else{
            totalCalHTML = `<td class="">${totalCal}大卡</td>`
        }

        let water = entry[i].gsx$飲水量.$t;
        let fit = entry[i].gsx$運動.$t;
        let sleep = entry[i].gsx$睡覺時間.$t;
        let sleepNew = entry[i].gsx$睡覺時間.$t.substr(0,sleep.length - 3);
        

        if(name == '阿何'){
            // console.log(name)
            contentHo += `
                            <tr>
                                <td>${date}</td>
                                <td>${weight}kg</td>
                                <td>${fat}%</td>
                                <td class="breakfast">${breakfast}</td>
                                <td class="lunch">${lunch}</td>
                                <td class="dinner">${dinner}</td>
                                <td class="snack">${snack}</td>
                                ${totalCalHTML}
                                <td>${water}c.c</td>
                                <td class="fit">${fit}</td>
                                <td class="sleep">${sleepNew}</td>
                            </tr>
                        `
            cardHo +=`
                        <div class="card" style="width:300px">
                            <img class="card-img-top" src="" alt="">
                            <div class="card-body">
                                <h4 class="card-title">${date}</h4>
                                <div class="d-flex">
                                <p class="card-text mr-4">體重：${weight}</p>
                                <p class="card-text">體脂：${fat}</p>
                                </div>
                                <div class="d-flex">
                                <p class="card-text mr-4">早餐：${breakfast}</p>
                                </div>
                                <div class="d-flex">
                                <p class="card-text mr-4">午餐：${lunch}</p>
                                </div>
                                <div class="d-flex">
                                <p class="card-text mr-4">晚餐：${dinner}</p>
                                </div>
                                <div class="d-flex">
                                <p class="card-text mr-4">消夜點心：${snack}</p>
                                </div>
                                <p class="card-text mr-4">總熱量：${totalCalHTML}</p>
                                <div class="d-flex">
                                    <p class="card-text mr-4">飲水量：${water}</p>
                                    <p class="card-text mr-4">運動：${fit}</p>
                                </div>
                                <p class="card-text mr-4">睡覺時間：${sleepNew}</p> 
                            </div>
                        </div>
                    `
        }else if(name == '阿婷'){
            // console.log(breakfastName)
            contentLiu += `
                            <tr>
                                <td>${date}</td>
                                <td>${weight}kg</td>
                                <td>${fat}%</td>
                                <td class="breakfast">${breakfast}</td>
                                <td class="lunch">${lunch}</td>
                                <td class="dinner">${dinner}</td>
                                <td class="snack">${snack}</td>
                                ${totalCalHTML}
                                <td>${water}c.c</td>
                                <td class="fit">${fit}</td>
                                <td class="sleep">${sleepNew}</td>
                            </tr>
                        `
            cardLiu +=`
                        <div class="card" style="width:300px">
                            <img class="card-img-top" src="" alt="">
                            <div class="card-body">
                                <h4 class="card-title">${date}</h4>
                                <div class="d-flex">
                                <p class="card-text mr-4">體重：${weight}</p>
                                <p class="card-text">體脂：${fat}</p>
                                </div>
                                <div class="d-flex">
                                <p class="card-text mr-4">早餐：${breakfast}</p>
                                </div>
                                <div class="d-flex">
                                <p class="card-text mr-4">午餐：${lunch}</p>
                                </div>
                                <div class="d-flex">
                                <p class="card-text mr-4">晚餐：${dinner}</p>
                                </div>
                                <div class="d-flex">
                                <p class="card-text mr-4">消夜點心：${snack}</p>
                                </div>
                                <p class="card-text mr-4">總熱量：${totalCalHTML}</p>
                                <div class="d-flex">
                                    <p class="card-text mr-4">飲水量：${water}</p>
                                    <p class="card-text mr-4">運動：${fit}</p>
                                </div>
                                <p class="card-text mr-4">睡覺時間：${sleepNew}</p> 
                            </div>
                        </div>
                    `
        }

        // console.log(snack)
        // console.log(totalCal)

    }
        // console.log(cardLiu)

    document.querySelector("#Ho").innerHTML = contentHo;
    document.querySelector("#Liu").innerHTML = contentLiu;
    document.querySelector("#cardHo").innerHTML = cardHo;
    document.querySelector("#cardLiu").innerHTML = cardLiu;


}).catch(function(err) {

});
console.log($(window).width())

    $(".Ho").on("click", function(){
        console.log('Ho')
        $(".Ho").css("color", "red")
        $(".Liu").css("color", "white")
        if($(window).width() < 600){
            $("#cardHo").removeClass("d-none")
            $("#cardLiu").addClass("d-none")
        }else{
            $("#Ho").removeClass("d-none")
            $("#Liu").addClass("d-none")
            $("#cardLiu").addClass("d-none")
            $("#cardHo").addClass("d-none")
        }
    })

    $(".Liu").on("click", function(){
        console.log('Liu')
        $(".Liu").css("color", "red")
        $(".Ho").css("color", "white")
        if($(window).width() < 600){
            $("#cardLiu").css("display", "block")
            $("#cardLiu").removeClass("d-none")
            $("#cardHo").addClass("d-none")
        }else{
            $("#Liu").removeClass("d-none")
            $("#Ho").addClass("d-none")
            $("#cardLiu").addClass("d-none")
            $("#cardHo").addClass("d-none")
        }



    })
    $(window).resize(function() {
        console.log($(window).width())
        if($(window).width() < 600){
            $(".ho_table").addClass("d-none")
            $("#cardLiu").removeClass("d-none")
            $("#cardHo").removeClass("d-none")
        }else{
            $(".ho_table").removeClass("d-none")
            $("#cardLiu").addClass("d-none")
            $("#cardHo").addClass("d-none")
        }
    });


