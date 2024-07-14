// temporary stubs
/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-vars */
import onChange from 'on-change';

export default class View {
  getWatchedState = (state) => {
    const watchedState = onChange(state, (path, value) => {
      console.log('state changed');
    });

    return watchedState;
  };
}
