let map;
let marker = [];
let position = [];
let infowindow = [];

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
        let title = result.features[i].properties.name + "\n"
                  + result.features[i].properties.address + "\n"
                  + "成人口罩數量: " + result.features[i].properties.mask_adult + "\n"
                  + "兒童口罩數量: " + result.features[i].properties.mask_child + "\n"
        let content = title
        position.push({title: title,
                       lat: result.features[i].geometry.coordinates[1],
                       lng: result.features[i].geometry.coordinates[0]})
    }
    let updateTime = result.features[0].properties.updated
    $(".update").text("最後更新時間: " + updateTime)
console.log(position)

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
            content: position[i].title,
            position: {
                lat: position[i].lat,
                lng: position[i].lng
            },
            maxWidth: 200,
            pixelOffset: new google.maps.Size(100, -20) 
        });
        // infowindow.open(map);
        // console.log(infowindow)
        marker[i].addListener('click',function(){
            console.log(infowindow[i])
            infowindow[i].open(map,marker[i]);
        });
    }




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
    console.log(123)
    $(".side-bar").css("width", 0)
    $(".update").addClass("d-none")
    $(".left-arrow").addClass("d-none")
    $(".back").removeClass("d-none")
})
$(document).on("click",".back", function(){
    console.log(123)
    $(".side-bar").css("width", "20%")
    $(".update").removeClass("d-none")
    $(".left-arrow").removeClass("d-none")
    $(".back").addClass("d-none")
})





//   center: {lat: 24.9456985, lng: 121.3802776}

