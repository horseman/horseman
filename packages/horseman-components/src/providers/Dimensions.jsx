import React from "react";
import elementResizeDetectorMaker from "element-resize-detector";

const erd = elementResizeDetectorMaker({
  strategy: "scroll",
});

export default Component => {
  class Wrap extends React.Component {
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
      const component = this.wrap;
      this.setState({
        loaded: true,
        width: component.clientWidth,
        height: component.clientHeight,
      });
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
            {this.state.loaded && this.state.width > 0 ? (
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

  return Wrap;
};
