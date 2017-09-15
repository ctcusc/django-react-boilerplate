import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';

import post from 'post/reducer';

export default combineReducers({ post, routing });
