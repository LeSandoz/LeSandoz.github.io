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
            let str = ''
            let jsonData = result.cwbopendata.dataset.locations //共用變數
            let locationName = jsonData.location[n].locationName//地區
            let lat = jsonData.location[n].lat//緯度
            let lon = jsonData.location[n].lon//精度
            let startTime = result.cwbopendata.dataset.datasetInfo.validTime.startTime.substr(5,5)
            let endTime = result.cwbopendata.dataset.datasetInfo.validTime.endTime.substr(5,5)
    
        
                for(let i = 0; i < 14; i++){
                    let startTime = jsonData.location[n].weatherElement[0].time[i].startTime.substr(5,11).replace("T","\n\n\n\n ").replace("-","/")
                    let endTime = jsonData.location[n].weatherElement[0].time[i].endTime.substr(5,11).replace("T","\n\n\n\n ").replace("-","/")
                    str += `<tr>
                                <td>${locationName}</td>
                                <td>${jsonData.location[n].weatherElement[0].time[i].elementValue.value}度</td>
                                <td>${jsonData.location[n].weatherElement[1].time[i].elementValue.value}度</td>
                                <td>${jsonData.location[n].weatherElement[2].time[i].elementValue.value}%</td>
                                <td>${jsonData.location[n].weatherElement[9].time[i].elementValue.value}%</td>
                                <td>${jsonData.location[n].weatherElement[12].time[i].elementValue[0].value}</td>
                                <td>${startTime} ~ ${endTime}</td>
                            </tr>`
            
                }
               
        document.querySelector("tbody").innerHTML = str;
        })
        let jsonData = result.cwbopendata.dataset.locations //共用變數
        let locationName = jsonData.location[n].locationName//地區
        let lat = jsonData.location[n].lat//緯度
        let lon = jsonData.location[n].lon//精度
        let startTime = result.cwbopendata.dataset.datasetInfo.validTime.startTime.substr(5,5)
        let endTime = result.cwbopendata.dataset.datasetInfo.validTime.endTime.substr(5,5)

    
            for(let i = 0; i < 14; i++){
                let startTime = jsonData.location[n].weatherElement[0].time[i].startTime.substr(5,11).replace("T","\n\n\n\n ").replace("-","/")
                let endTime = jsonData.location[n].weatherElement[0].time[i].endTime.substr(5,11).replace("T","\n\n\n\n ").replace("-","/")
                str += `<tr>
                            <td>${locationName}</td>
                            <td>${jsonData.location[n].weatherElement[0].time[i].elementValue.value}度</td>
                            <td>${jsonData.location[n].weatherElement[1].time[i].elementValue.value}度</td>
                            <td>${jsonData.location[n].weatherElement[2].time[i].elementValue.value}%</td>
                            <td>${jsonData.location[n].weatherElement[9].time[i].elementValue.value}%</td>
                            <td>${jsonData.location[n].weatherElement[12].time[i].elementValue[0].value}</td>
                            <td>${startTime} ~ ${endTime}</td>
                        </tr>`
        
            }
           
    document.querySelector("tbody").innerHTML = str;
}).catch(function(err) {
    // 錯誤處理
});


