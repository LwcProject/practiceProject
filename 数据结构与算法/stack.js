function Stack () {
  var items = []

  // 从栈顶添加元素, 压栈
  this.push = function (item) {
    items.push(item)
  }

  // 弹出栈顶元素
  this.pop = function () {
    return items.pop()
  }

  // 返回栈顶元素
  this.top = function () {
    return items[items.length - 1]
  }

  // 判断栈是否为空
  this.isEmpty = function () {
    return items.length === 0
  }

  // 返回栈的大小
  this.size = function () {
    return items.length
  }

  // 清空栈
  this.clear = function () {
    items = []
  }
}

function MinStack () {
  var data_stack = new Stack() // 存储数据的
  var min_stack = new Stack() // 存储最小值

  // push 方法
  this.push = function (item) {
    data_stack.push(item)
    // min_stack 为空或者栈顶元素大于item
    if (min_stack.isEmpty() || item < min_stack.top()) {
      min_stack.push(item)
    } else {
      min_stack.push(min_stack.top())
    }
  }

  // 弹出栈顶元素
  this.pop = function () {
    data_stack.pop()
    min_stack.top()
  }

  // 返回栈最小值
  this.min = function () {
    return min_stack.top()
  }
}

// 判断字符串括号是否合法
function is_leagl_brackets (string) {
  var stack = new Stack()
  for (var i = 0; i < string.length; i++) {
    var item = string[i]
    // 遇到左括号入栈
    if (item === '(') {
      stack.push(item)
    } else if (item === ')') {
      // 遇到右括号，判断栈是否为空
      if (stack.isEmpty()) {
        return false
      } else {
         stack.pop() // 弹出左括号
      }
    }
  }
  // 如果为空，说明字符串括号合法
  return stack.isEmpty()
}
// console.log(is_leagl_brackets("sdf(df(we(fsdaf)))fadd"))
// console.log(is_leagl_brackets(')()()sd()(sd(fads))('));

// 计算后缀表达式
function calc_exp (exp) {
  var stack = new Stack()
  for (var i = 0; i < exp.length; i ++) {
    var item = exp[i]
    if (['+', '-', '*', '/'].indexOf(item) >= 0) {
      var value_1 = stack.pop()
      var value_2 = stack.pop()
      // 第一次弹出的数放运算符左边，第二个弹出的数放运算法右边
      var exp_str = value_2 + item + value_1
      // 计算并取整
      var res = parseInt(eval(exp_str));
      stack.push(res.toString())
    } else {
      stack.push(item)
    }
  }
  return stack.pop()
}
// console.log(calc_exp(["4", "13", "5", "/", "+"]))


// minstack = new MinStack()
// minstack.push(3)
// minstack.push(4)
// minstack.push(8)
// console.log(minstack.min());
// minstack.push(2)
// console.log(minstack.min());

// 运算符优先级
var priority_map = {
  '+': 1,
  '-': 1,
  '*': 2,
  '/': 2
}
function infix_exp_2_postfix_exp (exp) {
  var stack = new Stack()
  var postfix_lst = []
  for (let i = 0; i < exp.length; i++) {
    var item = exp[i];
    // 如果是数字
    if (!isNaN(item)) {
      postfix_lst.push(item)
    } else if (item === '(') {
      // 遇左括号入栈
      stack.push(item)
    } else if (item === ')') {
      // 遇到右括号把栈顶元素弹出，直到遇到做括号
      while (stack.top() !== '(') {
        postfix_lst.push(stack.pop())
      }
      stack.pop() // 左括号入栈
    } else {
      // 遇到运算符，把栈顶的运算符弹出，直到栈顶的运算符优先级小于当前运算符
      while (!stack.isEmpty() && ['+', '-', '*', '/'].indexOf(stack.top()) > 0 
      && priority_map[stack.top()] >  priority_map[item]) {
        // 把弹出的运算符加入到postfix_lst
        postfix_lst.push(stack.pop())
      }
      // 当前运算符入栈
      stack.push(item)
    }
  }
  // 循环结束，栈最后可能还有元素，都弹出放入postfix_lst
  while(!stack.isEmpty()) {
    postfix_lst.push(stack.pop())
  }
  return postfix_lst
}

console.log(infix_exp_2_postfix_exp(['12', '+', '3']));
console.log(infix_exp_2_postfix_exp(['(', '3', '+', '(', '4', '+', '5',')', '-', '3', ')']));
console.log(infix_exp_2_postfix_exp(['(', '12', '/', '3', ')', '*', '5', '+', '9']))
