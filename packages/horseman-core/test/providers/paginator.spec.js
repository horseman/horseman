/* eslint-disable */
import React from "react";
import { expect } from 'chai';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

import paginator, { mapStateToProps, mapDispatchToProps } from "../../src/providers/paginator";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore({ horsemanPaginations: {foo: {currentPage: 1, totalPages: 10}} });

const Pagination = ({ totalPages, currentPage }) => <div>{currentPage}-{totalPages}</div>;
const ConnectedPagination = paginator(Pagination);

describe("paginator provider", () => {
  it('should return a wrapped component', () => {
    const wrapper = shallow(
        <ConnectedPagination handle='foo' store={store} />
    );
    expect(wrapper.html()).to.equal(`<div>1-10</div>`);
  });
});

describe('Should mapStateToProps appropriately', () => {
  it('with empty state', () => {
    const state = {
      horsemanPaginations: {},
    };

    const ownProps = {
      handle: 'blog',
    };

    const expected = {
      currentPage: null,
      totalPages: null,
    };

    const exportedProps = mapStateToProps(state, ownProps);

    expect(exportedProps).to.deep.equal(expected);
  });
  it('with hydrated state', () => {
    const state = {
      horsemanPaginations: {
        'blog': { totalPages: 10, currentPage: 1 },
      },
    };

    const ownProps = {
      handle: 'blog',
    };

    const expected = {
      currentPage: 1,
      totalPages: 10,
    };

    const exportedProps = mapStateToProps(state, ownProps);

    expect(exportedProps).to.deep.equal(expected);
  });
});

it('Should mapDispatchToProps appropriately', () => {
  const dispatch = sinon.spy();
  const ownProps = {
    handle: 'blog',
  };
  const { gotoPage, ...rest } = mapDispatchToProps(dispatch, ownProps);
  const otherPropsExpected = {};

  gotoPage(1);

  expect(dispatch.calledOnce).to.equal(true);
  expect(rest).to.deep.equal(otherPropsExpected);
});

