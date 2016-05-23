/**
 * Created by gqadonis on 5/21/16.
 */

import {
  CHANGE_USERNAME,
  CHANGE_PASSWORD,
} from './constants';

/**
 * Changes the input field of the form
 *
 * @param  {name} name The new text of the input field
 *
 * @return {object}    An action object with a type of CHANGE_USERNAME
 */
export function changeUsername(name) {
  return {
    type: CHANGE_USERNAME,
    name,
  };
}


export function changePassword(password) {
  return {
    type: CHANGE_PASSWORD,
    password,
  };
}