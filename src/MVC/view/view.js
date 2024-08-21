// temporary stubs
/* eslint-env browser */
/* eslint-disable no-param-reassign */
import i18next from 'i18next';
import resources from './constants/resources.js';
import Controller from '../controller.js';
import { errorCodes, errors } from '../../constants/errors.js';

i18next.init({
  lng: 'ru',
  resources,
});

export default class View {
  static renderForm = (model) => {
    const { validationCode } = model.state.formState;
    const shouldShowFeedBack = validationCode !== undefined;
    const feedback = `<p class="feedback m-0 position-absolute small ${validationCode === errorCodes[errors.NoError] ? 'text-success' : 'text-danger'}">${i18next.t(`errors.${validationCode}`)}</p>`;

    const input = `
      <div class="form-floating">
        <input type="text" name="input" class="form-control w-100" id="rssInput" placeholder="${i18next.t('form.placeholder')}" autocomplete="off">
        <label for="rssInput">${i18next.t('form.placeholder')}</label>
      </div>`;
    const button = `<button class="btn btn-primary btn-lg h-100 w-100" type="submit">${i18next.t('form.button')}</button>`;

    const form = `
    <div id="div" class="col-lg-8 mx-auto text-grey">
      <form>
        <div class="row">
          <div class="col">
            ${input}
          </div>
          <div class="col-auto">
            ${button}
          </div>
        </div>
      </form>
      <p class="mt-2 mb-0 text-muted">Пример: https://lorem-rss.hexlet.app/feed?legth=10</p>
      ${shouldShowFeedBack ? feedback : ''};
    </div>
    `;

    const formBlock = (new DOMParser()).parseFromString(form, 'text/html').querySelector('[id="div"]');

    const formElement = formBlock.querySelector('form');
    formElement.addEventListener('submit', Controller.submitHandler(model));

    const formColumnSelector = '[id="form-container"]';
    const formColumnElement = document.querySelector(formColumnSelector);

    formColumnElement.childNodes.forEach((childNode) => childNode.remove());
    formColumnElement.appendChild(formBlock);

    const inputSelector = 'input[name="input"]';

    document.querySelector(inputSelector).focus();
  };

  static renderFeedsAndPosts = (model) => {
    if (model.state.feedsState.feeds.length === 0) {
      return;
    }

    this.renderFeeds(model);
    this.renderPosts(model);
  };

  static renderFeeds = (model) => {
    const feedsContainerSelector = 'div[id="feeds"]';
    const childNodes = [...document.querySelector(feedsContainerSelector).childNodes];
    childNodes.forEach((childNode) => childNode.remove());

    const feeds = model.state.feedsState.feeds.map(({ title, description, id }) => {
      const titleNode = document.createElement('h3');
      titleNode.classList.add('h6', 'm-0');
      titleNode.appendChild(document.createTextNode(title));

      const descriptionNode = document.createElement('p');
      descriptionNode.classList.add('m-0', 'small', 'text-black-50');
      descriptionNode.appendChild(document.createTextNode(description));

      const liElement = document.createElement('li');
      liElement.classList.add('list-group-item', 'feed');
      if (model.state.feedsState.UI[id].show) {
        liElement.classList.add('choosed');
      }
      liElement.appendChild(titleNode);
      liElement.appendChild(descriptionNode);
      liElement.addEventListener('click', Controller.feedClickHandler(id, model));

      return liElement;
    });

    const title = document.createElement('h3');
    title.classList.add('title');
    title.appendChild(document.createTextNode('Feeds'));
    document.querySelector(feedsContainerSelector).appendChild(title);

    const list = document.createElement('ul');
    list.classList.add('list-group', 'list-group-flush', 'feeds-list');
    feeds.forEach((post) => list.appendChild(post));

    document.querySelector(feedsContainerSelector).appendChild(list);
  };

  static renderPosts = (model) => {
    const postsContainerSelector = 'div[id="posts"]';
    const childNodes = [...document.querySelector(postsContainerSelector).childNodes];
    childNodes.forEach((childNode) => childNode.remove());

    const posts = model.state.feedsState.posts
      .map(({
        link, title, feedId,
      }) => {
        const text = document.createTextNode(title);

        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', link);
        linkElement.appendChild(text);

        const liElement = document.createElement('li');
        liElement.classList.add('list-group-item', 'post');
        if (!model.state.feedsState.UI[feedId].show) {
          liElement.classList.add('hide');
        }
        liElement.appendChild(linkElement);

        return liElement;
      });

    const title = document.createElement('h3');
    title.classList.add('title');
    title.appendChild(document.createTextNode('Posts'));
    document.querySelector(postsContainerSelector).appendChild(title);

    const list = document.createElement('ul');
    list.classList.add('list-group', 'list-group-flush', 'posts-list');
    posts.forEach((post) => list.appendChild(post));

    document.querySelector(postsContainerSelector).appendChild(list);
  };
}
