let myHeaders = new Headers({
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'text/plain'
});

fetch('https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=CWB-71F9B3C8-BE49-4FEB-B532-A91C68CC01D4&format=JSON')
// fetch('http://data.ntpc.gov.tw/​/api​/datasets​/2924FBE5-852F-46F4-A829-45BECD75EFF5​/json')
.then(res => {
    // 處理 response
    return res.json();
}).then(result => {
    let str = '';
    console.log(result.records.location.length)
    console.log(result.records.location[0].locationName)
    console.log(result.records.location[0].weatherElement[0].time[0].startTime)
    console.log(result.records.location[0].weatherElement[0].time[0].endTime)
    console.log(result.records.location[0].weatherElement[0].time[0].parameter.parameterName)
    console.log("降雨機率: " + result.records.location[0].weatherElement[1].time[0].parameter.parameterName + '%')
    console.log("最低溫度: " + result.records.location[0].weatherElement[2].time[0].parameter.parameterName + "度")
    console.log("最高溫度: " + result.records.location[0].weatherElement[4].time[0].parameter.parameterName + "度")
    console.log("舒適度: " + result.records.location[0].weatherElement[3].time[0].parameter.parameterName)
    console.log(result.records.location[0].weatherElement[0].time[1].startTime)
    console.log(result.records.location[0].weatherElement[0].time[1].endTime)
    console.log(result.records.location[0].weatherElement[0].time[1].parameter.parameterName)
    console.log("降雨機率: " + result.records.location[0].weatherElement[1].time[1].parameter.parameterName + '%')
    console.log("最低溫度: " + result.records.location[0].weatherElement[2].time[1].parameter.parameterName + "度")
    console.log("最高溫度: " + result.records.location[0].weatherElement[4].time[1].parameter.parameterName + "度")
    console.log("舒適度: " + result.records.location[0].weatherElement[3].time[1].parameter.parameterName)
    console.log(result.records.location[0].weatherElement[0].time[2].startTime)
    console.log(result.records.location[0].weatherElement[0].time[2].endTime)
    console.log(result.records.location[0].weatherElement[0].time[2].parameter.parameterName)
    console.log("降雨機率: " + result.records.location[0].weatherElement[1].time[2].parameter.parameterName + '%')
    console.log("最低溫度: " + result.records.location[0].weatherElement[2].time[2].parameter.parameterName + "度")
    console.log("最高溫度: " + result.records.location[0].weatherElement[4].time[2].parameter.parameterName + "度")
    console.log("舒適度: " + result.records.location[0].weatherElement[3].time[2].parameter.parameterName)

    for(let i = 0; i < 22; i++){
        str += `<div class="card-container">
                    <div class="card card1">
                        <div class="card-body d-flex">
                            <div class="content">
                                <h4 class="card-title">${result.records.location[i].locationName}</h4>
                                <p   class="card-text">${result.records.location[i].weatherElement[0].time[0].startTime}</p>
                                <p   class="card-text">${result.records.location[i].weatherElement[0].time[0].endTime}</p>
                                <p   class="card-text">${result.records.location[i].weatherElement[0].time[0].parameter.parameterName}</p>
                                <p   class="card-text">降雨機率: ${result.records.location[i].weatherElement[1].time[0].parameter.parameterName}%</p>
                                <p   class="card-text">${result.records.location[i].weatherElement[2].time[0].parameter.parameterName}度-
                                                       ${result.records.location[i].weatherElement[4].time[0].parameter.parameterName}度</p>
                                <p   class="card-text">${result.records.location[i].weatherElement[3].time[0].parameter.parameterName}</p>
                            </div>
                            <button type="button" class="btn btn-info next next1" onclick="next1()">＞</button>
                        </div>
                    </div>
                    <div class="card d-none card2">
                        <div class="card-body d-flex">
                            <button type="button" class="btn btn-info prev prev1" onclick="prev1()">＜</button>
                            <div class="content">
                                <h4 class="card-title">${result.records.location[i].locationName}</h4>
                                <p   class="card-text">${result.records.location[i].weatherElement[1].time[1].startTime}</p>
                                <p   class="card-text">${result.records.location[i].weatherElement[1].time[1].endTime}</p>
                                <p   class="card-text">${result.records.location[i].weatherElement[0].time[1].parameter.parameterName}</p>
                                <p   class="card-text">降雨機率: ${result.records.location[i].weatherElement[1].time[1].parameter.parameterName}%</p>
                                <p   class="card-text">${result.records.location[i].weatherElement[2].time[1].parameter.parameterName}度-
                                                       ${result.records.location[i].weatherElement[4].time[1].parameter.parameterName}度</p>
                                <p   class="card-text">${result.records.location[i].weatherElement[3].time[1].parameter.parameterName}</p>
                            </div>
                            <button type="button" class="btn btn-info next next2" onclick="next2()">＞</button>
                        </div>
                    </div>
                    <div class="card d-none card3">
                        <div class="card-body d-flex">
                            <button type="button" class="btn btn-info prev prev2" onclick="prev2()">＜</button>
                            <div class="content">
                                <h4 class="card-title">${result.records.location[i].locationName}</h4>
                                <p   class="card-text">${result.records.location[i].weatherElement[2].time[2].startTime}</p>
                                <p   class="card-text">${result.records.location[i].weatherElement[2].time[2].endTime}</p>
                                <p   class="card-text">${result.records.location[i].weatherElement[0].time[2].parameter.parameterName}</p>
                                <p   class="card-text">降雨機率: ${result.records.location[i].weatherElement[1].time[2].parameter.parameterName}%</p>
                                <p   class="card-text">${result.records.location[i].weatherElement[2].time[2].parameter.parameterName}度-
                                                       ${result.records.location[i].weatherElement[4].time[2].parameter.parameterName}度</p>
                                <p   class="card-text">${result.records.location[i].weatherElement[3].time[2].parameter.parameterName}</p>
                            </div>
                        </div>
                    </div>
                </div><br>`
    }

    document.querySelector(".all").innerHTML = str;
}).catch(function(err) {
    // 錯誤處理
});


function next1(){
    $(".card1").addClass("d-none")
    $(".card2").removeClass("d-none")
    // alert(this);
}
// $(".next1").click(function(){
//     console.log($(this).html())
// })
function next2(){
    $(".card2").addClass("d-none")
    $(".card3").removeClass("d-none")
}
function prev2(){
    $(".card3").addClass("d-none")
    $(".card2").removeClass("d-none")
}
function prev1(){
    $(".card2").addClass("d-none")
    $(".card1").removeClass("d-none")
}

