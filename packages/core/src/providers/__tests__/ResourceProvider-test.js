import React from "react";
import { shallow } from "enzyme";

import {
  ResourceProvider,
  mapStateToProps,
  mapDispatchToProps,
} from "../../providers/ResourceProvider";

describe("ResourceProvider", () => {
  test("should refresh the component when resourceUrl change", () => {
    const fetchFunc = jest.fn();

    const props = {
      getResource: fetchFunc,
      endpoint: "/foo/:slug",
      resourceUrl: "/foo/baz",
      endpointVars: { slug: "baz" },
      resource: { meta: {}, data: {} },
      render: () => null,
    };
    const wrapper = shallow(<ResourceProvider {...props} />);

    expect(fetchFunc.mock.calls.length).toEqual(1);

    wrapper.setProps({
      ...props,
      endpointVars: {
        slug: "baz",
      },
    });
    expect(fetchFunc.mock.calls.length).toEqual(1);

    wrapper.setProps({
      ...props,
      endpointVars: {
        slug: "biz",
      },
    });
    expect(fetchFunc.mock.calls.length).toEqual(2);

    wrapper.setProps({
      ...props,
      endpointVars: {
        slug: "biz",
      },
    });
    expect(fetchFunc.mock.calls.length).toEqual(2);

    wrapper.setProps({
      ...props,
      endpointVars: {
        slug: "riz",
      },
    });
    expect(fetchFunc.mock.calls.length).toEqual(3);
  });

  test("Should render the requested component if an resource returns successfully", () => {
    const resource = {
      meta: {
        loading: false,
        error: false,
      },
      data: {
        foo: "bar",
        hello: "world",
      },
    };

    const fetchFunc = jest.fn();
    const ResourceComponent = ({ e }) => (
      <div>
        {e.foo} {e.hello}
      </div>
    );

    const wrapper = shallow(
      <ResourceProvider
        endpoint="foo"
        getResource={fetchFunc}
        resourceUrl="/foo"
        resource={resource}
        render={e => <ResourceComponent e={e} />}
      />,
    );

    expect(wrapper.find(ResourceComponent).length).toEqual(1);
    expect(wrapper.html()).toEqual(
      `<div>${resource.data.foo} ${resource.data.hello}</div>`,
    );
  });

  describe("Should mapStateToProps appropriately", () => {
    test("with empty state", () => {
      const state = {
        horsemanResources: {},
      };
      const ownProps = {
        endpoint: "http://example.com/:slug",
        endpointVars: {
          slug: "example",
        },
      };

      const expected = {
        resourceUrl: "http://example.com/example",
        resource: { meta: { loading: true, error: false }, data: {} },
      };

      const exportedProps = mapStateToProps(state, ownProps);

      expect(exportedProps).toEqual(expected);
    });
    test("with hydrated state", () => {
      const state = {
        horsemanResources: {
          "http://example.com/resource": {
            title: "foo",
          },
        },
      };

      const ownProps = {
        endpoint: "http://example.com/:slug",
        endpointVars: {
          slug: "resource",
        },
      };

      const expected = {
        resourceUrl: "http://example.com/resource",
        resource: { title: "foo" },
      };

      const exportedProps = mapStateToProps(state, ownProps);

      expect(exportedProps).toEqual(expected);
    });
  });

  test("Should mapDispatchToProps appropriately", () => {
    const dispatch = jest.fn();
    const { getResource, ...rest } = mapDispatchToProps(dispatch);
    const resourceUrl = "http://example.com";
    const otherPropsExpected = {};

    getResource(resourceUrl);

    expect(dispatch.mock.calls.length).toEqual(1);
    expect(rest).toEqual(otherPropsExpected);
  });
});
