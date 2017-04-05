import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import {getPrettyDate, getPrettyTime} from '../../actions.js'
import {
    editComment, 
    checkEditComment, 
    updateComment
} from './articleActions.js'

// Displays a comment on an article. Also includes the author and date.
export const ArticleComment = ({ 
    profile,
    article,
    comment,
    checkEditComment,
    updateComment,
    editComment,
}) =>  {
    let textarea;

    const _editComment = () => {
        editComment(comment.commentId);
    }

    const _updateComment = () => {
        updateComment(article._id, comment.commentId, textarea.value);
    }

    return (
        <div>
            <small className='comment-info'> 
                {comment.author + ' '} 
                on {getPrettyDate(comment.date) + ' '}
                at {getPrettyTime(comment.date)}
            </small>

            {checkEditComment(comment.commentId) 
                ?  (
                    <textarea 
                        className='form-control' 
                        placeholder='' 
                        ref= {node => {textarea = node}}
                        defaultValue={comment.text} />
                ) :
                (<div className='comment-text'>{comment.text}</div>)
            }

            <div className="text-align-right button-container">
                {checkEditComment(comment.commentId) &&
                    <button 
                        className='btn btn-primary'
                        onClick={_updateComment}>
                        Update 
                    </button>
                }
                {comment.author == profile.username &&
                    <button 
                        className='btn btn-warning'
                        onClick={_editComment}>
                        { 
                            checkEditComment(comment.commentId) 
                            ? `Cancel Edit` 
                            : `Edit`
                        }
                    </button>
                }
            </div>
        </div>
    )
}

export default connect(
    (state) => ({ 
        checkEditComment: 
            (id) => checkEditComment(id, state.articleReducer.commentsMeta),
        profile: state.authReducer.profile,
    }),
    (dispatch) => ({ 
        editComment: (id) => {dispatch(editComment(id));},
        updateComment: (articleId, commentId, text) => 
            dispatch(updateComment(articleId, commentId, text)),
    })
)(ArticleComment)

