// temporary stubs
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-vars */
import onChange from 'on-change';
import i18next from 'i18next';
import resources from '../constants/resources.js';

export default class View {
  constructor() {
    i18next.init({
      lng: 'en',
      resources,
    });
  }

  getWatchedState = (state) => {
    const watchedState = onChange(state, (path, value) => {
      console.log('state changed');
    });

    return watchedState;
  };
}
