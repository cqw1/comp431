const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

//app.use(cookieParser());

var exports = module.exports = {};

const user = {
    'username': 'stub username',
    'salt': '',
    'hash': '',
};
exports.user = user;

const profile = {
    'avatar': 'stub avatar',
    'email': 'stub email',
    'dob': 'stub dob',
    'zipcode': 'stub zipcode',
    'headline': 'stub headline',
};
exports.profile = profile;

const resource = (method, endpoint, payload) => {
	const url = `http://localhost:3000/${endpoint}`
	const options = { method, headers: { 'Content-Type': 'application/json' }}
	if (payload) options.body = JSON.stringify(payload)
	return fetch(url, options).then(r => {
        if (r.status == 200) {
            return r.json()
        } else {	
            const msg = `ERROR ${method} ${endpoint} returned ${r.status}`
            console.error(msg)
            throw new Error(msg)
        }
    })
}
exports.resource = resource;

const app = express();

var cors = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', req.get('origin'));
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');

    if (req.method == 'OPTIONS') {
        res.status(200);
    }    

    next();
}

app.use(cors);
app.use(bodyParser.json());

require('./src/profile').endpoints(app);
require('./src/articles').endpoints(app);
require('./src/auth').endpoints(app);
require('./src/following').endpoints(app);

if (process.env.NODE_ENV !== 'production') {
    require('dot-env')
}

// Get the port from the environment, i.e., Heroku sets it
const port = process.env.PORT || 3000
const server = app.listen(port, () => {
     const addr = server.address()
     console.log(`Server listening at http://${addr.address}:${addr.port}`)
})


