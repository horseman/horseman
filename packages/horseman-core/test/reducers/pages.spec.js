/* eslint-env mocha */

import { expect } from 'chai';
import horsemanPaginationReducer from '../../src/reducers/horsemanPaginationReducer';
import * as types from '../../src/constants/ActionTypes';

describe('Pagination Reducer', () => {
  const initialState = {};

  it('should return the initial state', () => {
    expect(horsemanPaginationReducer(undefined, {})).to.deep.equal(initialState);
    expect(horsemanPaginationReducer({
      foo: {
        data: 'bar',
      },
    }, {})).to.deep.equal({
      foo: {
        data: 'bar',
      },
    });
  });

  it('should save save total pages', () => {
    expect(horsemanPaginationReducer(undefined, {
      type: types.SET_PAGE_TOTAL,
      handle: 'blog',
      data: {
        totalPages: 10,
      },
    })).to.deep.equal({
      blog: {
        totalPages: 10,
      },
    });
  });

  it('should save save current page', () => {
    expect(horsemanPaginationReducer(undefined, {
      type: types.SET_CURRENT_PAGE,
      handle: 'blog',
      data: {
        currentPage: 1,
      },
    })).to.deep.equal({
      blog: {
        currentPage: 1,
      },
    });
  });
  it('should combine data from multiple calls', () => {
    const hydratedState = {
      blog: {
        totalPages: 10,
      },
    };
    expect(horsemanPaginationReducer( hydratedState, {
      type: types.SET_CURRENT_PAGE,
      handle: 'blog',
      data: {
        currentPage: 1,
      },
    })).to.deep.equal({
      blog: {
        totalPages: 10,
        currentPage: 1,
      },
    });
  });
});
