/* eslint-disable react/prop-types */
/* eslint-env mocha */

import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import { ResourceProvider, mapStateToProps, mapDispatchToProps } from '../../src/providers/ResourceProvider';

describe('ResourceProvider', () => {
  it('should refresh the component when resourceUrl change', () => {
    const fetchFunc = sinon.spy();

    const props = {
      getResource: fetchFunc,
      endpoint: '/foo/:slug',
      resourceUrl: '/foo/baz',
      endpointVars: { slug: 'baz' },
      resource: { meta: {}, data: {} },
      render: () => null,
    };
    const wrapper = shallow(
      <ResourceProvider {...props} />,
    );

    expect(fetchFunc.calledOnce).to.equal(true);

    wrapper.setProps({
      ...props,
      endpointVars: {
        slug: 'baz',
      },
    });
    expect(fetchFunc.calledOnce).to.equal(true);

    wrapper.setProps({
      ...props,
      endpointVars: {
        slug: 'biz',
      },
    });
    expect(fetchFunc.calledTwice).to.equal(true);

    wrapper.setProps({
      ...props,
      endpointVars: {
        slug: 'biz',
      },
    });
    expect(fetchFunc.calledTwice).to.equal(true);

    wrapper.setProps({
      ...props,
      endpointVars: {
        slug: 'riz',
      },
    });
    expect(fetchFunc.calledThrice).to.equal(true);
  });

  it('Should render the requested component if an resource returns successfully', () => {
    const resource = {
      meta: {
        loading: false,
        error: false,
      },
      data: {
        foo: 'bar',
        hello: 'world',
      },
    };

    const fetchFunc = sinon.spy();
    const ResourceComponent = ({ e }) => (
      <div>{ e.foo } { e.hello }</div>
    );

    const wrapper = shallow(
      <ResourceProvider
        getResource={fetchFunc}
        resourceUrl="/foo"
        resource={resource}
        render={e => <ResourceComponent e={e} />}
      />,
    );

    expect(wrapper.find(ResourceComponent)).to.have.length(1);
    expect(wrapper.html()).to.equal(`<div>${resource.data.foo} ${resource.data.hello}</div>`);
  });

  describe('Should mapStateToProps appropriately', () => {
    it('with empty state', () => {
      const state = {
        horsemanResources: {},
      };
      const ownProps = {
        endpoint: 'http://example.com/:slug',
        endpointVars: {
          slug: 'example',
        },
      };

      const expected = {
        resourceUrl: 'http://example.com/example',
        resource: { meta: { loading: true, error: false }, data: {} },
      };

      const exportedProps = mapStateToProps(state, ownProps);

      expect(exportedProps).to.deep.equal(expected);
    });
    it('with hydrated state', () => {
      const state = {
        horsemanResources: {
          'http://example.com/resource': {
            title: 'foo',
          },
        },
      };

      const ownProps = {
        endpoint: 'http://example.com/:slug',
        endpointVars: {
          slug: 'resource',
        },
      };

      const expected = {
        resourceUrl: 'http://example.com/resource',
        resource: { title: 'foo' },
      };

      const exportedProps = mapStateToProps(state, ownProps);

      expect(exportedProps).to.deep.equal(expected);
    });
  });

  it('Should mapDispatchToProps appropriately', () => {
    const dispatch = sinon.spy();
    const { getResource, ...rest } = mapDispatchToProps(dispatch);
    const resourceUrl = 'http://example.com';
    const otherPropsExpected = {};

    getResource(resourceUrl);

    expect(dispatch.calledOnce).to.equal(true);
    expect(rest).to.deep.equal(otherPropsExpected);
  });
});
