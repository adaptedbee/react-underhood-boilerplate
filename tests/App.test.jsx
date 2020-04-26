import OwnReact from "../src";

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
