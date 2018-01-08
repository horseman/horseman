/* eslint-env mocha */

import { expect } from 'chai';
import ParseEndpoint from '../src/ParseEndpoint';

describe('ParseEndpoint', () => {
  it('should parse endpoints with dynamic portions', () => {
    const testData = [
      { url: '/foo/:slug', data: { slug: 'bar' }, expected: '/foo/bar' },
      { url: 'http://www.example.com/:slug/:dyn', data: { slug: 'foo', dyn: 'bar' }, expected: 'http://www.example.com/foo/bar' },
      { url: 'http://www.example.com/:slug', data: { slug: 'foo', dyn: 'bar' }, expected: 'http://www.example.com/foo' },
      { url: 'http://www.example.com/:slug', data: { dyn: 'bar' }, expected: 'http://www.example.com/' },
      { url: 'http://www.example.com/:slug?query=:dyn', data: { slug: 'foo', dyn: 'bar' }, expected: 'http://www.example.com/foo?query=bar' },
      { url: 'http://www.example.com/:slug?query=:dyn', data: { dyn: 'bar' }, expected: 'http://www.example.com/?query=bar' },
    ];

    testData.forEach((item) => {
      const parsedUrl = ParseEndpoint(item.url, item.data);
      expect(parsedUrl).to.equal(item.expected);
    });
  });

  it('should pass through non-dynamic urls', () => {
    const testData = [
      { url: '/foo/', data: { slug: 'bar' }, expected: '/foo/' },
      { url: 'http://www.example.com/', data: { slug: 'foo', dyn: 'bar' }, expected: 'http://www.example.com/' },
      { url: 'http://www.example.com/foo', data: { dyn: 'bar' }, expected: 'http://www.example.com/foo' },
      { url: 'http://www.example.com/foo?query=bar', data: { slug: 'foo', dyn: 'bar' }, expected: 'http://www.example.com/foo?query=bar' },
      { url: 'http://www.example.com?query=bar', data: { dyn: 'bar' }, expected: 'http://www.example.com?query=bar' },
    ];

    testData.forEach((item) => {
      const parsedUrl = ParseEndpoint(item.url, item.data);
      expect(parsedUrl).to.equal(item.expected);
    });
  });
});
