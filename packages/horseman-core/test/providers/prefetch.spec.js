/* eslint-disable */
import React from "react";
import { expect } from 'chai';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';

import prefetch from "../../src/providers/prefetch";
import * as types from '../../src/constants/ActionTypes';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore({ horsemanResources:{},horsemanRoutes: [
  {
    props:{
      path:"/foo",
      exact:true,
      data:"matchedUrl"
    }
  }
]});

const routes = [
  {
    props: {
      path: '/foo',
      exact: true,
      data: "matchedUrl",
    },
  },
];

const Link = prefetch(() => <a />, routes);

describe("prefetch provider", () => {

  it("should fire a FETCH_RESOURCE_REQUEST on mount", () => {
    fetchMock.mock('end:matchedUrl',{ hello: "world" });
    store.clearActions();
    const wrapper = mount(
      <Provider store={store}>
        <Link to="/foo">hi</Link>
      </Provider>
    );
    const action = {
      type: types.RESOURCE_REQUEST,
      meta: {
        endpoint: 'matchedUrl',
      },
    };
    expect(action).to.deep.equal(store.getActions()[0]);
  });

  it("should not fire an action when there is no matched route", () => {
    store.clearActions();
    const wrapper = mount(
      <Provider store={store}>
        <Link to="/baz">hi</Link>
      </Provider>
    );
    expect(store.getActions()).to.deep.equal([]);
  });
});
