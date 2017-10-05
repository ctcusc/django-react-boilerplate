import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { readPostById } from '../../actions';

export class PostInformation extends Component {
  static propTypes = {
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
    post: PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      user: PropTypes.shape({
        username: PropTypes.string,
      }),
      votes: PropTypes.number,
    }),
    dispatch: PropTypes.func,
  }

  /*
    Load the data before the actual component is rendered.
  */
  componentDidMount() {
    this.props.dispatch(readPostById(this.props.params.id));
  }

  render() {
    const { post = {} } = this.props;
    /*
      This is shorthand for saying: const post = this.props.post || {};
      By wrapping the 'post' variable with curly braces, we destructuring the
      'this.props' object and extracting the 'post' attribute out of it.
      NOTE: This only works if the name of your local variable is the same as the
      key within the object.
    */

    return (
      <div>
        <h1>{post.title}</h1>
        <div>{post.user && post.user.username}</div>
      </div>
    );
  }
}

/*
  mapStateToProps is a mandatory parameter is in react-redux's connect() function.
  It takes two parameters, your current Redux State, and your ownProps is the current
  state of your component's props (ownProps === this.props)
  This function is the core of how Redux actually integrates with your React components.
  Since your Redux Store is supposed to act as an "overall data store", you use the
  mapStateToProps function to cherry-pick out which slices of the state you want to put
  in your component.

  Here, this.props.post will be populated with 'posts[ownProps.params.id]'.
*/
function mapStateToProps(state, ownProps) {
  const posts = state.post || [];

  let post;

  posts.forEach((p) => {
    if (p.id.toString() === ownProps.params.id) {
      post = p;
    }
  });

  return {
    post,
  };
}

/*
  We're not exporting PostInformation, but rather a "connected" version of the component.
*/
export default connect(mapStateToProps)(PostInformation);
