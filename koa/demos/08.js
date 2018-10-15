// 重定向
const Koa = require('koa')
const app = new Koa();
const route = require('koa-route')

const redirect = ctx => {
    ctx.response.redirect('/')
    ctx.response.body = '<a href="/">Index page</a>'
}

const main = ctx => {
    ctx.response.body = 'hello world'
}

app.use(route.get('/', main));
app.use(route.get('/redirect', redirect));

app.listen(3000)