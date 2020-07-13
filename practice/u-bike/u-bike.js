let myHeaders = new Headers({
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'text/plain'
});

fetch('https://script.googleusercontent.com/macros/echo?user_content_key=C1hU2sDZcxImNfhKczMdiZwsxixRD4IfRPmoNXAkNr1_9meUzCw6sT1BvRavQXG01hH5i5Ky0bqoglGD9EdUSg3q8_t21uaPOJmA1Yb3SEsKFZqtv3DaNYcMrmhZHmUMWojr9NvTBuBLhyHCd5hHa2nCQdzj0xaveqj_aTMGhcOgACOoWSznLeycE0b6pUjYUSBIj_zmygdTizpQPW66RJmYY5VWNeg0SXadqjNzSGMoMmxOzy6jE9XbhKgcWebsKkourV1Kaoz58c6zYdGFC3PMXlJAeqAFrEwo82IiTMAixelIRi4nAMaNHffJA7gmOx5xLD8uBuDznnLJsP_IYY6Yu90O9CkL&lib=MU7uPymDDbcE3lDdK1Ircj_pRVCifQbmI')
// fetch('http://data.ntpc.gov.tw/​/api​/datasets​/2924FBE5-852F-46F4-A829-45BECD75EFF5​/json')
.then(res => {
    // 處理 response
    return res.json();
}).then(result => {
    let str = '';
    let list = document.querySelector('.table_list');
    let arrLength = 10;
    for(let i = 0; i < arrLength; i++){
        str += `    <tr data-lat="${result[i].lat}" data-lng="${result[i].lng}">
                        <td class="sno">${result[i].sno}</td>
                        <td class="sna">${result[i].sna}</td>
                        <td class="tot">${result[i].tot}</td>
                        <td class="sbi">${result[i].sbi}</td>
                        <td class="ar">${result[i].ar}</td>
                        <td class="bemp">${result[i].bemp}</td>
                    </tr>`
    }
    list.innerHTML = str;
    console.log(result)
    $(document).on("click", ".more", function(){
        arrLength += 10;
        str = '';
        for(let i = 0; i < arrLength; i++){
            str += `    <tr data-lat="${result[i].lat}" data-lng="${result[i].lng}">
                            <td class="sno">${result[i].sno}</td>
                            <td class="sna">${result[i].sna}</td>
                            <td class="tot">${result[i].tot}</td>
                            <td class="sbi">${result[i].sbi}</td>
                            <td class="ar">${result[i].ar}</td>
                            <td class="bemp">${result[i].bemp}</td>
                        </tr>`
        }
    list.innerHTML = str;
    // console.log(arrLength)
    $(".table_list tr").on("click",function(){
        lat = $(this).attr("data-lat")
        lng = $(this).attr("data-lng")
        console.log(lat)
        console.log(lng)
        window.location.href = "https://www.google.com.tw/maps/search/" + lat + "," + lng;
    })
    })
    // console.log(nameArr)
    // console.log(latArr)
    // console.log(lngArr)
    // console.log(locArr)
    // console.log(arrLength)
    $(".table_list tr").on("click",function(){
        lat = $(this).attr("data-lat")
        lng = $(this).attr("data-lng")
        console.log(lat)
        console.log(lng)
        window.location.href = "https://www.google.com.tw/maps/search/" + lat + "," + lng;
    })
}).catch(function(err) {
    // 錯誤處理
});