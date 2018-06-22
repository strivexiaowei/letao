$(function () {

  function getHistory() {
    var history = localStorage.getItem("lt_history") || "[]";
    history = JSON.parse(history);
    return history;
  }
  render();
  function render() {
    var result = getHistory();
    $(".lt_history").html(template("tpl", { rows: result }));
  }
  // 清空历史记录功能
  $(".lt_history").on("click", ".history-empty", function () {
    localStorage.removeItem("lt_history");
    render();
  });

  // 点击x删除当前历史记录功能
  $(".lt_history").on("click", ".history-delete", function () {
    var $this = $(this);
    var idx = $this.data("index");
    var arr = getHistory();
    arr.splice(idx, 1);
    localStorage.setItem("lt_history", JSON.stringify(arr));
    render();
  });

  // 点击搜索添加历史记录

  $(".btn-search").on("click", function () {
    var text = $(".search_input").val();
    if (text === "") {
      return;
    }
    $(".search_input").val("")


    var arr = getHistory();
    var idx = arr.indexOf(text);
    if (idx > -1) {
      arr.splice(idx, 1);
    }
    if (arr.length === 10) {
      arr.pop();
    }
    arr.unshift(text);
    localStorage.setItem("lt_history", JSON.stringify(arr));
    render();
    location.href="searchlist.html?key="+text;
  });






})