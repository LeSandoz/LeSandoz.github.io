var map;

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 16,
    center: {
      lat: 25.033090,
      lng: 121.563438
    }
  });

  var heatmap = new google.maps.visualization.HeatmapLayer({
    map: map,
    data: [
      new google.maps.LatLng(25.033090, 121.563438),
      new google.maps.LatLng(25.033261, 121.563540),
      new google.maps.LatLng(25.033025, 121.563331),
      new google.maps.LatLng(25.033065, 121.563696),
      new google.maps.LatLng(25.033364, 121.563419),
      new google.maps.LatLng(25.032099, 121.561341),
      new google.maps.LatLng(25.032021, 121.562895),
      new google.maps.LatLng(25.031958, 121.558931),
      new google.maps.LatLng(25.031248, 121.558455),
      new google.maps.LatLng(25.032119, 121.560154),
      new google.maps.LatLng(25.035347, 121.559460),
      new google.maps.LatLng(25.035095, 121.557516)
    ],
    radius:65

  });
}