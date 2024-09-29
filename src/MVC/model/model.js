import onChange from 'on-change';
import Validator from './utils/validator.js';
import NetworkWorker from './utils/networkWorker.js';
import RssParser from './utils/rssParser.js';
import { errorCodes, errors } from '../../constants/errors.js';
import View from '../view/view.js';

export default class Model {
  constructor(state) {
    this.state = this.#getWatchedState(state);
    this.validator = new Validator();
    this.networkWorker = new NetworkWorker();
    this.rssParser = new RssParser();

    this.#updateFeeds();
  }

  addFeed = (link) => {
    Promise.resolve()
      // Validating link
      .then(() => this.validator.validate(link, this.state.feedsState.feeds))
      // Getting RSS xml
      .then(() => this.networkWorker.get(link))
      // Parsing RSS
      .then((response) => this.rssParser.getFeedWithPosts(response.data.contents))
      // If everything is okay then add feeds and posts
      .then(({ feed, posts }) => {
        this.state.formState.input = '';
        this.state.formState.validationCode = errorCodes[errors.NoError];
        this.state.feedsState.UI.feeds[feed.id] = { show: true };
        posts
          // eslint-disable-next-line no-return-assign
          .forEach(({ id }) => this.state.feedsState.UI.posts[id] = { isRed: false });
        this.state.feedsState.feeds.push({ link, ...feed });
        this.state.feedsState.posts.push(...posts);
      })
      // If catch error then update error state
      .catch(({ name }) => {
        const errorCode = name in errors ? errorCodes[name] : errorCodes[errors.UnknowError];
        this.state.formState.validationCode = errorCode;
      });
  };

  updateShownFeeds = (feedId) => {
    this.state.feedsState.UI.feeds[feedId].show = !this.state.feedsState.UI.feeds[feedId].show;
  };

  updateRedPosts = (postId) => {
    this.state.feedsState.UI.posts[postId].isRed = true;
    View.renderModal(this.state.feedsState.posts.find(({ id }) => id === postId));
  };

  #updateFeeds = () => {
    const update = (feed) => Promise.resolve()
      // Getting RSS xml
      .then(() => this.networkWorker.get(feed.link))
      // Parsing RSS
      .then((response) => this.rssParser.getPosts(response.data.contents, feed.id))
      // If everything is okay then add posts
      .then((posts) => {
        const statePosts = this.state.feedsState.posts;
        const filteredPosts = posts
          .filter((newPost) => !statePosts.some((oldPost) => oldPost.title === newPost.title));

        if (!filteredPosts.length) {
          return;
        }

        filteredPosts
        // eslint-disable-next-line no-return-assign
          .forEach(({ id }) => this.state.feedsState.UI.posts[id] = { isRed: false });
        this.state.feedsState.posts.unshift(...filteredPosts);
      })
      // If catch error just print it in console
      .catch(console.log);

    Promise.allSettled(this.state.feedsState.feeds.map(update))
      .finally(() => setTimeout(this.#updateFeeds, 5000));
  };

  #getWatchedState = (state) => {
    const watchedState = onChange(state, (path) => {
      if (path === 'formState.input' || path === 'formState.validationCode') {
        View.renderForm(this);
        return;
      }

      const component = path.split('.')[1];

      if (component === 'UI') {
        View.renderFeedsAndPosts(this);
      }
      if (component === 'feeds') {
        View.renderFeeds(this);
      }
      if (component === 'posts') {
        View.renderPosts(this);
      }
    });

    return watchedState;
  };
}
