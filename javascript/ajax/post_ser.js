var express = require('express')
var server = express()
var bodyParser = require('body-parser')

// 解决本地调试 跨域请求
// server.all('*', function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type,Accept");
//   res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
//   res.header("X-Powered-By",' 3.2.1');
//   res.header("Content-Type", "application/x-www-form-urlencoded; charset=utf-8");
//   next();
// });

server.use(bodyParser.json()); // 支持json 格式
server.use(bodyParser.urlencoded({
  extended: true
})) // 支持默认 x-www-form-urlencoded

var port = process.env.PORT || 8081
var router = express.Router()
router.get('/get/:page/:name', (req, res) => {
  let {
    page,
    name
  } = req.params
  if (!page || page === '1') {
    res.send(`<h3>the page is ${page},and name is ${name}</h3>`);
  } else {
    res.send(`<h3>the next page is no defined!</h3>`);
  }
})

router.post('/login', (req, res) => {
  res.status(200).json({
    name: req.body.name,
    msg: 'test success.'
  })
  // if(req.body.accesstoken === '30589745-03b5-4a53-85c7-df327fe17c48') {
  //   res.status(200).json({code: '200', data: [1,2,3,4,5], msg: 'welcome, Alice login success.', success: true})
  // } else {
  //   res.status(1001).json({code: '1001', data: [], msg: 'sorry, you need to use to get pars.'})
  // }
})

router.post('/wklist', (req, res) => {
  var {
    page,
    projectCode
  } = req.body
  if (projectCode === 'T0001') {
    res.json({
      code: '200',
      data: [{
        wkNo: 'test001',
        wkStep: {
          steps: 'say hello',
          makeMn: 'make_money'
        }
      }],
      msg: 'get data successful'
    })
  } else {
    res.send(`<h1>so sad to get nothing back</h1>`);
  }
})

server.use('/home', router)

server.listen(port)

console.log(`http://localhost:${port}`);
