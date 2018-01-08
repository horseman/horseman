import React from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import * as types from "../constants/ActionTypes";

/**
 * The component needs to be able to fetch the resource we want.
 */
export const mapDispatchToProps = (dispatch, ownProps) => ({
  gotoPage: page =>
    dispatch({
      type: types.SET_CURRENT_PAGE,
      handle: ownProps.handle,
      data: { currentPage: page },
    }),
});

export const mapStateToProps = (state, ownProps) => {
  const stateData =
    state.horsemanPaginations && state.horsemanPaginations[ownProps.handle]
      ? state.horsemanPaginations[ownProps.handle]
      : {};
  return {
    currentPage: stateData.currentPage || null,
    totalPages: stateData.totalPages || null,
  };
};

export default function(Component) {
  const PaginatedComponent = props => <Component {...props} />;

  PaginatedComponent.propTypes = {
    /*
     * The handle for the pagination redux key
     */
    handle: PropTypes.string.isRequired,
    /*
     * The current page for the paginator
     */
    currentPage: PropTypes.number,
    /*
     * Total pages for this paginator
     */
    totalPages: PropTypes.number,
    /*
     * The goto page function in dispatch
     */
    gotoPage: PropTypes.func,
  };

  return connect(mapStateToProps, mapDispatchToProps)(PaginatedComponent);
}
