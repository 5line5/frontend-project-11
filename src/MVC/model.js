// temporary stubs
/* eslint-disable max-len */
/* eslint-disable no-nested-ternary */
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

        this.state.form.errorCode = validationResult.errorCode;
      });
  };

  isValid = (url) => this.urlsSchema.isValid(url)
    .then((isUrl) => (!isUrl ? { isValid: false, errorCode: 2 }
      : (this.state.form.rssUrls.includes(url) ? { isValid: false, errorCode: 1 } : { isValid: true, errorCode: 0 })));
}
