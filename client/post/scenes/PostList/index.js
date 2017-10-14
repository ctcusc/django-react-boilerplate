import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Post from '../../components/Post';
import { readPosts, votePostById } from '../../actions';

class PostList extends Component {
  static propTypes = {
    posts: PropTypes.shape({
      byId: PropTypes.objectOf(PropTypes.shape({
        id: PropTypes.number,
        title: PropTypes.string,
        user: PropTypes.shape({
          username: PropTypes.string,
        }),
        votes: PropTypes.number,
      })),
      allIds: PropTypes.arrayOf(PropTypes.number),
    }),
    dispatch: PropTypes.func,
  }

  /*
    Always make calls to retrieve initial data on this lifecycle hook.
    We want to make sure that the component exists before we even attempt to populate
    it with data
  */
  componentDidMount() {
    this.props.dispatch(readPosts());
  }

  votePost = (id, isUpvote) => {
    this.props.dispatch(votePostById(id, isUpvote));
  }

  render() {
    /*
      Object destructuring. This is equivalent to: const posts = this.props.posts;
    */
    const posts = this.props.posts;

    return (
      <div>
        <h1>Posts</h1>
        { posts.map((p) => (
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
  }
}

function mapStateToProps(state) {
  return {
    posts: state.post,
  };
}

export default connect(mapStateToProps)(PostList);
