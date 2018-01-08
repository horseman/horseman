/* eslint-disable */

import { expect } from 'chai';

import getRoutePreloadData from '../src/getRoutePreloadData';

describe('getRoutePreloadData', () => {
  const routes = [
    {
      props: {
        path: '/foo',
        exact: true,
        data: "matchedUrl",
      },
    },
    {
      props: {
        path: '/biz',
        exact: true,
      },
    },
    {
      props: {
        path: '/bar/:id',
        data: "matchedUrl",
      },
    },
  ];

  const wildCardRoutes = [
    {
      props: {
        path: '/*',
        data: "genericUrl",
      },
    },
  ];
  it('should find the correct path', () => {
    expect(getRoutePreloadData(routes, "/foo")).to.equal("matchedUrl");
  });
  it('should not return a matched route without data', () => {
    expect(getRoutePreloadData(routes, "/biz")).to.equal(null);
  });
  it('should match routes with paths', () => {
    expect(getRoutePreloadData(routes, "/bar/test")).to.equal("matchedUrl");
  });
  it('should handle wildcard routes', () => {
    expect(getRoutePreloadData(wildCardRoutes, "/generic")).to.equal("genericUrl");
  });
});
