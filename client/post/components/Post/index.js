import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import s from './styles.scss';

const propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  user: PropTypes.string,
  votes: PropTypes.number,
  upvotePost: PropTypes.func,
  downvotePost: PropTypes.func,
};

function Post({ id, title, user, votes, upvotePost, downvotePost }) {
  return (
    <div className={s.post}>
      <div className={s.voteContainer}>
        <button className={s.upvote} onClick={upvotePost}>⬆</button>
        <div>{votes}</div>
        <button className={s.downvote} onClick={downvotePost}>⬇</button>
      </div>
      <Link to={`/post/${id}`} className={s.informationContainer}>
        <h1>{title}</h1>
        <span>by {user}</span>
      </Link>
    </div>
  );
}

/*
  Since we're making a functional stateless component, we can't actually write:
  static propTypes = {
    ...
  };

  We have to manually set it outside the function.
*/

Post.propTypes = propTypes;
export default Post;
