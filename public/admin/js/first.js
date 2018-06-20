$(function () {
  var page = 1;
  var pageSize = 3;
  render();
  function render() {
    $.ajax({
      type: "get",
      url: "/category/queryTopCategoryPaging",
      data: {
        page: page,
        pageSize: pageSize
      },
      success: function (info) {
        $("#tbody").html(template("tpl", info));
        $("#paginator").bootstrapPaginator({
          bootstrapMajorVersion: 3,
          currentPage: page,
          totalPages: Math.ceil(info.total / info.size),
          size: "small",
          onPageClicked: function (a, b, c, p) {
            page = p;
            render();
          }
        })
      }
    });
  }
  $(".btnaddfirst").on("click", function () {
    $("#addfirstModal").modal("show");
  });
  
  $("form").bootstrapValidator({
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields: {
      categoryName: {
        validators: {
          notEmpty: {
            message: '请输入一级分类名称'
          }
        }
      }
    }
  });

   $("form").on("success.form.bv", function (e) {
    e.preventDefault();
    $.ajax({
      type: "post",
      url: "/category/addTopCategory",
      data: {
        categoryName: $("#categoryName").val()
      },
      success: function (info) {
        page=1;
        render()
        $("#addfirstModal").modal("hide");
        $("form").data('bootstrapValidator').resetForm();
        $("form")[0].reset();
      }
    });
  })
})