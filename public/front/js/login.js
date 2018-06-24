$(function () {
  $("#login").on("click", function () {
    var username = $('[name="username"]').val();
    var password = $('[name="password"]').val();
    if (!username) {
      mui.toast("请输入用户名")
      return;
    }
    if (!password) {
      mui.toast("请输入密码");
      return;
    }
    $.ajax({
      type: "post",
      url: "/user/login",
      data: {
        username: username,
        password: password
      },
      success: function (info) {
        // console.log(info);
        if (info.error) {
          mui.toast(info.message);
        }
        if(info.success) {
          if (!getSearch().back) {
            location.href = "user.html"
          }
          if (getSearch().back) {
            var back = location.search;
            back = back.replace("?back=", "");
            location.href = back;
          }
        }
      }
    })





  })
})