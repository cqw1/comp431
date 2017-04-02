import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import ArticleComment from './articleComment'

// Displays a list of comments.
export const CommentsList = ({ 
    article,
}) =>  {
    return (
        <ul className="list-group">
            {article.comments.map(c => 
                <li key={c.commentId} className='list-group-item'>
                    <ArticleComment key={c.commentId} comment={c} article={article}/>
                </li>
            )}
        </ul>
    )
}

export default connect(
    (state) => ({ }),
    (dispatch) => ({ })
)(CommentsList)

