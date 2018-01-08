/* eslint-env mocha */

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { expect } from 'chai';
import fetchMock from 'fetch-mock';

import ActionFactory from '../src/ActionFactory';

import * as types from '../src/constants/ActionTypes';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const createResponse = (responseText, status) => {
  const blob = typeof responseText === 'object' ?
    new Blob([JSON.stringify(responseText, null, 2)], { type: 'application/json' }) :
    new Blob([responseText, { type: 'text/html' }]);
  return new Response(blob, { status });
};


describe('ActionFactory', () => {
  it('should return a valid resource action with success name', (done) => {
    const store = mockStore({ horsemanResources: {} });
    const response = createResponse({ hello: 'world' }, 200);
    const actions = [
      {
        type: types.RESOURCE_REQUEST,
        meta: {
          endpoint: '/endpoint',
        },
      },
      {
        type: '@@horseman/ADD_RESOURCE',
        meta: {
          endpoint: '/endpoint',
          status: 200,
        },
        payload: {
          hello: 'world',
        },
        response,
      },
    ];

    fetchMock.mock('end:/endpoint', response);


    store.dispatch(ActionFactory('@@horseman/ADD_RESOURCE')('/endpoint')).then(() => {
      try {
        expect(actions).to.deep.equal(store.getActions());
        done(); // success: call done with no parameter to indicate that it() is done()
      } catch (e) {
        done(e); // failure: call done with an error Object to indicate that it() failed
      }
    });
  });

  it('should send a fail response when the resource is not found', (done) => {
    const store = mockStore({ horsemanResources: {} });
    const response = createResponse('Not Found', 404);
    const actions = [
      {
        type: types.RESOURCE_REQUEST,
        meta: {
          endpoint: '/bad',
        },
      },
      {
        type: types.RESOURCE_FAIL,
        meta: {
          endpoint: '/bad',
          status: 404,
        },
        payload: {},
        response,
      },
    ];

    fetchMock.mock('end:/bad', response);

    store.dispatch(ActionFactory('@@horseman/ADD_RESOURCE')('/bad')).then(() => {
      try {
        expect(actions).to.deep.equal(store.getActions());
        done(); // success: call done with no parameter to indicate that it() is done()
      } catch (e) {
        done(e); // failure: call done with an error Object to indicate that it() failed
      }
    });
  });

  it('should dispatch BAD_JSON action when json is invalid', (done) => {
    const store = mockStore({ horsemanResources: {} });
    const actions = [
      {
        type: types.RESOURCE_REQUEST,
        meta: {
          endpoint: '/badjson',
        },
      },
      {
        type: types.BAD_JSON,
        meta: {
          endpoint: '/badjson',
        },
      },
    ];

    fetchMock.mock('end:/badjson', 'not json');

    store.dispatch(ActionFactory('@@horseman/ADD_RESOURCE')('/badjson')).then(() => {
      try {
        expect(actions).to.deep.equal(store.getActions());
        done(); // success: call done with no parameter to indicate that it() is done()
      } catch (e) {
        done(e); // failure: call done with an error Object to indicate that it() failed
      }
    });
  });
});
