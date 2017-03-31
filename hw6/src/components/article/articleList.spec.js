import React from 'react'
import { expect } from 'chai'
import { findDOMNode } from 'react-dom'
import { shallow } from 'enzyme';
import sinon from 'sinon';

import { ArticleList } from './articleList'
import { ArticleCard } from './articleCard'
import { ArticleComment } from './articleComment'

it('should render articles', (done) => {
    const comment1 = {
        'commentId': 1,
        'author': 'bob smith',
        'date': '2015-10-05T14:38:26.148Z',
        'text': 'comment1 text'
    }
    const comment2 = {
        'commentId': 2,
        'author': 'john smith',
        'date': '2015-09-30T17:47:45.162Z',
        'text': 'comment2 text'
    }

    const comments = [comment1, comment2];

    const article1 = {
        '_id': 1,
        'date': '2017-03-22T22:25:37.214Z',
        'img': 'img1',
        'author': 'john smith',
        'text': 'one two three',
        'comments': comments,
    }

    const article2 = {
        '_id': 2,
        'date': '2017-03-22T21:30:05.846Z',
        'img': 'img2',
        'author': 'bob smith',
        'text': 'one john three',
        'comments': comments,
    }

    const filteredArticles = [article1, article2];

    const articleList = shallow(<ArticleList filteredArticles={filteredArticles} />)
    const articleCard = shallow(
        <ArticleCard 
            article={article1} 
            toggleComments={_=>_} 
            checkShowComments={_=>true}/>)
    const articleComment = shallow(<ArticleComment comment={comment1} />)

    // ArticleList tests
    expect(articleList.children()).to.have.length(2);

    // ArticleCard tests 
    expect(articleCard.find('.media-object').prop('src'))
        .eql(article1.img);
    expect(articleCard.find('.media-heading').text())
        .eql(article1.author + ' on 3/22/2017 at 5:25:37');
    expect(articleCard.find('.article-text').text())
        .eql(article1.text);

    // Since we show comments in the test:
    expect(articleCard.find('.btn-info'))
        .to.have.length(1);  // 'Show Comments' button is displayed
    expect(articleCard.find('.list-group'))
        .to.have.length(1);  // List of comments
    expect(articleCard.find('.list-group-item'))
        .to.have.length(article1.comments.length);  // Number of comments

    // ArticleComment tests
    expect(articleComment.find('.comment-info').text())
        .eql(comment1.author + ' on 10/5/2015 at 9:38:26');
    expect(articleComment.find('.comment-text').text())
        .eql(comment1.text);
    
    done();
})



