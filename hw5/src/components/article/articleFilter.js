
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import { filterArticles } from './articleActions'

// Input to filter articles based on user input.
export const ArticleFilter = ({ 
    filterArticles,
}) =>  {

    let input;

    return (
        <div className='article-filter'> 
            <input 
                className='form-control' 
                ref={node => {input=node}} 
                placeholder='Filter articles' 
                onChange={() => {
                    filterArticles(input.value);
                }} />
        </div>
    )
}

export default connect(
    (state) => ({ }),
    (dispatch) => ({ 
        filterArticles: (filter) => dispatch(filterArticles(filter))
    })
)(ArticleFilter)

