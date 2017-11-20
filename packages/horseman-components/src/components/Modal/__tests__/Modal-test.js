import React from "react";
import { shallow } from "enzyme";

import Modal from "../";

const close = () => <div>Close</div>;
const div = () => <div />;
const span = () => <span />;

describe("Modal", () => {
  const data = {
    handleClose: () => {},
    mappings: {
      div,
      span,
    },
    contentProps: {
      foo: "bar",
    },
    closeButton: close,
  };
  test("renders correctly", () => {
    const wrapper = shallow(<Modal {...data} />);
    expect(wrapper).toMatchSnapshot();
  });
});
