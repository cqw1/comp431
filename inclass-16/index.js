
const express = require('express')
const bodyParser = require('body-parser')

var id = 1;
var articles = [
    {
        'id': id++,
        'author': 'Scott',
        'text': 'This is my first article'
    },
    {
        'id': id++,
        'author': 'Scott',
        'text': 'This is my second article'
    },
    {
        'id': id++,
        'author': 'Scott',
        'text': 'This is my third article'
    }
]

const addArticle = (req, res) => {
    articles.push({'id': id++, 'author': 'Scott', 'text': req.body.text});
    res.send(req.body);
}

const getArticles = (req, res) => {
    res.send(articles);
}

const hello = (req, res) => res.send({ hello: 'world' })

const app = express()
app.use(bodyParser.json())
app.post('/article', addArticle)
app.get('/articles', getArticles)
app.get('/', hello)

// Get the port from the environment, i.e., Heroku sets it
const port = process.env.PORT || 3000
const server = app.listen(port, () => {
     const addr = server.address()
     console.log(`Server listening at http://${addr.address}:${addr.port}`)
})
