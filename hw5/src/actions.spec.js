import { expect } from 'chai'
import mockery from 'mockery'
import fetch, { mock } from 'mock-fetch'

import {url, resource, ActionTypes} from './actions'

let actions
beforeEach(() => {
    if (mockery.enable) {
        mockery.enable({warnOnUnregistered: false, useCleanCache: true});
        mockery.registerMock('node-fetch', fetch);
        require('node-fetch');
    }
    global.fetch = fetch;

    actions = require('./actions')
})

afterEach(() => {
    if (mockery.enable) {
        mockery.deregisterMock('node-fetch');
        mockery.disable();
    }
})

it('validate actions: resource should be a resource (i.e., mock a request)', done => {
    mock(`${url}/`, {
        method: 'GET',
        credentials: 'include',
        headers: {'Content-Type': 'application/json'},
        json: {'key': 'value'},
    })

    resource('GET', '', {})
    .then(r => {
        expect(r.key).to.eql('value')
        done();
    })
})

it('validate actions: resource should give the http error', done => {
    mock(`${url}/`, {
        method: 'GET',
        credentials: 'include',
        headers: {'Content-Type': 'application/json'},
        status: 401,
    })

    resource('GET', '', {})
    .catch(err => {
        expect(err).to.be.an('error');
        done();
    })
})

it('validate actions: resource should be POSTable', done => {
    mock(`${url}/`, {
        method: 'POST',
        credentials: 'include',
        headers: {'Content-Type': 'application/json'},
        json: {'postable': 'success'}
    })

    resource('POST', '', {})
    .then(r => {
        expect(r.postable).to.eql('success');
        done();
    })
})

it('validate actions: should navigate to landing', done => {
    actions.navigateLanding()(
        action => {
            expect(action).to.eql({ type: ActionTypes.NAVIGATE_LANDING });
            done();
        }
    )
})

it('validate actions: should navigate to main', done => {
    actions.navigateMain()(
        action => {
            expect(action).to.eql({ type: ActionTypes.NAVIGATE_MAIN });
            done();
        }
    )
})

it('validate actions: should navigate to profile', done => {
    actions.navigateProfile()(
        action => {
            expect(action).to.eql({ type: ActionTypes.NAVIGATE_PROFILE });
            done();
        }
    )
})
