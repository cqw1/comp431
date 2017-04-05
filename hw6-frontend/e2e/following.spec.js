import { expect } from 'chai'
import { go, sleep, findId, findCSS, findClass, findXPath, By } from './selenium'
import common from './common'

describe('Testing following end-to-end', () => {

    before('logging user in', done => {
        go()
        .then(common.login)
        .then(done)
    })

    it('follow and unfollow the user "Follower", and verify the count each time', (done) => {
        sleep(500)
        .then(findClass('following-user')
            .then(originalFollowers => {
                sleep(500)
                .then(findId('following-input').clear())
                .then(findId('following-input').sendKeys('Follower'))
                .then(findId('following-btn').click())
                .then(sleep(1000))
                .then(findClass('following-user')
                    .then(updatedFollowers => {
                        expect(updatedFollowers.length)
                            .to.equal(originalFollowers.length + 1)
                    })
                    .then(findXPath("//*[.='Follower']")
                        .findElement(By.xpath('../../../..'))
                        .then(followingUser => {
                            followingUser.findElements(
                                    By.className('glyphicon-remove'))
                            .then(removes => {
                                removes[0].click()

                                sleep(500)
                                .then(findClass('following-user')
                                    .then(removedFollowers => {
                                        expect(removedFollowers.length)
                                            .to.equal(originalFollowers.length)
                                    }).then(done)
                                )
                            })
                        })
                    )
                )
            })
        )
    })

    after('logging user out', done => {
        common.logout()
        .then(done)
    })
})
