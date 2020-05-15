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
    this.handleTextInput = this.handleTextInput.bind(this);
  }

  updateAlphabet() {
    const { alphabet } = this.state;
    const newAlphabetArray = updateArray(alphabet);
    this.setState({
      alphabet: newAlphabetArray
    });
  }

  handleTextInput(event) {
    const sortString = event.target.value.toUpperCase();
    const { alphabet } = this.state;
    const arrayToSort = alphabet.filter(letter =>
      sortString.includes(letter)
    );
    const arrayNotToSort = alphabet.filter(
      letter => !sortString.includes(letter)
    );

    arrayToSort.sort((a, b) => {
      if (sortString.indexOf(a) < sortString.indexOf(b)) {
        return -1;
      }
      if (sortString.indexOf(a) > sortString.indexOf(b)) {
        return 1;
      }
      return 0;
    });

    const finalArray = [...arrayToSort, ...arrayNotToSort];
    this.setState({
      alphabet: finalArray
    });
  }

  render() {
    const { alphabet } = this.state;

    return (
      <div>
        <input
          type="text"
          onInput={this.handleTextInput}
          style="display:block; margin-bottom: 20px;" // eslint-disable-line react/style-prop-object
        />

        <button onClick={this.updateAlphabet} type="button">
          Обновить алфавит
        </button>

        <List alphabet={alphabet} />
      </div>
    );
  }
}

export default App;
