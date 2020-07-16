let myHeaders = new Headers({
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'text/plain'
});
let county = '0';
navigator.geolocation.getCurrentPosition(function(position){
    var longitude = position.coords.longitude;
    var latitude = position.coords.latitude;
    if(longitude == ''){
        longitude = '25.0120044'
    }
    if(latitude == ''){
        latitude = '121.47683819999999'
    }
console.log(position)
fetch('https://maps.googleapis.com/maps/api/geocode/json?latlng='+ latitude +','+longitude +'&language=zh-TW&key=AIzaSyB1EXPTaik81zm1UqexR2dVf7_G3njtfSQ')
.then(res => {
    // 處理 response
    return res.json();
}).then(result => {
    county = result.results[0].address_components[1].long_name
    // console.log(county)




    fetch('https://opendata.cwb.gov.tw/fileapi/v1/opendataapi/F-D0047-071?Authorization=CWB-71F9B3C8-BE49-4FEB-B532-A91C68CC01D4&downloadType=WEB&format=JSON')
    .then(res => {
        // 處理 response
        return res.json();
    }).then(result => {
        let str = ''
        let update = result.cwbopendata.dataset.datasetInfo.update
        let locationsCounty = result.cwbopendata.dataset.locations.locationsName
        let n = 0;
        
        console.log(county)
        console.log($("#county").val())
        if(county =='板橋區'){
            n = 0
            $("#county").val(0)
        }else if(county =='三重區'){
            n = 1
            $("#county").val(1)
        }else if(county =='中和區'){
            n = 2
            $("#county").val(2)
        }else if(county =='永和區'){
            n = 3
            $("#county").val(3)
        }else if(county =='新莊區'){
            n = 4
            $("#county").val(4)
        }else if(county =='新店區'){
            n = 5
            $("#county").val(5)
        }else if(county =='樹林區'){
            n = 6
            $("#county").val(6)
        }else if(county =='鶯歌區'){
            n = 7
            $("#county").val(7)
        }else if(county =='三峽區'){
            n = 8
            $("#county").val(8)
        }else if(county =='淡水區'){
            n = 9
            $("#county").val(9)
        }else if(county =='汐止區'){
            n = 10
            $("#county").val(10)
        }else if(county =='瑞芳區'){
            n = 11
            $("#county").val(11)
        }else if(county =='土城區'){
            n = 12
            $("#county").val(12)
        }
        // console.log($("#county").text())
        // console.log(county)
        // $("#county").val(county)
        // console.log(result.cwbopendata.dataset.datasetInfo.datasetDescription)
        // console.log("起始時間: " + result.cwbopendata.dataset.datasetInfo.validTime.startTime)
        // console.log("結束時間: " + result.cwbopendata.dataset.datasetInfo.validTime.endTime)
        // console.log("更新時間: " + result.cwbopendata.dataset.datasetInfo.update)
        // console.log("縣市: " + result.cwbopendata.dataset.locations.locationsName)
        // for(let n = 0; n < 13; n++){
        //     console.log(result.cwbopendata.dataset.locations.location[n].locationName)
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
                        str += `<tr class="content">
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
                    str += `<tr class="content">
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

}).catch(function(err) {
    // 錯誤處理
});
})

