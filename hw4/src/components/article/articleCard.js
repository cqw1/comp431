import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

/*
 * Displays an article's title, author, date, and image if it exists.
 * Contains buttons to edit and comment the article.
 */
export const ArticleCard = ({ 
    article,
}) =>  {

    if (article.image) {
        return (
            <div className='panel panel-default media article-card'> 
                <div className='media-left'>
                    <img className='media-object' src={article.image} />
                </div>

                <div className='media-body'>
                    <h4 className='media-heading'>
                        {article.title} 
                        <br />
                        <small> by {article.author}, {article.date} </small>
                    </h4>
                    <div>{article.text}</div>

                    <div className='button-container text-align-right'>
                        <button className='btn btn-warning'>Edit</button>
                        <button className='btn btn-success'>Comment</button>
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div className='panel panel-default media article-card'> 
                <div className='media-body'>
                    <h4 className='media-heading'>
                        {article.title} 
                        <br />
                        <small> by {article.author}, {article.date} </small>
                    </h4>
                    <div>{article.text}</div>

                    <div className='button-container text-align-right'>
                        <button className='btn btn-warning'>Edit</button>
                        <button className='btn btn-success'>Comment</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(
    (state) => ({ }),
    (dispatch) => ({ })
)(ArticleCard)

