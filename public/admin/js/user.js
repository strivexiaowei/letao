$(function () {
  var page = 1;
  var pageSize = 8;
  render();
  function render() {
    $.ajax({
      type: "get",
      url: "/user/queryUser",
      data: {
        page: page,
        pageSize: pageSize
      },
      success: function (info) {
        $("#tbody").html(template("tpl1", info))
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

  $("#tbody").on("click", ".btn", function () {
    $("#userModal").modal("show");
    var id = $(this).parent().data("id");
    var isDelete = $(this).hasClass("btn-confirm") ? 1 : 0;
    console.log(isDelete);
    $("#userconfirm").off().on("click", function () {
      $("#userModal").modal("hide");
      $.ajax({
        type: "post",
        url: "/user/updateUser",
        data: {
          id: id,
          isDelete: isDelete
        },
        success: function (info) {
          if (info.success) {
            render();
          }

        }
      });
    })
  })
})