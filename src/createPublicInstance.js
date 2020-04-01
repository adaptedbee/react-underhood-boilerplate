const createPublicInstance = (Element, internalInstance) => {
  const { props } = Element;
  const publicInstance = new Element(props);
  publicInstance.__internalInstance = internalInstance; // eslint-disable-line no-underscore-dangle
  return publicInstance;
};

export default createPublicInstance;
