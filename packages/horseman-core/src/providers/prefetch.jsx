/* eslint-disable */
import React from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import * as types from "../constants/ActionTypes";
import ActionFactory from "../ActionFactory";
import getRoutePreloadData from "../getRoutePreloadData";

/**
 * The component needs to be able to fetch the resource we want.
 */
export const mapDispatchToProps = dispatch => ({
  preload: uri => dispatch(ActionFactory(types.ADD_RESOURCE)(uri)),
});

const mapStateToProps = state => ({
  routes: state.horsemanRoutes,
});

export default function(Component) {
  class PrefetchLink extends React.Component {
    componentWillMount() {
      this.preloadLink();
    }

    preloadLink() {
      const { preload, to } = this.props;
      const endpoint = getRoutePreloadData(this.props.routes, to);
      if (endpoint) {
        preload(endpoint);
      }
    }

    render() {
      const { routes, preload, ...rest } = this.props;
      return <Component {...rest} />;
    }
  }

  PrefetchLink.propTypes = {
    /*
     * The url the link is pointed to
     */
    to: PropTypes.string.isRequired,
    /*
     * The function in dispatch
     */
    preload: PropTypes.func.isRequired,
  };

  return connect(mapStateToProps, mapDispatchToProps)(PrefetchLink);
}
