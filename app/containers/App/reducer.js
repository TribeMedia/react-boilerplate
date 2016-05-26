/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */

import {
  LOAD_REPOS_SUCCESS,
  LOAD_REPOS,
  LOAD_REPOS_ERROR,
  LOGIN_ERROR,
  LOGIN_SUCCESS,
  SET_HEADER_TITLE,
} from './constants';
import { fromJS } from 'immutable';

// The initial state of the App
const initialState = fromJS({
  loading: false,
  error: false,
  currentUser: false,
  headerTitle: 'A/B Testing User App',
  userData: fromJS({
    repositories: false,
  }),
});

function homeReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_REPOS:
      return state
        .set('loading', true)
        .set('error', false)
        .setIn(['userData', 'repositories'], false);
    case LOAD_REPOS_SUCCESS:
      return state
        .setIn(['userData', 'repositories'], action.repos)
        .set('loading', false)
        .set('currentUser', action.username);
    case LOAD_REPOS_ERROR:
      return state
        .set('error', action.error)
        .set('loading', false);
    case LOGIN_SUCCESS:
          return state
            .set('currentUser', action.user)
            .set('loading', false)
            .set('error', false);
    case LOGIN_ERROR:
      return state
        .set('currentUser', null)
        .set('loading', false)
        .set('error', action.error);
    case SET_HEADER_TITLE:
      console.log('Caught SET_HEADER_TITLE in App reducer: ' + action.title);
      return state
        .set('headerTitle', action.title)
    default:
      return state;
  }
}

export default homeReducer;
