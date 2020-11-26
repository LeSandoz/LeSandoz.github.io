// var color = ['隨便','紅','橙','黃','綠','藍','靛','紫','黑','白','灰'];
// var shape = ['氣體','球形','固體','方形','硬','軟','不規則','光滑','柱','液體','角錐','坑坑疤疤'];
// var locations = ['都可','廚房','廁所','辦公室','房間','客廳','陽台','健身房','室外','球場'];
// var fullname = ['何彥穎','王嘉禾','劉怡婷','方建哲','蔡亞筑','呂學承','蔡承璋','黃宣燁','曾文瑀','陳子秝'];
var color = [];
var shape = [];
var locations = [];
var fullname = [];
var fullname2 = [];
var i = '';

    $(document).on("click", ".add1", function(){   
        var nameText = $("#nameText").val();
        if(nameText == ''){
            alert("請輸入名字");
        }else{
            fullname.push(nameText);
            fullname2.push(nameText);
            document.querySelector(".fullnamebox").innerHTML =
            `人選:    ${fullname}
            `;
            $("#nameText").val('');
        }
    })
    $(document).on("click", ".add2", function(){
        var colorText = $("#colorText").val();
        if(colorText == ''){
            alert("請輸入顏色");
        }else{
            color.push(colorText);
            document.querySelector(".fullcolorbox").innerHTML =
            `顏色:    ${color}
            `;
            $("#colorText").val('');
        }
    })
    $(document).on("click", ".add3", function(){
        var shapeText = $("#shapeText").val();
        if(shapeText == ''){
            alert("請輸入形狀");
        }else{
            shape.push(shapeText);
            document.querySelector(".fullshapebox").innerHTML =
            `人選:    ${shape}
            `;
            $("#shapeText").val('');
        }
    })
    $(document).on("click", ".add4", function(){
        var locationText = $("#locationText").val();
        if(locationText == ''){
            alert("請輸入地點");
        }else{
            locations.push(locationText);
            document.querySelector(".fulllocationbox").innerHTML =
            `人選:    ${locations}
            `;
            $("#locationText").val('');
        }
    })
    $(document).on("click", ".button", function(){
        // for(let i = 0; i < 10; i++){
            var id1 = Math.round(Math.random()*(color.length - 1));
            var id2 = Math.round(Math.random()*(shape.length - 1));
            var id3 = Math.round(Math.random()*(locations.length - 1));
            var id4 = Math.round(Math.random()*(fullname.length - 1));
            var colorHtml = '';
            var shapeHtml = '';
            i++;


            if(fullname.length == 0){
                alert("已抽完")
            }else{


                document.querySelector("#main").innerHTML +=
                `   <tr>
                        <td width="7%">${i}</td>
                        <td width="10%">${fullname[id4]}</td>
                        <td width="10%">${color[id1]}</td>
                        <td width="10%">${shape[id2]}</td>
                        <td width="10%">${locations[id3]}</td>
                    </tr>
                `;
                document.querySelector("#main2").innerHTML +=
                `   <tr>
                        <td width="44%">${fullname[id4]} 要準備的是用在 ${locations[id3]}的 ${color[id1]}色 ${shape[id2]}狀東西</td>
                    </tr>
                `;

                fullname.splice($.inArray(fullname[id4],fullname),1);
    
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
        fullname = fullname2;
        document.querySelector(".fullnamebox").innerHTML =
        `人選:    ${fullname2}
        `;
        document.querySelector("#main").innerHTML =
        `   
        `;
        i = 0;
        // $(".color").text('???');
        // $(".shape").text('???');
        // $(".locations").text('???');
        // $(".fullname").text('???');
        // console.log(i)
    })

    $(document).on("click", ".change1", function(){
        $("#mainTitle").addClass("d-none");
        $("#main").addClass("d-none");
        $("#main2").removeClass("d-none");
        $("#main2Title").removeClass("d-none");
        $(".change1").addClass("change2");
        $(".change1").removeClass("change1");
    })
    $(document).on("click", ".change2", function(){
        $("#main2Title").addClass("d-none");
        $("#main2").addClass("d-none");
        $("#main").removeClass("d-none");
        $("#mainTitle").removeClass("d-none");
        $(".change2").addClass("change1");
        $(".change2").removeClass("change2");
    })