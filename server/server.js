const koa = require('koa')
const app = new koa()

app.use(async ctx=>{
    ctx.body = 'hello world'
    console.log(ctx)
})
app.listen(3000, _=>{
    console.log('3000')
})