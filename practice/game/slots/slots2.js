var color = ['都可','紅','橙','黃','綠','藍','靛','紫','黑','白','灰'];
var shape = ['都可','圓形','固體','方形','六角形','五角形','不規則','三角形','圓柱','液體','長條型'];
var locations = ['都可','廚房','廁所','辦公室','房間','客廳','陽台','體育場','室外','教室','學校'];
var fullname = ['何彥穎','王嘉禾','劉怡婷','方建哲','蔡亞筑','呂學承','蔡承璋','黃宣燁','曾文瑀','陳子秝'];
    $(document).on("click", ".button", function(){
        // for(let i = 0; i < 10; i++){
            var id1 = Math.round(Math.random()*(color.length - 1));
            var id2 = Math.round(Math.random()*(shape.length - 1));
            var id3 = Math.round(Math.random()*(locations.length - 1));
            var id4 = Math.round(Math.random()*(fullname.length - 1));

            // var name = $("#name").val();
            // console.log(id1);
            // console.log(id2);
            // console.log(id3);
            // console.log(id4);
            // console.log((fullname.length - 1));
            // console.log(fullname);
            if(fullname.length == 0){
                alert("已抽完")
            }else{
                $(".color").text(color[id1]);
                $(".shape").text(shape[id2]);
                $(".locations").text(locations[id3]);
                $(".fullname").text(fullname[id4]);
                // console.log(fullname[id4]);
                // $("#name option[value=" + name + "]").remove();
                document.querySelector("#box").innerHTML +=
                `   <tr>
                        <td>${fullname[id4]}</td>
                        <td>${color[id1]}</td>
                        <td>${shape[id2]}</td>
                        <td>${locations[id3]}</td>
                    </tr>
                `;
                fullname.splice($.inArray(fullname[id4],fullname),1);
    
                // console.log(fullname.length);
    
                document.querySelector(".fullnamebox").innerHTML =
                `人選:    ${fullname}
                `;
                document.querySelector(".fullcolorbox").innerHTML =
                `顏色:    ${color}
                `;
                document.querySelector(".fullshapebox").innerHTML =
                `形狀:    ${shape}
                `;
                document.querySelector(".fulllocationbox").innerHTML =
                `地點:   ${locations}
                `;
            }
           

        // }
        
    })

    $(document).on("click", ".reset", function(){
        fullname = ['何彥穎','王嘉禾','劉怡婷','方建哲','蔡亞筑','呂學承','蔡承璋','黃宣燁','曾文瑀','陳子秝'];
        document.querySelector(".fullnamebox").innerHTML =
        `   ${fullname}
        `;
        document.querySelector("#box").innerHTML =
        `   
        `;
        $(".color").text('???');
        $(".shape").text('???');
        $(".locations").text('???');
        $(".fullname").text('???');
    })

