import reconcile from "./reconcile"; // eslint-disable-line import/no-cycle

const updateInstance = internalInstance => {
  const { parentNode } = internalInstance.dom;
  const { element } = internalInstance;
  reconcile(parentNode, internalInstance, element);
};

export default updateInstance;
