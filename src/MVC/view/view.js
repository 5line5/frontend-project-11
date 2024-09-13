// temporary stubs
/* eslint-env browser */
/* eslint-disable no-param-reassign */
import i18next from 'i18next';
import { Modal } from 'bootstrap';
import resources from './constants/resources.js';
import Controller from '../controller.js';
import { errorCodes, errors } from '../../constants/errors.js';
import generateNode from './utils/nodeWorker.js';
import nodeTypes from './constants/nodeTypes.js';

i18next.init({
  lng: 'ru',
  resources,
});

export default class View {
  static renderForm = (model) => {
    const { validationCode } = model.state.formState;
    const shouldShowFeedBack = validationCode !== undefined;

    const input = {
      tag: 'input',
      type: nodeTypes.HTMLElement,
      attributes: [{ name: 'type', value: 'text' }, { name: 'name', value: 'input' }, { name: 'id', value: 'rssInput' }, { name: 'placeholder', value: i18next.t('form.placeholder') }, { name: 'autocomplete', value: 'off' }, { name: 'autofocus', value: true }],
      classes: ['form-control'],
    };
    const inputLabel = {
      tag: 'label',
      type: nodeTypes.HTMLElement,
      attributes: [{ name: 'for', value: 'rssInput' }],
      children: [{ type: nodeTypes.textNode, value: i18next.t('form.placeholder') }],
    };
    const inputDiv = {
      tag: 'div',
      type: nodeTypes.HTMLElement,
      classes: ['form-floating'],
      children: [input, inputLabel],
    };
    const inputColumn = {
      tag: 'div',
      type: nodeTypes.HTMLElement,
      classes: ['col'],
      children: [inputDiv],
    };

    const button = {
      tag: 'button',
      type: nodeTypes.HTMLElement,
      attributes: [{ name: 'type', value: 'submit' }],
      classes: ['btn', 'btn-primary', 'btn-lg', 'h-100', 'px-sm-5'],
      children: [{ type: nodeTypes.textNode, value: i18next.t('form.button') }],
    };
    const buttonColumn = {
      tag: 'div',
      type: nodeTypes.HTMLElement,
      classes: ['col-auto'],
      children: [button],
    };

    const formRow = {
      tag: 'div',
      type: nodeTypes.HTMLElement,
      classes: ['row'],
      children: [inputColumn, buttonColumn],
    };

    const form = {
      tag: 'form',
      type: nodeTypes.HTMLElement,
      handlers: [{ event: 'submit', cb: Controller.submitHandler(model) }],
      children: [formRow],
    };
    const expample = {
      tag: 'p',
      type: nodeTypes.HTMLElement,
      classes: ['mt-2', 'mb-0', 'text-muted'],
      children: [{ type: nodeTypes.textNode, value: i18next.t('form.example') }],
    };

    const feedback = {
      tag: 'p',
      type: nodeTypes.HTMLElement,
      classes: ['feedback', 'm-0', 'position-absolute', 'small', validationCode === errorCodes[errors.NoError] ? 'text-success' : 'text-danger'],
      children: [{ type: nodeTypes.textNode, value: shouldShowFeedBack ? i18next.t(`errors.${validationCode}`) : '' }],
    };

    const col = {
      tag: 'div',
      type: nodeTypes.HTMLElement,
      classes: ['col-lg-8', 'mx-auto'],
      children: [form, expample, feedback],
    };

    const row = {
      tag: 'div',
      type: nodeTypes.HTMLElement,
      classes: ['row'],
      children: [col],
    };

    const node = generateNode(row);

    const formColumnSelector = '[id="form-container"]';
    const formColumnElement = document.querySelector(formColumnSelector);

    formColumnElement.childNodes.forEach((childNode) => childNode.remove());
    formColumnElement.appendChild(node);
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
      if (model.state.feedsState.UI.feeds[id].show) {
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
        id, link, title, feedId, description,
      }) => {
        const text = document.createTextNode(title);

        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', link);
        linkElement.classList.add('link-underline', 'link-underline-opacity-0', model.state.feedsState.UI.posts[id].isRed ? 'link-secondary' : 'link-primary');
        linkElement.appendChild(text);

        const viewButton = document.createElement('button');
        viewButton.classList.add('btn', 'btn-outline-primary', 'btn-sm');
        viewButton.addEventListener('click', () => {
          console.log('aaa');
          Controller.postReadButtonClick(id, model);

          document.getElementById('modal-title').textContent = title;
          document.getElementById('modal-body').textContent = description;
          document.getElementById('modal-primary-button').textContent = 'Читать полностью';
          document.getElementById('modal-primary-button').setAttribute('href', link);
          document.getElementById('modal-secondary-button').textContent = 'Закрыть';
          const modal = new Modal(document.getElementById('modal'));

          modal.show();
        });
        viewButton.appendChild(document.createTextNode('Просмотр'));

        const liElement = document.createElement('li');
        liElement.classList.add('list-group-item', 'post', 'd-flex', 'justify-content-between', 'align-items-start', 'border-0', 'border-end-0');
        if (!model.state.feedsState.UI.feeds[feedId].show) {
          liElement.classList.add('hide');
        }
        liElement.appendChild(linkElement);
        liElement.appendChild(viewButton);

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
