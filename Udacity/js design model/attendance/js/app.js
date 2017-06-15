$(function() {
  // M
  var model = {
    name: ["Slappy the Frog", "Lilly the Lizard", "Paulrus the Walrus",
    "Gregory the Goat", "Adam the Anaconda"],

    newAttendance: null,

    init: function() {
      this.count = 0;
      if (!localStorage.attendance) {
        console.log('Creating attendance records...');
        function getRandom() {
            return (Math.random() >= 0.5);
        }
      var attendance = {};
        this.name.forEach(function(name) {
            attendance[name] = [];
            // attendance[name].countMissing = 0;
            for (var i = 0; i <= 11; i++) {
                attendance[name].push(getRandom());
            }
        });
        localStorage.attendance = JSON.stringify(attendance);
      }
    },

    countMissing: function() {
      this.count ++;
    }
  };

  // O
  var octopus = {
    init: function() {
      model.init();
      studentView.init();
    },

    // 获取学生姓名
    getStudentName: function() {
      return model.name;
    },

    // 获取attendance
    getAttendance: function() {
      return JSON.parse(localStorage.attendance);
    },

    // 设置missing值
    setCountMissing: function() {
      model.countMissing();
    },

    // 获取missing值
    getCountMissing: function() {
      return model.count;
    },

    // missing清零
    resetCountMissing: function() {
      model.count = 0;
    },

    // 新建attendance
    createAttendance: function(name) {
      model.newAttendance = {};
    },

    // 添加学生姓名到新的attendace
    addNameToAttendance: function(name) {
      model.newAttendance[name] = [];
    },

    // 设置新的attendace
    setNewAttendance: function(name, value) {
      model.newAttendance[name].push(value);
    },

    // 获取新的attendace
    getNewAttendance: function() {
      return model.newAttendance;
    }
  };

  // V
  var studentView = {
    init: function() {
      var _this = this;
      this.tbody = $("tbody");
      _this.students = octopus.getStudentName();
      this.render();
      this.CountMissed();

      // When a checkbox is clicked, update localStorage
      var $allCheckboxes = $('tbody input');
      $allCheckboxes.on('click', function() {
        var studentRows = $('tbody .student');
        octopus.createAttendance();

        studentRows.each(function(index) {
          var $allCheckboxes = $(this).children('td').children('input');

          // 添加学生姓名到新的考勤对象
          octopus.addNameToAttendance(_this.students[index]);

          $allCheckboxes.each(function() {
            // 设置新的checkedbox状态
            octopus.setNewAttendance(_this.students[index],
            $(this).prop('checked'));
          });
        });

        var newAttendance = octopus.getNewAttendance();
        _this.CountMissed();
        // 更新考勤信息
        localStorage.attendance = JSON.stringify(newAttendance);
      });
    },

    // 计算missed值
    CountMissed: function() {
      var $allMissed = $('tbody .missed-col'),
      $allCheckboxes = $('tbody input');
      $allMissed.each(function(index) {
        var studentRow = $(this).parent('tr'),
            dayChecks = $(studentRow).children('td').children('input');

        // 遍历input元素
        dayChecks.each(function() {
          // 没有被选择 则 +1
          if (!$(this).prop('checked')) {
            octopus.setCountMissing();
          }
        });
        // 获取miss的值
        var count = octopus.getCountMissing();
        $(this).text(count);
        // missed值重置
        octopus.resetCountMissing();
      });
    },

    // 画出考勤表
    render: function() {
      // 从章鱼那获取attendance
      var attendance = octopus.getAttendance();

      // 画出学生checkbox表格
      for(var i = 0; i < this.students.length; i ++) {
        // 创建tr标签
        var tr = $('<tr class="student"></tr>');

        // 创建td标签显示student's name
        var tdStdName =$('<td class="name-col">' + this.students[i] + '</td>');
        // 添加studen's name到tr
        tdStdName.appendTo(tr);

        // 创建 td attend-col 类
        for(var j = 0; j < 12; j ++) {
          var tdAtdcol = $('<td class="attend-col"><input type="checkbox"></td>');
          tdAtdcol.appendTo(tr);
        }

        // 创建 td missed-col类
        var tdMissedCol = $('<td class="missed-col">0</td>');
        tdMissedCol.appendTo(tr)
        // 将td添加入tobdy
        this.tbody.append(tr);
      }

      // Check boxes, based on attendace records
      // 遍历attendace 更新checkebox的状态
      $.each(attendance, function(name, days) {
          var studentRow = $('tbody .name-col:contains(' + name + ')').parent('tr'),
              dayChecks = $(studentRow).children('.attend-col').children('input');
          dayChecks.each(function(i) {
              $(this).prop('checked', days[i]);
          });
      });
    }
  }
  octopus.init();
})
