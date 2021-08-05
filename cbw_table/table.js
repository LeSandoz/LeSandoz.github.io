
fetch("https://spreadsheets.google.com/feeds/list/1f-58F5BqrVzCZnZoenD3PFRezsp-jy0pFDLYbgHnGoM/od6/public/values?alt=json")
.then(res => {
    return res.json();
}).then(result => {
//   console.log(result)
//   console.log(result.feed.entry.length)
//   console.log(result.feed.entry[0].gsx$稽查日期.$t)
  let content = ''
  let option = ''
  let num = result.feed.entry.length
  let row_number = parseInt($('.row_number').val())
  let f_num = 0;
  let total_num = parseInt(row_number + f_num);
  console.log(row_number)

  //單頁顯示筆數之function
  $(document).on('change', '.row_number', function(){
    row_number = parseInt($('.row_number').val());
    total_num = parseInt(row_number + f_num);
    console.log(row_number)
    content = ''
    option = ''
    for(let i = f_num; i < total_num; i++){
        //   j++
        let s_num = (result.feed.entry[i].gsx$序.$t)
        let date = (result.feed.entry[i].gsx$稽查日期.$t)
        let location = (result.feed.entry[i].gsx$行政區.$t)
        let project = (result.feed.entry[i].gsx$檢驗項目.$t)
        let type = (result.feed.entry[i].gsx$檢體分類.$t)
        let name = (result.feed.entry[i].gsx$檢體名稱.$t)
        let results = (result.feed.entry[i].gsx$查核結果.$t)
        // console.log(j);
        // console.log(location);
        // console.log(project);
    
        content += `
                        <tr align="center">
                            <td>
                                ${s_num}
                            </td>
                            <td>
                                ${date}
                            </td>
                            <td>
                                ${location}
                            </td>
                            <td>
                                ${project}
                            </td>
                            <td>
                                ${type}
                            </td>
                            <td>
                                ${name}
                            </td>
                            <td>
                                ${results}
                            </td>
                        </tr>
                    `
      
                    // <td>${breakfast}<br>早餐總熱量: ${totalBreakfastCalories}</td>
                    // <td>${lunch}<br>午餐總熱量: ${totalLLunchCalories}</td>
                    // <td>${dinner}<br>晚餐總熱量: ${totalDinnerCalories}</td>
                    // <td>${snack}<br>消夜總熱量: ${totalSnackCalories}</td>
    
        // console.log(contentHo);
        // console.log(LunchCalories);
        // console.log(totalCalories);
    }
    for(let j = 1; j <= num/row_number; j++){
        console.log(j)
        option +=`
                  <option>${j}</option>
        `
    }
      $('#now_page').text($('.now_page').val())
      document.querySelector("tbody").innerHTML = content;
      document.querySelector(".now_page").innerHTML = option;
      document.querySelector(".total").innerHTML = num; //總筆數
      document.querySelector(".pages").innerHTML = num/row_number; //總頁數
  })

  //切換頁數之function
  $(document).on('change', '.now_page', function(){
    f_num = $('.now_page').val() * 10 - 10
    total_num = parseInt(row_number + f_num);
    // console.log(total_num)
    content = ''
    for(let i = f_num; i < total_num; i++){
        //   j++
        let s_num = (result.feed.entry[i].gsx$序.$t)
        let date = (result.feed.entry[i].gsx$稽查日期.$t)
        let location = (result.feed.entry[i].gsx$行政區.$t)
        let project = (result.feed.entry[i].gsx$檢驗項目.$t)
        let type = (result.feed.entry[i].gsx$檢體分類.$t)
        let name = (result.feed.entry[i].gsx$檢體名稱.$t)
        let results = (result.feed.entry[i].gsx$查核結果.$t)
        // console.log(j);
        // console.log(location);
        // console.log(project);
    
        content += `
                        <tr align="center">
                            <td>
                                ${s_num}
                            </td>
                            <td>
                                ${date}
                            </td>
                            <td>
                                ${location}
                            </td>
                            <td>
                                ${project}
                            </td>
                            <td>
                                ${type}
                            </td>
                            <td>
                                ${name}
                            </td>
                            <td>
                                ${results}
                            </td>
                        </tr>
                    `
      
                    // <td>${breakfast}<br>早餐總熱量: ${totalBreakfastCalories}</td>
                    // <td>${lunch}<br>午餐總熱量: ${totalLLunchCalories}</td>
                    // <td>${dinner}<br>晚餐總熱量: ${totalDinnerCalories}</td>
                    // <td>${snack}<br>消夜總熱量: ${totalSnackCalories}</td>
    
        // console.log(contentHo);
        // console.log(LunchCalories);
        // console.log(totalCalories);
      }
      $('#now_page').text($('.now_page').val())
      document.querySelector("tbody").innerHTML = content;
      document.querySelector(".total").innerHTML = num; //總筆數
      document.querySelector(".pages").innerHTML = num/10; //總頁數
  }); 


  //剛進網站之function
  for(let i = f_num; i < total_num; i++){

    let s_num = (result.feed.entry[i].gsx$序.$t)
    let date = (result.feed.entry[i].gsx$稽查日期.$t)
    let location = (result.feed.entry[i].gsx$行政區.$t)
    let project = (result.feed.entry[i].gsx$檢驗項目.$t)
    let type = (result.feed.entry[i].gsx$檢體分類.$t)
    let name = (result.feed.entry[i].gsx$檢體名稱.$t)
    let results = (result.feed.entry[i].gsx$查核結果.$t)
    // console.log(j);
    // console.log(location);
    // console.log(project);
    content += `
                    <tr align="center">
                        <td>
                            ${s_num}
                        </td>
                        <td>
                            ${date}
                        </td>
                        <td>
                            ${location}
                        </td>
                        <td>
                            ${project}
                        </td>
                        <td>
                            ${type}
                        </td>
                        <td>
                            ${name}
                        </td>
                        <td>
                            ${results}
                        </td>
                    </tr>
                `
  }
  for(let j = 1; j <= num/10; j++){
      console.log(j)
      option +=`
                <option>${j}</option>
      `
  }
  document.querySelector("tbody").innerHTML = content;
  document.querySelector(".now_page").innerHTML = option;
  document.querySelector(".total").innerHTML = num; //總筆數
  document.querySelector(".pages").innerHTML = num/10; //總頁數


// console.log($(".totalCalories").text().replace("大卡",""))
}).catch(function(err) {

});

