import { string } from 'yup';

export default class Model {
  constructor(watchedState) {
    this.state = watchedState;

    this.urlsSchema = string().url().required();
  }

  updateState = (url) => {
    this.isValid(url)
      .then((validationResult) => {
        if (validationResult.isValid) {
          this.state.form.rssUrls.push(url);
        }

        this.state.form.errors = validationResult.errors;
      });
  };

  isValid = (url) => this.urlsSchema.validate(url)
    .then(() => {
      if (this.state.form.rssUrls.includes(url)) {
        throw new Error(`URL ${url} has already been added`);
      }

      return { isValid: true, errors: [] };
    })
    .catch((error) => ({ isValid: false, errors: [error.message] }));
}
