var Pub = (function (pub) {
    //表单序列化为JSON对象
    function formToJson(formId) {
        var jsonObj = {};
        var formSerializeArr = $("#" + formId).serializeArray();
        //将json数组转化为一个json对象
        $.each(formSerializeArr, function () {
            if (jsonObj[this.name]) {
                if (!jsonObj[this.name].push) {
                    jsonObj[this.name] = [jsonObj[this.name]];
                }
                jsonObj[this.name].push(this.value || "");
            } else {
                jsonObj[this.name] = this.value || "";
            }
        });

        return jsonObj;
    }
    function loopHtml(tmpO, v) {
        var namObj;
        tmpO.find(".tmpData").val(JSON.stringify(v));

        $.each(v, function (nam, val) {
            if (typeof (val) != 'number') val = val || '';
            namObj = tmpO.find("." + nam);
            if (nam == 'isread') { if (val == 1) { namObj.addClass('colC') } return; } 
            if (namObj.length === 0) return;
            if (namObj.hasClass('trans')) { val = namObj.data('value')[val] }
            if (namObj.hasClass('difTime')) { val = jsDateDiff(val) }
            switch (namObj[0].localName) {
                case 'select': namObj.children().removeAttr("selected").siblings('[value="' + val + '"]').attr("selected", true); break;
                case 'input': namObj.val(val); break;
                case 'img':
                    var p = namObj.data('value') || '';
                    if (val === '') p = '';
                    if (!namObj.attr('onerror')) {
                        namObj.attr({ onerror: "Pub.imgNoFind(this,1)" });
                    }
                    if(val.indexOf("http") <= -1){
                        namObj.attr({ src: 'http://wufunong.oss-cn-shenzhen.aliyuncs.com/' + val + p });
                    }else{
                        namObj.attr({ src: val + p });
                    }
                    break;
                case 'a': var p = namObj.data('value');
                    if (p == 'tel') {
                        if (val != '') { namObj.attr('href', 'tel:' + val); }
                        else { namObj.click(function () { Pub.msgTip('暂未设置联系方式') }); }
                    }
                    break;
                default:
                    namObj.html(val);
            }
        });
        return tmpO[0].outerHTML;
    }
    //渲染列表数据
    function tppl(tpl, data) {
        var html = '', tmpO = $(tpl);
        
        $.each(data, function (i, v) { 
            html += loopHtml(tmpO, v)
        })
        return html;
    }
    //渲染表单数据
    function loadHtml(objs, formId) {//根据Id填充数据objs:数据formId:父级对象
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
                    if(val.indexOf("http") <= -1){
                        namObj.attr({ src: 'http://wufunong.oss-cn-shenzhen.aliyuncs.com/' + val + p });
                    }else{
                        namObj.attr({ src: val + p });
                    }
                    break;
                case 'a': var p = namObj.data('value');
                    if (p == 'tel') {
                        if (val != '') { namObj.attr('href', 'tel:' + val); }
                        else { namObj.click(function () { Pub.msgTip('暂未设置联系方式') }); }
                    }
                    break;
                default: namObj.html(val);
            }
        });
    }
    //测试数据
    function testTip(d) {
        Pub.tip({ content: '<textarea rows="20" style="width:100%">' + JSON.stringify(d) + '</textarea>' })
    }
    function iOpen(url) {
        location.hash = $.now();
        layer.open({
            type: 1,
            content: '<iframe src="' + url + '"></iframe>',
            anim: false,
            shade: false,
            shadeClose: false,
            className: 'layIfr'
        })
    }
    //多行文本输入控制
    function tareaIn(t) {
        var obj = $(t), prev = obj.prev(), val = obj.val();
        prev.html(val + '&nbsp;');
    }
    //数据请求
    function ajaxY(u, param, f, coP,hasto) {
        $.ajax({
            url: u,
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify({
                'data': param
            }),
            dataType: "JSON",
            success: function (d) {
                if (page == 1 && coP) {
                    scr.scrollTo(0, 0)
                    more = true;
                    $(coP).html('');
                }
                f(d);
                // if (d.code != 0) { Pub.msgTip(d.msg); return }
                var _tmp = d.data;
                if(hasto){
                    _tmp = d.data.rows;
                }
                if (coP) {
                    if (_tmp == null || _tmp.length < size) {
                        more = false;
                        if (page > 1) { $("#more").text('无更多数据').show() }
                        else { $("#more").hide() }
                    } else {
                        $("#more").text('上滑加载更多').show()
                    }
                    if (page == 1) {
                        if (_tmp == null || _tmp.length == 0) { Pub.noData({ isN: true }) }
                        else { Pub.noData({ cObj: coP }) }
                    }
                }
            }
        });
    }
    //无数据
    function noData(opts) {
        var sets = { isN: false, nOnj: '#noData', cObj: '#loadHtml,#more' };
        sets = $.extend(sets, opts);

        if (sets.isN) {
            $(sets.nOnj).removeClass('tip');
            $(sets.cObj).html('');
        } else {
            $(sets.nOnj).addClass('tip');
        }
    }
    //关闭窗口
    function closeWin(d) {
        var t = Pub.versions();
        if (t.weixin && !d) {
            WeixinJSBridge.call('closeWindow')
        } else {
            top.WeixinJSBridge.call('closeWindow')
        }
    }
    //时间格式化n:往前天数d:指定日期
    function sliceDate(n, d) {
        var tmp;
        if (d) {
            tmp = new Date(d);
        } else {
            tmp = new Date();
        }

        if (n) tmp.setDate(tmp.getDate() - n);
        tmp = tmp.toJSON().split('T')[0];
        return tmp.replace(/-/g, '/');
    }
    
    //获取验证码
    function getCode(t) {
        var obj = $(t), tel = obj.closest('.layui-m-layerchild').find("#telNum"), url = '/wx/sendcode';
        if (!obj.hasClass('disa') && Pub.validate(11, tel[0], '手机号', /^1\d{10}$/)) {
            obj.addClass('disa'); 
            ajaxY(url,
                { mobile: tel.val() },
                function (d) {
                    if (d && d.code == 0) {
                        Pub.msgTip(d.msg);

                        var times = 61;
                        setTime = setInterval(function () {
                            times--;
                            if (times <= 0) {
                                clearInterval(setTime);
                                obj.removeClass('disa').text('获取验证码')
                            } else {
                                obj.text(times + 's')
                            }
                        }, 1000);

                    } else {
                        Pub.msgTip(d.msg)
                    }
                    if (d.code != 0) obj.removeClass('disa');
                })
        }
    }
    //登录验证
    function login(t) {
        var obj = $(t), vOb = obj.closest('.layui-m-layerchild'), isAll = true,
            tObj = vOb.find("#telNum"),
            cObj = vOb.find("#codNum"), 
            tel = tObj.val(),
            cod = cObj.val();
        if (!Pub.validate(11, tObj[0], '手机号', /^1\d{10}$/)) {
            isAll = false;
        }
        if (isAll && !Pub.validate(6, cObj[0], '验证码', /\d/)) {
            isAll = false;
        } 
        if (isAll) {
            var url = '/wx/register';
            ajaxY(url,
                { mobile: tel, code: cod },
                function (d) {
                    if (d.code == 2) {
                        Pub.repUrl('/Home/Index');
                    } else if (d.code == 3 || d.code == 0) {
                        var uCook = $.cookie('uinfo');
                        if (uCook) uInfo = $.extend(uInfo, JSON.parse(uCook));
                        $.each(uInfo, function (i, v) { if (typeof (v) != 'number') uInfo[i] = v || '' }); 
                        Pub.msgTip('验证成功');
                        if (typeof (info) == 'function') { info() }
                        if (typeof (loadData) == 'function') { loadData(1) }
                        Pub.hideLogin();
                    } else {
                        Pub.msgTip(d.msg)
                    }
                })
        }
    }
    //提交数据验证
    function vali() {
        var msg = '', flag = true, vObj = $('.validate');
        for (var i = 0; i < vObj.length; i++) {
            var t = vObj.eq(i);
            if (!t.val()) {
                msg = t.attr("placeholder");
                flag = false;
                break;
            }

        }
        return { msg: msg, flag: flag };
    }
    //时间比较
    function checkEndTime(s, e) {
        var start = new Date(s.replace("-", "/").replace("-", "/"));
        var end = new Date(e.replace("-", "/").replace("-", "/"));
        if (end < start) { return false; }
        return true;
    }
    //计算时间差，几天前
    function jsDateDiff(publishTime) {
        var d_minutes, d_hours, d_days;
        _time = new Date(publishTime).getTime() / 1000;
        var timeNow = parseInt(new Date().getTime() / 1000);
        var d;
        d = timeNow - _time;
        d_days = parseInt(d / 86400);
        d_hours = parseInt(d / 3600);
        d_minutes = parseInt(d / 60);
        if (d_days > 0 && d_days < 4) {
            return d_days + "天前";
        } else if (d_days <= 0 && d_hours > 0) {
            return d_hours + "小时前";
        } else if (d_hours <= 0 && d_minutes > 0) {
            return d_minutes + "分钟前";
        } else if (d_minutes <= 0) {
            return "刚刚";
        } else {
            return publishTime;
        }
    }
    //设置cookie
    function setCookie(p, v) { $.cookie(p, v, { path: '/' }) }
    //单选按钮
    function changed(t, objs) {
        var obj = $(t).find('.rds'), has = obj.hasClass('change'), objs = objs || 'rds', discount = Number($(t).find('.discount').val()) || 1;
        if (!has) {
            $("." + objs + ".change").removeClass('change');
            obj.addClass('change');
            var txt = '', val = $('#at').data('value');
            if (discount < 1 && pd.out_trade_no.indexOf('E') == 0) {
                txt = '预存享' + (discount * 10) + '折，折后';
                val = (val * discount).toFixed(2) * 1;
            }

            var total = val;
            var useCpon = $('#loadCoupon').find('.rds').hasClass('change');
            if (useCpon) {
                $('#wxrds').addClass('change');
                total = val - $('#pay_coupon').data('value');
                total = total > 0 ? total : 0;
            }

            $('#payAt').text(total);
            $("#atDis").text(txt);
            $("#at").text(val);
        } else {
            if (obj.hasClass('coupon')) {
                obj.removeClass('change');
                $('#payAt').text($('#at').data('value'));
            }
        }
    }
    return {
        formToJson: formToJson,
        iOpen: iOpen,
        tip: function (opts) {
            var sets = {
                content: '',
                shadeClose: false,
                btn: ['我知道了']
            };
            sets = $.extend(sets, opts);

            layer.open(sets);
        },
        msgTip: function (msg) {
            layer.open({ skin: "msg", time: 2, content: msg });
        },
        testTip: testTip,
        ajaxY: ajaxY,
        showLoad: function () {
            $("#loading").show()
        },
        hideLoad: function () {
            $("#loading").fadeOut()
        },
        closeWin: closeWin,
        cScroll: function (id, opts) {
            opts = opts || {};//quadratic, circular, back, bounce, elastic
            var sets = { click: true, bounce: false, tap: false, probeType: 3, preventDefaultException: { className: /(^|\s)noPrevent(\s|$)/ } };
            sets = $.extend(sets, opts);
            return new IScroll('#' + id, sets);
        },
        tppl: tppl,
        loadHtml: loadHtml,
        noData: noData,
        versions: function () {//浏览器检测
            var u = navigator.userAgent;
            return {
                weixin: u.indexOf('MicroMessenger') > -1, //是否微信
                alipay: u.indexOf('Alipay') > -1, //是否支付宝
            };
        },
        sliceDate: sliceDate,
        isali:function(val){
            var v=val;
            if(val.indexOf("http") <= -1){
                v='http://wufunong.oss-cn-shenzhen.aliyuncs.com/' + val;
            }
            return v;
        },
        tareaIn: tareaIn,//多行文本输入控制
        repUrl: function (u) {
            location.replace(u);
        },
        imgNoFind: function (img, t) {
            if (t == undefined) t = 1;
            var eri = ["data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQImWNgYGBgAAAABQABh6FO1AAAAABJRU5ErkJggg==",
                "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAJAQMAAAAB5D5xAAAAA1BMVEUAAACnej3aAAAAAXRSTlMAQObYZgAAAApJREFUCNdjwA0AABsAAQrj5HwAAAAASUVORK5CYII=",
                "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEsAAAA5AQMAAABEakRjAAAAA1BMVEUAAACnej3aAAAAAXRSTlMAQObYZgAAAA5JREFUKM9jGAWjgL4AAAJzAAGTs3WOAAAAAElFTkSuQmCC"];
            img.src = eri[t];
            img.onerror = null;
        },
        inputNum: function (t, len) {
            var val = t.value;
            val = val.replace(/[^\d]/g, '');//非数字的都替换掉
            val = val.substr(0, len);
            t.value = val;
        },
        getCode: getCode,//获取验证码
        login: login,
        hideLogin: function (d) {
            if (typeof (isClose) == "number" && d) { Pub.closeWin() }
            else {
                $("#regist").hide().find("input").val("");
                clearInterval(setTime);
                $("#getCode").removeClass('disa').text('获取验证码')
            }
        },
        validate: function (len, t, msg, re) {
            var obj = $(t), val = obj.val(), err1 = "不正确", err2 = "请输入", result = true;
            if (val.length == 0) {
                Pub.msgTip(err2 + msg);
                result = false;
            } else if (val.length < len) {
                Pub.msgTip(msg + err1);
                result = false;
            }

            return result;
        },
        isLogin: function (fn) {
            var mid = uInfo.mid;
             
            if (mid>0) {
                if (typeof (fn) == 'function') fn()
            } else {
                $("#regist").show()
            }
        },
        getParam: function (key) {
            // 获取参数
            var url = window.location.search;
            // 正则筛选地址栏
            var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)");
            // 匹配目标参数
            var result = url.substr(1).match(reg);
            //返回参数值
            return result ? decodeURIComponent(result[2]) : null;
        },
        vali: vali,
        checkEndTime: checkEndTime,
        setCookie: setCookie,
        iOS: /(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent),
        changed: changed
    };
})(window);