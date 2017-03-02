import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import { updateStatus } from './mainActions'

import AccountInfo from './accountInfo'
import FollowingList from './followingList'
import InputAction from './inputAction'
import ArticleCreation from '../article/articleCreation'
import ArticleList from '../article/articleList'
import ArticleFilter from '../article/articleFilter'

/*
 * Main page displaying account information, list of followed users, 
 * and articles.
 */
export const Main = ({
    profile,
}) => (
    <div>
        <div className='row'>
            <div className='col-md-3'>
                <div className='panel panel-default'>
                    <div className='panel-heading'>
                        <h3 className='panel-title'>Account</h3>
                    </div>
                    <div className='panel-body'>
                        <AccountInfo 
                            displayName={profile.displayName} 
                            status={profile.status} 
                            image={profile.image} />

                        <div className='update-status'>
                            <InputAction 
                                buttonText='Update Status' 
                                onClickAction={updateStatus} 
                                placeholder='Update your status' />
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
    </div>
);

export default connect(
    (state) => ({ 
        profile: state.profile
    }),
    (dispatch) => ({ })
)(Main)

