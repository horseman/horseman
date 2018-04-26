/* eslint-disable react/prop-types */
import React from "react";
import { shallow } from "enzyme";

import TemplateBuilder from "../";

describe("TemplateBuilder", () => {
  const Content = ({ body }) => <div>{body}</div>;
  const Image = ({ src }) => <img alt=" " src={src} />;

  const data = [
    {
      type: "content",
      body: "foo bar",
    },
    {
      type: "image",
      src: "bizbaz",
    },
    {
      type: "undefined",
    },
  ];

  const resolver = type => {
    switch (type) {
      case "content": {
        return Content;
      }
      case "image": {
        return Image;
      }
      default: {
        return null;
      }
    }
  };

  test("renders correctly", () => {
    const wrapper = shallow(
      <TemplateBuilder data={data} resolver={resolver} />,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
