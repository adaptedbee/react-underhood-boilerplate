import Component from "./Component"; // eslint-disable-line import/no-cycle

const createPublicInstance = (element, internalInstance) => {
  const { props } = element;
  const publicInstance = new Component(props);
  publicInstance.__internalInstance = internalInstance; // eslint-disable-line no-underscore-dangle
  return publicInstance;
};

export default createPublicInstance;
