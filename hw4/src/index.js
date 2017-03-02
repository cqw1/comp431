require('./styles.css')

import React from 'react'
import { render } from 'react-dom'

import { Provider } from 'react-redux'
import createLogger from 'redux-logger'
import { createStore, applyMiddleware } from 'redux'

import Reducer from './reducers'
import Application from './components/application'
import { ActionTypes } from './actions'

const logger = createLogger()
const store = createStore(Reducer, applyMiddleware(logger))

render(
    <Provider store={store}>
        <Application />
    </Provider>,
    document.getElementById('app')
)
