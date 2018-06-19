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
  })
  $("form").bootstrapValidator({




  });
})