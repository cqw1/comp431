import { expect } from 'chai'
import mockery from 'mockery'
import fetch, { mock } from 'mock-fetch'

import { Pages } from './components/application'
import { 
    articleReducer, 
    authReducer, 
    mainReducer, 
    navigationReducer, 
    alertReducer 
} from './reducers'
import {ArticleAction} from './components/article/articleActions'
import {AlertAction} from './components/alert/alertActions'

// Tests for reducers.
it('should initialize state', done => {
    expect(authReducer(undefined, {type: ''}))
    .to.eql({
        profile: {},
        loginErrors: {},
        registrationErrors: {},
        errors: {},
        registrationSuccess: '',
    })

    expect(navigationReducer(undefined, {type: ''}))
    .to.eql({
        page: Pages.LANDING,
    })

    expect(articleReducer(undefined, {type: ''}))
    .to.eql({
        articles: [],
        filteredArticles: [],
        filter: '',
        showComments: [],
    })

    expect(mainReducer(undefined, {type: ''}))
    .to.eql({
        profile: {},
        errors: {},
        following: [],
    })

    done();
})

it('should state success (for displaying success message to user)', done => {
    expect(alertReducer(
        {
            successMessage: '',
            errorMessage: '',
            showSuccessAlert: false,
            showErrorAlert: false,
        }, 
        { 
            type: AlertAction.SHOW_SUCCESS_ALERT,
            message: 'success',
        })
    ).to.eql({
        successMessage: 'success',
        errorMessage: '',
        showSuccessAlert: true,
        showErrorAlert: false,
    })

    done();

})

it('should state error (for displaying error message to user)', done => {
    expect(alertReducer(
        {
            successMessage: '',
            errorMessage: '',
            showSuccessAlert: false,
            showErrorAlert: false,
        }, 
        { 
            type: AlertAction.SHOW_ERROR_ALERT,
            message: 'error',
        })
    ).to.eql({
        successMessage: '',
        errorMessage: 'error',
        showSuccessAlert: false,
        showErrorAlert: true,
    })

    done();

})

it('should set the articles', done => {
    const articles = [
        {
            '_id': 1,
            'text': 'one'
        },
        {
            '_id': 2,
            'text': 'two'
        },
    ]

    expect(articleReducer(
        {
            articles: [],
            filteredArticles: [],
            showComments: [],
        }, 
        { 
            type: ArticleAction.GET_ARTICLES,
            articles,
        })
    ).to.eql({
        articles: articles,
        filteredArticles: articles,
        showComments: [
            {
                'id': 1,
                'show': false
            },
            {
                'id': 2,
                'show': false
            },
        ],
    })

    done();
})

it('should set the search keyword', done => {
    expect(articleReducer(
        {
            articles: [],
            filteredArticles: [],
            filter: '',
            showComments: [],
        }, 
        { 
            type: ArticleAction.FILTER_ARTICLES,
            filter: 'testfilter',
        })
    ).to.eql({
        articles: [],
        filteredArticles: [],
        filter: 'testfilter',
        showComments: [],
    })

    done();

})

it('should filter displayed articles by the search keyword', done => {
    const article1 = {
        'author': 'john smith',
        'text': 'one two three',
    }

    const article2 = {
        'author': 'bob smith',
        'text': 'one john three',
    }

    const article3 = {
        'author': 'bob joe',
        'text': 'one two three',
    }

    const article4 = {
        'author': 'bob johns',
        'text': 'one two three',
    }

    expect(articleReducer(
        {
            articles: [article1, article2, article3, article4],
            filteredArticles: [],
            filter: '',
        }, 
        { 
            type: ArticleAction.FILTER_ARTICLES,
            filter: 'john',
        })
    ).to.eql({
        articles: [article1, article2, article3, article4],
        filteredArticles: [article1, article2, article4],
        filter: 'john',
    })

    done();
})
