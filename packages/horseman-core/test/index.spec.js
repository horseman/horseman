/* eslint-env mocha */

import { expect } from 'chai';
import * as horseman from '../src/index';

import paginator from '../src/providers/paginator';
import prefetch from '../src/providers/prefetch';
import { ConnectedResourceProvider } from '../src/providers/ResourceProvider';
import { ConnectedPaginationProvider } from '../src/providers/PaginationProvider';
import horsemanReducer from '../src/reducers/horsemanReducer';
import horsemanRouteReducer from '../src/reducers/horsemanRouteReducer';
import ActionFactory from '../src/ActionFactory';

describe('horseman.js index', () => {
  describe('should export', () => {
    it('reducers', () => {
      expect(horseman.horsemanReducers.horsemanResources).to.be.a('function')
      .and.deep.equal(horsemanReducer);
      expect(horseman.horsemanReducers.horsemanRoutes).to.be.a('function')
      .and.deep.equal(horsemanRouteReducer);
    });
    it('the PaginationProvider', () => {
      expect(horseman.PaginationProvider).to.deep.equal(ConnectedPaginationProvider);
    });
    it('the ActionFactory', () => {
      expect(horseman.ActionFactory).to.deep.equal(ActionFactory);
    });
    it('the ResourceProvider', () => {
      expect(horseman.ResourceProvider).to.deep.equal(ConnectedResourceProvider);
    });
    it('the prefetch provider', () => {
      expect(horseman.prefetch).to.deep.equal(prefetch);
    });
    it('the paginator provider', () => {
      expect(horseman.paginator).to.deep.equal(paginator);
    });
    it('the Correct Number of items', () => {
      expect(Object.keys(horseman)).to.have.lengthOf(6);
    });
  });
});
