import { expect } from 'chai';

import reducer from './reducer';
import { readPostByIdSucceeded, readPostsSucceeded } from './actions';

describe('Post Reducer', () => {
  context('when given an undefined action', () => {
    it('returns the default state', () => {
      const actual = reducer(undefined, {});
      const expected = {
        byId: {},
        allIds: [],
      };

      expect(actual).to.deep.equal(expected);
    });
  });

  context('when given a readPostByIdSucceeded action', () => {
    it('appends the new post to the state', () => {
      const currentState = {
        byId: {
          '1': { id: '1', title: 'fake post' },
        },
        allIds: ['1'],
      };

      const newPost = { id: '2', title: 'new fake post' };

      const actual = reducer(currentState, readPostByIdSucceeded({ post: newPost }));
      const expected = {
        byId: {
          ...currentState.byId,
          [newPost.id]: newPost,
        },
        allIds: ['1', '2'],
      };

      expect(actual).to.deep.equal(expected);
    });
  });

  context('when given a readPostsSucceeded action', () => {
    it('replaces the state with the posts from the action payload', () => {
      const currentState = {
        byId: {
          '0': { id: '0', title: 'overridden' },
        },
        allIds: ['0'],
      };

      const posts = [{ id: '1', title: 'fake post' }, { id: '2', title: 'fake post 2' }];

      const actual = reducer(currentState, readPostsSucceeded({ posts }));
      const expected = {
        byId: {
          '1': { id: '1', title: 'fake post' },
          '2': { id: '2', title: 'fake post 2' },
        },
        allIds: ['1', '2'],
      };

      expect(actual).to.deep.equal(expected);
    });
  });
});
