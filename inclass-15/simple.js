const http = require('http')

const host = '127.0.0.1'
const port = 3333 || process.env.PORT

http.createServer(preprocess).listen(port, host)
console.log(`Server running at http://${host}:${port}`)

function preprocess(req, res) {
     let body = ''
     req.on('data', function(chunk) {
          body += chunk
     })
     req.on('end', function() {
          req.body = body
          server(req, res)
     })
}

function server(req, res) {
     console.log('Request method        :', req.method)
     console.log('Request URL           :', req.url)
     console.log('Request content-type  :', req.headers['content-type'])
     console.log('Request payload       :', req.body)

     if (req.url == '/' && req.method == 'GET') {
         const payload = { 'hello': 'world' }
         res.setHeader('Content-Type', 'application/json')
         res.statusCode = 200
         res.end(JSON.stringify(payload))
     } else if (req.url == '/articles' && req.method == 'GET') {
         const payload = {
             'articles': [
                 { 'id': 1, 'author': 'Scott', 'body': 'A post' },
                 { 'id': 2, 'author': 'author2', 'body': 'body2' },
                 { 'id': 3, 'author': 'author3', 'body': 'body3' },
             ]
         }
         res.setHeader('Content-Type', 'application/json')
         res.statusCode = 200
         res.end(JSON.stringify(payload))
     } else if (req.url == '/login' && req.method == 'POST') {
         var body = JSON.parse(req.body);
         if (body.username && body.password) {
             const payload = { 'username': body.username, 'result': 'success' };
             res.setHeader('Content-Type', 'application/json')
             res.statusCode = 200
             res.end(JSON.stringify(payload))
         }
     } else if (req.url == '/logout' && req.method == 'PUT') {
         const payload = 'OK'
         res.statusCode = 200
         res.end(payload)
     }
}
