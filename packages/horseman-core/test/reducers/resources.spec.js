/* eslint-env mocha */

import { expect } from 'chai';
import horsemanReducer from '../../src/reducers/horsemanReducer';
import * as types from '../../src/constants/ActionTypes';

describe('Resources Reducer', () => {
  const initialState = {};

  it('should return the initial state', () => {
    expect(horsemanReducer(undefined, {})).to.deep.equal(initialState);
    expect(horsemanReducer({
      foo: {
        data: 'bar',
      },
    }, {})).to.deep.equal({
      foo: {
        data: 'bar',
      },
    });
  });

  it('should handle a new request to fetch a resource', () => {
    expect(horsemanReducer(undefined, {
      type: types.RESOURCE_REQUEST,
      meta: {
        endpoint: 'foo',
      },
    })).to.deep.equal({
      foo: {
        meta: {
          error: false,
          loading: true,
        },
        data: {},
      },
    });
  });

  it('should handle a new request to fetch an resource when data exists', () => {
    expect(horsemanReducer({
      foo: {
        meta: {
          loading: false,
          error: false,
        },
        data: {
          title: 'bar',
        },
      },
    }, {
      type: types.RESOURCE_REQUEST,
      meta: {
        endpoint: 'bar',
      },
    })).to.deep.equal({
      foo: {
        meta: {
          loading: false,
          error: false,
        },
        data: {
          title: 'bar',
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

  it('should handle reducing an resource that failed to fetch', () => {
    expect(horsemanReducer({
      foo: {
        meta: {
          loading: false,
          error: false,
        },
        data: {
          title: 'bar',
        },
      },
    }, {
      type: types.RESOURCE_FAIL,
      meta: {
        endpoint: 'bar',
        status: 404,
      },
      response: {
        status: 404,
      },
    })).to.deep.equal({
      foo: {
        meta: {
          loading: false,
          error: false,
        },
        data: {
          title: 'bar',
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

  it('should handle reducing a resource', () => {
    expect(horsemanReducer({
      foo: {
        meta: {
          loading: false,
          error: false,
        },
        data: {
          title: 'bar',
        },
      },
    }, {
      type: types.ADD_RESOURCE,
      meta: {
        endpoint: 'bar',
        status: 200,
      },
      payload: {
        title: 'baz',
      },
      response: {
        status: 200,
      },
    })).to.deep.equal({
      foo: {
        meta: {
          loading: false,
          error: false,
        },
        data: {
          title: 'bar',
        },
      },
      bar: {
        meta: {
          loading: false,
          error: false,
          status: 200,
        },
        data: {
          title: 'baz',
        },
        response: {
          status: 200,
        },
      },
    });
  });
});
