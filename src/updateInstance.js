import reconcile from "./reconcile"; // eslint-disable-line import/no-cycle
import ownPerformance from "./ownPerformance";

const updateInstance = internalInstance => {
  ownPerformance.start("Full DOM update");
  const { parentNode } = internalInstance.dom;
  const { element } = internalInstance;
  reconcile(parentNode, internalInstance, element);
  ownPerformance.end("Full DOM update");
  ownPerformance.measure("Full DOM update");
};

export default updateInstance;
