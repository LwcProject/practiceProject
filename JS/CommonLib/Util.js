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
  },

  /**
   * formToJson - 获取表单元素值，转换为json 需要借助jqurey
   *
   * @param  {type} formId 表单元素id
   * @return {type}        返回表单json对象
   */
  formToJson: function(formId) {
    var jsonObj = {};
    var formSerializeArr = $("#" + formId).serializeArray();
    //将json数组转化为一个json对象
    console.log(formSerializeArr);
    $.each(formSerializeArr, function () {
        // 逻辑类似数组去重
        if (jsonObj[this.name]) {
            if (!jsonObj[this.name].push) {
                // 转化为数组
                jsonObj[this.name] = [jsonObj[this.name]];
            }
            jsonObj[this.name].push(this.value || "");
        } else {
            jsonObj[this.name] = this.value || "";
        }
    });

    return jsonObj;
  },

  /**
   * inputNum - input输入框限制输入类型
   *
   * @param  {type} t   this
   * @param  {type} len 限制长度
   * @return {type}     无
   * demo <input type="tel" placeholder="请输入手机号"  oninput="inputNum(this,11)">
   */
  inputNum: function(t, len) {
        var val = t.value;
        val = val.replace(/[^\d]/g, '');//非数字的都替换掉
        val = val.substr(0, len);
        t.value = val;
  },
  /**
 * val - 提交表单验证
 *
 * @param  {String} formId   表单id名
 * @return {Object}          返回该表单是否验证结果 flag为true验证通过
 */
  vali: function(formId) {
    var msg = '', flag = true, vObj = $('.validate');
    if (formId) {
      vObj = $('#' + formId).find('.validate');
    }
    for (var i = 0; i < vObj.length; i++) {
        var t = vObj.eq(i);
        if (!t.val()) {
            msg = t.attr("placeholder");
            flag = false;
            break;
        }
    }
    return { msg: msg, flag: flag };
  },

  /**
   * setCntTime - 设置倒计时
   *
   * @param  {type} time time 后台传回来的时间，
   * @param  {type} id   id当前元素class的id  class命名方式cntTime_ + id;
   * @return {type}      null
   */
  setCntTime: function(time, id) {
      var _this = this;
       var time = new Date(time);
       setInterval(function () {
           _this.count_down(time, id);
       }, 300);//设置刷新时间
   },

   // 倒计时 time 需要是new Date后的值

   /**
    * count_down - 倒计时处理
    *
    * @param  {type} time new Date后的值
    * @param  {type} id   元素   class命名方式cntTime_   后的id
    * @return {type}      null
    */
   count_down: function(time, id) {
       time_end = time.getTime();

       var time_now = new Date(); // 获取当前时间
       time_now = time_now.getTime();
       var time_distance = time_end - time_now; // 时间差：活动结束时间减去当前时间
       var int_hour, int_minute, int_second;
       if (time_distance >= 0) {

           // 相减的差数换算成天数
           //int_day = Math.floor(time_distance / 86400000);
           //time_distance -= int_day * 86400000;

           // 相减的差数换算成小时
           int_hour = Math.floor(time_distance / 3600000);
           time_distance -= int_hour * 3600000;
           // 相减的差数换算成分钟
           int_minute = Math.floor(time_distance / 60000);
           time_distance -= int_minute * 60000;

           // 相减的差数换算成秒数
           int_second = Math.floor(time_distance / 1000);

           // 判断小时小于10时，前面加0进行占位
           if (int_hour < 10)
               int_hour = "0" + int_hour;

           // 判断分钟小于10时，前面加0进行占位
           if (int_minute < 10)
               int_minute = "0" + int_minute;

           // 判断秒数小于10时，前面加0进行占位
           if (int_second < 10)
               int_second = "0" + int_second;

           // 显示倒计时效果
           $('.cntTime_' + id).html(int_hour + ':' + int_minute + ':' + int_second);
       } else {

           //指定的结束日期结束后，往后推迟3天，或者称之为：往后加3天
           //在这里可以非常灵活的设置：比如往后推迟2天或往后加2天：2*24*60*60*1000
           //比如往后推迟1天或往后加1天：1*24*60*60*1000
           //比如往后推迟2小时或往后加2小时：2*60*60*1000
           // 比如往后推迟40分钟或往后加40分钟：40*1000这里设置根据大家需要，灵活设置。9 11 13 14 15 20 24 29 31 79
           time_end = time_end + 3 * 24 * 60 * 60 * 1000;
       }
   },
}
