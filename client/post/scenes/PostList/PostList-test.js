import React from 'react';
import { shallow } from 'enzyme';
import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';

import Post from '../../components/Post';
import { PostList } from './';

chai.use(chaiEnzyme());

describe('<PostList />', () => {
  context('when given a list of posts via the data prop', () => {
    it('correctly renders a list of <Post />s', () => {
      const data = {
        byId: {
          '1': {
            id: '1',
            title: 'Post 1',
            user: { username: 'liquidfired' },
            votes: 1,
          },
          '2': {
            id: '2',
            title: 'Post 2',
            user: { username: 'liquidfired' },
            votes: 1,
          },
          '3': {
            id: '3',
            title: 'Post 3',
            user: { username: 'liquidfired' },
            votes: 1,
          },
        },
        allIds: ['1', '2', '3'],
      };
      const postList = shallow(<PostList posts={data} />);
      const posts = postList.find(Post);

      expect(posts.length).to.equal(3);

      posts.forEach((post, index) => {
        const postFromData = data.byId[data.allIds[index]];
        expect(post).to.have.props({
          title: postFromData.title,
          user: postFromData.user.username,
          votes: postFromData.votes,
        });

        expect(post.key()).to.equal(`post-${postFromData.id}`);
      });
    });
  });
});
