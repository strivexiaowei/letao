$(function () {
  mui('.mui-scroll-wrapper').scroll({
    indicators: false,
    deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
  });
  mui(".mui-slider").slider({
    interval: 5000//自动轮播周期，若为0则不自动播放，默认为0；
  });
});
   
function getSearch() {
  var search = location.search;
  var str = decodeURI(search)
  str = str.slice(1);
  var arr = str.split("&")
  var obj = {};
  arr.forEach(function (e, i) {
    var k = e.split("=")[0];
    var v = e.split("=")[1];
    obj[k] = v;
  })
  return obj
};