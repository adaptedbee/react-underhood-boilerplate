import OwnReact from "../src";
import Component from "../src/Component";
import ListItem from "./ListItem";

// eslint-disable-next-line react/prefer-stateless-function
class List extends Component {
  render() {
    const { alphabet } = this.props;

    return (
      <ul>
        {alphabet.map(letter => (
          <li>
            <ListItem>{letter}</ListItem>
          </li>
        ))}
      </ul>
    );
  }
}

export default List;
