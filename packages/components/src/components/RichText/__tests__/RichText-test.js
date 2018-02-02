import React from "react";
import renderer from "react-test-renderer";

import RichText from "../";

describe("RichText", () => {
  test("renders given html", () => {
    const tree = renderer
      .create(<RichText html="<div><h1>foo</h1></div>" />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
