let myHeaders = new Headers({
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'text/plain'
});

fetch('https://opendata.cwb.gov.tw/fileapi/v1/opendataapi/F-D0047-071?Authorization=CWB-71F9B3C8-BE49-4FEB-B532-A91C68CC01D4&downloadType=WEB&format=JSON')
.then(res => {
    // 處理 response
    return res.json();
}).then(result => {
    let str = ''
    let update = result.cwbopendata.dataset.datasetInfo.update
    let locationsCounty = result.cwbopendata.dataset.locations.locationsName
    // console.log(result.cwbopendata.dataset.datasetInfo.datasetDescription)
    // console.log("起始時間: " + result.cwbopendata.dataset.datasetInfo.validTime.startTime)
    // console.log("結束時間: " + result.cwbopendata.dataset.datasetInfo.validTime.endTime)
    // console.log("更新時間: " + result.cwbopendata.dataset.datasetInfo.update)
    // console.log("縣市: " + result.cwbopendata.dataset.locations.locationsName)
    // for(let n = 0; n < 13; n++){
    //     console.log(result.cwbopendata.dataset.locations.location[n].locationName)
        let n = 0;
        $(document).on("change", "#county", function(){
            n = $("#county").val()
            console.log(n)
        })
        // console.log("鄉鎮市區: " + result.cwbopendata.dataset.locations.location[n].locationName)
        // console.log("緯度: " + result.cwbopendata.dataset.locations.location[n].lat)
        // console.log("經度: " + result.cwbopendata.dataset.locations.location[n].lon)
        let jsonData = result.cwbopendata.dataset.locations.location[n] //共用變數
        let locationName = jsonData.locationName//地區
        let lat = jsonData.lat//緯度
        let lon = jsonData.lon//精度
        let startTime = result.cwbopendata.dataset.datasetInfo.validTime.startTime.substr(5,5)
        let endTime = result.cwbopendata.dataset.datasetInfo.validTime.endTime.substr(5,5)
        // console.log(startTime)
        // console.log(endTime)
        // for(let j = 0; j < 15; j++){
            // console.log(result.cwbopendata.dataset.locations.location[n].weatherElement[j].description)
            description = jsonData.weatherElement[0].description
            for(let i = 0; i < 14; i++){
                let startTime = jsonData.weatherElement[0].time[i].startTime.substr(5,11).replace("T","\n\n\n\n ").replace("-","/")
                let endTime = jsonData.weatherElement[0].time[i].endTime.substr(5,11).replace("T","\n\n\n\n ").replace("-","/")
                str += `<tr>
                            <td>${locationName}</td>
                            <td>${jsonData.weatherElement[0].time[i].elementValue.value}度</td>
                            <td>${jsonData.weatherElement[1].time[i].elementValue.value}度</td>
                            <td>${jsonData.weatherElement[2].time[i].elementValue.value}%</td>
                            <td>${jsonData.weatherElement[9].time[i].elementValue.value}%</td>
                            <td>${jsonData.weatherElement[12].time[i].elementValue[0].value}</td>
                            <td>${startTime} ~ ${endTime}</td>
                        </tr>`
                // console.log(jsonData.weatherElement[13].time[i].elementValue[1].value)
                // <td>${jsonData.weatherElement[13].time[i].elementValue[0].value}</td>
            }
            // for(let i = 0; i < 14; i++){
  
                // if(j == 0){//平均溫度
                //     startTime = jsonData.weatherElement[j].time[i].startTime
                //     endTime = jsonData.weatherElement[j].time[i].endTime
                //     value1 = jsonData.weatherElement[j].time[i].elementValue.value +'度'
                // }else if(j == 1){//平均露點溫度
                //     startTime = jsonData.weatherElement[j].time[i].startTime
                //     endTime = jsonData.weatherElement[j].time[i].endTime
                //     value1 = jsonData.weatherElement[j].time[i].elementValue.value +'度'
                // }else if(j == 2){//平均相對濕度
                //     startTime = jsonData.weatherElement[j].time[i].startTime
                //     endTime = jsonData.weatherElement[j].time[i].endTime
                //     value2 = jsonData.weatherElement[j].time[i].elementValue.value +'%'
                // }else if(j == 3){//最高溫度
                //     startTime = jsonData.weatherElement[j].time[i].startTime
                //     endTime = jsonData.weatherElement[j].time[i].endTime
                //     value3 = jsonData.weatherElement[j].time[i].elementValue.value +'度'
                // }else if(j == 4){//最低溫度
                //     startTime = jsonData.weatherElement[j].time[i].startTime
                //     endTime = jsonData.weatherElement[j].time[i].endTime
                //     value4 = jsonData.weatherElement[j].time[i].elementValue.value
                //     // str += `<tr><td>${locationName}</td><td>${value4} - ${value3}</td>`
                // }else if(j == 5){//最高體感溫度
                //     startTime = jsonData.weatherElement[j].time[i].startTime
                //     endTime = jsonData.weatherElement[j].time[i].endTime
                //     value5 = jsonData.weatherElement[j].time[i].elementValue.value +'度'
                // }else if(j == 6){//最低體感溫度
                //     startTime = jsonData.weatherElement[j].time[i].startTime
                //     endTime = jsonData.weatherElement[j].time[i].endTime
                //     value6 = jsonData.weatherElement[j].time[i].elementValue.value +'度'
                // str += `<tr><td>${locationName}</td><td>${value4} - ${value3}</td><td>${value6} - ${value3}</td><td>${value2}</td>`
                // }else if(j == 7){//最大舒適度指數
                //     startTime = jsonData.weatherElement[j].time[i].startTime
                //     endTime = jsonData.weatherElement[j].time[i].endTime
                //     value7 = jsonData.weatherElement[j].time[i].elementValue.value +'%'
                // }else if(j == 8){//最小舒適度指數
                //     startTime = jsonData.weatherElement[j].time[i].startTime
                //     endTime = jsonData.weatherElement[j].time[i].endTime
                //     value8 = jsonData.weatherElement[j].time[i].elementValue.value +'%'
                // }else if(j == 9){//12小時降雨機率
                //     startTime = jsonData.weatherElement[j].time[i].startTime
                //     endTime = jsonData.weatherElement[j].time[i].endTime
                //     value9 = jsonData.weatherElement[j].time[i].elementValue.value +'%'

                // }else if(j == 10){//風向
                //     startTime = jsonData.weatherElement[j].time[i].startTime
                //     endTime = jsonData.weatherElement[j].time[i].endTime
                //     value10 = jsonData.weatherElement[j].time[i].elementValue.value
                // }else if(j == 11){//最大風速
                //     startTime = jsonData.weatherElement[j].time[i].startTime
                //     endTime = jsonData.weatherElement[j].time[i].endTime
                //     value11 = jsonData.weatherElement[j].time[i].elementValue[0].value +'公尺/秒'
                // }else if(j == 12){//天氣現象
                //     startTime = jsonData.weatherElement[j].time[i].startTime
                //     endTime = jsonData.weatherElement[j].time[i].endTime
                //     value12 = jsonData.weatherElement[j].time[i].elementValue[0].value
                // }else if(j == 13){//紫外獻指數
                //     if(i < 7){
                //         startTime = jsonData.weatherElement[j].time[i].startTime
                //         endTime = jsonData.weatherElement[j].time[i].endTime
                //         value13 = jsonData.weatherElement[j].time[i].elementValue[0].value +'級 : ' 
                //                 + jsonData.weatherElement[j].time[i].elementValue[1].value
                //     }else{
                //         value13 = "查無資料"
                //     }

                // }else if(j == 14){//天氣預報綜合描述
                //     startTime = jsonData.weatherElement[j].time[i].startTime
                //     endTime = jsonData.weatherElement[j].time[i].endTime
                //     value14 = jsonData.weatherElement[j].time[i].elementValue.value
                    
                // }
                // // str += `<tr>
                // //             <td>${locationName}</td>
                // //             <td>${value4} - ${value3}</td>
                // //             <td>${value6} - ${value5}</td>
                // //             <td>${value2}</td>
                // //             <td>${value9}</td>
                // //             <td>${value12}</td>
                // //             <td>${value13}</td>
                // //         </tr>`

                // if(j == 0 || j == 1 || j == 3 || j == 4 || j == 5 || j == 6){
                //     // console.log(result.cwbopendata.dataset.locations.location[n].weatherElement[j].time[i].startTime)
                //     // console.log(result.cwbopendata.dataset.locations.location[n].weatherElement[j].time[i].endTime)
                //     // console.log(result.cwbopendata.dataset.locations.location[n].weatherElement[j].time[i].elementValue.value +'度')
                //     startTime = jsonData.weatherElement[j].time[i].startTime
                //     endTime = jsonData.weatherElement[j].time[i].endTime
                //     value1 = jsonData.weatherElement[j].time[i].elementValue.value +'度'
                // }else if(j == 2 || j == 7 || j == 8 || j == 9){
                //     // console.log(result.cwbopendata.dataset.locations.location[n].weatherElement[j].time[i].startTime)
                //     // console.log(result.cwbopendata.dataset.locations.location[n].weatherElement[j].time[i].endTime)
                //     // console.log(result.cwbopendata.dataset.locations.location[n].weatherElement[j].time[i].elementValue.value +'%')
                //     startTime = jsonData.weatherElement[j].time[i].startTime
                //     endTime = jsonData.weatherElement[j].time[i].endTime
                //     value2 = jsonData.weatherElement[j].time[i].elementValue.value +'%'
                // }else if(j == 11){
                //     // console.log(result.cwbopendata.dataset.locations.location[n].weatherElement[j].time[i].startTime)
                //     // console.log(result.cwbopendata.dataset.locations.location[n].weatherElement[j].time[i].endTime)
                //     // console.log(result.cwbopendata.dataset.locations.location[n].weatherElement[j].time[i].elementValue[0].value + '公尺/秒')
                //     // console.log(result.cwbopendata.dataset.locations.location[n].weatherElement[j].time[i].elementValue[1].value+'蒲福風級')
                //     startTime = jsonData.weatherElement[j].time[i].startTime
                //     endTime = jsonData.weatherElement[j].time[i].endTime
                //     value3 = jsonData.weatherElement[j].time[i].elementValue[0].value +'公尺/秒'
                // }else if(j == 12){
                //     // console.log(result.cwbopendata.dataset.locations.location[n].weatherElement[j].time[i].startTime)
                //     // console.log(result.cwbopendata.dataset.locations.location[n].weatherElement[j].time[i].endTime)
                //     // console.log(result.cwbopendata.dataset.locations.location[n].weatherElement[j].time[i].elementValue[0].value)
                //     startTime = jsonData.weatherElement[j].time[i].startTime
                //     endTime = jsonData.weatherElement[j].time[i].endTime
                //     value4 = jsonData.weatherElement[j].time[i].elementValue[0].value
                // }else if(j == 13){
                //     if(i < 7){
                //         // console.log(result.cwbopendata.dataset.locations.location[n].weatherElement[j].time[i].startTime)
                //         // console.log(result.cwbopendata.dataset.locations.location[n].weatherElement[j].time[i].endTime)
                //         // console.log(result.cwbopendata.dataset.locations.location[n].weatherElement[j].time[i].elementValue[0].value + '級')
                //         // console.log(result.cwbopendata.dataset.locations.location[n].weatherElement[j].time[i].elementValue[1].value)
                //         startTime = jsonData.weatherElement[j].time[i].startTime
                //         endTime = jsonData.weatherElement[j].time[i].endTime
                //         value5 = jsonData.weatherElement[j].time[i].elementValue[0].value +'級 : ' + 
                //                 jsonData.weatherElement[j].time[i].elementValue[1].value
                //     }else{
                //         // console.log("查無資料")
                //         value = "查無資料"
                //     }
                // }else if(j == 10 || j == 14){
                //     // console.log(result.cwbopendata.dataset.locations.location[n].weatherElement[j].time[i].startTime)
                //     // console.log(result.cwbopendata.dataset.locations.location[n].weatherElement[j].time[i].endTime)
                //     // console.log(result.cwbopendata.dataset.locations.location[n].weatherElement[j].time[i].elementValue.value)
                //     startTime = jsonData.weatherElement[j].time[i].startTime
                //     endTime = jsonData.weatherElement[j].time[i].endTime
                //     value = jsonData.weatherElement[j].time[i].elementValue.value
                // }
            // }
        // }

    // }
    document.querySelector("tbody").innerHTML = str;
    

    
    // console.log(result.cwbopendata.dataset.locations.location[0].weatherElement[2].description)
    // for(let i = 0; i < 14; i++){
    //     console.log("起始時間: " + result.cwbopendata.dataset.locations.location[0].weatherElement[2].time[i].startTime)
    //     console.log("結束時間: " + result.cwbopendata.dataset.locations.location[0].weatherElement[2].time[i].endTime)
    //     console.log("平均相對濕度: " + result.cwbopendata.dataset.locations.location[0].weatherElement[2].time[i].elementValue.value + '%')
    // }
    // console.log(result.cwbopendata.dataset.locations.location[0].weatherElement[3].description)
    // for(let i = 0; i < 14; i++){
    //     console.log("起始時間: " + result.cwbopendata.dataset.locations.location[0].weatherElement[3].time[i].startTime)
    //     console.log("結束時間: " + result.cwbopendata.dataset.locations.location[0].weatherElement[3].time[i].endTime)
    //     console.log("最高溫度: " + result.cwbopendata.dataset.locations.location[0].weatherElement[3].time[i].elementValue.value + '度')
    // }
    // console.log(result.cwbopendata.dataset.locations.location[0].weatherElement[3].description)
    // for(let i = 0; i < 14; i++){
    //     console.log("起始時間: " + result.cwbopendata.dataset.locations.location[0].weatherElement[4].time[i].startTime)
    //     console.log("結束時間: " + result.cwbopendata.dataset.locations.location[0].weatherElement[4].time[i].endTime)
    //     console.log("最低溫度: " + result.cwbopendata.dataset.locations.location[0].weatherElement[4].time[i].elementValue.value + '度')
    // }
    // console.log(result.cwbopendata.dataset.locations.location[0].weatherElement[3].description)
    // for(let i = 0; i < 14; i++){
    //     console.log("起始時間: " + result.cwbopendata.dataset.locations.location[0].weatherElement[5].time[i].startTime)
    //     console.log("結束時間: " + result.cwbopendata.dataset.locations.location[0].weatherElement[5].time[i].endTime)
    //     console.log("最高體感溫度: " + result.cwbopendata.dataset.locations.location[0].weatherElement[5].time[i].elementValue.value + '度')
    // }
    // console.log(result.cwbopendata.dataset.locations.location[0].weatherElement[3].description)
    // for(let i = 0; i < 14; i++){
    //     console.log("起始時間: " + result.cwbopendata.dataset.locations.location[0].weatherElement[6].time[i].startTime)
    //     console.log("結束時間: " + result.cwbopendata.dataset.locations.location[0].weatherElement[6].time[i].endTime)
    //     console.log("最低體感溫度: " + result.cwbopendata.dataset.locations.location[0].weatherElement[6].time[i].elementValue.value + '度')
    // }
}).catch(function(err) {
    // 錯誤處理
});


