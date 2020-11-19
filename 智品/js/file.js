let sendButton = document.querySelector('button');
let today = new Date();
let datetime = today.getFullYear()+ "/" + (today.getMonth()+1) + "/" + today.getDate() + " " + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
const cors = 'https://cors-anywhere.herokuapp.com/'; // use cors-anywhere to fetch api data
function send() {
    let lastName = document.querySelector('#lastName').value;
    let firstName = document.querySelector('#firstName').value;
    let email = document.querySelector('#email').value;
    let phone = document.querySelector('#phone').value;
    let projectName = document.querySelector('#projectName').value;
    let projectDescription = document.querySelector('#projectDescription').value;
    // console.log(datetime);
    // console.log(lastName);
    // console.log(firstName);
    // console.log(email);
    // console.log(phone);
    // console.log(projectName);
    // console.log(projectDescription);
        // alert("已新增")
        $.ajax({
            url: "https://cors-anywhere.herokuapp.com/https://script.google.com/macros/s/AKfycbxEvc31hr02NnMuMDpgHeCQRIy-gOe0VaiXrKxBlqs1ACnflH6o/exec",
            data: {
                "time": datetime,
                "lastName": lastName,
                "firstName": firstName,
                "email": email,
                "phone": phone,
                "projectName": projectName,
                "projectDescription": projectDescription
            },
            success: function(response) {
                console.log(response)
              if(response == "成功"){
                alert("成功");
              }
            },
          });

        };
        
        sendButton.addEventListener('click', send);
