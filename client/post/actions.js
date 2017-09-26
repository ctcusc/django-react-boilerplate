import { createAction } from 'redux-actions';
import fetcher from 'utils/fetcher';

// Actions we dispatch in our Action Creators
export const readPostByIdSucceeded = createAction('READ_POST_BY_ID_SUCCEEDED');
export const readPostsSucceeded = createAction('READ_POSTS_SUCCEEDED');
export const votePostByIdSucceeded = createAction('VOTE_POST_BY_ID_SUCCEEDED');

// Action Creators
export const readPostById = (postId) => {

};

export const readPosts = () => {

};

export const votePostById = (postId, isUpvote) => {
}
