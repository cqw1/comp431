
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import { postArticle } from './articleActions'

/*
 * Area for the user to post a new article and upload an 
 * image. Can also cancel a post and clear the text area.
 */
export const ArticleCreation = ({ 
    postArticle,
}) =>  {

    let textarea;
    let imageInput;
    let image;

    const _handleImageChange = (e) => {
        if (e.target.files.length > 0) {
            image = e.target.files[0];
        }
    } 

    return (
        <div className='well article-creation'> 
            <textarea 
                className='form-control' 
                id='new-article-textarea'
                placeholder='New article content' 
                ref= {node => {textarea = node}} />

            <div className='display-table image-upload'>
                <label className='display-table-cell'>Upload image:</label>
                <span className='display-table-cell padding-right-10px' />
                <input 
                    className='display-table-cell' 
                    type='file' 
                    accept="image/*" 
                    ref= {node => {imageInput = node}}
                    onChange={(e) => {_handleImageChange(e);}} />
            </div>


            <div className='button-container text-align-right'>
                <button className='btn btn-danger' onClick={() => { 
                    textarea.value = ''; }}> 
                    Cancel 
                </button>

                <button 
                    className='btn btn-primary' 
                    id='post-article-btn'
                    onClick={() => {
                        postArticle(textarea.value, image);
                        textarea.value = '';
                        imageInput.value = null;
                        image = null;
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
        postArticle: (text, image) => dispatch(postArticle(text, image)),
    })
)(ArticleCreation)

