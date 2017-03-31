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

it('resource should be a resource (i.e., mock a request)', done => {
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

it('resource should give me the http error', done => {
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

it('resource should be POSTable', done => {
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

it('should navigate to landing', done => {
    actions.navigateLanding()(
        action => {
            expect(action).to.eql({ type: ActionTypes.NAVIGATE_LANDING });
            done();
        }
    )
})

it('should navigate to main', done => {
    const articles = [
        {
            'id': 1,
            'text': 'one'
        },
        {
            'id': 2,
            'text': 'two'
        },
    ];

    mock(`${url}/headlines/`, {
        method: 'GET',
        credentials: 'include',
        headers: {'Content-Type': 'application/json'},
        json: {'headlines': [
            {
                'headline': 'testheadline'
            }
        ]}
    })

    mock(`${url}/articles/`, {
        method: 'GET',
        credentials: 'include',
        headers: {'Content-Type': 'application/json'},
        json: {'articles': articles}
    })

    mock(`${url}/avatars/`, {
        method: 'GET',
        credentials: 'include',
        headers: {'Content-Type': 'application/json'},
        json: {'avatars': [
            {
                'avatar': 'testavatar'
            }
        ]}
    })

    mock(`${url}/following/`, {
        method: 'GET',
        credentials: 'include',
        headers: {'Content-Type': 'application/json'},
        json: {'following': []}
    })

    actions.navigateMain()(
        action => {
            if (typeof action !== 'function') {
                expect(action).to.eql({ type: ActionTypes.NAVIGATE_MAIN });
            }
        }
    )
    done();
})

it('should navigate to profile', done => {
    actions.navigateProfile()(
        action => {
            if (typeof action !== 'function') {
                expect(action).to.eql({ type: ActionTypes.NAVIGATE_PROFILE });
            }
        }
    )
    done();
})
