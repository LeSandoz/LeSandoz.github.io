$(".nav-item").click(function(event) {
  let effect = $(this).data("effect");
  console.log(effect);
  switch (effect) {
    case "show1":
      $("#content1").fadeIn();
      $("#content2").fadeOut();
      $("#content3").fadeOut();
      $("#content4").fadeOut();
      break;
    case "show2":
      $("#content1").fadeOut();
      $("#content2").fadeIn();
      $("#content3").fadeOut();
      $("#content4").fadeOut();
      break;
    case "show3":
      $("#content1").fadeOut();
      $("#content2").fadeOut();
      $("#content3").fadeIn();
      $("#content4").fadeOut();
      break;
    case "show4":
      $("#content1").fadeOut();
      $("#content2").fadeOut();
      $("#content3").fadeOut();
      $("#content4").fadeIn();
      break;
  }
  $(".nav-link").removeClass("active");
  $(this)
    .find("a")
    .addClass("active");
  //     $(this).find("a").addClass("active")
  //   .end().siblings().find("a").removeClass("active")
});

  // 基于准备好的dom，初始化echarts实例
  var myChart = echarts.init(document.getElementById("main"));

  myChart.setOption({
    series: [
      {
        name: "技能",
        type: "pie", // 设置图表类型为饼图
        radius: ['20%', '60%'], // 饼图的半径，外半径为可视区尺寸（容器高宽中较小一项）的 55% 长度。
        data: [
          // 数据数组，name 为数据项名称，value 为数据项值
          { value: 35, name: "基礎" },
          { value: 30, name: "前端" },
          { value: 25, name: "後端" },
          { value: 20, name: "其他" }
        ],
        color: ['#7EC0EE', '#FF9F7F', '#FFD700', '#C9C9C9'],
        textStyle: {
          fontSize: 40,
          fontWeight: 'bolder'
        },
        subtextStyle: {
          fontSize: 40,
        }
      }
    ]
  });