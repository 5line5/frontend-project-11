// Import our custom CSS
import '../scss/styles.scss';
// Import all of Bootstrap's JS
// import * as bootstrap from 'bootstrap';
import View from './MVC/view.js';
import Controller from './MVC/controller.js';
import Model from './MVC/model.js';

function app() {
  const initState = {
    form: {
      rssUrls: [],
      errorCode: 0,
    },
  };

  const view = new View();
  const watchedState = view.getWatchedState(initState);
  const model = new Model(watchedState);
  const controller = new Controller(model);
  controller.addHandlers();
}

app();
