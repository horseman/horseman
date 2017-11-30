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
      erd.listenTo(this.wrapper, this.handleResize);

      this.handleResize();
    }

    componentWillUnmount() {
      erd.removeListener(this.wrapper, this.handleResize);
    }

    handleResize() {
      const { clientHeight: height, clientWidth: width } = this.wrapper;

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
      const styles = this.props.fill
        ? {
            position: "absolute",
            top: 0,
            left: 0,
            height: "100%",
            width: "100%",
          }
        : {};

      return (
        <div
          styles={styles}
          ref={wrapper => {
            this.wrapper = wrapper;
          }}
        >
          <Component
            {...this.props}
            width={this.state.width}
            height={this.state.height}
          />
        </div>
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

    /**
     * If we are "filling" our parent container, render the wrapper absolutely
     */
    fill: PropTypes.bool,

    boundaries: PropTypes.arrayOf(PropTypes.number),
  };

  return Dimensions;
};
