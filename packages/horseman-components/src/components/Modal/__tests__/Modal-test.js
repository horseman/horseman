import React from "react";
import { shallow } from "enzyme";

import Modal from "../";

describe("Modal", () => {
  const data = {
    handleClose: () => {},
    mappings: {
      div: <div>div</div>,
      span: <span>span</span>,
    },
    contentProps: {
      foo: "bar",
    },
    closeButton: <div>close</div>,
  };
  test("renders correctly", () => {
    const wrapper = shallow(<Modal {...data} />);
    expect(wrapper).toMatchSnapshot();
  });
});
