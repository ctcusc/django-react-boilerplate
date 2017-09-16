import { handleActions } from 'redux-actions';
import _ from 'lodash';
import { readPostByIdSucceeded, readPostsSucceeded } from './actions';

const defaultState = {
  byId: {},
  allIds: [],
};

/*
  We use redux-actions to handle our actions.
  Normally this would look like:

  function (state = defaultState, action) {
    switch (action.type) {
      case readPostsByIdSucceeded:
        return {...};
      case readPostsSucceeded:
        return {...};
      default:
        return state;
    }
  }
}
*/
export default handleActions({
  [readPostByIdSucceeded]: (state, { payload }) => {
    const post = payload.post;
    return {
      ...state,
      byId: {
        ...state.byId,
        [post.id]: post,
      },
      allIds: _.union(state.allIds, [post.id]),
    };
  },

  [readPostsSucceeded]: (state, { payload }) => {
    const posts = payload.posts;
    const byId = {};
    const allIds = [];

    posts.forEach((post) => {
      byId[post.id] = post;
      allIds.push(post.id);
    });

    return {
      ...state,
      byId,
      allIds,
    };
  },
}, defaultState);
