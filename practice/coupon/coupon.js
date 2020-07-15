const cors = 'https://cors-anywhere.herokuapp.com/'; // use cors-anywhere to fetch api data
const url = 'https://quality.data.gov.tw/dq_download_json.php?nid=127751&md5_url=ff02dedeecfbc115c19dd0dd37db17f4'; // origin api url
let map;
let marker = [];
let markers = [];
let position = [];
let infowindow = [];
let total = [];
let currentInfoWindow = ''; //Global variable  
/** fetch api url by cors-anywhere */
axios.get(`${cors}${url}`)
  .then((response) => {
    // console.log(response.data)
    // console.log(response.data[0].storeNm)
    // console.log(response.data[0].addr)
    // console.log(response.data[0].latitude)
    // console.log(response.data[0].longitude)
    // console.log(response.data[0].tel)
    // console.log(response.data[0].total)
    // console.log(response.data[0].updateTime)
    for(let i = 0; i < response.data.length; i++){
        total.push(response.data[i].total)
        let title   = response.data[i].storeNm + "\n"
                    + response.data[i].addr + "\n"
                    + "電話: " + response.data[i].tel + "\n"
                    + "三倍券剩餘數量: " + response.data[i].total + "\n";
        let content = ` <div style="font-family:'微軟正黑體';">
                            <h3><i class="fa fa-hospital-o" aria-hidden="true"></i> ${response.data[i].storeNm}</h3>
                            <hr>
                            <div class="">
                            <div class="mb-2"><i class="fa fa-map-marker" aria-hidden="true"></i> ${response.data[i].addr}</div>
                            <div class="mb-2"><i class="fa fa-phone" aria-hidden="true"></i></i> ${response.data[i].tel}</div>
                            <div class="mb-2"><i class="fa fa-info" aria-hidden="true"></i></i>  ${response.data[i].busiTime}</div>
                            <div class="mb-2"><i class="fa fa-clock-o" aria-hidden="true"></i></i>更新時間: ${response.data[i].updateTime}</div>
                            </div>
                            <hr>
                            <div class="d-flex"> 
                                <div class="p-2 mr-4 mask-box" style="background:rgb(245, 220, 187, 0.884); border-radius: 10px; width: 300px" onMouseOver="this.style.color='#00F';this.style.cursor='pointer'" onMouseOut="this.style.color='#000000';this.style.cursor='default'">
                                    <div class="text-center"><h6>三倍券剩餘數量: ${response.data[i].total}份</h6></div>
                                </div>       
                            </div>
                            <hr>
                            <div class="text-center">
                            <a href="https://www.google.com.tw/maps/search/${response.data[i].storeNm} ${response.data[i].addr}" target="_blank"><h6>前往Google地圖</h6></a>
                            </div>  
                        </div>`;
        position.push({
                       title: title,
                       title1: content,
                       lat: parseFloat(response.data[i].latitude),
                       lng: parseFloat(response.data[i].longitude)})
                     
    }
    // console.log(total)

    // console.log(position[0].lat)  
    function initMap() { 
      var sunny = new google.maps.LatLng(24.9456985, 121.3802776);   
          
      if(window.navigator.geolocation){   
          var geolocation = window.navigator.geolocation;   
          console.log(window.navigator.geolocation);   
          geolocation.getCurrentPosition(getPositionSuccess);   
      }else{   
          alert("你的瀏覽器不支援地理定位");   
          console.log("你的瀏覽器不支援地理定位");   
          map.setCenter(sunny);   
      }   
      function getPositionSuccess(position){   
          initialLocation = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);   
          //定位到目前位置   
          map.setCenter(initialLocation);   
          console.log("IN啦");   
          console.log(window.navigator.geolocation);   
  
      }  
        map = new google.maps.Map(document.getElementById('map'), {
            zoom: 15,
            center: {
              lat: 24.9456985,
              lng: 121.3802776
            },
            styles:[],
            hideStyle: [{
              featureType: 'poi.business',
              stylers: [{
                visibility: 'off'
              }]
            }]
          });
        //   var marker1= new google.maps.Marker({
        //       map: map,
        //       position: {lat: 24.9456985, lng: 121.3802776},
        //       title: "Sunny"
        //   });
          
      
      
          // for (let i = 0; i < 30; i++) {
          for (let i = 0; i < position.length; i++) {
              marker[i] = new google.maps.Marker({
                  position: {
                    lat: position[i].lat,
                    lng: position[i].lng
                  },
                //   icon: './images/post-office.png',
                  map: map,
                  title: position[i].title,
                //   content: `<img src="./images/post-office.png">`
                });
      
              infowindow[i] = new google.maps.InfoWindow({
                  content: position[i].title1,
                  position: {
                      lat: position[i].lat,
                      lng: position[i].lng
                  },
                  maxWidth: 280,
                  pixelOffset: new google.maps.Size(100, -20) 
              });
              // infowindow.open(map);
              // console.log(infowindow)
              marker[i].addListener('click',function(){
                  currentInfoWindow = infowindow[i]
                  // console.log(infowindow.length)
                  for(let i = 0; i < infowindow.length; i++) {   
                      infowindow[i].close();   
                   }   
                  // console.log(currentInfoWindow)
                  currentInfoWindow.open(map,marker[i]);
              });
            //   var markerCluster = new MarkerClusterer(map, marker,{imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'}); //點聚合
            //   var markerCluster = new MarkerClusterer(map, marker);
          }
      
      
      
      
        }
      initMap();
  },
    (error) => {
    }
  );



// let myHeaders = new Headers({
//     'Access-Control-Allow-Origin': 'https://cors-anywhere.herokuapp.com/',
//     'Content-Type': 'text/plain'
// });

// fetch('https://quality.data.gov.tw/dq_download_json.php?nid=127751&md5_url=ff02dedeecfbc115c19dd0dd37db17f4'

//      ,{ method: 'GET',
//         headers: myHeaders,
//         mode: 'cors'}
//         )
// .then(res => {
//     // 處理 response
//     return res.json();
// }).then(result => {
//    console.log(result)
// }).catch(function(err) {
//     // 錯誤處理
// });


$(document).on("click",".left-arrow", function(){
    // console.log(123)
    $(".side-bar").css("width", 0)
    $(".update").addClass("d-none")
    $(".left-arrow").addClass("d-none")
    $(".back").removeClass("d-none")
})
$(document).on("click",".back", function(){
    // console.log(123)
    $(".side-bar").css("width", "24%")
    $(".update").removeClass("d-none")
    $(".left-arrow").removeClass("d-none")
    $(".back").addClass("d-none")
})

//   center: {lat: 24.9456985, lng: 121.3802776}

