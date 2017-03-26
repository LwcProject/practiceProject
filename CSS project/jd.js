// function $(selector) {
//   return document.querySelectorAll(selector);
// }
// $("#agreeReg")[0].onclick = function() {
//   var xhr = null;
//   if ($("#setPwd")[0].value !== $("#confirm")[0].value) {
//     alert("设置密码和确认密码不一致")
//   }
//   if (window.XMLHttpRequest) {
//     xhr = new window.XMLHttpRequest();
//   } else {
//     xhr = new ActiveXObject("Microsoft.XHttp")
//   }
//   xhr.onreadystatechange = function() {
//     if (xhr.readyState == 4 && xhr.status == 200) {
//       var req = JSON.parse(xhr.response);
//       console.log(req);
//       console.log(xhr.responseText);
//     }
//   }
//
//   xhr.open("post", "http://192.168.1.103:8081/home/signup", true);
//   // xhr.setRequestHeader('Content-Type', 'application/json;chartset=utf-8')
//   xhr.setRequestHeader('Content-Type', 'application/json; chartset=utf-8')
//   xhr.send(JSON.stringify({
//     uname: $("#name")[0].value,
//     pwd: $("#setPwd")[0].value,
//     surePwd: $("#confirm")[0].value,
//     phoneNO: $("#phonenum")[0].value,
//     sureCode: 1234,
//     phoneSure: 1234,
//     sureDeal: $("#sureDeal")[0].checked,
//   }))
// }
$("#agreeReg").click(function() {
  // $.post("http://lvy-VAIO:8081/home/signup", {
  //     uname: $("#name")[0].value,
  //     pwd: $("#setPwd")[0].value,
  //     surePwd: $("#confirm")[0].value,
  //     phoneNO: $("#phonenum")[0].value,
  //     sureCode: 1234,
  //     phoneSure: 1234,
  //     sureDeal: $("#sureDeal")[0].checked,
  //   },
  //   function(data, status) {
  //     console.log(data);
  //     $(".result-show").css("display", "block");
  //     $(".backgd").css("display", "block");
  //     if (data.code == 200) {
  //       $(".result-content").html("注册成功!");
  //       $("#sure").html("登录").css("background", "#75DF2D");
  //     } else {
  //       $(".result-content").html("该账号已被注册，请重新注册");
  //       $("#sure").html("确定").css("background", "red");
  //     }
  //   },"json"
  // );

  $.ajax({
    url: "http://lvy-VAIO:8081/home/signup",
    type: "POST",
    dataType: "json",
    data: JSON.stringify({
      uname: $("#name")[0].value,
      pwd: $("#setPwd")[0].value,
      surePwd: $("#confirm")[0].value,
      phoneNO: $("#phonenum")[0].value,
      sureCode: 1234,
      phoneSure: 1234,
      sureDeal: $("#sureDeal")[0].checked,
    }),
    contentType: "application/json",
    success: function(result, status, xhr) {
      console.log(status);
      console.log(xhr.status);
      if (Object.prototype.toString.call(result).indexOf("Object") > -1) {
        $(".result-show").css("display", "block");
        $(".backgd").css("display", "block");
        if (result.code && result.code == 200) {
          $(".result-content").html("注册成功!");
          $("#sure").html("登录").css("background", "#75DF2D");
        } else {
          $(".result-content").html("该账号已被注册，请重新注册");
          $("#sure").html("确定").css("background", "red");
        }
      } else {
        alert("服务器数据不正确，请联系客服！")
      }

    },
    error: function(xhr, status, err) {
      console.log(xhr.status);
      console.log(err);
    },

  })
})

$("#sure").click(function() {
  $(".result-show").css("display", "none");
  $(".backgd").css("display", "none");
})
