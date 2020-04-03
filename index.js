

$(".nav-item").click(function(event) {
    let effect = $(this).data("effect");
    console.log(effect);
    switch (effect) {
      case "show1":
        $("#content1").fadeIn();
        $("#content2").fadeOut();
        $("#content3").fadeOut();
        break;
      case "show2":
        $("#content1").fadeOut();
        $("#content2").fadeIn();
        $("#content3").fadeOut();
        break;
      case "show3":
        $("#content1").fadeOut();
        $("#content2").fadeOut();
        $("#content3").fadeIn();
        break;
    }
    $(".nav-link").removeClass("active");
    $(this)
      .find("a")
      .addClass("active");
    //     $(this).find("a").addClass("active")
    //   .end().siblings().find("a").removeClass("active")
  });