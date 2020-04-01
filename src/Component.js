import updateInstance from "./updateInstance"; // eslint-disable-line import/no-cycle

class Component {
  constructor(props) {
    this.props = props;
    this.state = this.state || {};
  }

  setState(partialState) {
    this.state = {
      ...this.state,
      ...partialState
    };
    updateInstance(this.__internalInstance); // eslint-disable-line no-underscore-dangle
  }
}

export default Component;
