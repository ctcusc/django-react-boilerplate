import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Post from '../../components/Post';
import { readPosts } from '../../actions';

export class PostList extends Component {
  static propTypes = {
    posts: PropTypes.shape({
      byId: PropTypes.objectOf(PropTypes.shape({
        id: PropTypes.string,
        title: PropTypes.string,
        user: PropTypes.shape({
          username: PropTypes.string,
        }),
        votes: PropTypes.number,
      })),
      allIds: PropTypes.arrayOf(PropTypes.string),
    }),
    readPosts: PropTypes.func,
  }

  /*
    Always make calls to retrieve initial data on this lifecycle hook.
    We want to make sure that the component exists before we even attempt to populate
    it with data
  */
  componentDidMount() {
    this.props.readPosts();
  }

  votePost = (id, isUpvote) => {

  }

  render() {
    /*
      Object destructuring. This is equivalent to: const posts = this.props.posts;
    */
    const { posts } = this.props;
    const postList = posts.allIds.map((id) => posts.byId[id]);

    return (
      <div>
        <h1>Posts</h1>
        { postList.map((p) => (
          <Post
            key={`post-${p.id}`}
            id={p.id}
            title={p.title}
            user={p.owner && p.owner_name}
            votes={p.vote_count}
            upvotePost={() => this.votePost(p.id, true)}
            downvotePost={() => this.votePost(p.id, false)}
          />
        )) }
      </div>
    );
    /*
      In this render function, we're iterating over the entire array 'postList' and creating a
      'Post' component for each of them. Notice that the upvotePost and downvotePost are also being passed in
      an anonymous arrow function. We have to do this because we need to bind each function to the context of its own
      'Post' component.

      For example, if we had Post1 and Post2, we need the upvote and downvote functions to only apply to their specific posts.
      Any function of the signature () => ... automatically binds 'this' to its parent context.
    */
  }
}

/* Notice how we don't pass the second parameter ownProps here, because it's not necessary. */
function mapStateToProps(state) {
  return {
    posts: state.post,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    readPosts: () => dispatch(readPosts()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PostList);
