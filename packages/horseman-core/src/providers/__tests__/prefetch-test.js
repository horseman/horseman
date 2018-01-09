/* eslint-disable */
import React from "react";
import { Provider } from "react-redux";
import { mount } from "enzyme";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import fetchMock from "fetch-mock";

import prefetch from "../../providers/prefetch";
import * as types from "../../constants/ActionTypes";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore({
  horsemanResources: {},
  horsemanRoutes: [
    {
      props: {
        path: "/foo",
        exact: true,
        data: "matchedUrl",
      },
    },
  ],
});

const routes = [
  {
    props: {
      path: "/foo",
      exact: true,
      data: "matchedUrl",
    },
  },
];

const Link = prefetch(() => <a />, routes);

describe("prefetch provider", () => {
  test("should fire a FETCH_RESOURCE_REQUEST on mount", () => {
    fetchMock.mock("end:matchedUrl", { hello: "world" });
    store.clearActions();
    const wrapper = mount(
      <Provider store={store}>
        <Link to="/foo">hi</Link>
      </Provider>,
    );
    const action = {
      type: types.RESOURCE_REQUEST,
      meta: {
        endpoint: "matchedUrl",
      },
    };

    expect(action).toEqual(store.getActions()[0]);
  });

  test("should not fire an action when there is no matched route", () => {
    store.clearActions();
    const wrapper = mount(
      <Provider store={store}>
        <Link to="/baz">hi</Link>
      </Provider>,
    );
    expect(store.getActions()).toEqual([]);
  });
});
