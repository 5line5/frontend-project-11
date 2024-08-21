import { string } from 'yup';
import ValidationError from '../../../errors/validationError.js';
import UniqError from '../../../errors/uniqError.js';

class Validator {
  constructor() {
    this.urlsSchema = string().url().required();
  }

  validate = (link, feeds) => this.urlsSchema.isValid(link)
    .then((isValidUrl) => {
      if (!isValidUrl) {
        throw new ValidationError('This must be valid link');
      }
      if (feeds.some((feed) => feed.link === link)) {
        throw new UniqError('This must me uniq link');
      }
    });
}

export default Validator;
