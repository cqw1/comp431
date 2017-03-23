import React from 'react'
import { expect } from 'chai'
import { mount } from 'enzyme';
import sinon from 'sinon';
import mockery from 'mockery'
import fetch, { mock } from 'mock-fetch'

import {url} from '../../actions'
import { ArticleCreation } from './articleCreation'
import { ArticleAction } from './articleActions'

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

it('should dispatch actions to create a new article', (done) => {
    mock(`${url}/article`, {
        method: 'POST',
        credentials: 'include',
        headers: {'Content-Type': 'application/json'},
        json: {},
    })

    const postArticleSpy = sinon.spy(articleActions.postArticle);
    const articleCreation = mount(<ArticleCreation postArticle={postArticleSpy} />);
    const textarea = articleCreation.find('.form-control');

    textarea.node.value = 'hello';

    articleCreation.find('.btn-primary').simulate('click');
    expect(postArticleSpy.calledOnce).to.equal(true);
    expect(postArticleSpy.returned({
        type: ArticleAction.POST_ARTICLE,
        article: {}
    }));
    done();
})



