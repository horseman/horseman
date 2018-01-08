/* eslint-env mocha */

import { expect } from 'chai';
import horsemanRouteReducer from '../../src/reducers/horsemanRouteReducer';
import * as types from '../../src/constants/ActionTypes';

describe('Routes Reducer', () => {
  const initialState = {};

  it('should return the initial state', () => {
    expect(horsemanRouteReducer(undefined, {})).to.deep.equal(initialState);
    expect(horsemanRouteReducer({
      foo: {
        data: 'bar',
      },
    }, {})).to.deep.equal({
      foo: {
        data: 'bar',
      },
    });
  });

  it('should save routes to state', () => {
    expect(horsemanRouteReducer(undefined, {
      type: types.SAVE_ROUTES,
      routes: [{
        path: 'foo',
      }],
    })).to.deep.equal([{
      path: 'foo',
    }]);
  });
});
