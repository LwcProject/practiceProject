// 直接读取网页模板
const Koa = require('koa')
const app = new Koa();

const fs = require('fs')
const main = ctx => {
    ctx.response.type = 'html'
    ctx.response.body = fs.createReadStream('./template04.html')
}

app.use(main)

app.listen(3000)