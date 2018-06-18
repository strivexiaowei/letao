//进度条功能
//禁用进度环
NProgress.configure({ showSpinner: false });
//注册一个全局的ajaxStart事件，所有的ajax在开启的时候，会触发这个事件
$(document).ajaxStart(function () {
  //开启进度条
  NProgress.start();
});

$(document).ajaxStop(function () {
  //完成进度条
  setTimeout(function () {
    NProgress.done();
  }, 500);
});
if (location.href.indexOf("login.html") === -1) {
  $.ajax({
    type: "get",
    url: "/employee/checkRootLogin",
    success: function (info) {
      if (info.error == "400") {
        location.href = "login.html";
      }
    }
  })
}
$(function () {
  $(".child").prev().on("click", function () {

    $(this).next().slideToggle();

  });
  $(".lt_main .menu").on("click", function () {

    $(".lt_aside").toggleClass("now");
    $(".lt_main").toggleClass("now");

  });
  $(".log_out").on("click", function () {
    $("#logoutModal").modal("show");
  });
  $("#logout").on('click', function () {
    $.ajax({
      type: "get",
      url: "/employee/employeeLogout",
      success: function (info) {
        if (info.success) {
          location.href = "login.html";
        }
      }
    })
  })
});
