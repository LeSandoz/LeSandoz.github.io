// home  &  list

$("#light").on("click", function(){
    // thisID = $(this).attr("data-name")
    window.localStorage.removeItem("option")
    window.localStorage.setItem("option", "light")
    window.location.href =  "/recipe/recipe_list.html"
    // console.log($("#light").attr("id"))
    // console.log(thisID)
})
$("#fit").on("click", function(){
    // thisID = $(this).attr("data-name")
    window.localStorage.removeItem("option")
    window.localStorage.setItem("option", "fit")
    window.location.href =  "/recipe/recipe_list.html"
    // console.log($("#fit").attr("id"))
    // console.log(thisID)
})
$("#vega").on("click", function(){
    // thisID = $(this).attr("data-name")
    window.localStorage.removeItem("option")
    window.localStorage.setItem("option", "vega")
    window.location.href =  "/recipe/recipe_list.html"
    // console.log($("#vega").attr("id"))
    // console.log(thisID)
})
$("#meat").on("click", function(){
    // thisID = $(this).attr("data-name")
    window.localStorage.removeItem("option")
    window.localStorage.setItem("option", "meat")
    window.location.href =  "/recipe/recipe_list.html"
    // console.log($("#meat").attr("id"))
    // console.log(thisID)
})
$("#drinks").on("click", function(){
    // thisID = $(this).attr("data-name")
    window.localStorage.removeItem("option")
    window.localStorage.setItem("option", "drinks")
    window.location.href =  "/recipe/recipe_list.html"
    // console.log($("#drinks").attr("id"))
    // console.log(thisID)
})
$("#soup").on("click", function(){
    // thisID = $(this).attr("data-name")
    window.localStorage.removeItem("option")
    window.localStorage.setItem("option", "soup")
    window.location.href =  "/recipe/recipe_list.html"
    // console.log($("#soup").attr("id"))
    // console.log(thisID)
})

//home

//list
if(localStorage.getItem("option") == "light"){
    $("#light").css("border","black 2px solid")
    $(".light").removeClass("d-none")
    $(".fit").addClass("d-none")
    $(".vega").addClass("d-none")
    $(".meat").addClass("d-none")
    $(".drinks").addClass("d-none")
    $(".soup").addClass("d-none")
}
if(localStorage.getItem("option") == "fit"){
    $("#fit").css("border","black 2px solid")
    $(".light").addClass("d-none")
    $(".fit").removeClass("d-none")
    $(".vega").addClass("d-none")
    $(".meat").addClass("d-none")
    $(".drinks").addClass("d-none")
    $(".soup").addClass("d-none")
}
if(localStorage.getItem("option") == "vega"){
    $("#vega").css("border","black 2px solid")
    $(".light").addClass("d-none")
    $(".fit").addClass("d-none")
    $(".vega").removeClass("d-none")
    $(".meat").addClass("d-none")
    $(".drinks").addClass("d-none")
    $(".soup").addClass("d-none")
}
if(localStorage.getItem("option") == "meat"){
    $("#meat").css("border","black 2px solid")
    $(".light").addClass("d-none")
    $(".fit").addClass("d-none")
    $(".vega").addClass("d-none")
    $(".meat").removeClass("d-none")
    $(".drinks").addClass("d-none")
    $(".soup").addClass("d-none")
}
if(localStorage.getItem("option") == "drinks"){
    $("#drinks").css("border","black 2px solid")
    $(".light").addClass("d-none")
    $(".fit").addClass("d-none")
    $(".vega").addClass("d-none")
    $(".meat").addClass("d-none")
    $(".drinks").removeClass("d-none")
    $(".soup").addClass("d-none")
}
if(localStorage.getItem("option") == "soup"){
    $("#soup").css("border","black 2px solid")
    $(".light").addClass("d-none")
    $(".fit").addClass("d-none")
    $(".vega").addClass("d-none")
    $(".meat").addClass("d-none")
    $(".drinks").addClass("d-none")
    $(".soup").removeClass("d-none")
}
