const isEvent = name => name.startsWith("on");
const isAttribute = name => !isEvent(name) && name !== "children";

const updateDomProperties = (dom, prevProps, nextProps) => {
  // Удаляем прослушку событий
  Object.keys(prevProps)
    .filter(isEvent)
    .forEach(name => {
      const eventType = name.toLowerCase().substring(2);
      dom.removeEventListener(eventType, prevProps[name]);
    });

  // Удаляем пропсы
  Object.keys(prevProps)
    .filter(isAttribute)
    .forEach(name => {
      dom[name] = null; // eslint-disable-line no-param-reassign
    });

  // Добавляем пропсы
  Object.keys(nextProps)
    .filter(isAttribute)
    .forEach(name => {
      dom[name] = nextProps[name]; // eslint-disable-line no-param-reassign
    });

  // Добавляем прослушку событий
  Object.keys(nextProps)
    .filter(isEvent)
    .forEach(name => {
      const eventType = name.toLowerCase().substring(2);
      dom.addEventListener(eventType, nextProps[name]);
    });
};

export default updateDomProperties;
