import reconcile from "./reconcile";

class OwnReact {
  constructor() {
    this.rootInstance = null;
  }

  static createElement(type, props, ...children) {
    let element = {
      type,
      props: {
        ...props,
        children: children.flatMap(child =>
          typeof child === "string" ? this.createTextElement(child) : child
        )
      }
    };

    if (typeof type === "function") {
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
