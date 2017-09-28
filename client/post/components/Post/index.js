import React from 'react';
import PropTypes from 'prop-types';

class Post extends React.Component {
  // PropTypes
  static propTypes = {
    title: PropTypes.string,
  };
  // State
  state = {
    votes: 0,
    test: 1,
  };

  onUpvote() {
    this.setState({
      votes: this.state.votes + 1,
    });
  }
  // Render
  render() {
    return (
      <div>
        <button onClick={this.onUpvote}>^</button>
        <div>{this.state.votes}</div>
        <h1>{this.props.title}</h1>
      </div>
    );
  }
}

export default Post;
