/* eslint-disable react/no-unused-prop-types */
import React from "react";
import PropTypes from "prop-types";
import { EventOnMount } from "horseman-components";
import { connect } from "react-redux";

import * as types from "../constants/ActionTypes";

class PageLoadedProvider extends React.Component {
  componentWillReceiveProps(nextProps) {
    if (this.props.isPageLoading && nextProps.isPageLoaded) {
      this.props.onLoad();
    }
  }

  render() {
    const { pageDidLoad, children } = this.props;
    return (
      <EventOnMount onMount={pageDidLoad} onUpdate={pageDidLoad}>
        {children}
      </EventOnMount>
    );
  }
}

PageLoadedProvider.propTypes = {
  isPageLoading: PropTypes.bool,
  isPageLoaded: PropTypes.bool,
  keyName: PropTypes.string,
  onLoad: PropTypes.func,
  pageDidLoad: PropTypes.func,
  children: PropTypes.node.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
  isPageLoaded: state.loadingStatus[ownProps.keyName].loaded,
  isPageLoading: state.loadingStatus[ownProps.keyName].loading,
});
const mapDispatchToProps = (dispatch, ownProps) => ({
  pageDidLoad: () => {
    if (ownProps.isPageLoading) {
      dispatch({ type: types.PAGE_LOADED, keyName: ownProps.keyName });
    }
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(PageLoadedProvider);
