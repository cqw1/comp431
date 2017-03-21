
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import { postArticle } from './articleActions'

/*
 * Area for the user to post a new article and upload an 
 * image. Can also cancel a post and clear the text area.
 */
export const ArticleCreation = ({ 
    postArticle
}) =>  {

    let textarea;

    return (
        <div className='well article-creation'> 
            <textarea 
                className='form-control' 
                placeholder='New article content' 
                ref= {node => {textarea = node}} />

            <div className='display-table image-upload'>
                <label className='display-table-cell'>Upload image:</label>
                <span className='display-table-cell padding-right-10px' />
                <input className='display-table-cell' type='file' />
            </div>


            <div className='button-container text-align-right'>
                <button className='btn btn-danger' onClick={() => { 
                    textarea.value = ''; }}> 
                    Cancel 
                </button>

                <button className='btn btn-primary' onClick={() => {
                    postArticle(textarea.value);
                    textarea.value = '';
                }}>
                    Post
                </button>
            </div>

        </div>
    )
}

export default connect(
    (state) => ({ }),
    (dispatch) => ({ 
        postArticle: (text) => dispatch(postArticle(text))
    })
)(ArticleCreation)

