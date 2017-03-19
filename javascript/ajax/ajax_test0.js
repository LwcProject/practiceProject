var express = require('express')
var server = express()
var bodyParser = require('body-parser')

server.use(bodyParser.json()); // 支持json 格式
server.use(bodyParser.urlencoded({
  extended: true
})) // 支持默认 x-www-form-urlencoded

server.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type,Accept");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By", ' 3.2.1');
  res.header("Access-Control-Allow-Credentials", true); // 允许发送cookie 认证
  res.header("Content-Type", "application/x-www-form-urlencoded; charset=utf-8");
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

var users = [{
  uname: 'Allce',
  pwd: '123456'
}]

function isObj(data) {
  if (Object.prototype.toString.call(data).indexOf('Object') > -1) {
    return 'Object'
  }
}

// post 请求
router.post('/login', (request, response) => {
  // 服务端接收到客户的的请求参数全部放在request 对象中，
  var userDatas = request.body
  console.log(request.body)
  // 查数据库是否有此用户
  if (isObj(userDatas)) {
    for (var i = 0; i < users.length; i++) {
      if (users[i].uname === userDatas.uname) {
        if (userDatas.pwd === users[i].pwd) {
          response.status(200).json({
            success: true,
            msg: 'welcome to login here, and have fun.'
          })
        } else {
          response.status(200).json({
            success: false,
            msg: 'the user pwd is not right.'
          })
        }
      }
    }
    response.status(401).json({
      code: 401,
      msg: 'this use is not sign up, please sign up, and have fun.'
    })
  } else {
    response.status(401).json({
      code: 401,
      msg: 'this use is not sign up'
    })
  }
  // // 接收到一个请求时，在git bash把请求的参数log出来
  // console.log(json)
  // // 给客户端，需要的响应 200 表示连接成功
  // response.status(200)
  // // 给客户的响应对应的数据 （json 表示以json格式发送数据）
  // response.json({
  //   name: 'json',
  //   say: function() {
  //     alert('I just want to talk to you hello.')
  //   },
  //   msg: 'your post request is success.'
  // })
})

// 请求根目录
server.use('/home', router)

server.listen(port)

console.log(`http://localhost:${port}`);
