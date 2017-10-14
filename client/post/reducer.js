import { readPostByIdSucceeded, readPostsSucceeded, votePostByIdSucceeded } from './actions';

const defaultState = [];

export default function postReducer(state = defaultState, action) {
  switch (action.type) {
    case readPostsSucceeded:
      return action.payload.posts;
    case votePostByIdSucceeded:
      let foundPost = false;
      const newState = [...state];

      for (let k = 0; k < newState.length; ++k) {
        const post = newState[k];
        if (post.id === action.payload.post.id) {
          foundPost = true;
          newState[k] = action.payload.post;
          break;
        }
      }

      if (!foundPost) {
        newState.push(action.payload.post);
      }

      return newState;
    default:
      return state;
  }
}
