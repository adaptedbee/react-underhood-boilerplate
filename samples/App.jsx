import OwnReact from "../src";
import Component from "../src/Component";
import { updateArray } from "./utils";
import List from "./List";

const alphabetArray = "АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ".split("");

class App extends Component {
  constructor() {
    super();
    this.state = {
      alphabet: alphabetArray,
      textFilter: ""
    };
    this.updateAlphabet = this.updateAlphabet.bind(this);
    this.handleTextInput = this.handleTextInput.bind(this);
  }

  updateAlphabet() {
    const { alphabet } = this.state;
    const newAlphabetArray = updateArray(alphabet);
    this.setState({
      alphabet: newAlphabetArray,
      textFilter: ""
    });
  }

  handleTextInput(event) {
    this.setState({
      textFilter: event.target.value
    });
  }

  render() {
    const { alphabet, textFilter } = this.state;

    return (
      <div>
        <input type="text" value={textFilter} onChange={this.handleTextInput} />
        <br />
        <br />

        <button onClick={this.updateAlphabet} type="button">
          Обновить алфавит
        </button>

        <List alphabet={alphabet} />
      </div>
    );
  }
}

export default App;
