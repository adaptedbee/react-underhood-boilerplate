import _ from "lodash";

import reconcile from "./reconcile";
import Component from "./Component";

const _rootInstance = null; // eslint-disable-line no-underscore-dangle

class OwnReact {
  static get rootInstance() {
    return _rootInstance;
  }

  static set rootInstance(newInstance) {
    this._rootInstance = newInstance; // eslint-disable-line no-underscore-dangle
  }

  static createElement(type, props, ...children) {
    let element = {
      type,
      props: {
        ...props,
        children: _.flatMap(children, child =>
          typeof child === "string" ? this.createTextElement(child) : child
        )
      }
    };

    // eslint-disable-next-line no-prototype-builtins
    if (typeof type === "function" && !Component.isPrototypeOf(type)) {
      element = type(element.props);
    }

    return element;
  }

  static createTextElement(text) {
    return {
      type: "TEXT ELEMENT",
      props: {
        nodeValue: text,
        children: []
      }
    };
  }

  static render(element, container) {
    const prevInstance = this.rootInstance;
    const nextInstance = reconcile(container, prevInstance, element);
    this.rootInstance = nextInstance;
  }
}

export default OwnReact;
