let moveBefore = ''
let moveAfter = ''

$(document).on("change", ".moveBefore", function(){
    moveBefore = $(".moveBefore").val()
    $("." + moveBefore).children().css("background", "pink")
})

$(document).on("change", ".moveAfter", function(){
    moveAfter = $(".moveAfter").val()
    $("." + moveAfter).children().css("background", "plum")
})

$(".move").on("click", function(){
    moveBefore = $(".moveBefore").val()
    moveAfter = $(".moveAfter").val()

    let item = $("." + moveBefore).html()
    console.log(item)
    console.log(moveBefore)
    console.log(moveAfter)
    $("." + moveBefore).children().remove()
    $("." + moveAfter).children().remove()
    $("." + moveAfter).append(item)
    $(".chessman").css("background", "cadetblue")
    $("input").val('')
    moveAfter = ''
    moveBefore = ''
})

$(".chessman").on("click", function(){
    $(this).css("background", "pink")
})