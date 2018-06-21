$(function () {
  $.ajax({
    type: "get",
    url: "/category/queryTopCategory",
    success: function (info) {
      $(".lt_category_nav ul").html(template("firstNav", info))
    }
  });
  $.ajax({
    type: "get",
    url: "/category/querySecondCategory",
    data: {
      id: 1
    },
    success: function (info) {
      $(".lt_category_content ul").html(template("second",info))
    }
  });
  $(".lt_category_nav ul").on("click", "li", function () {
    $(this).addClass("now").siblings().removeClass("now");
    var id = $(this).data("id");
    $.ajax({
      type: "get",
      url: "/category/querySecondCategory",
      data: {
        id: id
      },
      success: function (info) {
        $(".lt_category_content ul").html(template("second",info));
        mui('.lt_category_content .mui-scroll-wrapper').scroll().scrollTo(0,0,100);
      }
    });
  })
})