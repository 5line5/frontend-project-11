import { errors } from '../constants/errors.js';

class NetworkError extends Error {
  constructor(message) {
    super(message);
    this.name = errors.NetworkError;
  }
}

export default NetworkError;
