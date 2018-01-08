/* eslint-disable */
import React from "react";
import { shallow } from "enzyme";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { Provider } from "react-redux";

import paginator, {
  mapStateToProps,
  mapDispatchToProps,
} from "../../providers/paginator";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore({
  horsemanPaginations: { foo: { currentPage: 1, totalPages: 10 } },
});

const Pagination = ({ totalPages, currentPage }) => (
  <div>
    {currentPage}-{totalPages}
  </div>
);
const ConnectedPagination = paginator(Pagination);

describe("paginator provider", () => {
  test("should return a wrapped component", () => {
    const wrapper = shallow(<ConnectedPagination handle="foo" store={store} />);
    expect(wrapper.html()).toEqual(`<div>1-10</div>`);
  });
});

describe("Should mapStateToProps appropriately", () => {
  test("with empty state", () => {
    const state = {
      horsemanPaginations: {},
    };

    const ownProps = {
      handle: "blog",
    };

    const expected = {
      currentPage: null,
      totalPages: null,
    };

    const exportedProps = mapStateToProps(state, ownProps);

    expect(exportedProps).toEqual(expected);
  });
  test("with hydrated state", () => {
    const state = {
      horsemanPaginations: {
        blog: { totalPages: 10, currentPage: 1 },
      },
    };

    const ownProps = {
      handle: "blog",
    };

    const expected = {
      currentPage: 1,
      totalPages: 10,
    };

    const exportedProps = mapStateToProps(state, ownProps);

    expect(exportedProps).toEqual(expected);
  });
});

test("Should mapDispatchToProps appropriately", () => {
  const dispatch = jest.fn();
  const ownProps = {
    handle: "blog",
  };
  const { gotoPage, ...rest } = mapDispatchToProps(dispatch, ownProps);
  const otherPropsExpected = {};

  gotoPage(1);

  expect(dispatch.mock.calls[0].length).toEqual(1);
  expect(rest).toEqual(otherPropsExpected);
});
