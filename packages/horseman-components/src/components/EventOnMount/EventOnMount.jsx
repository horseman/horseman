import React from "react";
import PropTypes from "prop-types";

class EventOnMount extends React.Component {
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

EventOnMount.propTypes = {
  gtmEvent: PropTypes.string,
  children: PropTypes.node,
};

export default EventOnMount;
