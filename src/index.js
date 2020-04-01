import reconcile from "./reconcile";

class OwnReact {
  constructor() {
    this.rootInstance = null;
  }

  static createElement(type, props, ...children) {
    return {
      type,
      props: {
        ...props,
        children: children.map(child =>
          typeof child === "string" ? this.createTextElement(child) : child
        )
      }
    };
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
