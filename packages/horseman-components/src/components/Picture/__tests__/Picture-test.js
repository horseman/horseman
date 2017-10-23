import React from "react";
import renderer from "react-test-renderer";

import Picture from "../";

describe("Picture", () => {
  test("renders without srcset", () => {
    const tree = renderer.create(<Picture src="foo" />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  test("renders responsive with srcset", () => {
    const tree = renderer
      .create(
        <Picture
          src="foo"
          srcset={[
            {
              src: "foo",
              width: 300,
            },
            {
              src: "bar",
              width: 600,
            },
          ]}
        />,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
