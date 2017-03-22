import { combineReducers } from 'redux'
import { Pages } from './components/application'
import { ActionTypes } from './actions'
import { AuthAction } from './components/auth/authActions'
import { MainAction } from './components/main/mainActions'
import { ArticleAction } from './components/article/articleActions'

const following = require('./data/following.json')
const articles = require('./data/articles.json')

const sampleFollowing = following[0];
let followingId = following.length;

const sampleArticle = articles[0];
let articleId = articles.length;

let errors = {
    usernameError: '',
    emailError: '',
    phoneError: '',
    dobError: '',
    zipcodeError: '',
    passwordError: '',
}

export const authReducer = (state = {
    profile: {},
    loginErrors: {},
    registrationErrors: {},
    errors: {},
    registrationSuccess: '',
}, action) => {
    switch (action.type) {
        case AuthAction.LOGIN:
            if (action.valid) {
                return { 
                    ...state, 
                    profile: Object.assign({}, state.profile, action.profile),
                    filteredArticles: action.filteredArticles,
                    following: action.following,
                    loginErrors: {},
                    registrationErrors: {},
                    registrationSuccess: '',
                }
            } else {
                return { 
                    ...state, 
                    loginErrors: action.loginErrors
                }
            }
        case AuthAction.LOGOUT:
            return {
                profile: {},
                loginErrors: {},
                registrationErrors: {},
                errors: {},
                registrationSuccess: '',
            };
        case AuthAction.UPDATE_PROFILE:
            if (action.valid) {
                return {
                    ... state, 
                    profile: Object.assign({}, state.profile, action.profile),
                    errors: {}
                }
            } else {
                return { 
                    ... state, 
                    profile: Object.assign({}, state.profile, action.profile),
                    errors: action.errors,
                }
            }
        case AuthAction.REGISTER:
            if (action.valid) {
                return {
                    ... state, 
                    registrationSuccess: 'Registration successful.',
                    registrationErrors: {},
                    loginErrors: {}
                }
            } else {
                return { 
                    ... state, 
                    profile: Object.assign({}, state.profile, action.profile),
                    registrationErrors: action.registrationErrors,
                    registrationSuccess: '',
                }
            }
        case AuthAction.GET_PROFILE:
            return { 
                ...state, 
                profile: {
                    ... state.profile,
                    email: action.email,
                    dob: action.dob,
                    zipcode: action.zipcode,
                    avatar: action.avatar,
                }
            }
        default:
            return state
    }
}

export const navigationReducer = (state = {
    page: Pages.LANDING,
}, action) => {
    switch (action.type) {
        case ActionTypes.NAVIGATE_PROFILE:
            return {
                ...state, 
                page: Pages.PROFILE, 
                profile: state.profile,
            }
        case ActionTypes.NAVIGATE_MAIN:
            return { ...state, page: Pages.MAIN}
        case ActionTypes.NAVIGATE_LANDING:
            return { ...state, page: Pages.LANDING}
        default:
            return state
    }
}

export const articleReducer = (state = {
    articles: articles,
    filteredArticles: articles,
    filter: '',
}, action) => {
    switch (action.type) {
        case ArticleAction.GET_ARTICLES:
            return { 
                ...state, 
                articles: action.articles,
                filteredArticles: action.articles,
            }
        case ArticleAction.POST_ARTICLE:
            var filtered = [action.article, ...state.filteredArticles].filter(
                (el) => { 
                    return (el.text.includes(state.filter) || 
                            el.author.includes(state.filter));
                }
            );

            return { 
                ...state, 
                articles: [action.article, ...state.articles],
                filteredArticles: filtered,
            }
        case ArticleAction.FILTER_ARTICLES:
            return { 
                ...state, 
                filteredArticles: state.articles.filter(
                    (el) => {
                        return (el.text.includes(action.filter) || 
                                el.author.includes(action.filter))
                    }
                ),
                filter: action.filter
            }
        default:
            return state
    }
}

export const mainReducer = (state = {
    profile: {},
    errors: {},
    following: [],
}, action) => {
    switch (action.type) {
        case AuthAction.LOGIN:
            if (action.valid) {
                return { 
                    ...state, 
                    profile: Object.assign({}, state.profile, action.profile),
                }
            } 
        case AuthAction.LOGOUT:
            return {
                profile: {},
                errors: {},
                following: [],
            };
        case MainAction.GET_HEADLINE:
            return { 
                ...state, 
                profile: {
                    ... state.profile,
                    headline: action.headline,
                }
            }
        case MainAction.GET_AVATAR:
            return { 
                ...state, 
                profile: {
                    ... state.profile,
                    avatar: action.avatar,
                }
            }
        case MainAction.UPDATE_HEADLINE:
            return { 
                ...state, 
                profile: Object.assign(
                    {}, 
                    state.profile, 
                    {headline: action.headline}
                )
            }
        case MainAction.UPDATE_FOLLOWING:
            return { 
                ...state, 
                following: action.following,
            }
        case MainAction.UNFOLLOW_USER:
            return { 
                ...state, 
                following: state.following.filter(
                        (el) => {return el.id != action.id}) 
            }
        case MainAction.GET_FOLLOWING:
            return { 
                ...state, 
                following: action.following,
            }
        default:
            return state
    }
}

//export default Reducer
export default combineReducers({
    authReducer,
    articleReducer,
    mainReducer,
    navigationReducer,
})

