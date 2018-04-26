import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";

import ParseEndpoint from "../ParseEndpoint";
import addResource from "../actions/addResource";

/**
 * Responsible for managing a component that will be rendered using data stored
 * in a backend. The data returned will be stored in the "resource"
 * prop of the child component.
 */
export class ResourceProvider extends React.Component {
  componentWillMount() {
    this.refreshComponent();
  }

  /**
   * When the component is updating, we need to check the props to see if the
   * next requests requires us to fetch new data from the endpoint.
   *
   * So we check the resourceUrl value here and if it's a new request, we
   * refresh the component otherwise we do nothing.
   */
  componentWillReceiveProps(nextProps) {
    const oldUrl = ParseEndpoint(this.props.endpoint, this.props.endpointVars);
    const newUrl = ParseEndpoint(nextProps.endpoint, nextProps.endpointVars);

    if (oldUrl === newUrl) {
      return;
    }

    this.props = nextProps;
    this.refreshComponent();
  }

  /**
   * When the component is refreshed we check the resource to be sure we have the
   * latest data to paint the DOM
   */
  refreshComponent() {
    const { getResource, resourceUrl } = this.props;
    getResource(resourceUrl);
  }

  render() {
    const { resource, render } = this.props;

    return render(resource.data, resource.meta);
  }
}

ResourceProvider.propTypes = {
  /**
   * The method call that will be responsible for fetching the resource data and
   * adding the information to the store.
   */
  getResource: PropTypes.func.isRequired,

  /**
   * The url endpoint for the resource that will be associated with the component.
   */
  resourceUrl: PropTypes.string.isRequired,

  /**
   * The actual resource object. To be used for rendering the page.
   */
  resource: PropTypes.object.isRequired,

  /**
   * Func to be rendered once the resource comes back
   */
  render: PropTypes.func.isRequired,

  /* eslint-disable react/no-unused-prop-types */
  /**
   * The endpoint that will be used to fetch the resource. May be a static url
   * or a url that requires templating.
   *
   * Templated urls follow `react-router` matching pattern.
   *
   * http://example.com/:templatedPath?q=:templatedParam
   *
   * If a templated url is passed in, the `endpointVars` prop should contain
   * an object with key:value pairs matching the requested url sections
   */
  endpoint: PropTypes.string.isRequired,

  /**
   * The variables that will be used to build out a templated endpoint
   */
  endpointVars: PropTypes.object,
  /* eslint-enable react/no-unused-prop-types */
};

export const mapStateToProps = (state, ownProps) => {
  const resourceUrl = ParseEndpoint(ownProps.endpoint, ownProps.endpointVars);

  return {
    resourceUrl,
    resource: state.horsemanResources[resourceUrl] || {
      meta: { loading: true, error: false },
      data: {},
    },
  };
};

/**
 * The component needs to be able to fetch the resource we want.
 */
export const mapDispatchToProps = dispatch => ({
  getResource: uri => dispatch(addResource(uri)),
});

export const ConnectedResourceProvider = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ResourceProvider);
