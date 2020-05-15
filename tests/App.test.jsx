import OwnReact from "../src";
import { sortAlphabetByString } from "../samples/utils";

const TestApp = <h1 prop1="prop value">Hello, World!</h1>;
test("jsx works", () => {
  expect(TestApp).toEqual({
    props: {
      children: [
        {
          props: {
            children: [],
            nodeValue: "Hello, World!"
          },
          type: "TEXT ELEMENT"
        }
      ],
      prop1: "prop value"
    },
    type: "h1"
  });
});

test("alphabet sorting works", () => {
  const alphabetArray = ["А", "Б", "В", "Г", "Д"];
  const sortString = "ГБА";
  const finalArray = ["Г", "Б", "В", "А", "Д"];

  expect(sortAlphabetByString(alphabetArray, sortString)).toEqual(finalArray);
});
