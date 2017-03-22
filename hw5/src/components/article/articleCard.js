import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import {getPrettyDate, getPrettyTime} from '../../actions.js'
import {toggleComments, checkShowComments} from './articleActions.js'

import ArticleComment from './articleComment'

/*
 * Displays an article's title, author, date, and image if it exists.
 * Contains buttons to edit and comment the article.
 */
export const ArticleCard = ({ 
    article,
    getPrettyDate,
    getPrettyTime,
    toggleComments,
    checkShowComments,
}) =>  {

    const _toggleComment = () => {
        toggleComments(article._id);
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
                    {article.author + ' '} 
                    on {getPrettyDate(article.date) + ' '}
                    at {getPrettyTime(article.date)}
                </h4>
                <div>{article.text}</div>

                <div className='button-container text-align-right'>
                    <button className='btn btn-warning'>Edit</button>
                    {article.comments.length > 0 && 
                        <button 
                            className='btn btn-info' 
                            onClick={_toggleComment}>
                            {checkShowComments(article._id) ? `Hide` : `Show`}
                            {' '} comments ({article.comments.length})
                        </button>
                    }
                    <button className='btn btn-success'>Comment</button>
                </div>
            </div>

            {article.comments.length > 0 && checkShowComments(article._id) &&
                <ul className="list-group">
                    {article.comments.map(c => 
                        <li key={c.commentId} className='list-group-item'>
                            <ArticleComment key={c.commentId} comment={c} />
                        </li>
                    )}
                </ul>
            }
        </div>
    )
}

export default connect(
    (state) => ({ 
        getPrettyDate: (date) => getPrettyDate(date),
        getPrettyTime: (date) => getPrettyTime(date),
        checkShowComments: 
            (id) => checkShowComments(id, state.articleReducer.showComments),
    }),
    (dispatch) => ({ toggleComments: (id) => dispatch(toggleComments(id)) })
)(ArticleCard)

