import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import {getPrettyDate, getPrettyTime} from '../../actions.js'
import {
    toggleComments, 
    checkShowComments, 
    checkEditArticle, 
    checkCommenting, 
    editArticle,
    updateArticle,
    toggleCommenting,
} from './articleActions.js'

import CommentsList from './commentsList'
import CommentCreation from './commentCreation'

/*
 * Displays an article's title, author, date, and image if it exists.
 * Contains buttons to edit and comment the article.
 */
export const ArticleCard = ({ 
    profile,
    article,
    toggleComments,
    editArticle,
    updateArticle,
    toggleCommenting,
    checkShowComments,
    checkEditArticle,
    checkCommenting,
}) =>  {

    let editTextArea;

    const _toggleComment = () => {
        toggleComments(article._id);
    }

    const _editArticle = () => {
        editArticle(article._id);
    }

    const _updateArticle = () => {
        updateArticle(article._id, editTextArea.value);
    }

    const _toggleCommenting = () => {
        toggleCommenting(article._id);
    }
    
    return (
        <div className='panel panel-default media article-card'> 
            {article.img &&
                <div className='media-left'>
                    <img className='media-object' src={article.img} />
                </div>
            }

            <div className='media-body'>
                <h4 className='media-heading'>
                    <span className='article-author'>
                        {article.author + ' '}
                    </span>
                    on {getPrettyDate(article.date) + ' '}
                    at {getPrettyTime(article.date)}
                </h4>
                {checkEditArticle(article._id) 
                    ?  (
                        <textarea 
                            className='form-control edit-article-textarea' 
                            placeholder='' 
                            ref= {node => {editTextArea = node}}
                            defaultValue={article.text} />
                    ) :
                    (<div className='article-text'>{article.text}</div>)
                }

                <div className='button-container text-align-right'>
                    {checkEditArticle(article._id) &&
                        <button 
                            className='btn btn-primary update-edit-article-btn'
                            onClick={_updateArticle}>
                            Update 
                        </button>
                    }
                    {article.author == profile.username &&
                        <button 
                            className='btn btn-warning edit-article-btn'
                            onClick={_editArticle}>
                            {checkEditArticle(article._id) ? `Cancel Edit` : `Edit`}
                        </button>
                    }
                    {article.comments.length > 0 && 
                        <button 
                            className='btn btn-info' 
                            onClick={_toggleComment}>
                            {checkShowComments(article._id) ? `Hide` : `Show`}
                            {' '} comments ({article.comments.length})
                        </button>
                    }
                    <button 
                        className='btn btn-success'
                        onClick={_toggleCommenting}>
                        {checkCommenting(article._id) ? `Cancel Comment` : `Comment`}
                    </button>
                </div>

                {checkCommenting(article._id) && 
                    <CommentCreation article={article} />
                }
            </div>

            {article.comments.length > 0 && checkShowComments(article._id) &&
                <CommentsList article={article} />
            }
        </div>
    )
}

export default connect(
    (state) => ({ 
        checkShowComments: 
            (id) => checkShowComments(id, state.articleReducer.articlesMeta),
        checkEditArticle: 
            (id) => checkEditArticle(id, state.articleReducer.articlesMeta),
        checkCommenting: 
            (id) => checkCommenting(id, state.articleReducer.articlesMeta),
        profile: state.authReducer.profile,
    }),
    (dispatch) => ({ 
        toggleComments: (id) => dispatch(toggleComments(id)),
        editArticle: (id) => {dispatch(editArticle(id));},
        updateArticle: (id, text) => dispatch(updateArticle(id, text)),
        toggleCommenting: (id) => dispatch(toggleCommenting(id)),
    })
)(ArticleCard)

