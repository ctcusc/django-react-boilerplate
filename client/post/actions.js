import { createAction } from 'redux-actions';
import fetcher from 'utils/fetcher';

// Actions we dispatch in our Action Creators
export const readPostByIdSucceeded = createAction('READ_POST_BY_ID_SUCCEEDED');
export const readPostsSucceeded = createAction('READ_POSTS_SUCCEEDED');
export const votePostByIdSucceeded = createAction('VOTE_POST_BY_ID_SUCCEEDED');

// Action Creators
export const readPostById = (postId) => {
  return async (dispatch) => {
    // TODO: REMOVE HOST
    const post = await fetcher.get(`http://localhost:8000/social/posts/${postId}`);

    dispatch(readPostByIdSucceeded({ post }));
  };
};

export const readPosts = () => {
  return async (dispatch) => {
    // TODO: Remove host
    const body = await fetcher.get('http://localhost:8000/social/posts');
    const posts = body.results;

    dispatch(readPostsSucceeded({ posts }));
  };
};

export const votePostById = (postId, isUpvote) => {
  return async (dispatch) => {
    const body = await fetcher.post(`http://localhost:8000/social/post/${postId}`);
    dispatch(votePostByIdSucceeded({}))
  };
}
