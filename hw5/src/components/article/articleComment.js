import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import {getPrettyDate, getPrettyTime} from '../../actions.js'

// Displays a comment on an article. Also includes the author and date.
export const ArticleComment = ({ 
    comment,
}) =>  {
    return (
        <div>
            <small className='comment-info'> 
                {comment.author + ' '} 
                on {getPrettyDate(comment.date) + ' '}
                at {getPrettyTime(comment.date)}
            </small>
            <div className='comment-text'>{comment.text}</div>
        </div>
    )
}

export default connect(
    (state) => ({ }),
    (dispatch) => ({ })
)(ArticleComment)

