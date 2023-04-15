var http = require('http')
var fs = require('fs')
var url = require('url')
var port = process.argv[2]

if(!port){
  console.log('Usage: node server.js 8888')
  process.exit(1)
}

var server = http.createServer(function(request, response){
  var parsedUrl = url.parse(request.url, true)
  var pathWithQuery = request.url 
  var queryString = ''
  if(pathWithQuery.indexOf('?') >= 0){ queryString = pathWithQuery.substring(pathWithQuery.indexOf('?')) }
  var path = parsedUrl.pathname
  var query = parsedUrl.query
  var method = request.method

  console.log('有人发请求过来啦！路径（带查询参数）为' + pathWithQuery)

  response.statusCode = 200
 

  const filePath=path==='/' ? '/index.html':path
  console.log(filePath)
  const index=filePath.lastIndexOf('.')
  const suffix=filePath.substring(index)
  const fileType={
    '.html':'text/html',
    '.css':'text/css',
    '.js':'text/javaScript'
  }
  response.setHeader('Content-Type', `${fileType[suffix] || 'text/html'};charset=utf-8`)

  let content
  try{
    content=fs.readFileSync(`.${filePath}`)
  }catch(error){
    content='这个文件不存在'
    response.statusCode=404
  }
  response.write(content)
  response.end()
 
})

server.listen(port)
console.log('监听 ' + port + ' 成功\n请用游览器打开 http://localhost:' + port)