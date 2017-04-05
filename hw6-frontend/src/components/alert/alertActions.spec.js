import { expect } from 'chai'
import mockery from 'mockery'
import fetch, { mock } from 'mock-fetch'

import {url} from '../../actions'
import {AlertAction, AlertType, showAlert} from './alertActions'

// Tests actions related to alerts.
let alertActions 
beforeEach(() => {
    alertActions = require('./alertActions')
})

it('should update success message (for displaying success message to user)', 
        done => {

    alertActions.showAlert('success message', AlertType.SUCCESS)(
        action => {
            expect(action.type).to.eql(AlertAction.SHOW_ALERT);
            expect(action.message).to.eql('success message');
            expect(action.alertType).to.eql(AlertType.SUCCESS);
            done();
        }
    )
})

it('should update error message (for displaying error message to user)', 
        done => {

    alertActions.showAlert('error message', AlertType.ERROR)(
        action => {
            expect(action.type).to.eql(AlertAction.SHOW_ALERT);
            expect(action.message).to.eql('error message');
            expect(action.alertType).to.eql(AlertType.ERROR);
            done();
        }
    )
})
