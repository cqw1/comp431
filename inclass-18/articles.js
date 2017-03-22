let nextId = 4;
let articles = [
    {
        'id': 1,
        'author': 'Scott',
        'text': 'This is my first article.'
    },
    {
        'id': 2,
        'author': 'Scott',
        'text': 'This is my second article.'
    },
    {
        'id': 3,
        'author': 'Scott',
        'text': 'This is my third article.'
    }
];

const getArticles = (req, res) => {
    if (req.params.id) {
        res.send(articles.filter(function (el) {
            return el.id == req.params.id;
        }))
    } else {
        res.send(articles)
    }
}

const postArticle = (req, res) => {
    const newArticle = {
        'id': nextId,
        'author': req.body.author,
        'text': req.body.text,
    }
    articles.push(newArticle)

    nextId += 1

	res.send(newArticle)
}

module.exports = (app) => {
	app.get('/articles/:id?', getArticles),
	app.post('/article', postArticle)
}

