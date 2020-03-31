class OwnReact {
  static createElement(type, props, ...children) {
    return {
      type,
      props: {
        ...props,
        children: [...children]
      }
    };
  }

  static render(element, parentDom) {
    const { type, props } = element;

    const isTextElement = typeof element === "string";
    const dom = isTextElement
      ? document.createTextNode(element)
      : document.createElement(type);

    if (props) {
      const isListener = name => name.startsWith("on");
      Object.keys(props)
        .filter(isListener)
        .forEach(name => {
          const eventType = name.toLowerCase().substring(2);
          dom.addEventListener(eventType, props[name]);
        });

      const isAttribute = name => !isListener(name) && name !== "children";
      Object.keys(props)
        .filter(isAttribute)
        .forEach(name => {
          dom[name] = props[name];
        });

      const childElements = props.children || [];
      childElements.forEach(childElement => this.render(childElement, dom));
    }

    parentDom.appendChild(dom);
  }
}

export default OwnReact;
