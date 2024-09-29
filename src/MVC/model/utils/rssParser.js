/* eslint-env browser */

import _ from 'lodash';
import ParserError from '../../../errors/parserError.js';

class RssParser {
  constructor() {
    this.domParser = new DOMParser();
  }

  getFeedWithPosts = (rssString) => {
    const rssChannel = this.domParser.parseFromString(rssString, 'application/xml');

    if (rssChannel.querySelector('parsererror')) {
      throw new ParserError('Error while parsing XML');
    }

    const id = _.uniqueId();
    const title = rssChannel.querySelector('channel > title').textContent;
    const description = rssChannel.querySelector('channel > description').textContent;
    // const link = rssChannel.querySelector('channel > link').textContent;
    const posts = Array
      .from(rssChannel.getElementsByTagName('item'))
      .map((item) => ({
        id: _.uniqueId(),
        feedId: id,
        title: item.querySelector('title').textContent,
        description: item.querySelector('description').textContent,
        link: item.querySelector('link').textContent,
      }));

    return {
      feed: {
        id,
        title,
        description,
        // link,
      },
      posts,
    };
  };

  getPosts = (rssString, feedId) => {
    const rssChannel = this.domParser.parseFromString(rssString, 'application/xml');

    if (rssChannel.documentElement.nodeName === 'parsererror') {
      throw new ParserError('Error while parsing XML');
    }

    const posts = Array
      .from(rssChannel.getElementsByTagName('item'))
      .map((item) => ({
        id: _.uniqueId(),
        feedId,
        title: item.querySelector('title').textContent,
        description: item.querySelector('description').textContent,
        link: item.querySelector('link').textContent,
      }));

    return posts;
  };
}

export default RssParser;
