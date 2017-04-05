import { expect } from 'chai'
import { go, sleep, findId, findCSS, By } from './selenium'
import common from './common'

describe('Testing authentication end-to-end', () => {

    it('should log in as test user', (done) => {
        go()
        .then(common.login)
        .then(findId('main-page'))
        .then(common.logout)
        .then(done)
    })

    it('should register a new user', (done) => {
        go()
        .then(findId('register-username').clear())
        .then(findId('register-username').sendKeys('test'))
        .then(findId('register-password').clear())
        .then(findId('register-password').sendKeys('test'))
        .then(findId('register-password-confirmation').clear())
        .then(findId('register-password-confirmation').sendKeys('test'))
        .then(findId('register-email').clear())
        .then(findId('register-email').sendKeys('test@test.com'))
        .then(findId('register-dob').sendKeys('01/01/1987'))
        .then(findId('register-zipcode').clear())
        .then(findId('register-zipcode').sendKeys('00000'))
        .then(findId('register-btn').click())
        .then(sleep(500))
        .then(findId('alert-message').getText()
            .then(text => {
                expect(text).to.equal('Successfully registered.')
            }))
        .then(done)
    })
})
