import React from "react";
import { shallow } from "enzyme";

import Container from "../";

describe("Container", () => {
  test("renders defaults correctly", () => {
    const wrapper = shallow(<Container theme="undefined">Foo</Container>);
    expect(wrapper).toMatchSnapshot();
  });

  test("Can render with a custom baseFontSize", () => {
    const wrapper = shallow(<Container baseFontSize={14}>Foo</Container>);
    expect(wrapper).toMatchSnapshot();
  });

  test("Can render with custom size", () => {
    const wrapper = shallow(<Container size="medium">Foo</Container>);
    expect(wrapper).toMatchSnapshot();
  });

  test("Can render with theme size", () => {
    const wrapper = shallow(
      <Container
        theme={{
          containers: {
            custom: 500,
          },
        }}
        size="custom"
      >
        Foo
      </Container>,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
