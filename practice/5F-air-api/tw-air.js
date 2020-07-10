let xhr = new XMLHttpRequest();
xhr.open('get','https://script.google.com/macros/s/AKfycbzl6KKgb4v2-F3SCVxVaXjnMwM_XQvnk2A08nw7NjmGfuRVmak0/exec?url=http://opendata2.epa.gov.tw/AQI.json', true);

xhr.send(null);
xhr.onload = () => {
    let CallBackData = JSON.parse(xhr.responseText);
    let CountyAry = [];
    let CountyList = document.querySelector('.CountyList');
    let PublishTime = document.querySelector('.PublishTime');
    let County = document.querySelector('.County');
    let table_list = document.querySelector('.table_list');
    let timeAry;
    let data = [];
    let optionValue;
    let SiteNameValue;

    for(let i=0; i<CallBackData.length; i++) {
        CountyAry.push(CallBackData[i].County);
        timeAry = CallBackData[i].PublishTime;
        data.push(CallBackData[i]);
    }

    let select = CountyAry.filter((item,key,arr) => {
        return arr.indexOf(item) === key;
    });
    for(let i=0; i<select.length; i++) {
        let option = document.createElement('option');
        option.value = select[i];
        option.innerText = select[i];
        CountyList.appendChild(option);
    }

    let datalist = () => {
        if(!optionValue) {
            optionValue = '基隆市';
            County.innerText = optionValue;
            PublishTime.innerText = timeAry + '更新';
        }
        let str = '';
        let selectStr = '';
        for(let i=0; i<data.length; i++) {
            if(optionValue === data[i].County) {
                let AQI = data[i].AQI;
                if (AQI !== '') {
                    str += `
                    <table class="table table-border region_table_list text-nowrap">
                        <thead>
                            <tr>
                                <td class="align-middle text-center region SiteName bg-white">${data[i].SiteName}</td>
                                <td class="align-middle text-center region_AQI  AQIcolor">${data[i].AQI}</td>
                            </tr>
                        </thead>
                    </table>
                        `;
                } else {
                    str += `
                    <table class="table table-border region_table_list text-nowrap">
                        <thead>
                            <tr>
                                <td class="align-middle text-center region SiteName bg-white">${data[i].SiteName}</td>
                                <td class="align-middle text-center region_AQI_null">${data[i].Status}</td>
                            </tr>
                        </thead>
                    </table>
                        `;
                }
                table_list.innerHTML = str;
                let AQIcolor = document.querySelectorAll('.AQIcolor');
                for(let j=0; j<AQIcolor.length; j++) {
                    let AQIText = AQIcolor[j].innerText;
                   if(AQIText <= 50) {
                    AQIcolor[j].setAttribute('style','background: #95F084;');
                   } else if (AQIText >= 51 && AQIText <= 100) {
                    AQIcolor[j].setAttribute('style','background: #FFE695;');
                   } else if (AQIText >= 101 && AQIText <= 150) {
                    AQIcolor[j].setAttribute('style','background: #FFAF6A;');
                   } else if (AQIText >= 151 && AQIText <= 200) {
                    AQIcolor[j].setAttribute('style','background: #FF5757;');
                   } else if (AQIText >= 201 && AQIText <= 300) {
                    AQIcolor[j].setAttribute('style','background: #9777FF;');
                   } else if (AQIText >= 301 && AQIText <= 400) {
                    AQIcolor[j].setAttribute('style','background: #AD1774;');
                   }
                }
            }
        }
    };
    datalist();

    let selectList = (e) => {
        optionValue = e.target.value;
        if ( optionValue === '請選擇地區') {return}
        County.innerText = optionValue;
        PublishTime.innerText = timeAry + '更新';
        datalist();
    };

    CountyList.addEventListener('click',selectList,false);

    let SiteName_select = document.querySelector('.SiteName_select');
    let AQI_select = document.querySelector('.AQI_select');
    let O3 = document.querySelector('.O3');
    let PM10 = document.querySelector('.PM10');
    let PM2 = document.querySelector('.PM2');
    let CO = document.querySelector('.CO');
    let SO2 = document.querySelector('.SO2');
    let NO2 = document.querySelector('.NO2');

    let dataSiteName = () => {
        if(!SiteNameValue) {
            SiteNameValue = '基隆';
        }
        for(let i=0; i<data.length; i++) {
            if(SiteNameValue === data[i].SiteName) {
                SiteName_select.innerText = data[i].SiteName;
                if(data[i].AQI === '') {
                    AQI_select.innerHTML = '';
                    O3.innerHTML = '';
                    PM10.innerHTML = '';
                    PM2.innerHTML = '';
                    CO.innerHTML = '';
                    SO2.innerHTML = '';
                    NO2.innerHTML = '';
                    AQI_select.setAttribute('style','background: none;');
                } else  {
                    AQI_select.innerHTML = data[i].AQI;
                    O3.innerHTML = data[i].O3;
                    PM10.innerHTML = data[i].PM10;
                    PM2.innerHTML = data[i]['PM2.5'];
                    CO.innerHTML = data[i].CO;
                    SO2.innerHTML = data[i].SO2;
                    NO2.innerHTML = data[i].NO2;

                    let AQIText = AQI_select.innerText;
                    if(AQIText <= 50) {
                     AQI_select.setAttribute('style','background: #95F084;');
                    } else if (AQIText >= 51 && AQIText <= 100) {
                     AQI_select.setAttribute('style','background: #FFE695;');
                    } else if (AQIText >= 101 && AQIText <= 150) {
                     AQI_select.setAttribute('style','background: #FFAF6A;');
                    } else if (AQIText >= 151 && AQIText <= 200) {
                     AQI_select.setAttribute('style','background: #FF5757;');
                    } else if (AQIText >= 201 && AQIText <= 300) {
                     AQI_select.setAttribute('style','background: #9777FF;');
                    } else if (AQIText >= 301 && AQIText <= 400) {
                     AQI_select.setAttribute('style','background: #AD1774;');
                    }
                }
            }

        }
    }
    dataSiteName();


    let Select_SiteName = (e) => {
        SiteNameValue = e.target.textContent;
        dataSiteName();
    }

    table_list.addEventListener('click', Select_SiteName, false);

}
