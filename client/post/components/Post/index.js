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
  };

  onUpvote() {
    this.setState({
      votes: this.state.votes + 1,
    });
  }
  onDownvote = () => {
    this.setState({
      votes: this.state.votes - 1,
    });
  }
  // Render
  render() {
    return (
      <div>
        <button onClick={this.onUpvote.bind(this)}>^</button>
        <button onClick={this.onDownvote}>v</button>
        <div>{this.state.votes}</div>
        <h1>{this.props.title}</h1>
      </div>
    );
  }
}

export default Post;
