import { expect } from 'chai'
import { findId, sleep } from './selenium'

// TODO add your test user credentials here!
exports.creds = {
    username: 'cqw1test',
    password: 'several-common-fruit'
}

exports.login = () =>
    sleep(500)
        .then(findId('username-input').clear())
        .then(findId('password-input').clear())
        .then(findId('username-input').sendKeys(exports.creds.username))
        .then(findId('password-input').sendKeys(exports.creds.password))
        .then(findId('login-btn').click())
        .then(sleep(2000))

exports.logout = () =>
    sleep(5000)
        .then(findId('logout-btn').click())
        .then(sleep(1000))
        .then(findId('alert-message').getText()
            .then(text => {
                expect(text).to.equal('Logged out.')
            }))
