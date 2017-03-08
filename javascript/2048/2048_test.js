var arr = [
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [2, 4, 2, 2],
  [0, 0, 0, 2]
]

function $(id) {
  return document.getElementById(id);
}
var obj = {
  r: 0,
  c: 0,
  f: 0, //r行  c列  f查找的下一位置
  selction: 0,
  //              r,c,数组行列  sta,end,out: for循坏的三个表达式
  //查找下一个不为0的数值的位置
  find: function(r, c, start, condition, direction) {
    for (var f = start; eval(condition); f += direction) {
      if (arr[r][f] != 0) {
        return f;
      }
    }
    return -1; //循环结束仍然没有找到！=0的数值，返回-1
  },
  moveLeft: function(r) {
    var next;
    for (c = 0; c < arr[r].length; c++) {
      next = obj.find(r, c, c + 1, "f < arr[r].length", 1); //找出第一个不为0的位置
      if (next == -1) break; //没有找到就返回
      //如果当前位置为0
      if (arr[r][c] == 0) {
        arr[r][c] = arr[r][next]; //把找到的不为0的数值替换为当前位置的值
        arr[r][next] = 0; //找到的位置清0
        c--; //再次循环多一次，查看后面否有值与替换后的值相同，
      } else if (arr[r][c] == arr[r][next]) { //如果当前位置与找到的位置数值相等，则相加
        arr[r][c] *= 2;
        arr[r][next] = 0;
      }
    }
  },
  //更新显示
  updateView: function() {
    for (r = 0; r < arr.length; r++) {
      for (c = 0; c < arr[r].length; c++) {
        if (arr[r][c] == 0) { //值为0的不显示
          $("c" + r + c).innerHTML = "";
        } else {
          $("c" + r + c).innerHTML = arr[r][c];
        }
      }
    }
  },
  computed: function(start, end, k) {
    // 循环 arr数组 从左到右
    var before, //没处理前
      after; //after处理后   nextc 清零的位置
    before = arr.toString();
    for (r = start; r < end; r += k) {
      obj.moveLeft(r);
    }
    after = arr.toString();
    if (before != after) { //前后对比，如果不同就update
      obj.updateView();
    }

    // if 当前位置 不为零
    // 从当前位置，下一个成员开始，遍历，
    // 如果找到，与当前位置相等的数，
    // 两者相加，并把不为零的成员，设置为零
    // 如果 当前位置是 零
    // 从当前位置下一个成员开始遍历
    // 如果找到 第一个不为零的成员
    // 当前位置数值设置为这个不为零的成员的值 ，并且把那个不为零的成员设置为 0
  },
  moveRight: function() {
    for (r = 0; r < arr.length; r++) {
      for (c = arr[r].length - 1; c >= 0; c--) {
        if (arr[r][c] != 0) { //当前位置不是0
          obj.find(r, c, c - 1, "f>=0", -1, 1);
        } else { //当前位置是0
          obj.find(r, c, c - 1, "f>=0", -1, 0);
        }
      }
    }
  },
  moveUp: function() {
    for (r = 0; r < arr.length; r++) {
      for (c = 0; c < arr[r].length; c++) {
        for (f = r + 1; f < arr.length; f++) {
          if (arr[r][c] != 0) { //当前位置不是0
            if (arr[r][c] == arr[f][c]) {
              arr[r][c] += arr[f][c];
              arr[f][c] = 0;
              $("c" + r + c).innerHTML = arr[r][c];
              $("c" + f + c).innerHTML = "";
            }
            break;
          } else { //当前位置是0
            if (arr[f][c] != 0) {
              arr[r][c] = arr[f][c];
              arr[f][c] = 0;
              $("c" + r + c).innerHTML = arr[r][c];
              $("c" + f + c).innerHTML = "";
              for (var i = f; i < arr.length; i++) {
                if (arr[i][c] != 0 && arr[i][c] != arr[r][c]) {
                  break;
                }
                if (arr[r][c] == arr[i][c]) {
                  arr[r][c] += arr[i][c];
                  arr[i][c] = 0;
                  $("c" + r + c).innerHTML = arr[r][c];
                  $("c" + i + c).innerHTML = "";
                  break;
                }
              }
              break; //替换后跳出循坏
            }
          }
        }
      }
    }
  },
  moveDown: function() {
    for (r = arr.length - 1; r >= 0; r--) {
      for (c = 0; c < arr[r].length; c++) {
        for (f = r - 1; f >= 0; f--) {
          if (arr[r][c] != 0) { //当前位置不是0
            if (arr[r][c] == arr[f][c]) {
              arr[r][c] += arr[f][c];
              arr[f][c] = 0;
              $("c" + r + c).innerHTML = arr[r][c];
              $("c" + f + c).innerHTML = "";
            }
            break;
          } else { //当前位置是0
            if (arr[f][c] != 0) {
              arr[r][c] = arr[f][c];
              arr[f][c] = 0;
              $("c" + r + c).innerHTML = arr[r][c];
              $("c" + f + c).innerHTML = "";
              for (var i = f; i >= 0; i--) {
                if (arr[i][c] != 0 && arr[i][c] != arr[r][c]) {
                  break;
                }
                if (arr[r][c] == arr[i][c]) {
                  arr[r][c] += arr[i][c];
                  arr[i][c] = 0;
                  $("c" + r + c).innerHTML = arr[r][c];
                  $("c" + i + c).innerHTML = "";
                  break;
                }
              }
              break; //替换后跳出循坏
            }
            break;
          }
        }
      }
    }
  }
  //document.onfeydown = function() {
  //computed();
  //}
}

document.onkeydown = function(e) { //自动获得事件对象
  switch (e.keyCode) { //判断按键号
    case 37:
      selction = 1;
      obj.computed(0, arr.length, 1);
      break;
      // case 38:
      //   obj.moveUp();
      //   break;
      // case 39:
      //   selction = 3;
      //   obj.moveRight();
      //   break;
      // case 40:
      //   obj.moveDown();
      //   break;
  }
}
