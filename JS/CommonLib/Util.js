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
   * loadHtml - 渲染表单数据
   *
   * @param  {String} objs 根据Id填充数据
   * @param  {String} formId 父级对象
   * @return {String}     返回参数值，如果没有值返回null
   */
  loadForm: function(objs, formId) {
        var formObj = $("#" + formId), namObj;
        $.each(objs, function (nam, val) {
            if (val == null) val = '';
            namObj = formObj.find("#" + nam);
            if (namObj.length === 0) return;
           
            if (namObj.hasClass('trans')) { val = namObj.data('value')[val] }
            if (namObj.hasClass('difTime')) { val = jsDateDiff(val) }
            if (namObj.hasClass('mult')) {
                if (val.length > 0) {
                    namObj.removeClass('nval').find('pre').html(val).next().val(val);
                }
                return
            }

            switch (namObj[0].localName) {
                case 'select': namObj.children().removeAttr("selected").siblings('[value="' + val + '"]').attr("selected", true); break;
                case 'input': namObj.val(val); break;
                case 'img':
                    var p = namObj.data('value') || "";
                    if (val === '') p = '';
                    if (!namObj.attr('onerror')) {
                        namObj.attr({ onerror: "Pub.imgNoFind(this,1)" });
                    }
                    if (namObj.hasClass('ali')) {
                        namObj.attr({ src: val + p });
                    } else {
                        namObj.attr({ src: 'http://ds-img.oss-cn-shanghai.aliyuncs.com/' + val + p });
                    }
                    break;
                case 'a': var p = namObj.data('value');
                    if (p == 'tel') {
                        if (val != '') { namObj.attr('href', 'tel:' + val); if (namObj.off('click').hasClass('tel')) namObj.text(val); }
                        else { namObj.removeAttr('href').on('click', function () { Pub.msgTip('暂未设置联系方式') }); }
                    }
                    break;
                default: namObj.html(val);
            }
        });
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
  // 商城商品倒计时插件
  countTime: {
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
     }
  },

  // 历史记录插件
  historyRecord: {
    /**
     * loadHistory - 加载历史记录
     *
     * @return {type}  无
     */
     loadHistory: function() {
      var nowHisData = localStorage.getItem("hisData"); //获取本地数据
      if (nowHisData === null || undefined) {
        return;
      }
      $("#hisSearch").show();
      var arr = nowHisData.split(" "); //字符串拆分成数组
      var tmp = Util.getNewHisData(arr, 5); //生成前五个搜索的记录

      // 渲染到页面
      $("#hisSearchList").append(Pub.tppl(hisTmps, tmp));
    },

    /**
     * pushToHistory - 添加历史记录
     *
     * @param  {String} data 搜索框的输入内容
     * @return {type}      无
     */
     pushToHistory: function(data) {
      // 去掉首位空格
      data = data.replace(/(^\s*)|(\s*$)/g, '');
      if (localStorage.getItem("hisData") === null || undefined) {
        localStorage.setItem("hisData", data);
      } else {
        //把搜索内容存到localstorage里面 每次输入的字符 通过用' '与本地存储到本地数据串接成字符串再存到本地,类似字符串累加
        var newHisDdata = localStorage.getItem("hisData") + ' ' + data;
        localStorage.setItem("hisData", newHisDdata);
      }
    },

    /**
     * getNewHisData - 获取最新的历史记录
     *
     * @param  {Array} arr   localStorage的值
     * @param  {Number} count 显示多少条记录
     * @return {Array}       返回所需的数据
     */
    getNewHisData: function(arr, count) {
      //执行deleteOtherSameInfo方法，获取没有重复的输入信息记录
      var arr = Util.deleteOtherSameInfo(arr);
      var length = arr.length;
      var str = [];
      //判断如果本地的值多于需要显示的历史数量，则取前多少个记录，否则直接显示所有数量
      if (length >= count) {
        for (var i = 0; i < count; i++) {
          str.push({
            name: arr[i] // 可以修改为自己需要的数据类型结构
          });
        }
      } else {
        for (var i = 0; i < length; i++) {
          str.push({
            name: arr[i]
          });
        }
      }
      return str;
    },

    /**
     * deleteOtherSameInfo - 删除重复搜索的历史记录，实质是数据去重，不改变localStorage存的值
     *
     * @param  {Array} arr localStorage的值
     * @return {type}     返回去重后的数据
     */
    deleteOtherSameInfo: function (arr) {
      var length = arr.length;
      var str = [];
      for (var i = length - 1; i >= 0; i--) {
        //indexOf  返回-1  说明arr[i] 在str中并不存在
        if (str.indexOf(arr[i]) == -1) {
          str.push(arr[i]);
        }
      }
      return str;
    }
  },
  // 字符串去空格
  trim: function(str) {
      return str.replace(/^(\s|\xA0)+|(\s|\xA0)+$/g, "");
  },
  // 手机号码验证
  checkPhone: function(val) {
      if (val.toString().match(/^1\d{10}$/) == null) {
          return false
      } else {
          return true;
      }
  },
  // 时间转化插件
  TimeChange: {
        // 时间小时转化 val小时值
        hourChange: function(val) {
            var timeHtml = '', timeCal = 0;
            // 不超过一小时的
            if (val < 1) {
                timeCal =  parseInt(val * 60);
                timeHtml = '<span>0</span>时 <span>' + timeCal + '</span>分';
            } else {
                // 超过一个小时的
                var valStr = val.toString();
                var timeInte = valStr.split('.')[0]; // 取整数部分
                var timeDeci = '0.' + valStr.split('.')[1]; // 取小数部分
                timeCal = parseInt(timeDeci * 60);

                timeHtml = '<span>' + timeInte + '</span>时 <span>' + timeCal + '</span>分';
            }
            return timeHtml;
        },
        // 分钟转化 val分钟数
        minuteChange: function(val) {
            var timeHtml = '';
            val =  parseInt(val);
            // 不超过60分钟的
            if (val < 60) {
                timeHtml = '<span>0</span>时 <span>' + val + '</span>分';
            } else {
            // 超过60分钟的
                var hour = parseInt(val / 60); // 获得时
                var min = parseInt(val % 60); // 获得分钟

                timeHtml = '<span>' + hour + '</span>时 <span>' + min + '</span>分';
            }
            return timeHtml;
        }
  },
   /**
   * timeSort - 小时时间排序
   *
   * @param  {Array} arr  数据源
   * @param  {Number} type 0 升序 时间从小到达    1 降序， 时间从大到小
   * @return {Array}      返回排序后的数组
   */
  timeHourSort(arr, type) {
      if (arr.length < 2) {
          return arr
      }
      let t = type || 0
      const s = "1970/1/1 "; // 注意后面有空格 ，添加年月日作为中间件，加上时间段，就可以进行对比
      arr.sort( (a, b) => {
          if (t == 0) {
              return Date.parse(s + a.time[0]) > Date.parse(s + b.time[0])
          } else {
              return Date.parse(s + a.time[0]) < Date.parse(s + b.time[0])
          }
      })
      return arr
      console.log(arr);
  }, 
   /**
   * getTimeGap - 获取两个日期直接的日期列表，比如开始时间结束时间之间的日期
   *
   * @param  {Array} times  数据源
   * @return {Array}      返回排序后的数组
   */
  getTimeGap (times) {
    let day1 = new Date(times[0]);
    let day2 = new Date(times[1]);
    let newTimesArr = [];
    // 计算相差天数
    let gap = parseInt(Math.abs((day2 - day1) / (1000 * 60 * 60 * 24)))
    for (let i = 1; i < gap; i++) {
        let curDate = new Date()
        // 获取第一天后面的第n天
        curDate.setDate(day1.getDate() + i);
        // 日期格式化
        // curDate = util.formatDate(new Date(curDate))
        newTimesArr.push(curDate)
    }
    newTimesArr = [times[0], ...newTimesArr, times[1]]
    return newTimesArr
  },

}
