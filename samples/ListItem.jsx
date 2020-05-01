import OwnReact from "../src";
import Component from "../src/Component";

// eslint-disable-next-line react/prefer-stateless-function
class ListItem extends Component {
  render() {
    const { children } = this.props;

    return <div>{children}</div>;
  }
}

export default ListItem;
