import React from "react";
import { shallow } from "enzyme";

import * as types from "../../constants/ActionTypes";

import {
  PaginationProvider,
  mapStateToProps,
  mapDispatchToProps,
} from "../../providers/PaginationProvider";
import { ConnectedResourceProvider } from "../../providers/ResourceProvider";

describe("PaginationProvider", () => {
  test("should return 1 resource provider and update total pages", () => {
    const totalPageFunc = jest.fn();
    const props = {
      resolve: page => page,
      resource: { meta: { loading: false }, data: {} },
      handle: "foo",
      setCurrentPage: () => 1,
      totalPagesResolver: totalPageFunc,
      render: e => e,
      setPageTotal: () => {},
      resourceUrl: "bar",
    };
    const wrapper = shallow(<PaginationProvider {...props} />);
    expect(totalPageFunc.mock.calls.length).toEqual(1);
    expect(wrapper.find(ConnectedResourceProvider).length).toEqual(1);
  });

  describe("Should mapStateToProps appropriately", () => {
    test("with empty state", () => {
      const state = {
        horsemanPaginations: {},
      };
      const ownProps = {
        defaultPage: 1,
        handle: "foo",
        resolve: page => `page-${page}`,
      };

      const expected = {
        currentPage: 1,
        totalPages: undefined,
        resourceUrl: "page-1",
        resource: { meta: { loading: true, error: false }, data: {} },
      };

      const exportedProps = mapStateToProps(state, ownProps);

      expect(exportedProps).toEqual(expected);
    });
    test("with hydrated state", () => {
      const state = {
        horsemanResources: {
          "page-1": {
            title: "foo",
          },
        },
      };

      const ownProps = {
        defaultPage: 1,
        handle: "foo",
        resolve: page => `page-${page}`,
      };

      const expected = {
        currentPage: 1,
        totalPages: undefined,
        resourceUrl: "page-1",
        resource: { title: "foo" },
      };

      const exportedProps = mapStateToProps(state, ownProps);

      expect(exportedProps).toEqual(expected);
    });
  });

  test("Should mapDispatchToProps appropriately", () => {
    const dispatch = jest.fn();
    const ownProps = {
      handle: "foo",
    };
    const { setPageTotal, setCurrentPage, ...rest } = mapDispatchToProps(
      dispatch,
      ownProps,
    );
    const otherPropsExpected = {};

    setPageTotal(10);

    const pageTotalProps = {
      data: { totalPages: 10 },
      handle: ownProps.handle,
      type: types.SET_PAGE_TOTAL,
    };

    expect(dispatch.mock.calls[0][0]).toEqual(pageTotalProps);

    expect(dispatch.mock.calls.length).toEqual(1);

    setCurrentPage(2);
    const currentPageProps = {
      data: { currentPage: 2 },
      handle: ownProps.handle,
      type: types.SET_CURRENT_PAGE,
    };

    expect(dispatch.mock.calls[1][0]).toEqual(currentPageProps);

    expect(dispatch.mock.calls.length).toEqual(2);
    expect(rest).toEqual(otherPropsExpected);
  });
});
