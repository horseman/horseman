import React from "react";
import PropTypes from "prop-types";

const elementResizeDetectorMaker =
  typeof window !== "undefined"
    ? require("element-resize-detector")
    : obj => obj;

const erd = elementResizeDetectorMaker({
  strategy: "scroll",
});

export const shouldUpdate = ({ oldWidth, newWidth, boundaries }) =>
  boundaries.filter(boundary => {
    if (oldWidth === newWidth) {
      return false;
    }

    return (
      boundary === newWidth ||
      (boundary - oldWidth) * (boundary - newWidth) <= 0
    );
  }).length > 0;

export default Component => {
  class Dimensions extends React.Component {
    constructor() {
      super();

      this.state = {
        width: 0,
        height: 0,
      };

      this.handleResize = this.handleResize.bind(this);
    }

    componentDidMount() {
      erd.listenTo(this.component, this.handleResize);

      this.handleResize();
    }

    componentWillUnmount() {
      erd.removeListener(this.component, this.handleResize);
    }

    handleResize() {
      const { clientHeight: height, clientWidth: width } = this.component;

      const oldWidth = this.state.width;

      // We want to only handle a resize if we have traversed a boundary point
      // if no boundary points have been included, always update.
      if (
        this.props.boundaries.length > 0 &&
        !shouldUpdate({
          oldWidth,
          newWidth: width,
          boundaries: this.props.boundaries,
        })
      ) {
        return;
      }

      this.setState({
        width,
        height,
      });

      this.props.onResize({ height, width });
    }

    render() {
      return (
        <Component
          ref={component => {
            this.component = component;
          }}
          {...this.props}
          width={this.state.width}
          height={this.state.height}
        />
      );
    }
  }

  Dimensions.defaultProps = {
    onResize: () => {},
    boundaries: [],
  };

  Dimensions.propTypes = {
    /**
     * Callback that will be fired when a resize is triggered.
     */
    onResize: PropTypes.func,

    boundaries: PropTypes.arrayOf(PropTypes.number),
  };

  return Dimensions;
};
