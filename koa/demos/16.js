// 处理错误的中间件
const Koa = require('koa')
const app = new Koa();

const handler = async (ctx, next) => {
    try {
        await next();
    } catch (err) {
        ctx.response.status = err.statusCode || err.status || 500;
        ctx.response.type = 'html'
        ctx.response.body = '<p>somthing wrong, please contact administrator</p>'
        ctx.app.emit('error', err, ctx)
    }
}

const main = ctx => {
   ctx.throw(500)
}

app.on('error', (err, ctx) => {
    console.error('logging  error', err);
    console.log(err);
    
})

app.use(main)

app.listen(3000)