var express = require('express')
var server = express()
var bodyParser = require('body-parser')

server.use(bodyParser.json()); // 支持json 格式
// server.use(bodyParser.json()); // 支持json 格式
server.use(bodyParser.urlencoded({
  extended: true
})) // 支持默认 x-www-form-urlencoded

server.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type,Accept");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By", ' 3.2.1');
  res.header("Access-Control-Allow-Credentials", true); // 允许发送cookie 认证
  // res.header("Content-Type", "application/x-www-form-urlencoded; charset=utf-8");
  next();
});

var port = process.env.PORT || 8081
var router = express.Router()
// jsonp
router.get('/jp/:callback', (req, res) => {
  console.log(req.params)
  let callback = req.params.callback
  let data = {
    test: 'msg',
    code: 200
  }
  res.jsonp(`${callback}(${JSON.stringify(data)})`)
})

// request 请求   response 响应
router.get('/:name', (request, response) => {
  // 服务端接收到客户的的请求参数全部放在request 对象中，
  var params = request.params
  // 接收到一个请求时，在git bash把请求的参数log出来
  console.log(params)
  // 给客户端，需要的响应 200 表示连接成功
  response.status(200)
  // 给客户的响应对应的数据 （json 表示以json格式发送数据）
  response.json({
    name: params,
    msg: 'your request is success.'
  })
})

function isObj(data) {
  if (Object.prototype.toString.call(data).indexOf('Object') > -1) {
    return 'Object'
  }
}

var datas = []

// post 请求
router.post('/signup', (request, response) => {
  // var json = request.body
  // 1.用户名 密码 确认密码 手机号码 验证码 手机验证码 确认同意条款
  let {uname, pwd, surePwd, phoneNO, sureCode, phoneSure, sureDeal} = request.body
  if (!uname || !pwd || !surePwd || !phoneNO || !sureCode || !phoneSure) {
    response.status(200).json({code: '401', signUp: false, msg: 'some data is empty'})
  }else {
    if (phoneNO.match(/(\+86|0086)?\s*1[34578]\d{9}/g) === null) {
      response.status(200).json({code: '1001', signUp: false, msg: '电话号码格式不正确。'})
    } else if(!sureDeal) {
      response.status(200).json({code: '1002', signUp: false, msg: `user not sureDeal.`});
    }else {
      datas.push({ uname, pwd, surePwd, phoneNO, sureCode, phoneSure, sureDeal})
      console.log(datas);
      response.status(200).json({code: '200', signUp: true, msg: `sign up sucess.`});
    }
  }
})

// 请求根目录
server.use('/home', router)

server.listen(port)

console.log(`http://localhost:${port}`);
