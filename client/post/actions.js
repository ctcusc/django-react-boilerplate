import { createAction } from 'redux-actions';
import fetcher from 'utils/fetcher';

// Actions we dispatch in our Action Creators
export const readPostByIdSucceeded = createAction('READ_POST_BY_ID_SUCCEEDED');
export const readPostsSucceeded = createAction('READ_POSTS_SUCCEEDED');
export const votePostByIdSucceeded = createAction('VOTE_POST_BY_ID_SUCCEEDED');

// Action Creators
export const readPostById = (postId) => {
  return async (dispatch) => {
    const post = await fetcher.get(`/api/posts/${postId}`);

    dispatch(readPostByIdSucceeded({ post }));
  };
};

export const readPosts = () => {
  return async (dispatch) => {
    const body = await fetcher.get('/api/posts');
    const posts = body.results;

    dispatch(readPostsSucceeded({ posts }));
  };
};

export const votePostById = (postId, isUpvote) => {
  return async (dispatch) => {
    let body;

    if (isUpvote) {
      body = await fetcher.post(`/api/posts/${postId}/vote`);
    }
    else {
      body = await fetcher.delete(`/api/posts/${postId}/vote`);
    }

    dispatch(votePostByIdSucceeded({ post: body }));
  };
};
