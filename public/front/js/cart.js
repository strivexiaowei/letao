$(function () {


  mui.init({
    pullRefresh: {
      container: ".mui-scroll-wrapper",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
      down: {
        auto: true,//可选,默认false.首次加载自动下拉刷新一次
        callback: function () {
          $.ajax({
            type: "get",
            url: "/cart/queryCart",
            success: function (info) {
              console.log(info);

              if (info.error) {
                location.href = "login.html?back=" + location.href;
              }
              $("#OA_task_2").html(template("tpl", { rows: info }));

            }
          });
          mui('.mui-scroll-wrapper').pullRefresh().endPulldownToRefresh();
        }
      }
    }
  });
  $("#OA_task_2").on("tap", ".deleteCart", function () {
    var id = $(this).data("id");
    console.log(id);
    mui.confirm("你确定要删除这件商品吗", "温馨提示", ["是", "否"], function (e) {
      if (e.index === 0) {
        $.ajax({
          type: "get",
          url: "/cart/deleteCart",
          data: {
            id: [id]
          },
          success: function (info) {
            if (info.success) {
              mui('.mui-scroll-wrapper').pullRefresh().pulldownLoading();
            }
          }
        })
      }
    })

  });
  $("#OA_task_2").on("tap", ".alterCart", function () {
    var data = this.dataset;
    var html = template("tpl2", data);
    console.log(data);

    html = html.replace(/\n/g, "")
    mui.confirm(html, "编辑商品", ["确定", "取消"], function (e) {
      mui(".mui-numbox").numbox();
      if (e.index == 0) {
        var id = data.id;
        var num = $(".mui-numbox-input").val();
        var size = $(".edit-product span.now").text();
        $.ajax({
          type: "post",
          url: "/cart/updateCart",
          data: {
            id: id,
            num: num,
            size: size
          },
          success: function (info) {
            if (info.success) {
              mui('.mui-scroll-wrapper').pullRefresh().pulldownLoading();
            }
          }
        })
      }
    })

    $(".product-size span").on("tap", function () {
      $(this).addClass("now").siblings().removeClass("now");
    });
    mui(".mui-numbox").numbox();
  });
  $("#OA_task_2").on("change", "input[type='checkbox']", function () {
    var total = 0;
    $("input[type='checkbox']:checked").each(function (i, e) {
      var price = $(this).data("price");
    
      
      var num = $(this).data("num");
     
      
      total += price * num;

    
      
    })

  
    $(".indentMoney").text(total.toFixed(2));
    
  })
});