var koa = require('koa')
var render = require('koa-swig');
var serve = require('koa-static');
var co = require('co');
var path = require('path')
var app = new koa()

app.context.render = co.wrap(render({
  root: path.join(__dirname, './dist'),   //连成需要的路径：/koa-test/view/
  cache: false,
  ext: 'html',
  writeBody: false
}));

app.use(serve(path.join(__dirname, '/dist')))

app.use(async ctx => ctx.body = await ctx.render('index'))


var port = 3030
app.listen(port)
console.log(`项目已启动，正在监听${port}`)