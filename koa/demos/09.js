// 中间件 在 HTTP Request 和 HTTP Response 中间，用来实现某种中间功能

const Koa = require('koa')
const app = new Koa();

const logger = (ctx, next) => {
    console.log(`${Date.now()}${ctx.request.method}${ctx.request.url}`);
    next()
}

app.use(logger)

app.listen(3000)