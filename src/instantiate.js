import updateDomProperties from "./updateDomProperties";
import createPublicInstance from "./createPublicInstance"; // eslint-disable-line import/no-cycle

const instantiate = element => {
  const { type, props } = element;
  const isDomElement = typeof type === "string";
  const isTextElement = type === "TEXT ELEMENT";

  let instance = {};
  if (isDomElement) {
    const dom = isTextElement
      ? document.createTextNode(props.nodeValue)
      : document.createElement(type);

    updateDomProperties(dom, [], props);

    const childElements = props.children || [];
    const childInstances = childElements.map(instantiate);
    const childDoms = childInstances.map(childInstance => childInstance.dom);
    childDoms.forEach(childDom => dom.appendChild(childDom));
    instance = { dom, element, childInstances };
  } else {
    const publicInstance = createPublicInstance(element, instance);
    const childElement = publicInstance.render();
    const childInstance = instantiate(childElement);
    const { dom } = childInstance;
    Object.assign(instance, { dom, element, childInstance, publicInstance });
  }

  return instance;
};

export default instantiate;
