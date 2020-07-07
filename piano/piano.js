function clickC(){
    $("#C").attr('autoplay','autoplay')
    $("#C").attr('src',"notes/C.mp3")
}
function clickD(){
    $("#D").attr('autoplay','autoplay')
    $("#D").attr('src',"notes/D.mp3")
}
function clickE(){
    $("#E").attr('autoplay','autoplay')
    $("#E").attr('src',"notes/E.mp3")
}
function clickF(){
    $("#F").attr('autoplay','autoplay')
    $("#F").attr('src',"notes/F.mp3")
}
function clickG(){
    $("#G").attr('autoplay','autoplay')
    $("#G").attr('src',"notes/G.mp3")
}
function clickA(){
    $("#A").attr('autoplay','autoplay')
    $("#A").attr('src',"notes/A.mp3")
}
function clickB(){
    $("#B").attr('autoplay','autoplay')
    $("#B").attr('src',"notes/B.mp3")
}
function clickDb(){
    $("#Db").attr('autoplay','autoplay')
    $("#Db").attr('src',"notes/Db.mp3")
}
function clickEb(){
    $("#Eb").attr('autoplay','autoplay')
    $("#Eb").attr('src',"notes/Eb.mp3")
}
function clickGb(){
    $("#Gb").attr('autoplay','autoplay')
    $("#Gb").attr('src',"notes/Gb.mp3")
}
function clickAb(){
    $("#Ab").attr('autoplay','autoplay')
    $("#Ab").attr('src',"notes/Ab.mp3")
}
function clickBb(){
    $("#Bb").attr('autoplay','autoplay')
    $("#Bb").attr('src',"notes/Bb.mp3")
}
function clickC2(){
    $("#C2").attr('autoplay','autoplay')
    $("#C2").attr('src',"notes/C2.mp3")
}
function clickD2(){
    $("#D2").attr('autoplay','autoplay')
    $("#D2").attr('src',"notes/D2.mp3")
}
function clickE2(){
    $("#E2").attr('autoplay','autoplay')
    $("#E2").attr('src',"notes/E2.mp3")
}
function clickF2(){
    $("#F").attr('autoplay','autoplay')
    $("#F").attr('src',"notes/F2.mp3")
}
function clickG2(){
    $("#G2").attr('autoplay','autoplay')
    $("#G2").attr('src',"notes/G2.mp3")
}
function clickA2(){
    $("#A2").attr('autoplay','autoplay')
    $("#A2").attr('src',"notes/A2.mp3")
}
function clickB2(){
    $("#B2").attr('autoplay','autoplay')
    $("#B2").attr('src',"notes/B2.mp3")
}
function clickC3(){
    $("#C3").attr('autoplay','autoplay')
    $("#C3").attr('src',"notes/C3.mp3")
}
$(function(){
    $(document).keydown(function(event){
        if(event.keyCode==81){$("#C-note").click().addClass("active_piano");}
        if(event.keyCode==87){$("#D-note").click().addClass("active_piano");}
        if(event.keyCode==69){$("#E-note").click().addClass("active_piano");}
        if(event.keyCode==82){$("#F-note").click().addClass("active_piano");}
        if(event.keyCode==84){$("#G-note").click().addClass("active_piano");}
        if(event.keyCode==89){$("#A-note").click().addClass("active_piano");}
        if(event.keyCode==85){$("#B-note").click().addClass("active_piano");}
        if(event.keyCode==50){$("#Db-note").click().addClass("active_piano");}
        if(event.keyCode==51){$("#Eb-note").click().addClass("active_piano");}
        if(event.keyCode==53){$("#Gb-note").click().addClass("active_piano");}
        if(event.keyCode==54){$("#Ab-note").click().addClass("active_piano");}
        if(event.keyCode==55){$("#Bb-note").click().addClass("active_piano");} 
        if(event.keyCode==73){$("#C2-note").click().addClass("active_piano");}
        if(event.keyCode==79){$("#D2-note").click().addClass("active_piano");}
        if(event.keyCode==80){$("#E2-note").click().addClass("active_piano");}
        if(event.keyCode==219){$("#F2-note").click().addClass("active_piano");}
        if(event.keyCode==221){$("#G2-note").click().addClass("active_piano");}
        if(event.keyCode==220){$("#A2-note").click().addClass("active_piano");}
        if(event.keyCode==187){$("#B2-note").click().addClass("active_piano");}
        if(event.keyCode==8){$("#C3-note").click().addClass("active_piano");}
    });
    $(document).keyup(function(event){
        if(event.keyCode==81){$("#C-note").removeClass("active_piano");}
        if(event.keyCode==87){$("#D-note").removeClass("active_piano");}
        if(event.keyCode==69){$("#E-note").removeClass("active_piano");}
        if(event.keyCode==82){$("#F-note").removeClass("active_piano");}
        if(event.keyCode==84){$("#G-note").removeClass("active_piano");}
        if(event.keyCode==89){$("#A-note").removeClass("active_piano");}
        if(event.keyCode==85){$("#B-note").removeClass("active_piano");}
        if(event.keyCode==50){$("#Db-note").removeClass("active_piano");}
        if(event.keyCode==51){$("#Eb-note").removeClass("active_piano");}
        if(event.keyCode==53){$("#Gb-note").removeClass("active_piano");}
        if(event.keyCode==54){$("#Ab-note").removeClass("active_piano");}
        if(event.keyCode==55){$("#Bb-note").removeClass("active_piano");} 
        if(event.keyCode==73){$("#C2-note").removeClass("active_piano");}
        if(event.keyCode==79){$("#D2-note").removeClass("active_piano");}
        if(event.keyCode==80){$("#E2-note").removeClass("active_piano");}
        if(event.keyCode==219){$("#F2-note").removeClass("active_piano");}
        if(event.keyCode==221){$("#G2-note").removeClass("active_piano");}
        if(event.keyCode==220){$("#A2-note").removeClass("active_piano");}
        if(event.keyCode==187){$("#B2-note").removeClass("active_piano");}
        if(event.keyCode==8){$("#C-note").removeClass("active_piano");}
    });
});
//DRUMS
function clicksd(){
    $("#sd").attr('autoplay','autoplay')
    $("#sd").attr('src',"drums/606-snare2.wav")
}
function clickbd(){
    $("#bd").attr('autoplay','autoplay')
    $("#bd").attr('src',"drums/606-tom4.wav")
}
function clickhh(){
    $("#hh").attr('autoplay','autoplay')
    $("#hh").attr('src',"drums/606-cymbal7.wav")
}
function clicktom1(){
    $("#tom1").attr('autoplay','autoplay')
    $("#tom1").attr('src',"drums/606-tom1.wav")
}
function clicktom2(){
    $("#tom2").attr('autoplay','autoplay')
    $("#tom2").attr('src',"drums/606-tom2.wav")
}
function clicktom3(){
    $("#tom3").attr('autoplay','autoplay')
    $("#tom3").attr('src',"drums/606-tom3.wav")
}
function clickcc(){
    $("#cc").attr('autoplay','autoplay')
    $("#cc").attr('src',"drums/606-cymbal2.wav")
}
function clickrc(){
    $("#rc").attr('autoplay','autoplay')
    $("#rc").attr('src',"drums/606-cymbal6.wav")
}
$(function(){
    $(document).keydown(function(event){
        if(event.keyCode==66){$(".sd").click().addClass("active_piano");}
        if(event.keyCode==77){$(".bd").click().addClass("active_piano");}
        if(event.keyCode==72){$(".hh").click().addClass("active_piano");}
        if(event.keyCode==75){$(".tom1").click().addClass("active_piano");}
        if(event.keyCode==76){$(".tom2").click().addClass("active_piano");}
        if(event.keyCode==190){$(".tom3").click().addClass("active_piano");}
        if(event.keyCode==71){$(".cc").click().addClass("active_piano");}
        if(event.keyCode==186){$(".rc").click().addClass("active_piano");}
    });
    $(document).keyup(function(event){
        if(event.keyCode==66){$(".sd").removeClass("active_piano");}
        if(event.keyCode==77){$(".bd").removeClass("active_piano");}
        if(event.keyCode==72){$(".hh").removeClass("active_piano");}
        if(event.keyCode==75){$(".tom1").removeClass("active_piano");}
        if(event.keyCode==76){$(".tom2").removeClass("active_piano");}
        if(event.keyCode==190){$(".tom3").removeClass("active_piano");}
        if(event.keyCode==71){$(".cc").removeClass("active_piano");}
        if(event.keyCode==186){$(".rc").removeClass("active_piano");}
     
    });
});
