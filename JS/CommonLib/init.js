var scr, size = 60,
  page = 1,
  more = true,
  wHei, setTime, uInfo = {
    mid: '',
    mobile: '',
    wxheadic: ''
  };
$.ajaxSetup({
  error: function(xhr, status, e) {
    if (xhr.status == 500 || xhr.status == 404) Pub.msgTip('系统累趴了')
  },
  complete: function(xhr, status) {
    Pub.hideLoad()
  },
  beforeSend: function(xhr) {
    Pub.showLoad()
  }
});
var scrObj = document.getElementById('scrObj'),
  scrCon = document.getElementById('scroll');
$(function() {
  wHei = $(window).height();

  $("#noScro,#loading,#regist,#fBtn,#areaBg").on('touchmove', function(e) {
    e.preventDefault()
  });
  if ($("#fBtn").length > 0) {
    FastClick.attach(document.getElementById('fBtn'))
  }
  scr = Pub.cScroll('scroll');
  scr.on('beforeScrollStart', function() {
    var scHei = scr.scrollerHeight,
      soHei = scrObj.offsetHeight;
    if (soHei > scHei || (soHei < scHei && scrCon.offsetHeight < scHei)) {
      scr.refresh()
    }
  });
  scr.on('scrollStart', function() {
    if (scr.directionY == 1) {
      $(".person").addClass('c1')
    } else {
      $(".person").removeClass('c1')
    }
  });

  $("input").on('focus', function() {
    $(this).select();
  });

  $(".input").on("focus", function() {
    if (Pub.iOS) return;
    var obj = $(this).closest('.layCon').prev()[0];
    setTimeout(function() {
      scr.refresh();
      scr.scrollToElement(obj)
    }, 300);
  });
  var uCook = $.cookie('uinfo');
  if (uCook) uInfo = $.extend(uInfo, JSON.parse(uCook));
  $.each(uInfo, function(i, v) {
    if (typeof(v) != 'number') uInfo[i] = v || ''
  });
  $(window).on('hashchange', function() {
    var cook = $.cookie('reload') || false;
    var url = location.hash.indexOf('#') === 0 ? location.hash : '#';
    if (url == '#') {
      if (cook && cook != 'false') {
        Pub.setCookie("reload", false);
        location.reload(true);
      }
      layer.closeAll();
    }
  });
});
