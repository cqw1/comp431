/*
 * Test suite for articles.js
 */
const expect = require('chai').expect
const fetch = require('isomorphic-fetch')

const url = path => `http://localhost:3000${path}`

describe('Validate Article functionality', () => {

	it('should give me three or more articles', (done) => {
        fetch(url("/articles"))
        .then(res => {
            expect(res.status).to.eql(200)
            return res.json()
        })
        .then(body => {
            expect(body.length).to.be.at.least(3)
        })
        .then(done)
        .catch(done)
 	}, 500)

	it('should add two articles with successive article ids, and return the article each time', (done) => {
		// add a new article
		// verify you get the article back with an id
		// verify the content of the article
		// add a second article
		// verify the article id increases by one
		// verify the second artice has the correct content
        
        let firstId;
        let secondId;

        const firstArticle = {
            author: 'one',
            text: 'one text'
        }

        const secondArticle = {
            author: 'two',
            text: 'two text'
        }
        
        fetch(url("/article"), {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(firstArticle)
        })
        .then(res => {
            expect(res.status).to.eql(200)
            return res.json()
        })
        .then(body => {
            expect(body).to.be.ok
            expect(body.author).to.be.eql('one')
            expect(body.text).to.be.eql('one text')

            firstId = body.id

            fetch(url("/article"), {
                method: "POST",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(secondArticle)
            })
            .then(res => {
                expect(res.status).to.eql(200)
                return res.json()
            })
            .then(body => {
                expect(body).to.be.ok
                expect(body.author).to.be.eql('two')
                expect(body.text).to.be.eql('two text')

                secondId = body.id

                expect(secondId).to.be.eql(firstId + 1)
            })
            .then(done)
            .catch(done)
        })

 	}, 500)

	it('should return an article with a specified id', (done) => {
		// call GET /articles first to find an id, perhaps one at random
		// then call GET /articles/id with the chosen id
		// validate that only one article is returned

        let targetId;

        fetch(url("/articles"))
        .then(res => {
            expect(res.status).to.eql(200)
            return res.json()
        })
        .then(body => {
            expect(body.length).to.be.at.least(3)
            targetId = body[Math.floor(Math.random() * body.length)].id

            fetch(url("/articles/" + targetId))
            .then(res => {
                expect(res.status).to.eql(200)
                return res.json()
            })
            .then(body => {
                expect(body.length).to.be.eql(1)
                expect(body[0].id).to.be.eql(targetId)
            })
            .then(done)
            .catch(done)
        })

	}, 500)

	it('should return nothing for an invalid id', (done) => {
		// call GET /articles/id where id is not a valid article id, perhaps 0
		// confirm that you get no results

        fetch(url("/articles/0"))
        .then(res => {
            expect(res.status).to.eql(200)
            return res.json()
        })
        .then(body => {
            expect(body.length).to.be.eql(0)
        })
        .then(done)
        .catch(done)
	}, 500)

});
