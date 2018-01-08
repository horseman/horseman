import horsemanPaginationReducer from "../../reducers/horsemanPaginationReducer";
import * as types from "../../constants/ActionTypes";

describe("Pagination Reducer", () => {
  const initialState = {};

  test("should return the initial state", () => {
    expect(horsemanPaginationReducer(undefined, {})).toEqual(initialState);
    expect(
      horsemanPaginationReducer(
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

  test("should save save total pages", () => {
    expect(
      horsemanPaginationReducer(undefined, {
        type: types.SET_PAGE_TOTAL,
        handle: "blog",
        data: {
          totalPages: 10,
        },
      }),
    ).toEqual({
      blog: {
        totalPages: 10,
      },
    });
  });

  test("should save save current page", () => {
    expect(
      horsemanPaginationReducer(undefined, {
        type: types.SET_CURRENT_PAGE,
        handle: "blog",
        data: {
          currentPage: 1,
        },
      }),
    ).toEqual({
      blog: {
        currentPage: 1,
      },
    });
  });
  test("should combine data from multiple calls", () => {
    const hydratedState = {
      blog: {
        totalPages: 10,
      },
    };
    expect(
      horsemanPaginationReducer(hydratedState, {
        type: types.SET_CURRENT_PAGE,
        handle: "blog",
        data: {
          currentPage: 1,
        },
      }),
    ).toEqual({
      blog: {
        totalPages: 10,
        currentPage: 1,
      },
    });
  });
});
