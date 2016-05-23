/**
 * Created by gqadonis on 5/21/16.
 */
import { createSelector } from 'reselect';

const selectLogin = () => (state) => state.get('login');

const selectUsername = () => createSelector(
  selectLogin(),
  (loginState) => loginState.get('username')
);

const selectPassword = () => createSelector(
  selectLogin(),
  (loginState) => loginState.get('password')
);

export {
  selectLogin,
  selectUsername,
  selectPassword,
};