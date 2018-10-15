// 处理错误的中间件
const Koa = require('koa')
const app = new Koa();


const main = ctx => {
   const n = Number(ctx.cookies.get('view') || 0) + 1
   console.log(n);
   
   ctx.response.body = n + 'views'
   ctx.cookies.set('view', n)
}

app.use(main)

app.listen(3000)