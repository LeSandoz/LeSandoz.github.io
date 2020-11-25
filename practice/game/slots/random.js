var give = ['何彥穎','王嘉禾','劉怡婷','方建哲','蔡亞筑','呂學承','蔡承璋','黃宣燁','曾文瑀','陳子秝'];
var take = ['何彥穎','王嘉禾','劉怡婷','方建哲','蔡亞筑','呂學承','蔡承璋','黃宣燁','曾文瑀','陳子秝'];

document.querySelector(".give").innerHTML +=
`
    送禮人: ${give}
`;
document.querySelector(".take").innerHTML +=
`
    收禮人: ${take}
`;
$(document).on("click", ".click", function(){
    var id1 = Math.round(Math.random()*(give.length - 1));
    var id2 = Math.round(Math.random()*(take.length - 1));
    if(give[id1] == take[id2]){
        alert("不能送給自己，請重骰")
    }else{
        document.querySelector(".result").innerHTML +=
        `
        ${give[id1]}要給${take[id2]}<br>
        `;
        give.splice($.inArray(give[id1],give),1);
        take.splice($.inArray(take[id2],take),1);
        document.querySelector(".give").innerHTML =
        `
            送禮人: ${give}
        `;
        document.querySelector(".take").innerHTML =
        `
            收禮人: ${take}
        `;
    }
    

})
$(document).on("click", ".reset", function(){
    give = ['何彥穎','王嘉禾','劉怡婷','方建哲','蔡亞筑','呂學承','蔡承璋','黃宣燁','曾文瑀','陳子秝'];
    take = ['何彥穎','王嘉禾','劉怡婷','方建哲','蔡亞筑','呂學承','蔡承璋','黃宣燁','曾文瑀','陳子秝'];
    document.querySelector(".give").innerHTML =
    `
        送禮人: ${give}
    `;
    document.querySelector(".take").innerHTML =
    `
        收禮人: ${take}
    `;
    document.querySelector(".result").innerHTML =
    `

    `;
})