/*
 * HomeReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */
import { fromJS } from 'immutable';

import { CHANGE_SHOPNAME,CHANGE_LOGO, CHANGE_BANNER } from './constants';

// The initial state of the App
const initialState = fromJS({
  shopName: '',
  logo:[],
  banner: []
});

function homeReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_SHOPNAME:
      // Delete prefixed '@' from the github username
      return state.set('shopName', action.name.replace(/@/gi, ''));
    case CHANGE_LOGO:
      // Delete prefixed '@' from the github username
      return state.set('logo', action.name);
    case CHANGE_BANNER:
      // Delete prefixed '@' from the github username
      return state.set('banner', action.name);
    default:
      return state;
  }
}

export default homeReducer;
