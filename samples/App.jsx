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
