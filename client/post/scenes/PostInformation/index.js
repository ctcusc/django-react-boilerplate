import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';

import { readPostById } from '../../actions';

export class PostInformation extends Component {
  static propTypes = {
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
    post: PropTypes.shape({
      id: PropTypes.string,
      title: PropTypes.string,
      user: PropTypes.shape({
        username: PropTypes.string,
      }),
      votes: PropTypes.number,
    }),
    readPostById: PropTypes.func,
  }

  /*
    Load the data before the actual component is rendered.
  */
  componentDidMount() {
    this.props.readPostById(this.props.params.id);
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
  const posts = _.get(state, 'post.byId');
  /*
    Here, we're using Lodash's get function to retrieve state.post.byId.
    We use this to guard against undefined. Since we're reaching two levels deep in the
    object, we want to be sure that state.post is defined before we try to reach state.post.byId.
    If post === undefined or null, then an error is thrown.
  */
  return {
    post: posts[ownProps.params.id],
  };
}

/*
  mapDispatchToProps is an OPTIONAL secondary parameter passed into connect(). It essentially injects
  functions into 'this.props' that make dispatching Redux actions much easier. In this case, if we call
  this.props.readPostById(postId), we will actually dispatch the 'readPostById' action with the parameter
  postId. This is convenient because otherwise, we would have to manually write:
    this.props.dispatch(readPostById(postId))
    versus:
    this.props.readPostById(postId).
  Although this may not seem like much of an improvement, it is important if we want to modify some of the parameters
  being passed into our function before we dispatch our action. Think of it as a layer of abstraction.
*/
function mapDispatchToProps(dispatch) {
  return {
    readPostById: (postId) => dispatch(readPostById(postId)),
  };
}
/*
  We're not exporting PostInformation, but rather a "connected" version of the component.
*/
export default connect(mapStateToProps, mapDispatchToProps)(PostInformation);
