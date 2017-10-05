import { readPostByIdSucceeded, readPostsSucceeded, votePostByIdSucceeded } from './actions';

const defaultState = [];

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

export default function (state = defaultState, action) {
  const payload = action.payload;
  switch (action.type) {
    case readPostsSucceeded:
      return payload.posts;
    case readPostByIdSucceeded:
    case votePostByIdSucceeded:
      const newPost = payload.post;
      const currentPosts = state;
      const updatedPosts = [newPost];

      currentPosts.forEach((post) => {
        if (post.id !== newPost.id) {
          updatedPosts.push(post);
        }
      });

      return updatedPosts;
    default:
      return state;
  }
}
