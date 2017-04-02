import { combineReducers } from 'redux'
import { Pages } from './components/application'
import { ActionTypes } from './actions'
import { AuthAction } from './components/auth/authActions'
import { MainAction } from './components/main/mainActions'
import { ArticleAction } from './components/article/articleActions'
import { AlertAction } from './components/alert/alertActions'

function findAndReplaceArticle(article, oldArray) {
    let newArray = [];
    oldArray.forEach(function(el) {
        if (el._id == article._id) {
            newArray.push(article);
        } else {
            newArray.push(el);
        }
    })

    return newArray;
}

function createCommentsMeta(articles) {
    const commentsMeta = [];
    articles.forEach(function(article) {
        article.comments.forEach(function(comment) {
            commentsMeta.push({
                commentId: comment.commentId,
                edit: false,
            })
        })
    })
    return commentsMeta;
}

// Reducer for authorization and profile actions.
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

                console.log('reducers profile');
                console.log(action.profile);
                return {
                    ... state, 
                    profile: Object.assign({}, state.profile, action.profile),
                    errors: {}
                }
            } else {
                return { 
                    ... state, 
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
                    email: action.profile.email,
                    dob: action.profile.dob,
                    zipcode: action.profile.zipcode,
                    avatar: action.profile.avatar,
                },
                errors: {}
            }
        default:
            return state
    }
}

// Reducer for navigation actions.
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

// Reducer for article actions.
export const articleReducer = (state = {
    articles: [],
    filteredArticles: [],
    filter: '',
    articlesMeta: [],
    commentsMeta: [],
}, action) => {
    switch (action.type) {
        case ArticleAction.GET_ARTICLES:
            const articlesMeta = action.articles.map(function(article) {
                return {
                    _id: article._id,
                    comments: false,
                    edit: false,
                    commenting: false,
                }
            })

            const sorted_get = action.articles.sort(function (a, b) {
                return new Date(b.date) - new Date(a.date);
            })

            return { 
                ...state, 
                articles: sorted_get,
                filteredArticles: sorted_get,
                articlesMeta,
                commentsMeta: createCommentsMeta(action.articles),
            }
        case ArticleAction.POST_ARTICLE:

            const sorted_post = [action.article, ...state.articles].sort(
                function (a, b) {
                    return new Date(b.date) - new Date(a.date);
                }
            );

            const filtered = sorted_post.filter(
                (el) => { 
                    return (el.text.includes(state.filter) || 
                            el.author.includes(state.filter));
                }
            );

            return { 
                ...state, 
                articles: sorted_post,
                filteredArticles: filtered,
                articlesMeta: [
                    {id: action.article._id, comments: false, edit: false, commenting: false}, 
                    ...state.articlesMeta
                ]
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
        case ArticleAction.TOGGLE_COMMENTS:
            let articlesMetaComments= [];
            state.articlesMeta.forEach(function(el) {
                if (el._id == action.articleId) {
                    articlesMetaComments.push(Object.assign({}, el, {comments: !el.comments}));
                } else {
                    articlesMetaComments.push(el);
                }
            })

            return { 
                ...state, 
                articlesMeta: articlesMetaComments,
            }
        case ArticleAction.TOGGLE_EDIT_ARTICLE:
            let articlesMetaEdit = [];

            state.articlesMeta.forEach(function(el) {
                if (el._id == action.articleId) {
                    articlesMetaEdit.push(Object.assign({}, el, {edit: !el.edit}));
                } else {
                    articlesMetaEdit.push(el);
                }
            })

            return { 
                ...state, 
                articlesMeta: articlesMetaEdit,
            }
        case ArticleAction.UPDATE_ARTICLE:

            let articlesMetaUpdated = [];
            state.articlesMeta.forEach(function (el) {
                if (el._id == action.article._id) {
                    articlesMetaUpdated.push(Object.assign({}, el, {edit: false}));
                } else {
                    articlesMetaUpdated.push(el);
                }
            })

            const articlesUpdated = 
                findAndReplaceArticle(action.article, state.articles);

            const filteredUpdated = articlesUpdated.filter(
                (el) => { 
                    return (el.text.includes(state.filter) || 
                            el.author.includes(state.filter));
                }
            );

            return {
                ... state,
                articles: articlesUpdated,
                filteredArticles: filteredUpdated,
                articlesMeta: articlesMetaUpdated,
            }
        case ArticleAction.TOGGLE_COMMENTING:
            let articlesMetaCommenting = [];

            state.articlesMeta.forEach(function(el) {
                if (el._id == action.articleId) {
                    articlesMetaCommenting.push(Object.assign({}, el, {commenting: !el.commenting}));
                } else {
                    articlesMetaCommenting.push(el);
                }
            })

            return { 
                ...state, 
                articlesMeta: articlesMetaCommenting,
            }
        case ArticleAction.POST_COMMENT:

            let articlesMetaCommented = [];
            state.articlesMeta.forEach(function(el) {
                if (el._id == action.article._id) {
                    articlesMetaCommented.push(Object.assign({}, el, {commenting: false}))
                } else {
                    articlesMetaCommented.push(el);
                }
            })

            const articlesNewComment= findAndReplaceArticle(action.article, state.articles);
            

            return { 
                ...state, 
                articles: articlesNewComment,
                filteredArticles: findAndReplaceArticle(action.article, state.filteredArticles),
                articlesMeta: articlesMetaCommented,
                commentsMeta: createCommentsMeta(articlesNewComment),
            }
        case ArticleAction.TOGGLE_EDIT_COMMENT:
            let commentsMetaEdit = [];

            state.commentsMeta.forEach(function(el) {
                if (el.commentId == action.commentId) {
                    commentsMetaEdit.push(Object.assign({}, el, {edit: !el.edit}));
                } else {
                    commentsMetaEdit.push(el);
                }
            })

            return { 
                ...state, 
                commentsMeta: commentsMetaEdit,
            }
        case ArticleAction.UPDATE_COMMENT:

            let commentsMetaUpdated = [];
            state.commentsMeta.forEach(function (el) {
                if (el.commentId == action.commentId) {
                    commentsMetaUpdated.push(Object.assign({}, el, {edit: false}));
                } else {
                    commentsMetaUpdated.push(el);
                }
            })

            const articlesUpdatedComment = 
                findAndReplaceArticle(action.article, state.articles);

            const filteredUpdatedComment = articlesUpdatedComment.filter(
                (el) => { 
                    return (el.text.includes(state.filter) || 
                            el.author.includes(state.filter));
                }
            );

            return {
                ... state,
                articles: articlesUpdatedComment,
                filteredArticles: filteredUpdatedComment,
                commentsMeta: commentsMetaUpdated,
            }
        default:
            return state
    }
}


// Reducer for actions on the main page.
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
        default:
            return state
    }
}

// Reducer for alert actions.
export const alertReducer = (state = {
    alert: {},
}, action) => {
    switch (action.type) {
        case AlertAction.CLOSE_ALERT:
            return { 
                ...state, 
                alert: {},
            }
        case AlertAction.SHOW_ALERT:
            return { 
                ...state, 
                alert: {
                    message: action.message,
                    alertType: action.alertType
                },
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
    alertReducer,
})

