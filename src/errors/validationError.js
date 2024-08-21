import { errors } from '../constants/errors.js';

class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = errors.ValidationError;
  }
}

export default ValidationError;
