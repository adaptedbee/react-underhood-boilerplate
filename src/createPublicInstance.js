const createPublicInstance = (Element, internalInstance) => {
  const { props, type } = Element;

  let publicInstance;
  if (!type) {
    publicInstance = new Element(props);
  } else {
    publicInstance = new type(props); // eslint-disable-line new-cap
  }
  publicInstance.__internalInstance = internalInstance; // eslint-disable-line no-underscore-dangle
  return publicInstance;
};

export default createPublicInstance;
