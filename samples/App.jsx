import OwnReact from "../src";
import Component from "../src/Component";

const ListItem = ({ children }) => <div>{children}</div>;

const List = ({ alphabet }) => (
  <ul>
    {alphabet.map(letter => (
      <li>
        <ListItem>{letter}</ListItem>
      </li>
    ))}
  </ul>
);

const alphabetArray = "АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ".split("");

class App extends Component {
  constructor() {
    super();
    this.state = {
      alphabet: alphabetArray
    };
  }

  updateAlphabet() {
    let { alphabet } = this.state;
    alphabet = [...alphabet];
    alphabet.reverse();
    this.setState({
      alphabet
    });
  }

  render() {
    const { alphabet } = this.state;

    // setTimeout(() => {
    //   this.updateAlphabet();
    // }, 5000);

    return <List alphabet={alphabet} />;
  }
}

export default App;
