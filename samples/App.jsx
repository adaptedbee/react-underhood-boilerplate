import OwnReact from "../src";
import Component from "../src/Component";
import { updateArray } from "./utils";
import List from "./List";

const alphabetArray = "АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ".split("");

class App extends Component {
  constructor() {
    super();
    this.state = {
      alphabet: alphabetArray
    };
    this.updateAlphabet = this.updateAlphabet.bind(this);
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

    return (
      <div>
        <button onClick={this.updateAlphabet} type="button">Обновить алфавит</button>

        <List alphabet={alphabet} />
      </div>
    );
  }
}

export default App;
