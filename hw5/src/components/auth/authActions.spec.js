import { expect } from 'chai'
import mockery from 'mockery'
import fetch, { mock } from 'mock-fetch'

import {url, resource} from '../../actions'
import {AuthAction, loginUser} from './authActions'
import {authReducer, mainReducer} from '../../reducers'

let authActions
beforeEach(() => {
    if (mockery.enable) {
        mockery.enable({warnOnUnregistered: false, useCleanCache: true});
        mockery.registerMock('node-fetch', fetch);
        require('node-fetch');
    }
    global.fetch = fetch;

    authActions = require('./authActions')
})

afterEach(() => {
    if (mockery.enable) {
        mockery.deregisterMock('node-fetch');
        mockery.disable();
    }
})

it('should log in a user', done => {

    var username = 'foo';
    var password = 'bar';

    mock(`${url}/login`, {
        method: 'POST',
        credentials: 'include',
        headers: {'Content-Type': 'application/json'},
        json: {'username': username, 'result': 'success'},
    })

    authActions.loginUser(username, password)(
        action => {
            if (typeof action !== 'function' && action.type == AuthAction.LOGIN) {
                expect(action.profile.username).to.be.eql(username);
                expect(action.profile.password).to.be.eql(password);
                expect(action.valid).to.be.true;
                done();
            }
        }
    )
})

it('should not log in an invalid user', done => {

    var username = 'foo';
    var password = 'bar';

    mock(`${url}/login`, {
        method: 'POST',
        credentials: 'include',
        headers: {'Content-Type': 'application/json'},
        status: 401,
        json: {},
    })

    authActions.loginUser(username, password)(
        action => {
            expect(action.type).to.be.eql(AuthAction.LOGIN);
            expect(action.loginErrors.usernameError).to.be.eql('');
            expect(action.loginErrors.passwordError).to.be.eql('');
            expect(action.loginErrors.unauthorizedError).to.be.eql('Username or password is invalid.');
            expect(action.valid).to.be.false;
            done();
        }
    )
})

it('should logout a user (state should be cleared)', done => {

    mock(`${url}/logout/`, {
        method: 'PUT',
        credentials: 'include',
        headers: {'Content-Type': 'application/json'},
        json: {},
    })

    // Clearing old profile state.
    expect(authReducer({ 
        profile: {'oldkey': 'oldvalue'} }, 
        {type: AuthAction.LOGOUT})
    ).to.eql({
        profile: {},
        loginErrors: {},
        registrationErrors: {},
        errors: {},
        registrationSuccess: '',
    })

    expect(mainReducer({ 
        profile: {'oldkey': 'oldvalue'} }, 
        {type: AuthAction.LOGOUT})
    ).to.eql({
        profile: {},
        errors: {},
        following: [],
    })

    authActions.logoutUser()(
        action => {
            expect(action).to.eql({ type: AuthAction.LOGOUT});
            done();
        }
    )
})

it("should fetch the user's profile information", done => {

    mock(`${url}/email/`, {
        method: 'GET',
        credentials: 'include',
        headers: {'Content-Type': 'application/json'},
        json: {'email': 'testemail'}
    })

    mock(`${url}/dob/`, {
        method: 'GET',
        credentials: 'include',
        headers: {'Content-Type': 'application/json'},
        json: {'dob': 1490179322372}
    })

    mock(`${url}/zipcode/`, {
        method: 'GET',
        credentials: 'include',
        headers: {'Content-Type': 'application/json'},
        json: {'zipcode': 'testzipcode'}
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

    const response = {
        type: AuthAction.GET_PROFILE,
        profile: {
            'email': 'testemail',
            'zipcode': 'testzipcode',
            'dob': '3/22/2017',
            'avatar': 'testavatar',
        }
    }

    authActions.getProfile()(
        action => {
            expect(action).to.eql(response);
            done();
        }
    )
})
