import React from "react";
import PropTypes from "prop-types";

class EventOnMount extends React.Component {
  componentDidMount() {
    const { onMount } = this.props;

    onMount();
  }

  componentDidUpdate() {
    const { onUpdate } = this.props;

    onUpdate();
  }

  render() {
    return <div>{this.props.children}</div>;
  }
}

EventOnMount.propTypes = {
  onMount: PropTypes.func,
  onUpdate: PropTypes.func,
  children: PropTypes.node,
};

export default EventOnMount;
