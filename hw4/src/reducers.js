
import { Pages } from './components/application'
import { ActionTypes } from './actions'
import { AuthAction } from './components/auth/authActions'
import { MainAction } from './components/main/mainActions'
import { ArticleAction } from './components/article/articleActions'

const profile = require('./data/profile.json')
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
    dateOfBirthError: '',
    zipcodeError: '',
    passwordError: '',
}

const Reducer = (state = {
    profile: profile,
    currentProfile: {},
    loginErrors: errors,
    registrationErrors: errors,
    errors: errors,
    following: following,
    articles: articles,
    filteredArticles: articles,
    filter: '',
    page: Pages.LANDING,
}, action) => {
    switch (action.type) {
        case ActionTypes.NAVIGATE_PROFILE:
            return {
                ...state, 
                page: Pages.PROFILE, 
                profile: profile,
                currentProfile: profile
            }
        case ActionTypes.NAVIGATE_MAIN:
            return { ...state, page: Pages.MAIN}
        case AuthAction.LOGIN:
            if (action.valid) {
                return { 
                    ...state, 
                    page: Pages.MAIN, 
                    currentProfile: state.profile,
                    loginErrors: {},
                    registrationErrors: {}
                }
            } else {
                return { 
                    ...state, 
                    loginErrors: action.loginErrors
                }
            }
        case AuthAction.UPDATE_PROFILE:
            if (action.valid) {
                return {
                    ... state, 
                    profile: Object.assign({}, state.profile, action.profile),
                    currentProfile: Object.assign(
                        {}, 
                        state.profile, 
                        action.profile
                    ),
                    errors: {}
                }
            } else {
                return { 
                    ... state, 
                    profile: Object.assign({}, state.profile, action.profile),
                    currentProfile: Object.assign(
                        {}, 
                        state.profile, 
                        action.profile
                    ),
                    errors: action.errors,
                }
            }
        case AuthAction.REGISTER:
            if (action.valid) {
                return {
                    ... state, 
                    profile: Object.assign({}, state.profile, action.profile),
                    currentProfile: Object.assign(
                        {}, 
                        state.profile, 
                        action.profile
                    ),
                    page: Pages.MAIN,
                    registrationErrors: {},
                    loginErrors: {}
                }
            } else {
                return { 
                    ... state, 
                    profile: Object.assign({}, state.profile, action.profile),
                    currentProfile: Object.assign(
                        {}, 
                        state.profile, 
                        action.profile
                    ),
                    registrationErrors: action.registrationErrors,
                }
            }
        case AuthAction.LOGOUT:
            return { ...state, page: Pages.LANDING , currentProfile: {}}
        case MainAction.UPDATE_STATUS:
            return { 
                ...state, 
                profile: Object.assign(
                    {}, 
                    state.profile, 
                    {status: action.status}
                )
            }
        case MainAction.FOLLOW_USER:
            return { 
                ...state, 
                following: [ 
                    ...state.following, 
                    Object.assign(
                        {}, 
                        sampleFollowing, 
                        {id: followingId++, displayName: action.username}
                    )
                ] 
            }
        case MainAction.UNFOLLOW_USER:
            return { 
                ...state, 
                following: state.following.filter(
                        (el) => {return el.id != action.id}) 
            }
        case ArticleAction.POST_ARTICLE:
            var newArticle = Object.assign(
                {}, 
                sampleArticle, 
                {id: articleId++, text:action.text, date: action.date}
            );

            var filtered = [newArticle, ...state.filteredArticles].filter(
                (el) => { 
                    return (el.text.includes(state.filter) || 
                            el.author.includes(state.filter));
                }
            );

            return { 
                ...state, 
                articles: [newArticle, ...state.articles],
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

export default Reducer

