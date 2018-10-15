// 错误处理
const Koa = require('koa')
const app = new Koa();

const main = ctx => {
//    ctx.throw(500)
    ctx.response.status = 400;
    ctx.response.body = 'page not found'
}

app.use(main)

app.listen(3000)