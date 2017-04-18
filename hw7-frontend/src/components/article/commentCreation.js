import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import {postComment} from './articleActions.js'

// Displays the UI to post a new comment on an article.
export const CommentCreation = ({ 
    article,
    postComment,
}) =>  {

    let textArea;

    const _postComment = () => {
        postComment(article._id, textArea.value);
    }

    return (
        <div className="text-align-right button-container">
            <textarea 
                className='form-control' 
                placeholder='Comment here' 
                ref= {node => {textArea = node}} />
            
            <button 
                className='btn btn-primary'
                onClick={_postComment}>
                Post Comment 
            </button>
        </div>
    )
}

export default connect(
    (state) => ({ }),
    (dispatch) => ({ 
        postComment: (id, text) => dispatch(postComment(id, text)),
    })
)(CommentCreation)

