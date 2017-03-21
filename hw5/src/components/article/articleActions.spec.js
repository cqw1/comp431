import { expect } from 'chai'
import mockery from 'mockery'
import fetch, { mock } from 'mock-fetch'

import {url, resource} from '../../actions'
import {ArticleAction, getArticles} from './articleActions'
import {articleReducer} from '../../reducers'

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

it('validate article actions: should fetch articles', done => {

    var articles = [
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

