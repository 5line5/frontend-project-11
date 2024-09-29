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
      attributes: [{ name: 'type', value: 'text' }, { name: 'name', value: 'input' }, { name: 'id', value: 'rssInput' }, { name: 'placeholder', value: i18next.t('form.placeholder') }, { name: 'autocomplete', value: 'off' }, { name: 'autofocus', value: true }, { name: 'aria-label', value: 'url' }],
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
      attributes: [{ name: 'type', value: 'submit' }, { name: 'aria-label', value: 'add' }],
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

    const sectionTitleElement = {
      tag: 'h3',
      type: nodeTypes.HTMLElement,
      classes: ['title'],
      children: [{ type: nodeTypes.textNode, value: i18next.t('content.feeds.title') }],
    };

    const feeds = model.state.feedsState.feeds.map(({ title, description, id }) => {
      const titileElement = {
        tag: 'h3',
        type: nodeTypes.HTMLElement,
        classes: ['h6', 'm-0'],
        children: [{ type: nodeTypes.textNode, value: title }],
      };

      const descriptionElement = {
        tag: 'p',
        type: nodeTypes.HTMLElement,
        classes: ['m-0', 'small', 'text-black-50'],
        children: [{ type: nodeTypes.textNode, value: description }],
      };

      const liElement = {
        tag: 'li',
        type: nodeTypes.HTMLElement,
        classes: ['list-group-item', 'feed', model.state.feedsState.UI.feeds[id].show ? 'choosed' : 'a'],
        handlers: [{ event: 'click', cb: Controller.feedClickHandler(id, model) }],
        children: [titileElement, descriptionElement],
      };

      return liElement;
    });

    const ulElement = {
      tag: 'ul',
      type: nodeTypes.HTMLElement,
      classes: ['list-group', 'list-group-flush', 'feeds-list'],
      children: feeds,
    };

    document.querySelector(feedsContainerSelector).appendChild(generateNode(sectionTitleElement));
    document.querySelector(feedsContainerSelector).appendChild(generateNode(ulElement));
  };

  static renderPosts = (model) => {
    const postsContainerSelector = 'div[id="posts"]';
    const childNodes = [...document.querySelector(postsContainerSelector).childNodes];
    childNodes.forEach((childNode) => childNode.remove());

    const sectionTitleElement = {
      tag: 'h3',
      type: nodeTypes.HTMLElement,
      classes: ['title'],
      children: [{ type: nodeTypes.textNode, value: i18next.t('content.posts.title') }],
    };

    const shownPosts = model.state.feedsState.posts
      .filter(({ feedId }) => model.state.feedsState.UI.feeds[feedId].show);

    const posts = shownPosts
      .map(({
        id, link, title,
      }) => {
        const linkElement = {
          tag: 'a',
          type: nodeTypes.HTMLElement,
          attributes: [{ name: 'href', value: link }],
          classes: [model.state.feedsState.UI.posts[id].isRed ? 'link-secondary' : ('link-primary', 'fw-bold')],
          children: [{ type: nodeTypes.textNode, value: title }],
        };
        const viewButtonElement = {
          tag: 'button',
          type: nodeTypes.HTMLElement,
          attributes: [{ name: 'data-bs-toggle', value: 'modal' }, { name: 'data-bs-target', value: '#modal' }],
          classes: ['btn', 'btn-outline-primary', 'btn-sm'],
          handlers: [{ event: 'click', cb: Controller.postReadButtonClick(id, model) }],
          children: [{ type: nodeTypes.textNode, value: i18next.t('content.posts.preview') }],
        };

        const liElement = {
          tag: 'li',
          type: nodeTypes.HTMLElement,
          classes: ['list-group-item', 'post', 'd-flex', 'justify-content-between', 'align-items-start', 'border-0', 'border-end-0'],
          children: [linkElement, viewButtonElement],
        };

        return liElement;
      });

    const ulElement = {
      tag: 'ul',
      type: nodeTypes.HTMLElement,
      classes: ['list-group', 'list-group-flush', 'feeds-list'],
      children: posts,
    };

    document.querySelector(postsContainerSelector).appendChild(generateNode(sectionTitleElement));
    document.querySelector(postsContainerSelector).appendChild(generateNode(ulElement));
  };

  static renderModal = (post) => {
    const { title, description, link } = post;

    // Generating modal header
    const modalHeaderSelector = 'div[id="modal-header"]';
    const modalHeaderChildNodes = [...document.querySelector(modalHeaderSelector).childNodes];
    modalHeaderChildNodes.forEach((childNode) => childNode.remove());

    const titleElement = {
      tag: 'h5',
      type: nodeTypes.HTMLElement,
      attributes: [{ name: 'id', value: 'modal-title' }],
      classes: ['modal-title'],
      children: [{ type: nodeTypes.textNode, value: title }],
    };
    const closeButtonHeaderElement = {
      tag: 'button',
      type: nodeTypes.HTMLElement,
      attributes: [{ name: 'type', value: 'button' }, { name: 'data-bs-dismiss', value: 'modal' }, { name: 'aria-label', value: 'Close' }],
      classes: ['btn-close'],
    };

    document.querySelector(modalHeaderSelector).appendChild(generateNode(titleElement));
    document.querySelector(modalHeaderSelector).appendChild(generateNode(closeButtonHeaderElement));

    // Generating modal body
    const modalBodySelector = 'div[id="modal-body"]';
    const modalBodyChildNodes = [...document.querySelector(modalBodySelector).childNodes];
    modalBodyChildNodes.forEach((childNode) => childNode.remove());

    const bodyElement = {
      type: nodeTypes.textNode,
      value: description,
    };

    document.querySelector(modalBodySelector).append(generateNode(bodyElement));

    // Generating modal footer
    const modalFooterSelector = 'div[id="modal-footer"]';
    const modalFooterChildNodes = [...document.querySelector(modalFooterSelector).childNodes];
    modalFooterChildNodes.forEach((childNode) => childNode.remove());

    const openButtonElement = {
      tag: 'a',
      type: nodeTypes.HTMLElement,
      attributes: [{ name: 'role', value: 'button' }, { name: 'id', value: 'modal-primary-button' }, { name: 'href', value: link }],
      classes: ['btn', 'btn-primary'],
      children: [{ type: nodeTypes.textNode, value: i18next.t('content.modal.read') }],
    };
    const closeButtonFooterElement = {
      tag: 'button',
      type: nodeTypes.HTMLElement,
      attributes: [{ name: 'type', value: 'button' }, { name: 'data-bs-dismiss', value: 'modal' }, { name: 'id', value: 'modal-secondary-button' }],
      classes: ['btn', 'btn-secondary'],
      children: [{ type: nodeTypes.textNode, value: i18next.t('content.modal.close') }],
    };

    document.querySelector(modalFooterSelector).append(generateNode(openButtonElement));
    document.querySelector(modalFooterSelector).append(generateNode(closeButtonFooterElement));

    // Showing modal
    // const modal = new Modal(document.getElementById('modal'));
    // modal.show();
  };
}
