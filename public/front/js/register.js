$(function () {

  var username = $("#username").val();
  var password = $("#password").val();
  var confirmpassword = $("#confirmpassword").val();

  $(".getCode").on("click", function () {
    console.log("heh");
    var mobile = $("#mobile").val();
    if (mobile === "") {
      mui.toast("手机号不能为空");
      return;
    }
    if (!/^1\d{10}$/.test(mobile)) {
      mui.toast("手机号码格式不对，请重新输入");
      return;
    }
    $(this).prop("disabled", true).addClass("disabled").text("发送中.....")
    $.ajax({
      type: "get",
      url: "/user/vCode",
      success: function (info) {
        console.log(info);

        var count = 5;
        var timeId = setInterval(function () {
          count--;
          $(".getCode").text(count + "秒后点击再次发送");
          if (count == 0) {
            clearInterval(timeId);
            $(".getCode").prop("disabled", false).removeClass("disabled").text("再次发送")
          }
        }, 1000)
      }
    })
  })
  $(".register").on("click", function () {
    $(this).prop("disabled", true).addClass("disabled").text("注册中.....")
    var username = $("#username").val();
    var password = $("#password").val();
    var confirmpassword = $("#confirmpassword").val();
    var mobile = $("#mobile").val();
    var vCode = $("#vCode").val();
    if (!username) {
      mui.toast("用户名不能为空")
      return;
    }
    if (!password) {
      mui.toast("密码不能为空")
      return;
    }
    if (password != confirmpassword) {
      mui.toast("密码不一致")
      return;
    }
    if (!mobile) {
      mui.toast("手机号码不能为空")
      return;
    }
    if (!vCode) {
      mui.toast("验证码不能为空")
      return;
    }
    $.ajax({
      type: "post",
      url: "/user/register",
      data: $("form").serialize(),
      success: function (info) {
        if (info.success) {
          mui.confirm("注册成功跳转到登录页", "温馨提示", ["是", "否"], function (e) {
            if (e.index === 0) {
              location.href = "login.html"
            }
          })
        }
        if(info.error) {
          mui.toast(info.message);
        }
        $('.registe').prop("disabled", false).removeClass("disabled").text("重新注册")
      }
    })
  })
});