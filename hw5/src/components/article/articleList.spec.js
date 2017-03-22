import { expect } from 'chai'
import mockery from 'mockery'
import fetch, { mock } from 'mock-fetch'

import { url, login, logout, updateHeadline } from './dummy'

beforeEach(() => {
    global.fetch = fetch
})

afterEach(() => {
    while (document.body.children.length) {
        document.body.removeChild(document.body.children[0])
    }
})

const createDOM = (username, password, message) => {
    const add = (tag, id, value) => {
        const el = document.createElement(tag)
        el.id = id
        el.value = value
        el.style = { display: 'inline' }
        document.body.appendChild(el)
        return el
    }
    add('input', 'username', username)
    add('input', 'password', password)
    const d = add('div', 'message', message)
    d.innerHTML = message
    return d
}

it('should log the user out', (done) => {
    const div = createDOM('user', 'pass', 'hello')
    expect(div.innerHTML).to.eql('hello')

    mock(`${url}/logout`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' }
    })
    logout()
        .then(_ => {
            expect(div.innerHTML).to.eql('You have logged out')
        })
        .then(done)
        .catch(done)
})

it('should update the headline', (done) => {
    const div = createDOM('user', 'pass', 'hello')
    expect(div.innerHTML).to.eql('hello')

    mock(`${url}/headline`, {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                json: {
                                username: 'foo', headline: 'bar'
                            }
            })
    updateHeadline('this value is not used').then(_ => {
                expect(div.innerHTML).to.eql('you are logged in as foo "bar"')
            })
    .then(done)
    .catch(done)
})
