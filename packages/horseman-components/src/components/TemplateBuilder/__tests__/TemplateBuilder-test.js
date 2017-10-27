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

  const mappings = {
    content: Content,
    image: Image,
  };

  test("renders correctly", () => {
    const wrapper = shallow(
      <TemplateBuilder data={data} mappings={mappings} />,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
