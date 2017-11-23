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
        loaded: false,
        width: 0,
        height: 0,
      };

      this.handleResize = this.handleResize.bind(this);
    }

    componentDidMount() {
      erd.listenTo(this.component, this.handleResize);

      if (!this.state.loaded) {
        this.handleResize();
      }
    }

    componentWillUnmount() {
      erd.removeListener(this.component, this.handleResize);
    }

    handleResize() {
      const { clientHeight: height, clientWidth: width } = this.wrap;

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
        loaded: true,
      });

      this.props.onResize({ height, width });
    }

    render() {
      const styles = {
        wrap: {
          position: "relative",
          height: "100%",
        },
        component: {
          height: "100%",
        },
      };

      return (
        <div
          ref={wrap => {
            this.wrap = wrap;
          }}
          style={{ ...styles.wrap }}
        >
          <div
            ref={component => {
              this.component = component;
            }}
            style={{ ...styles.component }}
          >
            {this.state.loaded ? (
              <Component
                {...this.props}
                width={this.state.width}
                height={this.state.height}
              />
            ) : null}
          </div>
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

    boundaries: PropTypes.arrayOf(PropTypes.number),
  };

  return Dimensions;
};
