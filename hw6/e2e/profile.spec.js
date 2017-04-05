import { expect } from 'chai'
import { go, sleep, findId, findCSS, By } from './selenium'
import common from './common'

describe('Testing profile end-to-end', () => {

    before('logging user in', done => {
        go()
        .then(common.login)
        .then(done)
    })

    it('update the status headline and verify the change', (done) => {
        let now = '' + Date.now();

        sleep(500)
        .then(findId('user-account').findElements(By.className('account-headline'))
            .then(oldHeadlines => {
                oldHeadlines[0].getText()
                .then(oldHeadline => {
                    sleep(500)
                    .then(findId('headline-input').clear())
                    .then(findId('headline-input').sendKeys(now))
                    .then(findId('headline-btn').click())
                    .then(sleep(500))
                    .then(findId('user-account').findElements(By.className('account-headline'))
                        .then(newHeadlines => {
                            newHeadlines[0].getText()
                            .then(newHeadline => {
                                expect(newHeadline).to.equal(now)
                            }).then(done)
                        })
                    )
                })
            })
        )
    })

    it("navigate to profile view, update user's email and verify", (done) => {
        let now = '' + Date.now();

        sleep(500)
        .then(findId('profile-btn').click())
        .then(findId('profile-email-input').clear())
        .then(findId('profile-email-input').sendKeys(now + '@email.com'))
        .then(findId('update-profile-btn').click())
        .then(sleep(500))
        .then(findId('profile-email-value').getText()
            .then(email => {
                expect(email).to.equal(now + '@email.com')
                
                findId('alert-message').getText()
                .then(text => {
                    expect(text).to.equal('Updated profile.')
                }).then(done)
            })
        )
    })

    it("navigate to profile view, update user's zipcode and verify", (done) => {
        let now = '' + Date.now()
        let zipcode = now.substr(now.length - 5)

        sleep(500)
        .then(findId('profile-btn').click())
        .then(findId('profile-zipcode-input').clear())
        .then(findId('profile-zipcode-input').sendKeys(zipcode))
        .then(findId('update-profile-btn').click())
        .then(sleep(500))
        .then(findId('profile-zipcode-value').getText()
            .then(zipcode => {
                expect(zipcode).to.equal(zipcode)
                
                findId('alert-message').getText()
                .then(text => {
                    expect(text).to.equal('Updated profile.')
                }).then(done)
            })
        )
    })

    it("navigate to profile view, update user's password and verify", (done) => {
        let now = '' + Date.now()

        sleep(500)
        .then(findId('profile-btn').click())
        .then(findId('profile-password-input').clear())
        .then(findId('profile-password-input').sendKeys(now))
        .then(findId('profile-password-confirmation-input').clear())
        .then(findId('profile-password-confirmation-input').sendKeys(now))
        .then(findId('update-profile-btn').click())
        .then(sleep(500))
        .then(findId('alert-message').getText()
            .then(text => {
                expect(text).to.equal('Updated profile.')
            }).then(done)
        )
    })

    after('logging user out', done => {
        sleep(500)
        .then(common.logout)
        .then(done)
    })
})
