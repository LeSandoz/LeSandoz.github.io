let map;
let marker = [];
let position = [];
let infowindow = [];
let currentInfoWindow = ''; //Global variable   
// console.log(position)
fetch('https://raw.githubusercontent.com/kiang/pharmacies/master/json/points.json')
.then(res => {
    // 處理 response
    return res.json();
}).then(result => {
    // console.log(result.features.length)
    // console.log("名稱: " + result.features[0].properties.name)
    // console.log("地址: " + result.features[0].properties.address)
    // console.log("成人口罩數量: " + result.features[0].properties.mask_adult)
    // console.log("兒童口罩數量" + result.features[0].properties.mask_child)
    // console.log("lng: " + result.features[0].geometry.coordinates[0])
    // console.log("lat: " + result.features[0].geometry.coordinates[1])
    for(let i = 0; i < result.features.length; i++){
        let title   = result.features[i].properties.name + "\n"
                    + result.features[i].properties.address + "\n"
                    + "成人口罩數量: " + result.features[i].properties.mask_adult + "\n"
                    + "兒童口罩數量: " + result.features[i].properties.mask_child + "\n"

        let content = ` <div style="font-family:'微軟正黑體';">
                          <h2><i class="fa fa-hospital-o" aria-hidden="true"></i> ${result.features[i].properties.name}</h2>
                          <hr>
                          <div class="">
                            <div class="mb-2"><i class="fa fa-map-marker" aria-hidden="true"></i> ${result.features[i].properties.address}</div>
                            <div class="mb-2"><i class="fa fa-phone" aria-hidden="true"></i></i> ${result.features[i].properties.phone}</div>
                            <div class="mb-2"><i class="fa fa-info" aria-hidden="true"></i></i> ${result.features[i].properties.note}</div>
                            <div class="mb-2"><i class="fa fa-clock-o" aria-hidden="true"></i></i> ${result.features[i].properties.updated}</div>
                          </div>
                          <hr>
                          <div class="d-flex"> 
                              <div class="p-2 mr-4 mask-box" style="background:rgb(245, 220, 187, 0.884); border-radius: 10px" onMouseOver="this.style.color='#00F';this.style.cursor='pointer'" onMouseOut="this.style.color='#000000';this.style.cursor='default'">
                                  <div><h5>成人口罩</h5></div>
                                  <div><h6>${result.features[i].properties.mask_adult}片</h6></div>
                              </div>       
                              <div class="p-2 mask-box" style="background:rgba(196, 236, 251, 0.89); border-radius: 10px" onMouseOver="this.style.color='#00F';this.style.cursor='pointer'" onMouseOut="this.style.color='#000000';this.style.cursor='default'">
                                  <div><h5>兒童口罩</h5></div>
                                  <div><h6>${result.features[i].properties.mask_child}片</h6></div>
                              </div>
   
                          </div>
                          <hr>
                          <div class="text-center">
                            <a href="https://www.google.com.tw/maps/search/${result.features[i].properties.name} ${result.features[i].properties.address}" target="_blank"><h6>前往Google地圖</h6></a>
                          </div>  
                        </div>`;
        position.push({title: title,
                       title1: content,
                       lat: result.features[i].geometry.coordinates[1],
                       lng: result.features[i].geometry.coordinates[0]})
    }
    let updateTime = result.features[0].properties.updated
    $(".update").text("最後更新時間: " + updateTime)
// console.log(position)

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
      zoom: 16,
      center: {
        lat: 24.9456985,
        lng: 121.3802776
      }
    });

    var marker1= new google.maps.Marker({
        map: map,
        position: {lat: 24.9456985, lng: 121.3802776},
        title: "Sunny"
    });
    var contentString = '<h1>123</h1>';
    


    // for (let i = 0; i < 30; i++) {
    for (let i = 0; i < position.length; i++) {
        marker[i] = new google.maps.Marker({
            position: {
              lat: position[i].lat,
              lng: position[i].lng
            },
            map: map,
            title: position[i].title,

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
    }

    // google.maps.event.addListener('center_changed',function(){
    //     for(let i = 0; i < infowindow.length; i++) {   
    //         infowindow[i].close();   
    //      }   
    // });


  }
  initMap();
//   function addMarker(e) {
//     marker[e] = new google.maps.Marker({
//       position: {
//         lat: position[e].lat,
//         lng: position[e].lng
//       },
//       map: map,
//       title: position[e].title,
//     });

//   }

}).catch(function(err) {
    // 錯誤處理
});



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

