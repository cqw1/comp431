import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import { updateHeadline } from './mainActions'

import AccountInfo from './accountInfo'
import FollowingList from './followingList'
import ArticleCreation from '../article/articleCreation'
import ArticleList from '../article/articleList'
import ArticleFilter from '../article/articleFilter'

/*
 * Main page displaying account information, list of followed users, 
 * and articles.
 */
export const Main = ({
    profile,
    updateHeadline,
}) => {
    let input;

    console.log('profile.username:' + profile.username);

    const _updateHeadline = () => {
        updateHeadline(input.value);
        input.value = ''
    }

    return (
        <div className='row' id='main-page'>
            <div className='col-md-3'>
                <div className='panel panel-default'>
                    <div className='panel-heading'>
                        <h3 className='panel-title'>Account</h3>
                    </div>
                    <div className='panel-body' id='user-account'>
                        <AccountInfo 
                            username={profile.username} 
                            headline={profile.headline} 
                            avatar={profile.avatar} />

                        <div className='update-headline display-table'>
                            <input 
                                className='form-control display-table-cell' 
                                id='headline-input'
                                ref = {node => { input = node }} 
                                placeholder='Headline' />
                            <span 
                                className='display-table-cell padding-left-5px'>
                                <button 
                                    id='headline-btn'
                                    className='btn btn-default' 
                                    onClick={_updateHeadline}>
                                    Update Headline
                                </button>
                            </span>
                        </div>
                    </div>
                </div>

                <FollowingList />
            </div>

            <div className='col-md-9'>
                <ArticleCreation />
                <hr />
                <ArticleFilter />
                <ArticleList />
            </div>
        </div>
    )
}

export default connect(
    (state) => ({ profile: state.mainReducer.profile }),
    (dispatch) => ({
        updateHeadline: (headline) => dispatch(updateHeadline(headline)),
    })
)(Main)

