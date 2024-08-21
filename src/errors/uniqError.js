import { errors } from '../constants/errors.js';

class UniqError extends Error {
  constructor(message) {
    super(message);
    this.name = errors.UniqError;
  }
}

export default UniqError;
