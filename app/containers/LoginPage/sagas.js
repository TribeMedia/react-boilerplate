/**
 * Created by gqadonis on 5/21/16.
 */

import { take, call, put, select } from 'redux-saga/effects';

import { LOGIN_USER } from 'containers/App/constants';
import { loginSuccess, loginError } from 'containers/App/actions';

import request from 'utils/request';
import { selectUsername, selectPassword } from 'containers/LoginPage/selectors';


// Bootstrap sagas
export default [
  getLoggedInUser,
];

// Individual exports for testing
export function* getLoggedInUser() {
  while (true) {
    yield take(LOGIN_USER);
    const username = yield select(selectUsername())
    const password = yield select(selectPassword());
    const requestURL = `/loginUser?username=${username}&password=${password}`;

    // Use call from redux-saga for easier testing
    const user = yield call(request, requestURL);

    // We return an object in a specific format, see utils/request.js for more information
    if (user.err === undefined || user.err === null) {
      console.log(JSON.stringify(user.data));
      yield put(loginSuccess(user.data));
    } else {
      console.log(user.err.response); // eslint-disable-line no-console
      yield put(loginError(user.err));
    }
  }
}