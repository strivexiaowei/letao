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
      $(".product-size span").on("click", function () {
        $(this).addClass("now").siblings().removeClass("now");

      })
      $(".addCart").on("click", function () {

        var productId = info.id;
        var num = $('[type="number"]').val();
        var size = $(".product-size span.now").text();
        $.ajax({
          type: "post",
          url: "/cart/addCart",
          data: {
            productId: productId,
            num: num,
            size: size
          },
          success: function (info) {
          
            if (info.error) {
              location.href = "login.html?back=" + location.href;
            }
            if (info.success) {
              mui.confirm("温馨提示", "添加成功", ["去购物车", "继续浏览"], function (e) {

                if (e.index === 0) {
                  location.href = "cart.html";
                }
              })
            }

          }
        });



      })


    }
  })
})