import { expect } from 'chai'
import mockery from 'mockery'
import fetch, { mock } from 'mock-fetch'

import {url, resource} from '../../actions'
import {AlertAction, showSuccessAlert, showErrorAlert} from './alertActions'

let alertActions 
beforeEach(() => {
    if (mockery.enable) {
        mockery.enable({warnOnUnregistered: false, useCleanCache: true});
        mockery.registerMock('node-fetch', fetch);
        require('node-fetch');
    }
    global.fetch = fetch;

    alertActions = require('./alertActions')
})

afterEach(() => {
    if (mockery.enable) {
        mockery.deregisterMock('node-fetch');
        mockery.disable();
    }
})

it('should update success message (for displaying success message to user)', done => {

    alertActions.showSuccessAlert('success message')(
        action => {
            expect(action.type).to.eql(AlertAction.SHOW_SUCCESS_ALERT);
            expect(action.message).to.eql('success message');
            done();
        }
    )
})

it('should update error message (for displaying error message to user)', done => {

    alertActions.showErrorAlert('error message')(
        action => {
            expect(action.type).to.eql(AlertAction.SHOW_ERROR_ALERT);
            expect(action.message).to.eql('error message');
            done();
        }
    )
})
