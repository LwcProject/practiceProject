(function($) {
  /*jQuery对象添加  runNum  方法*/
  $.fn.extend({
    /*
     *	滚动数字
     *	@ val 值，	params 参数对象
     *	params{addMin(随机最小值),addMax(随机最大值),interval(动画间隔),speed(动画滚动速度),width(列宽),height(行高)}
     */
    runNum: function(val, params) {
      /*初始化动画参数*/
      var valString = val;
      var par = params || {};
      var runNumJson = {
        el: $(this),
        value: valString,
        needZero: 0,//补充0
        valueStr: valString.toString(10),
        width: par.width || 40,
        height: par.height || 50,
        addMin: par.addMin || 10000,
        addMax: par.addMax || 100000, //显示的最大值
        interval: par.interval || 500,
        speed: par.speed || 1000,
        width: par.width || 40,
        length: valString.toString(10).length,
        gap: 3 // 左右的间隙
      };
      var valLength = valString.toString(10).length;
      var maxLength = runNumJson.addMax.toString(10).length;
      if(valLength < maxLength) {
        // runNumJson.length = maxLength;// 增加遍历次数
        runNumJson.needZero = maxLength - valLength; // 需要多个0补位
      }
      $._runNum._list(runNumJson.el, runNumJson);
      $._runNum._interval(runNumJson.el.children("li"), runNumJson);
    }
  });
  /*jQuery对象添加  _runNum  属性*/
  $._runNum = {
    /*初始化数字列表*/
    _list: function(el, json) {
      var str = '';

      // 补0
      if(json.needZero) {
        for (var i = 0; i < json.needZero; i++) {
          var w = json.width * i;
          var left = (w + json.gap * i);// 左右数字显示间隙
          var t = json.height * parseInt(json.valueStr[i]);
          var h = json.height * 10;
          str += '<li style="width:' + json.width + 'px;left:' + left + 'px;top: ' + 0 + 'px;height:' + h + 'px;">';
          str += '<div style="height:' + json.height + 'px;line-height:' + json.height + 'px;background-color: #000;color: #fff">' + 0 + '</div>';
          str += '</li>';
        }
      }
      // 填充数字
      for (var i = 0; i < json.length; i++) {
        var w = json.width * i + json.needZero * json.width; // 加上补位0的宽度
        var left = (w + (json.needZero * json.gap)  + i * json.gap);// 左右数字显示间隙
        var t = json.height * parseInt(json.valueStr[i]);
        var h = json.height * 10;
        str += '<li style="width:' + json.width + 'px;left:' + left + 'px;top: ' + 0 + 'px;height:' + h + 'px;padding-righgt: 3px;">';
        for (var j = 0; j < 10; j++) {
          str += '<div style="height:' + json.height + 'px;line-height:' + json.height + 'px;background-color: #000;color: #fff">' + j + '</div>';
        }
        str += '</li>';
      }
      el.html(str);
    },
    /*执行动画效果*/
    _animate: function(el, value, json) {
      for (var x = 0; x < json.length; x++) {
        var topPx = value[x] * json.height;
        var newIndex = x + json.needZero; // 非补0位数字才有移动效果
        el.eq(newIndex).animate({
          top: -topPx + 'px'
        }, json.speed);
      }
    },
    /*刷新动画列表*/
    _interval: function(el, json) {
      var val = json.value;
      setInterval(function() {
        $._runNum._animate(el, val.toString(10), json);
      }, json.interval);
    }
  }
})(jQuery);
