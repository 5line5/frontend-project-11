import axios from 'axios';
import NetworkError from '../../../errors/networkError.js';

class NetworkWorker {
  constructor() {
    this.proxy = 'https://allorigins.hexlet.app/get';
  }

  get = (url) => axios.get(this.proxy, { params: { url, disableCache: true }, timeout: 2000 })
    .catch((error) => { throw new NetworkError(error.message); });
}

export default NetworkWorker;
