/**
* @description 封装公共函数
* @constructor
* @param {string} author - Reber
*/

var Util = {
  /**
   * is - 判断数据类型
   *
   * @param  {any} data d需要判断的数据
   * @param  {String} type   js数据类型字符串
   * @return {type}      true 是判断的数据类型 ，false不是该类型
   */
  is: function(data, type) {
    if( typeof type !== 'string') {
      console.log('%cwarning, type不是字符串类型', 'color: #ff9900');
      type.toString();
    }
    if(Object.prototype.toString.call(data).indexOf(type) != -1) {
      return true;
    } else {
      return false;
    }
  },

  /**
   * getParam - 返回页面url路径参数值
   *
   * @param  {String} key 参数名
   * @return {String}     返回参数值，如果没有值返回null
   */
  getParam: function(key) {
    // 获取参数
    var url = window.location.search;

    // 正则筛选地址栏
    var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)");
    // 匹配目标参数
    var result = url.substr(1).match(reg);
    //返回参数值
    // 编码转码
    return result ? decodeURIComponent(result[2]) : null;
  },

  /**
   * template - 渲染数据
   *
   * @param  tpl  模板html
   * @param  {Array} data 后台返回的列表数据
   * @return {String}      返回的html字符串拼接内容
   */
  getTmpl: function(tpl, data) {
    var _this = this;
    var html = '', tmpO = $(tpl);
    $.each(data, function (i, v) {
        // 去掉length属性，因为需要在loopHtml中遍历对象，遍历对象，length也是对象的一个属性
        delete v["length"];
        // 把每个列表数据的元素放入渲染列表函数中
        html += _this.loopHtml(tmpO, v);
    })
    return html;
  },

  /**
   * loopHtml - 渲染列表
   * 思路： 遍历当前列表对象，然后查找模板里面是否有列表对象的相同的属性name 的class,
   * 如果有就把当前的数据name的值作为模板class的html内容，并使用outerHTML, return整个模板出去（具体看outerHTML用法）
   *
   * @param  {} tmpO  模板
   * @param  {Object} v    列表数据的每个元素
   * @return {String}      返回模板字符串
   */
  loopHtml: function(tmpO, v) {
    var classElem;
    $.each(v, function(name, val) {
      classElem = tmpO.find('.' + name);
      if (classElem.length === 0) return;
      // 区分不同元素
      switch (classElem[0].localName) {
        case 'select':
          classElem.children().removeAttr("selected").siblings('[value="' + val + '"]').attr("selected", true);
          break;
        case 'input':
          classElem.val(val);
          break;
        case 'img':
          classElem.attr('src', val);
          break;
        case 'a':
          classElem.attr('href', val);
          break;
        default:
          $(classElem).html(val);
      }
    });
    // 返回整个模板的内容
    return tmpO[0].outerHTML;
  },


  /**
   * cntDownTimer - 发送验证码倒计时
   *
   * @param  {String} time 倒计时的时间
   * @return {type}      description
   */
  cntDownTimer: function(t) {
    // 发出一个请求，开始倒计时
    // 这部分是发请求获取验证码的,现在不使用
    // getCode();

    // 点击后，不能再点击，需要倒计时结束才能点击
    if($(t).hasClass('unable')) return;
    // 倒计时
    var timeCnt = 60;
    $(t).html(timeCnt + 's');
    $(t).addClass('unable');
    var timer = setInterval(function() {
      --timeCnt;
      $(t).html(timeCnt + 's');
      if(timeCnt == 0) {
        $(t).removeClass('unable');
        clearTimeout(timer);
        $(t).html('验证码');
      }
    }, 1000);
  }
}
