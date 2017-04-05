import { expect } from 'chai'
import { go, sleep, findId, findCSS, findClass, findXPath, By, driver} from './selenium'
import common from './common'

describe('Testing articles end-to-end', () => {

    before('logging user in', done => {
        go()
        .then(common.login)
        .then(done)
    })

    it('create a new article and validate it appears in the feed', (done) => {
        let now = Date.now();

        sleep(500)
        .then(findId('new-article-textarea').clear())
        .then(findId('new-article-textarea').sendKeys('' + now))
        .then(findId('post-article-btn').click())
        .then(sleep(500))
        .then(findXPath("//div[@id='article-list']//*[.='" + now + "']"))
        .then(done)
    })

    it('edit an article and validate the article text has changed', (done) => {
        let now = Date.now();
        let articleCard;
        let editBtn;
        let textArea;
        let updateEditBtn;

        sleep(500)
        .then(findId('new-article-textarea').clear())
        .then(findId('new-article-textarea').sendKeys('' + now))
        .then(findId('post-article-btn').click())
        .then(sleep(500))
        .then(findXPath("//*[.='" + now + "']").findElement(By.xpath('..'))
            .then(articleCard => {
                articleCard.findElements(By.className('edit-article-btn'))
                .then(editArticleBtns => {
                    editArticleBtns[0].click()
                })
                .then(sleep(500))
                .then(articleCard.findElements(
                            By.className('edit-article-textarea'))
                    .then(editArticleTextAreas => {
                        editArticleTextAreas[0].clear()
                        editArticleTextAreas[0].sendKeys('edited article')
                        articleCard.findElements(
                                By.className('update-edit-article-btn'))
                        .then(updateEditArticleBtns => {
                            updateEditArticleBtns[0].click()
                        })
                        .then(sleep(500))
                        .then(articleCard.findElements(
                                    By.className('article-text'))
                            .then(texts => {
                                texts[0].getText()
                                .then(text => {
                                    expect(text).to.equal('edited article');
                                })
                                .then(done)
                            })
                        )
                    })
                )
            })
        )
    })

    it('search for "Only One Article Like This" and verify one article shows and verify the author', (done) => {
        sleep(500)
        .then(findId('article-filter-input').clear())
        .then(findId('article-filter-input')
                .sendKeys('Only One Article Like This'))
        .then(sleep(500))
        .then(findClass('article-card')
            .then(articleCards => {
                expect(articleCards.length).to.equal(1)
                articleCards[0].findElements(By.className('article-author'))
                .then(authors => {
                    authors[0].getText()
                    .then(text => {
                        expect(text).to.equal(common.creds.username)
                    }).then(done)
                })
            })
        )
    })

    after('logging user out', done => {
        sleep(500)
        .then(common.logout)
        .then(done)
    })
})
