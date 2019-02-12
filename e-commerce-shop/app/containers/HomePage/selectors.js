/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';

const selectHome = (state) => state.get('home');

const makeSelectUsername = () => createSelector(
  selectHome,
  (homeState) => homeState.get('shopName')
);

const makeSelectLogo = () => createSelector(
  selectHome,
  (homeState) => homeState.get('logo')
);

const makeSelectbanner = () => createSelector(
  selectHome,
  (homeState) => homeState.get('banner')
);
export {
  selectHome,
  makeSelectUsername,
  makeSelectLogo,
  makeSelectbanner
};
