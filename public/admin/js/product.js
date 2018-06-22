$(function () {
  var page = 1;
  var pageSize = 3;
  var imgs = [];
  render();
  function render() {
    $.ajax({
      type: "get",
      url: "/product/queryProductDetailList",
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
          itemTexts: function (type, page, current) {
            switch (type) {
              case "first":
                return "首页";
              case "prev":
                return "上一页";
              case "next":
                return "下一页";
              case "last":
                return "尾页";
              default:
                return page;
            }
          },
          tooltipTitles: function (type, page, current) {
            switch (type) {
              case "first":
                return "首页";
              case "prev":
                return "上一页";
              case "next":
                return "下一页";
              case "last":
                return "尾页";
              //如果是page，说明就是数字，只需要返回对应的数字即可
              default:
                return "跳转到" + page;
            }
          },
          useBootstrapTooltip: true,
          onPageClicked: function (a, b, c, p) {
            page = p;
            render();
          }
        });
      }
    });
  }


  $(".Addproduct").on("click", function () {
    $("#productModal").modal("show");
    $.ajax({
      type: "get",
      url: "/category/querySecondCategoryPaging",
      data: {
        page: 1,
        pageSize: 9999
      },
      success: function (info) {
        console.log(info);
        $(".dropdown-menu").html(template("tpl2", info));
      }
    });
  });
  $(".dropdown-menu").on("click", "a", function () {
    var text = $(this).text();
    var id = $(this).data("id");

    $("#brandId").val(id);
    $(".dropdown-text").text(text);
    $("#form").data("bootstrapValidator").updateStatus("brandId", "VALID");
  });
  $("#fileupload").fileupload({
    dataType: "json",      //e：事件对象      //data：图片上传后的对象，通过e.result.picAddr可以获取上传后的图片地址   
    done: function (e, data) {
      if (imgs.length >= 3) {
        return false;
      }
      imgs.push(data.result);
      $(".box-img").append(' <img src=" ' + data.result.picAddr + '" width="100" height="100"> ');
      if (imgs.length === 3) {
        $("#form").data("bootstrapValidator").updateStatus("brandLogo", "VALID");
      } else {
        $("#form").data("bootstrapValidator").updateStatus("brandLogo", "INVALID");
      }
    }
  });
  $("#form").bootstrapValidator({
    excluded: [],
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields: {
      brandId: {
        validators: {
          notEmpty: {
            message: '请选择二级分类品牌'
          }
        }
      },
      proName: {
        validators: {
          notEmpty: {
            message: '商品名称不能为空'
          }
        }
      },
      oldPrice: {
        validators: {
          notEmpty: {
            message: '商品原价格不能为空'
          },
          regexp: {
            regexp: /\d/,
            message: '输入数字'
          }
        }
      },
      price: {
        validators: {
          notEmpty: {
            message: '商品新价格不能为空'
          },
          regexp: {
            regexp: /\d/,
            message: '输入数字'
          }
        }
      },
      proDesc: {
        validators: {
          notEmpty: {
            message: '商品描述不能为空'
          }
        }
      },
      brandLogo: {
        validators: {
          notEmpty: {
            message: '请上传三张图片'
          }
        }
      },
      size: {
        validators: {
          notEmpty: {
            message: '输入尺码不能为空格式为36-46'
          },
          regexp: {
            regexp: /^\d{2}-\d{2}$/,
            message: '输入尺码格式为36-46'
          }
        }
      },
      num: {
        validators: {
          notEmpty: {
            message: '商品库存不能为空'
          },
          regexp: {
            regexp: /^[1-9]\d{0,3}$/,
            message: '请输入1-9999的数字'
          }
        }
      }
    }
  })


  $("#form").on("success.form.bv", function (e) {

    e.preventDefault();
    console.log("hehe");

    var str = $("#form").serialize();


    str += "&picName1=" + imgs[0].picName + "&picAddr1=" + imgs[0].picAddr;
    str += "&picName2=" + imgs[1].picName + "&picAddr2=" + imgs[1].picAddr;
    str += "&picName3=" + imgs[2].picName + "&picAddr3=" + imgs[2].picAddr;


    $.ajax({
      type: "post",
      url: "/product/addProduct",
      data: str,
      success: function (info) {
        page = 1;
        render();
        $("#productModal").modal("hide");
        $("#form")[0].reset();
        $("#form").data("bootstrapValidator").resetForm();
        $("#brandId").val();
        $(".dropdown-text").text("请选择二级分类");
        $(".box-img img").remove();
        imgs = [];

      }
    });
  })

})
