




fetch("https://script.google.com/macros/s/AKfycbzl6KKgb4v2-F3SCVxVaXjnMwM_XQvnk2A08nw7NjmGfuRVmak0/exec?url=http://opendata2.epa.gov.tw/AQI.json")
.then(res => {
    return res.json();
}).then(result => {
    console.log(result)
}).catch(function(err) {

});