fetch("https://spreadsheets.google.com/feeds/list/1qF0VQyE6PSVwkBZDviMitvIVfZdiAEh4YUheRPH2TK8/1/public/values?alt=json")
.then(res => {
    return res.json();
}).then(result => {
    let entry = result.feed.entry;
    // console.log(entry)
    // console.log(sleep)
    let contentHo = ''
    let contentLiu = ''
    for(let i = 0; i < entry.length; i++){
        // console.log(entry[i])
        let name = entry[i].gsx$名字.$t;
        let date = entry[i].gsx$日期.$t;
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
                                <td>${water}</td>
                                <td>${fit}</td>
                                <td>${sleep}</td>
                            </tr>
                        `
        }else if(name == '阿婷'){
            console.log(breakfastName)
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
                                <td>${water}</td>
                                <td>${fit}</td>
                                <td>${sleep}</td>
                            </tr>
                        `
        }
        // console.log(contentHo)

        // console.log(snack)
        // console.log(totalCal)

    }
    document.querySelector("#Ho").innerHTML = contentHo;
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


