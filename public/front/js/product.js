$(function () {
  var id = getSearch().productId;
  $.ajax({
    type: "get",
    url: "/product/queryProductDetail",
    data: {
      id: id
    },
    success: function (info) {
      console.log(info);
      $(".mui-scroll").html(template("tpl", info))
      mui(".mui-numbox").numbox();
      mui(".mui-slider").slider({
        interval: 3000//自动轮播周期，若为0则不自动播放，默认为0；
      });
    }
  })
})