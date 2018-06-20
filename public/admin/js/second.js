$(function () {
  var page = 1;
  var pageSize = 4;
  render();
  function render() {
    $.ajax({
      type: "get",
      url: "/category/querySecondCategoryPaging",
      data: {
        page: page,
        pageSize: pageSize
      },
      success: function (info) {
        console.log(info);

        $("#tbody").html(template("tpl1", info));
        $("#paginator").bootstrapPaginator({
          bootstrapMajorVersion: 3,
          currentPage: page,
          totalPages: Math.ceil(info.total / info.size),
          onPageClicked: function (a, b, c, p) {
            page = p;
            render();
          }
        });
      }
    });
  };
  $(".btnAdd").on("click", function () {
    $("#secondModal").modal("show");
    $.ajax({
      type: "get",
      url: "/category/queryTopCategoryPaging",
      data: {
        page: 1,
        pageSize: 100
      },
      success: function (info) {
        $(".dropdown-menu").html(template("tpl2", info))
      }
    });
  })
  $(".dropdown-menu").on("click", "a", function () {
    var id = $(this).data("id");
    var txt = $(this).text();
    $(".dropdown-text").text(txt);
    $("#categoryId").val(id);
    $("#form").data("bootstrapValidator").updateStatus("categoryId", "VALID");
  })
  $("#fileupload").fileupload({
    dataType: "json",
    //e：事件对象
    //data：图片上传后的对象，通过e.result.picAddr可以获取上传后的图片地址
    done: function (e, data) {
      console.log(data);
      $("[name='brandLogo']").val(data.result.picAddr);
      $(".box-img img").attr("src", data.result.picAddr);
      // 手动品牌校验
      $("#form").data("bootstrapValidator").updateStatus("brandLogo", "VALID");
    }
  });
  $("#form").bootstrapValidator({
    excluded: [],
    //2. 指定校验时的图标显示，默认是bootstrap风格
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields: {
      categoryId: {
        validators: {
          notEmpty: {
            message: '请选择一个一级分类'
          }
        }
      },
      brandName: {
        validators: {
          notEmpty: {
            message: '二级分类名称不能为空'
          }
        }
      },
      brandLogo: {
        validators: {
          notEmpty: {
            message: '请上传品牌图片'
          }
        }
      }
    }

  });

  $("#form").on("success.form.bv", function (e) {
    e.preventDefault();
    $.ajax({
      type: "post",
      url: "/category/addSecondCategory",
      data: $("#form").serialize(),
      success: function (info) {
        $("#secondModal").modal("hide");
        page = 1;
        render();
        $("#form")[0].reset();
        $("#form").data("bootstrapValidator").resetForm();
        $("")
        $(".box-img img").attr("src", "images/none.png");
        $(".dropdown-tex").text("请选择一级分类");
      }
    });
  })













});