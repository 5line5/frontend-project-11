import { errors } from '../constants/errors.js';

class ParserError extends Error {
  constructor(message) {
    super(message);
    this.name = errors.ParserError;
  }
}

export default ParserError;
