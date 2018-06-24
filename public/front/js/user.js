$(function () {
  $.ajax({
    type:"get",
    url:"/user/queryUserMessage",
    success:function (info) {
      console.log(info);
      $(".mui-table-view li:first-child").html(template("tpl",info))
      
      }
  });

  $(".btn-logout").on("click", function () {
    console.log("hhe");
    
    $.ajax({
      type: "get",
      url: "/user/logout",
      success: function (info) {
        if (info.success) {
          location.href = "login.html"
        }
      }
    })
  })
})