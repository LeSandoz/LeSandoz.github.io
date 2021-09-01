
fetch("https://spreadsheets.google.com/feeds/list/1CU8AXAttiS3CRLmf4wHDzRN0cNqeDHnJAGAjg_Mb274/od6/public/values?alt=json")
.then(res => {
    return res.json();
}).then(result => {
  console.log(result)
  console.log(result.feed.entry.length)
  console.log(result.feed.entry[0].gsx$稽查日期.$t)
  let content = ''
  let option = ''
  let num = result.feed.entry.length
  let row_number = parseInt($('.row_number').val())
  let f_num = 0;
  let total_num = parseInt(row_number + f_num);
  console.log(row_number)


  //剛進網站之function
  for(let i = f_num; i < total_num; i++){

    let s_num = (result.feed.entry[i].gsx$s_num.$t)
    let name = (result.feed.entry[i].gsx$name.$t)
    let account = (result.feed.entry[i].gsx$account.$t)
    let password = (result.feed.entry[i].gsx$password.$t)
    let attend = (result.feed.entry[i].gsx$attend.$t)

    console.log(name);
    console.log(account);
    // content += `
    //                 <tr align="center">
    //                     <td>
    //                         ${s_num}
    //                     </td>
    //                     <td>
    //                         ${date}
    //                     </td>
    //                     <td>
    //                         ${location}
    //                     </td>
    //                     <td>
    //                         ${project}
    //                     </td>
    //                     <td>
    //                         ${type}
    //                     </td>
    //                     <td>
    //                         ${name}
    //                     </td>
    //                     <td>
    //                         ${results}
    //                     </td>
    //                 </tr>
    //             `
  }

//   document.querySelector("tbody").innerHTML = content;
//   document.querySelector(".now_page").innerHTML = option;
//   document.querySelector(".total").innerHTML = num; //總筆數
//   document.querySelector(".pages").innerHTML = num/10; //總頁數


// console.log($(".totalCalories").text().replace("大卡",""))
}).catch(function(err) {

});



