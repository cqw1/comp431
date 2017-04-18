import { expect } from 'chai'
import mockery from 'mockery'
import fetch, { mock } from 'mock-fetch'

import {url, resource} from '../../actions'
import {ArticleAction, getArticles} from './articleActions'

// Tests actions related to articles.
let articleActions
beforeEach(() => {
    if (mockery.enable) {
        mockery.enable({warnOnUnregistered: false, useCleanCache: true});
        mockery.registerMock('node-fetch', fetch);
        require('node-fetch');
    }
    global.fetch = fetch;

    articleActions = require('./articleActions')
})

afterEach(() => {
    if (mockery.enable) {
        mockery.deregisterMock('node-fetch');
        mockery.disable();
    }
})

it('should fetch articles', done => {

    const articles = [
        {
            'id': 1,
            'text': 'one'
        },
        {
            'id': 2,
            'text': 'two'
        },
    ]

    mock(`${url}/articles/`, {
        method: 'GET',
        credentials: 'include',
        headers: {'Content-Type': 'application/json'},
        json: {'articles': articles },
    })

    articleActions.getArticles()(
        action => {
            expect(action.type).to.eql(ArticleAction.GET_ARTICLES);
            expect(action.articles).to.eql(articles);
            done();
        }
    )
})

it('should update the search keyword', done => {
    const action = articleActions.filterArticles('randomfilter');
    expect(action.type).to.be.eql(ArticleAction.FILTER_ARTICLES);
    expect(action.filter).to.be.eql('randomfilter');
    done();
})
