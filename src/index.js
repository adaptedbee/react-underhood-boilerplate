class OwnReact {
  constructor() {
    this.rootInstance = null;
  }

  static createElement(type, props, ...children) {
    return {
      type,
      props: {
        ...props,
        children: [...children]
      }
    };
  }

  static render(element, container) {
    const prevInstance = this.rootInstance;
    const nextInstance = this.reconcile(container, prevInstance, element);
    this.rootInstance = nextInstance;
  }

  static reconcile(parentDom, instance, element) {
    if (instance == null) {
      const newInstance = this.instantiate(element);
      parentDom.appendChild(newInstance.dom);
      return newInstance;
    }
    if (element == null) {
      parentDom.removeChild(instance.dom);
      return null;
    }
    if (instance.element.type === element.type) {
      this.updateDomProperties(
        instance.dom,
        instance.element.props,
        element.props
      );
      const updatedInstance = { ...instance };
      updatedInstance.childInstances = this.reconcileChildren(
        instance,
        element
      );
      updatedInstance.element = element;
      return updatedInstance;
    }
    const newInstance = this.instantiate(element);
    parentDom.replaceChild(newInstance.dom, instance.dom);
    return newInstance;
  }

  static reconcileChildren(instance, element) {
    const { dom } = instance;
    const { childInstances } = instance;
    const nextChildElements = element.props.children || [];
    const newChildInstances = [];
    const count = Math.max(childInstances.length, nextChildElements.length);
    for (let i = 0; i < count; i += 1) {
      const childInstance = childInstances[i];
      const childElement = nextChildElements[i];
      const newChildInstance = this.reconcile(dom, childInstance, childElement);
      newChildInstances.push(newChildInstance);
    }
    return newChildInstances.filter(item => item != null);
  }

  static instantiate(element) {
    const { type, props } = element;
    let childInstances;

    const isTextElement = typeof element === "string";
    const dom = isTextElement
      ? document.createTextNode(element)
      : document.createElement(type);

    if (props) {
      this.updateDomProperties(dom, [], props);

      const childElements = props.children || [];
      childInstances = childElements.map(this.instantiate);
      const childDoms = childInstances.map(childInstance => childInstance.dom);
      childDoms.forEach(childDom => dom.appendChild(childDom));
    }

    const instance = { dom, element, childInstances };
    return instance;
  }

  static updateDomProperties(dom, prevProps, nextProps) {
    const isEvent = name => name.startsWith("on");
    const isAttribute = name => !isEvent(name) && name !== "children";

    Object.keys(prevProps)
      .filter(isEvent)
      .forEach(name => {
        const eventType = name.toLowerCase().substring(2);
        dom.removeEventListener(eventType, prevProps[name]);
      });

    Object.keys(prevProps)
      .filter(isAttribute)
      .forEach(name => {
        dom[name] = null; // eslint-disable-line no-param-reassign
      });

    Object.keys(nextProps)
      .filter(isAttribute)
      .forEach(name => {
        dom[name] = nextProps[name]; // eslint-disable-line no-param-reassign
      });

    Object.keys(nextProps)
      .filter(isEvent)
      .forEach(name => {
        const eventType = name.toLowerCase().substring(2);
        dom.addEventListener(eventType, nextProps[name]);
      });
  }
}

export default OwnReact;
