const Koa = require('koa')
const app = new Koa();

const main = ctx => {
    const req = ctx.request;
    if (req.accepts('xml')) {
        ctx.response.type = 'xml'
        ctx.response.body = '<data>hello world</data>'
    } else if (req.accepts('json')) {
        ctx.response.type = 'json'
        ctx.response.body = {data: 'hello world'}
    } else if (req.accepts('html')) {
        ctx.response.type = 'html'
        ctx.response.body = '<p>hello world</p>'
    } else {
        ctx.response.type = 'text'
        ctx.response.body = 'hello world'
    }
}
app.use(main)

app.listen(3000)