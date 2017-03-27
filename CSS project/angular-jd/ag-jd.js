angular.module('jd', [])
  .controller('signup', function($scope, $http) {
    $scope.name = 'Allce', $scope.setPwd = '123456', $scope.confirm = '123456', $scope.phonenum = '123',
      $scope.veriCode = '123', $scope.phoCode = '123', $scope.sureDeal;
    $scope.show;
    $scope.content, $scope.surebtn;
    $scope.change = {
      "background-color": 'red',
    }
    $scope.agreeReg = function() {
      $scope.show = 1;
      $http({
        method: "GET",
        url: 'http://localhost:8081/home/signup',

        // data: {
        //   uname: $scope.name,
        //   pwd: $scope.setPwd,
        //   surePwd: $scope.confirm,
        //   phoneNO: $scope.phonenum,
        //   sureCode: $scope.veriCode,
        //   phoneSure: $scope.phoCode,
        //   sureDeal: $scope.sureDeal,
        // }
      }).then(function success(response) {
        console.log(response);
        if (Object.prototype.toString.call(response).indexOf("Object") > -1) {
          $scope.content = response.data.msg;
          $scope.change = {
            "background-color": "#75DF2D",
          }
          $scope.surebtn = "登录"
        }

      }, function err(response) {
        console.log(response);
        if (Object.prototype.toString.call(response).indexOf("Object") > -1) {
          $scope.content = response.data.msg;
          $scope.change = {
            "background-color": "red",
          }
          $scope.surebtn = "确定"
        }
      })
    }
    $scope.sure = function() {
      $scope.show = 0;
    }
  })
