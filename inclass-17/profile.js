
const getHeadlines = (req, res) => {
    headlines = []

    if (req.params.user) {
        users = req.params.user.split(",");
        users.forEach(function(user) {
            headlines.push({ username: user, headline: user + ' headline'})
        })
    }

    headlines.push({ username: 'default', headline: 'default_headline' })

    res.send({ headlines })
}

const putHeadline = (req, res) => {
    res.send({ username: 'default', headline: req.body.headline })
}

const getEmail = (req, res) => {
    var username = 'default';
    if (req.params.user) {
        username = req.params.user;
    }
    res.send({ username, email: 'emailAddress' })
}

const putEmail = (req, res) => {
    res.send({ username: 'default', email: req.body.email })
}

const getZipcode = (req, res) => {
    var username = 'default';

    if (req.params.user) {
        username = req.params.user;
    }

    res.send({ username, zipcode: 'zipcode' })
}

const putZipcode = (req, res) => {
    res.send({ username: 'default', zipcode: req.body.zipcode })
}

const getAvatars = (req, res) => {
    avatars = []

    if (req.params.user) {
        users = req.params.user.split(",");
        users.forEach(function(user) {
            avatars.push({ username: user, avatar: user + ' avatar'})
        })
    }

    avatars.push({ username: 'default', avatar: 'default avatar' })

    res.send({ avatars })
}

const putAvatar = (req, res) => {
    res.send({ username: 'default', avatar: req.body.avatar })
}

const index = (req, res) => {
     res.send({ hello: 'world' })
}

module.exports = app => {
     app.get('/headlines/:user?', getHeadlines),
     app.put('/headline', putHeadline),
     app.get('/email/:user?', getEmail),
     app.put('/email', putEmail),
     app.get('/zipcode/:user?', getZipcode),
     app.put('/zipcode', putZipcode),
     app.get('/avatars/:user?', getAvatars),
     app.put('/avatar', putAvatar),
     app.get('/', index)
}
