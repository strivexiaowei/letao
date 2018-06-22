$(function () {

  function getSearch() {
    var key = location.search;
    key = decodeURI(key)
    key = key.slice(1);
    var arr = key.split("&")
    var obj = {};
    arr.forEach(function (e, i) {
      var k = e.split("=")[0];
      var v = e.split("=")[1];
      obj[k] = v;
    })
    return obj
  }
  // 页面初始化
  // 页面加载的时候给搜索框添加搜索的关键词
  var search = getSearch();
  var key = search.key;
  $(".search_input").val(key)
  render();

  $(".btn-search").on("click", function () {
    key = $(".search_input").val();
    $(".lt_sort a").removeClass("now").find("span").addClass("fa-angle-down").removeClass("fa-angle-up");
    render();
  })
  $(".lt_sort a[data-type]").on("click", function () {
    var $this = $(this);
    if ($this.hasClass("now")) {
      $this.find("span").toggleClass("fa-angle-down").toggleClass("fa-angle-up");
    } else {
      $this.addClass("now").siblings().removeClass("now");
      $(".lt_sort a").find("span").addClass("fa-angle-down").removeClass("fa-angle-up");
    }
    render();
  });




  function render() {
    $(".lt_product").html('<div class="loading"></div>')
    var proName = key;
    var page = 1;
    var pageSize = 10;
    var obj = {
      proName: proName,
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
          $(".lt_product").html(template("tpl", info));
         },1000)
      }
    })
  }
})