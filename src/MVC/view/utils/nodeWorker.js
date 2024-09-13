/* eslint-env browser */
import nodeTypes from '../constants/nodeTypes.js';

const generateNode = (tree) => {
  if (tree.type === nodeTypes.textNode) {
    return document.createTextNode(tree.value);
  }

  const node = document.createElement(tree.tag);

  if (tree.attributes) {
    tree.attributes.forEach(({ name, value }) => {
      node.setAttribute(name, value);
    });
  }

  if (tree.classes) {
    node.classList.add(...tree.classes);
  }

  if (tree.handlers) {
    tree.handlers.forEach(({ event, cb }) => {
      node.addEventListener(event, cb);
    });
  }

  if (tree.children) {
    const childNodes = tree.children.map((child) => generateNode(child));

    node.append(...childNodes);
  }

  return node;
};

export default generateNode;
