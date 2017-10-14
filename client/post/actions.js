import { createAction } from 'redux-actions';
import fetcher from 'utils/fetcher';

// Actions we dispatch in our Action Creators
export const readPostByIdSucceeded = 'READ_POST_BY_ID_SUCCEEDED';
export const readPostsSucceeded = 'READ_POSTS_SUCCEEDED';
export const votePostByIdSucceeded = 'VOTE_POST_BY_ID_SUCCEEDED';

// Action Creators
export const readPostById = (postId) => {

};

export const readPosts = () => {
  return async (dispatch) => {
    try {
      const response = await fetcher.get('/api/posts');

      dispatch({
        type: readPostsSucceeded,
        payload: {
          posts: response.results
        },
      });
    }
    catch (e) {
      console.error(e);
    }
  };
};

export const votePostById = (postId, isUpvote) => {
  return async (dispatch) => {
    try {
      let response;
      if (isUpvote) {
        response = await fetcher.post(`/api/posts/${postId}/vote`);
      }
      else {
        response = await fetcher.delete(`/api/posts/${postId}/vote`);
      }

      dispatch({
        type: votePostByIdSucceeded,
        payload: {
          post: response,
        },
      });
    }
    catch (e) {
      console.error(e);
    }
  };
}
