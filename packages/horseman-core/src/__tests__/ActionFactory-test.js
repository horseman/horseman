import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import fetchMock from "fetch-mock";

import ActionFactory from "../ActionFactory";

import * as types from "../constants/ActionTypes";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("ActionFactory", () => {
  fetchMock.mock("end:/endpoint", JSON.stringify({ hello: "world" }));
  fetchMock.mock("end:/bad", 404);
  fetchMock.mock("end:/badjson", "not json");

  test("should return a valid resource action with success name", done => {
    const store = mockStore({ horsemanResources: {} });
    const actions = [
      {
        type: types.RESOURCE_REQUEST,
        meta: {
          endpoint: "/endpoint",
        },
      },
      {
        type: types.ADD_RESOURCE,
        meta: {
          endpoint: "/endpoint",
          status: 200,
        },
        payload: {
          hello: "world",
        },
        response: expect.any(Object),
      },
    ];

    store
      .dispatch(ActionFactory("@@horseman/ADD_RESOURCE")("/endpoint"))
      .then(() => {
        try {
          expect(store.getActions()).toEqual(actions);
          done(); // success: call done with no parameter to indicate that it() is done()
        } catch (e) {
          done(e); // failure: call done with an error Object to indicate that it() failed
        }
      });
  });

  test("should send a fail response when the resource is not found", done => {
    const store = mockStore({ horsemanResources: {} });
    const actions = [
      {
        type: types.RESOURCE_REQUEST,
        meta: {
          endpoint: "/bad",
        },
      },
      {
        type: types.RESOURCE_FAIL,
        meta: {
          endpoint: "/bad",
          status: 404,
        },
        payload: {},
        response: expect.any(Object),
      },
    ];

    store
      .dispatch(ActionFactory("@@horseman/ADD_RESOURCE")("/bad"))
      .then(() => {
        try {
          expect(store.getActions()).toEqual(actions);
          done(); // success: call done with no parameter to indicate that it() is done()
        } catch (e) {
          done(e); // failure: call done with an error Object to indicate that it() failed
        }
      });
  });

  test("should dispatch BAD_JSON action when json is invalid", done => {
    const store = mockStore({ horsemanResources: {} });
    const actions = [
      {
        type: types.RESOURCE_REQUEST,
        meta: {
          endpoint: "/badjson",
        },
      },
      {
        type: types.BAD_JSON,
        meta: {
          endpoint: "/badjson",
        },
      },
    ];

    store
      .dispatch(ActionFactory("@@horseman/ADD_RESOURCE")("/badjson"))
      .then(() => {
        try {
          expect(store.getActions()).toEqual(actions);
          done(); // success: call done with no parameter to indicate that it() is done()
        } catch (e) {
          done(e); // failure: call done with an error Object to indicate that it() failed
        }
      });
  });
});
