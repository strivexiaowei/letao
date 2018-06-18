// 登录页面用插件校验



$(function () { 
  $("form").bootstrapValidator({

    // 校验时图标显示风格
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields: {
      username: {
        validators: {
          notEmpty: {
            message: '用户名不能为空'
          },
          callback: {
            message: '用户名错误'
          }
        }
      },
      password: {
        validators: {
          notEmpty: {
            message: '密码不能为空'
          },
          stringLength: {
            min: 6,
            max: 12,
            message: '密码长度6-12位'
          },
          callback: {
            message: '密码错误'
          }
        }
      }
    }
  });
  /*当表单校验成功时，点击提交按钮，会触发success.form.bv事件，此时会提交表单，
  这时候，通常我们需要禁止表单的自动提交，使用ajax进行表单的提交。*/
  var validator = $("form").data('bootstrapValidator');
   $("form").on('success.form.bv', function (e) {
    e.preventDefault();    //使用ajax提交逻辑
  
    $.ajax({
      type: "post",
      url: "/employee/employeeLogin",
      data: $("form").serialize(),
      success: function (info) {
  
        console.log(info);
        if (info.success) {
          location.href = "index.html";
        }
        if (info.error === 1000) {
          //手动调用方法，updateStatus让username校验失败即可
            //第一个参数：改变哪个字段
            //第二个参数：改成什么状态  VALID:通过  INVALID:不通过
            //第三个参数：选择提示的信息
          validator.updateStatus("username", "INVALID", "callback");
        }
        if (info.error === 1001) {
          validator.updateStatus("password", "INVALID", "callback");
        }
      }
    });
  });
  $("#reset").on("click", function () {
    validator.resetForm();
  })
  
 })