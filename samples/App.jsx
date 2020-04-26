import OwnReact from "../src";
import Component from "../src/Component";
import randomInteger from "./utils";

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

const updateArray = array => {
  const newArray = [...array];

  for (let i = 0; i < randomInteger(0, array.length); i += 1) {
    const firstIndex = randomInteger(0, array.length - 1);
    const secondlIndex = randomInteger(0, array.length - 1);
    [newArray[firstIndex], newArray[secondlIndex]] = [
      newArray[secondlIndex],
      newArray[firstIndex]
    ];
  }

  return newArray;
};

class App extends Component {
  constructor() {
    super();
    this.state = {
      alphabet: alphabetArray
    };
  }

  updateAlphabet() {
    const { alphabet } = this.state;
    const newAlphabetArray = updateArray(alphabet);
    this.setState({
      alphabet: newAlphabetArray
    });
  }

  render() {
    const { alphabet } = this.state;

    setTimeout(() => {
      this.updateAlphabet();
    }, 5000);

    return <List alphabet={alphabet} />;
  }
}

export default App;
