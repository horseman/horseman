import React from "react";
import renderer from "react-test-renderer";

import TwoColumn from "../TwoColumn";

const first = <div>foo</div>;
const second = <div>bar</div>;

describe("TwoColumn", () => {
  test("renders correctly", () => {
    const tree = renderer
      .create(<TwoColumn firstCol={first} secondCol={second} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test("Allows for custom gutter values", () => {
    const tree = renderer
      .create(<TwoColumn gutter={50} firstCol={first} secondCol={second} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test("Will update the order of the columns when mobileFlip is passed", () => {
    const tree = renderer
      .create(
        <TwoColumn
          gutter={50}
          firstCol={first}
          secondCol={second}
          mobileFlip
        />,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test("allows custom columnConfig to change column values", () => {
    const tree = renderer
      .create(
        <TwoColumn
          gutter={50}
          firstCol={first}
          secondCol={second}
          columnConfig={[
            {
              gutter: 10,
              basis: 30,
              order: 3,
            },
            {
              gutter: 20,
              basis: 70,
              order: 2,
            },
          ]}
        />,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
