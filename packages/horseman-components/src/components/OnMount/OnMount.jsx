import React from "react";
import PropTypes from "prop-types";

class OnMount extends React.Component {
  componentDidMount() {
    const { gtmEvent } = this.props;

    if (gtmEvent) {
      this.fireGtmEvent();
    }
  }

  fireGtmEvent() {
    const { gtmEvent } = this.props;
    if (
      typeof window !== "undefined" &&
      typeof window.dataLayer !== "undefined"
    ) {
      window.dataLayer.push({ event: gtmEvent });
    }
  }

  render() {
    return <div>{this.props.children}</div>;
  }
}

OnMount.propTypes = {
  gtmEvent: PropTypes.string,
  children: PropTypes.node,
};

export default OnMount;
