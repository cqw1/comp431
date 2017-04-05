import { expect } from 'chai'
import mockery from 'mockery'
import fetch, { mock } from 'mock-fetch'

import {url} from '../../actions'
import {MainAction, updateHeadline} from './mainActions'

// Tests for actions related to the main page.
let mainActions 
beforeEach(() => {
    if (mockery.enable) {
        mockery.enable({warnOnUnregistered: false, useCleanCache: true});
        mockery.registerMock('node-fetch', fetch);
        require('node-fetch');
    }
    global.fetch = fetch;

    mainActions = require('./mainActions')
})

afterEach(() => {
    if (mockery.enable) {
        mockery.deregisterMock('node-fetch');
        mockery.disable();
    }
})

it('should update headline', done => {

    mock(`${url}/headline/`, {
        method: 'PUT',
        credentials: 'include',
        headers: {'Content-Type': 'application/json'},
        json: {}
    })

    mainActions.updateHeadline('newheadline')(
        action => {
            if (typeof action !== 'function') {
                expect(action.type).to.eql(MainAction.UPDATE_HEADLINE);
                expect(action.headline).to.eql('newheadline');
            done();
            }
        }
    )
})
