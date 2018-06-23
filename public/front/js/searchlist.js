$(function () {
  var page = 1;
  var pageSize = 3;
  var key = getSearch().key;
  $(".search_input").val(key)
  mui.init({
    pullRefresh: {
      container: ".mui-scroll-wrapper",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
      down: {
        auto: true,//可选,默认false.首次加载自动下拉刷新一次
        //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
        callback: function () {
          render(function (info) {
            $(".lt_product").html(template("tpl", info))
            mui('.mui-scroll-wrapper').pullRefresh().endPulldownToRefresh();
            mui('.mui-scroll-wrapper').pullRefresh().refresh(true);
          });
        }
      },
      up: {
        callback: function () {
          render(function (info) {
            console.log(info);
            
            $(".lt_product").append(template("tpl", info))
            mui('.mui-scroll-wrapper').pullRefresh().endPullupToRefresh(true);
          })
        }//必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
      }
    }
  });
  // 页面初始化
  // 页面加载的时候给搜索框添加搜索的关键词
 


  $(".btn-search").on("click", function () {
    key = $(".search_input").val();
    $(".lt_sort a").removeClass("now").find("span").addClass("fa-angle-down").removeClass("fa-angle-up");
    mui('.mui-scroll-wrapper').pullRefresh().pulldownLoading();
  })
  $(".lt_sort a[data-type]").on("tap", function () {
    var $this = $(this);
    if ($this.hasClass("now")) {
      $this.find("span").toggleClass("fa-angle-down").toggleClass("fa-angle-up");
    } else {
      $this.addClass("now").siblings().removeClass("now");
      $(".lt_sort a").find("span").addClass("fa-angle-down").removeClass("fa-angle-up");
    }
    mui('.mui-scroll-wrapper').pullRefresh().pulldownLoading();
  });


  

  function render(callback) {
    var obj = {
      proName: key,
      page: page,
      pageSize: pageSize
    }
    var $now = $(".lt_sort a.now");
    if ($now.length > 0) {
      var type = $now.data("type");
      var sort = $now.find("span").hasClass("fa-angle-down") ? 2 : 1;
      obj[type] = sort;
    }
    $.ajax({
      type: "get",
      url: "/product/queryProduct",
      data: obj,
      success: function (info) {
        setTimeout(function () {
          callback(info);
        }, 1000)
      }
    })
  }

  
});