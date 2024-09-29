/* eslint-env browser */

export default class Controller {
  static submitHandler = (model) => (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const inputValue = formData.get('input');

    model.addFeed(inputValue);
  };

  static feedClickHandler = (id, model) => () => {
    model.updateShownFeeds(id);
  };

  static postReadButtonClick = (id, model) => () => {
    model.updateRedPosts(id);
  };
}
