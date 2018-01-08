/* eslint-disable react/prop-types */
/* eslint-env mocha */

import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import * as types from '../../src/constants/ActionTypes';

import { PaginationProvider, mapStateToProps, mapDispatchToProps } from '../../src/providers/PaginationProvider';
import { ConnectedResourceProvider } from '../../src/providers/ResourceProvider';

describe('PaginationProvider', () => {
  it('should return 1 resource provider and update total pages', () => {
    const totalPageFunc = sinon.spy();
    const props = {
      resolve: page => page,
      resource: { meta: { loading: false }, data: {} },
      handle: 'foo',
      setCurrentPage: () => 1,
      totalPagesResolver: totalPageFunc,
      render: e => e,
    };
    const wrapper = shallow(
      <PaginationProvider {...props} />,
    );
    expect(totalPageFunc.calledOnce).to.equal(true);
    expect(wrapper.find(ConnectedResourceProvider)).to.have.length(1);
  });


  describe('Should mapStateToProps appropriately', () => {
    it('with empty state', () => {
      const state = {
        horsemanPaginations: {},
      };
      const ownProps = {
        defaultPage: 1,
        handle: 'foo',
        resolve: page => `page-${page}`,
      };

      const expected = {
        currentPage: 1,
        totalPages: undefined,
        resourceUrl: 'page-1',
        resource: { meta: { loading: true, error: false }, data: {} },
      };

      const exportedProps = mapStateToProps(state, ownProps);

      expect(exportedProps).to.deep.equal(expected);
    });
    it('with hydrated state', () => {
      const state = {
        horsemanResources: {
          'page-1': {
            title: 'foo',
          },
        },
      };

      const ownProps = {
        defaultPage: 1,
        handle: 'foo',
        resolve: page => `page-${page}`,
      };

      const expected = {
        currentPage: 1,
        totalPages: undefined,
        resourceUrl: 'page-1',
        resource: { title: 'foo' },
      };

      const exportedProps = mapStateToProps(state, ownProps);

      expect(exportedProps).to.deep.equal(expected);
    });
  });

  it('Should mapDispatchToProps appropriately', () => {
    const dispatch = sinon.spy();
    const ownProps = {
      handle: 'foo',
    };
    const { setPageTotal, setCurrentPage, ...rest } = mapDispatchToProps(dispatch, ownProps);
    const otherPropsExpected = {};

    setPageTotal(10);

    const pageTotalProps = {
      data: { totalPages: 10 },
      handle: ownProps.handle,
      type: types.SET_PAGE_TOTAL,
    };

    expect(dispatch.calledWith(pageTotalProps)).to.equal(true);

    expect(dispatch.calledOnce).to.equal(true);

    setCurrentPage(2);
    const currentPageProps = {
      data: { currentPage: 2 },
      handle: ownProps.handle,
      type: types.SET_CURRENT_PAGE,
    };

    expect(dispatch.calledWith(currentPageProps)).to.equal(true);

    expect(dispatch.calledTwice).to.equal(true);
    expect(rest).to.deep.equal(otherPropsExpected);
  });
});
