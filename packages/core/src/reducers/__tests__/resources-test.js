import horsemanReducer from "../../reducers/horsemanReducer";
import * as types from "../../constants/ActionTypes";

describe("Resources Reducer", () => {
  const initialState = {};

  test("should return the initial state", () => {
    expect(horsemanReducer(undefined, {})).toEqual(initialState);
    expect(
      horsemanReducer(
        {
          foo: {
            data: "bar",
          },
        },
        {},
      ),
    ).toEqual({
      foo: {
        data: "bar",
      },
    });
  });

  test("should handle a new request to fetch a resource", () => {
    expect(
      horsemanReducer(undefined, {
        type: types.RESOURCE_REQUEST,
        meta: {
          endpoint: "foo",
        },
      }),
    ).toEqual({
      foo: {
        meta: {
          error: false,
          loading: true,
        },
        data: {},
      },
    });
  });

  test("should handle a new request to fetch an resource when data exists", () => {
    expect(
      horsemanReducer(
        {
          foo: {
            meta: {
              loading: false,
              error: false,
            },
            data: {
              title: "bar",
            },
          },
        },
        {
          type: types.RESOURCE_REQUEST,
          meta: {
            endpoint: "bar",
          },
        },
      ),
    ).toEqual({
      foo: {
        meta: {
          loading: false,
          error: false,
        },
        data: {
          title: "bar",
        },
      },
      bar: {
        meta: {
          loading: true,
          error: false,
        },
        data: {},
      },
    });
  });

  test("should handle reducing an resource that failed to fetch", () => {
    expect(
      horsemanReducer(
        {
          foo: {
            meta: {
              loading: false,
              error: false,
            },
            data: {
              title: "bar",
            },
          },
        },
        {
          type: types.RESOURCE_FAIL,
          meta: {
            endpoint: "bar",
            status: 404,
          },
          response: {
            status: 404,
          },
        },
      ),
    ).toEqual({
      foo: {
        meta: {
          loading: false,
          error: false,
        },
        data: {
          title: "bar",
        },
      },
      bar: {
        meta: {
          loading: false,
          error: true,
          status: 404,
        },
        data: {},
        response: {
          status: 404,
        },
      },
    });
  });

  test("should handle reducing a resource", () => {
    expect(
      horsemanReducer(
        {
          foo: {
            meta: {
              loading: false,
              error: false,
            },
            data: {
              title: "bar",
            },
          },
        },
        {
          type: types.ADD_RESOURCE,
          meta: {
            endpoint: "bar",
            status: 200,
          },
          payload: {
            title: "baz",
          },
          response: {
            status: 200,
          },
        },
      ),
    ).toEqual({
      foo: {
        meta: {
          loading: false,
          error: false,
        },
        data: {
          title: "bar",
        },
      },
      bar: {
        meta: {
          loading: false,
          error: false,
          status: 200,
        },
        data: {
          title: "baz",
        },
        response: {
          status: 200,
        },
      },
    });
  });
});
