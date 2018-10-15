// 异步中间件
const Koa = require('koa')
const app = new Koa();
const fs = require('fs.promised')


const main = async function (ctx, next) {
    ctx.response.type = 'html'
    ctx.response.body = await fs.readFile('./template04.html', 'utf8')
}
app.use(main)

app.listen(3000)