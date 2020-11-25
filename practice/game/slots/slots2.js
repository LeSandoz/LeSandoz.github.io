var color = ['隨便','紅','橙','黃','綠','藍','靛','紫','黑','白','灰'];
var shape = ['都可','圓形','固體','方形','六角形','五角形','不規則','三角形','柱','液體','角錐'];
var locations = ['都可','廚房','廁所','辦公室','房間','客廳','陽台','健身房','室外','教室','球場'];
var fullname = ['何彥穎','王嘉禾','劉怡婷','方建哲','蔡亞筑','呂學承','蔡承璋','黃宣燁','曾文瑀','陳子秝'];
var i = '';

    $(document).on("click", ".button", function(){
        // for(let i = 0; i < 10; i++){
            var id1 = Math.round(Math.random()*(color.length - 1));
            var id2 = Math.round(Math.random()*(shape.length - 1));
            var id3 = Math.round(Math.random()*(locations.length - 1));
            var id4 = Math.round(Math.random()*(fullname.length - 1));
            var colorHtml = '';
            var shapeHtml = '';
            i++;
            // var name = $("#name").val();
            console.log(color[id1]);
            // console.log(id2);
            // console.log(id3);
            // console.log(id4);
            // console.log((fullname.length - 1));
            // console.log(fullname);
            if(fullname.length == 0){
                alert("已抽完")
            }else{
                // $(".color").text(color[id1]);
                // $(".shape").text(shape[id2]);
                // $(".locations").text(locations[id3]);
                // $(".fullname").text(fullname[id4]);
                // console.log(fullname[id4]);
                // $("#name option[value=" + name + "]").remove();
                if(color[id1] == "藍"){
                    colorHtml = `<td width="12%" style="background: skyblue; color: white">${color[id1]}</td>`;
                }else if(color[id1] == "紅"){
                    colorHtml = `<td width="12%" style="background: red; color: white">${color[id1]}</td>`;               
                }else if(color[id1] == "橙"){
                    colorHtml = `<td width="12%" style="background: orange; color: white">${color[id1]}</td>`;               
                }else if(color[id1] == "黃"){
                    colorHtml = `<td width="12%" style="background: yellow;">${color[id1]}</td>`;               
                }else if(color[id1] == "綠"){
                    colorHtml = `<td width="12%" style="background: green; color: white">${color[id1]}</td>`;               
                }else if(color[id1] == "靛"){
                    colorHtml = `<td width="12%" style="background: blue; color: white">${color[id1]}</td>`;               
                }else if(color[id1] == "紫"){
                    colorHtml = `<td width="12%" style="background: purple; color: white">${color[id1]}</td>`;               
                }else if(color[id1] == "黑"){
                    colorHtml = `<td width="12%" style="background: black; color: white">${color[id1]}</td>`;               
                }else if(color[id1] == "白"){
                    colorHtml = `<td width="12%" style="background: white;">${color[id1]}</td>`;               
                }else if(color[id1] == "灰"){
                    colorHtml = `<td width="12%" style="background: gray; color: white">${color[id1]}</td>`;               
                }else if(color[id1] == "隨便"){
                    colorHtml = `<td width="12%">${color[id1]}</td>`;               
                }

                if(shape[id2] == "五角形"){
                    shapeHtml = `<td width="19%" style="text-align: center"><img src="./images/5.png">${shape[id2]}</td>`
                }else if(shape[id2] == "方形"){
                    shapeHtml = `<td width="19%" style="text-align: center"><img src="./images/4.jpg">${shape[id2]}</td>`
                }else if(shape[id2] == "圓形"){
                    shapeHtml = `<td width="19%" style="text-align: center"><img src="./images/0.jpg">${shape[id2]}</td>`
                }else if(shape[id2] == "六角形"){
                    shapeHtml = `<td width="19%" style="text-align: center"><img src="./images/6.png">${shape[id2]}</td>`
                }else if(shape[id2] == "固體"){
                    shapeHtml = `<td width="19%" style="text-align: center"><img src="./images/solid.png">${shape[id2]}</td>`
                }else if(shape[id2] == "不規則"){
                    shapeHtml = `<td width="19%" style="text-align: center"><img src="./images/slime.png">${shape[id2]}</td>`
                }else if(shape[id2] == "角錐"){
                    shapeHtml = `<td width="19%" style="text-align: center"><img src="./images/pyramid.png">${shape[id2]}</td>`
                }else if(shape[id2] == "液體"){
                    shapeHtml = `<td width="19%" style="text-align: center"><img src="./images/liquad.png">${shape[id2]}</td>`
                }else if(shape[id2] == "柱"){
                    shapeHtml = `<td width="19%" style="text-align: center"><img src="./images/fire.jpg">${shape[id2]}</td>`
                }else if(shape[id2] == "三角形"){
                    shapeHtml = `<td width="19%" style="text-align: center"><img src="./images/3.png">${shape[id2]}</td>`
                }else{
                    shapeHtml=`<td width="19%">${shape[id2]}</td>`
                }
                document.querySelector("#box").innerHTML +=
                `   <tr>
                        <td width="5%">${i}</td>
                        <td width="12%">${fullname[id4]}</td>
                        ${colorHtml}
                        ${shapeHtml}
                        <td width="12%">${locations[id3]}</td>
                        <td width="40%">${fullname[id4]} 要準備的是用在 ${locations[id3]}的 ${color[id1]}色 ${shape[id2]}狀東西</td>
                    </tr>
                `;
                // document.querySelector(".list").innerHTML +=
                // `${fullname[id4]} 要準備的是用在 ${locations[id3]}的 ${color[id1]}色 ${shape[id2]}東西<br>
                // `;
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
        `人選:    ${fullname}
        `;
        document.querySelector("#box").innerHTML =
        `   
        `;
        i = 0;
        // $(".color").text('???');
        // $(".shape").text('???');
        // $(".locations").text('???');
        // $(".fullname").text('???');
        // console.log(i)
    })

