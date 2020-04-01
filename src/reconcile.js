import instantiate from "./instantiate"; // eslint-disable-line import/no-cycle
import updateDomProperties from "./updateDomProperties";

const reconcile = (parentDom, instance, element) => {
  let newInstance;

  if (instance == null) {
    newInstance = instantiate(element);
    parentDom.appendChild(newInstance.dom);
  } else if (element == null) {
    parentDom.removeChild(instance.dom);
    newInstance = null;
  } else if (instance.element.type === element.type) {
    updateDomProperties(instance.dom, instance.element.props, element.props);
    newInstance = { ...instance };
    newInstance.childInstances = reconcileChildren(instance, element); // eslint-disable-line no-use-before-define
    newInstance.element = element;
  } else if (typeof element.type === "string") {
    updateDomProperties(instance.dom, instance.element.props, element.props);
    newInstance = { ...instance };
    newInstance.childInstances = reconcileChildren(instance, element); // eslint-disable-line no-use-before-define
    newInstance.element = element;
  } else {
    newInstance = { ...instance };
    newInstance.publicInstance.props = element.props;
    const childElement = newInstance.publicInstance.render();
    const oldChildInstance = newInstance.childInstance;
    const childInstance = reconcile(parentDom, oldChildInstance, childElement);
    newInstance.dom = childInstance.dom;
    newInstance.childInstance = childInstance;
    newInstance.element = element;
  }

  return newInstance;
};

const reconcileChildren = (instance, element) => {
  const { dom } = instance;
  const { childInstances } = instance;
  const nextChildElements = element.props.children || [];
  const newChildInstances = [];
  const count = Math.max(childInstances.length, nextChildElements.length);
  for (let i = 0; i < count; i += 1) {
    const childInstance = childInstances[i];
    const childElement = nextChildElements[i];
    const newChildInstance = reconcile(dom, childInstance, childElement);
    newChildInstances.push(newChildInstance);
  }
  return newChildInstances.filter(item => item != null);
};

export default reconcile;
