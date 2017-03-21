
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import ArticleCard from './articleCard'

/*
 * List of articles display on the user's feed.
 */
export const ArticleList = ({ 
    filteredArticles
}) =>  {
    
    // Sort by newest article first.
    filteredArticles.sort(function (a, b) {
        return new Date(b.date) - new Date(a.date);
    })

    return (
        <div> 
            {filteredArticles.map(a => 
                <ArticleCard key={a._id} article={a} />
            )}
        </div>
    )
}

export default connect(
    (state) => ({ 
        filteredArticles: state.articleReducer.filteredArticles
    }),
    (dispatch) => ({ })
)(ArticleList)

