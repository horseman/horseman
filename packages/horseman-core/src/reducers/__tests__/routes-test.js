import horsemanRouteReducer from "../../reducers/horsemanRouteReducer";
import * as types from "../../constants/ActionTypes";

describe("Routes Reducer", () => {
  const initialState = {};

  test("should return the initial state", () => {
    expect(horsemanRouteReducer(undefined, {})).toEqual(initialState);
    expect(
      horsemanRouteReducer(
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

  test("should save routes to state", () => {
    expect(
      horsemanRouteReducer(undefined, {
        type: types.SAVE_ROUTES,
        routes: [
          {
            path: "foo",
          },
        ],
      }),
    ).toEqual([
      {
        path: "foo",
      },
    ]);
  });
});
