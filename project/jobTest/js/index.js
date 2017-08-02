(function () {
  // 获取图片的中心点
  var imageCdi = [];
  // 获取坐标与图片中心点的距离差
  var imgDistance = [];
  var newDistance = [];
  // 高度限定值
  var maxDetectionH = 500;

  $(".imageList li").each(function(index) {
    var imgLeft = parseInt($(".imageList li:eq(" + index + ") img ").offset().left);
    var imgTop = parseInt($(".imageList li:eq(" + index + ") img ").offset().top);
    // 获取的width已经时候image缩放50%的width
    var imgWidth = parseInt($(".imageList li:eq(" + index + ") img ").css('width'));
    var imgHeight = parseInt($(".imageList li:eq(" + index + ") img").css('height'));
    // 定义一个图片坐标变量
    var imgCoordinate = {x: 0, y: 0};
    // 图片的横坐标
    imgCoordinate.x = imgLeft + imgWidth/2;
    imgCoordinate.y = imgTop + imgHeight/2;
    imageCdi.push(imgCoordinate);
  });
  // 获取container的坐标
  $("#container").mousemove(function(e) {
    var ctnX = parseInt(e.offsetX);
    var ctnY = parseInt(e.offsetY);
    // console.log(ctnX,ctnY);
    // 清除原有的数据
    imgDistance.length = 0;
    newDistance.length = 0;
    // 计算鼠标的坐标与图片中心位置的距离
    for (var j = 0; j < imageCdi.length; j++) {
      // 勾股定理计算距离差
      var xWidth = Math.abs(ctnX - imageCdi[j].x);
      var yHeight = Math.abs(imageCdi[j].y - ctnY);
      var distance = parseInt(Math.sqrt(xWidth * xWidth + yHeight * yHeight));
      // console.log(distance + ' ' + j);
      imgDistance.push(distance);
      newDistance.push(distance);
      // 清除图片放大效果
      console.log('xuanting1');
      $(".imageList li:eq("+ j +") img").animate({width: "130px" ,height: "200px"}, 0);
    }
    // 对距离进行从小到大排序
    newDistance.sort(function compare(a, b) {
      return a - b;
    });
    // 取部分图片放大
    for (var n = 0; n < newDistance.length - 2; n++) {
      if (newDistance[n] < maxDetectionH) {
        for(var k = 0; k < imgDistance.length; k++) {
          if (imgDistance[k] === newDistance[n]) {
            // 距离越短放大效果越明显
            var percent = 1 - newDistance[n]/maxDetectionH
            $(".imageList li:eq("+ k +") img").animate({width: percent * 260 + 130  ,height: percent * 400 + 200}, 0);
          }
        }
      }
    }
  })
})();
