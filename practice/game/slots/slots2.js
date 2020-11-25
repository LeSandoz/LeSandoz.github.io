var color = ['紅','橙','黃','綠','藍','靛','紫','黑','白','灰'];
var shape = ['圓形','固體','方形','六角形','五角形','不規則','三角形','圓柱','液體','長條型'];
var locations = ['廚房','廁所','辦公室','房間','客廳','陽台','運動','室外'];
$(document).on("click", ".button", function(){
    var id1 = Math.ceil(Math.random()*(color.length - 1));
    var id2 = Math.ceil(Math.random()*(shape.length - 1));
    var id3 = Math.ceil(Math.random()*(locations.length - 1));
    var name = $("#name").val();
    console.log(id1);
    console.log(id2);
    console.log(id3);
    console.log(name);
    $(".color").text(color[id1]);
    $(".shape").text(shape[id2]);
    $(".locations").text(locations[id3]);

    document.querySelector("#box").innerHTML +=
    `   <tr>
            <td>${name}</td>
            <td>${color[id1]}</td>
            <td>${shape[id2]}</td>
            <td>${locations[id3]}</td>
        </tr>
    `
})