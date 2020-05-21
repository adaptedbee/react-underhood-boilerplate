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
  const alphabetArray1 = ["А", "Б", "В", "Г", "Д"];
  const sortString1 = "ГБА";
  const finalArray1 = ["Г", "Б", "В", "А", "Д"];
  expect(sortAlphabetByString(alphabetArray1, sortString1)).toEqual(
    finalArray1
  );

  const alphabetArray2 = ["А", "Б", "В", "Г", "Д"];
  const sortString2 = "ОГПБА";
  const finalArray2 = ["Г", "Б", "В", "А", "Д"];
  expect(sortAlphabetByString(alphabetArray2, sortString2)).toEqual(
    finalArray2
  );

  const alphabetArray3 = ["А", "Б", "А", "В", "Г", "Д"];
  const sortString3 = "ГБА";
  const finalArray3 = ["Г", "Б", "А", "В", "А", "Д"];
  expect(sortAlphabetByString(alphabetArray3, sortString3)).toEqual(
    finalArray3
  );
});
