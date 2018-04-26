import React, { Component } from "react";
import PropTypes from "prop-types";

class Accordions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openItem: "",
    };
  }

  handleClick(heading) {
    /**
     * If we have a click on the same item, close it.
     */
    if (heading === this.state.openItem) {
      this.setState({ openItem: "" });
    } else {
      this.setState({ openItem: heading });
    }
  }

  render() {
    const {
      accordions,
      wrapper: Wrapper,
      label: Label,
      content: Content,
    } = this.props;
    const items = accordions.map(data => {
      const unique = data.heading.replace(/\W/g, "");
      const opened = this.state.openItem === data.heading;

      return (
        <Wrapper key={unique}>
          <Label
            onClick={() => this.handleClick(data.heading)}
            to="#"
            opened={opened}
            aria-controls={unique}
            aria-expanded={opened}
          >
            {data.heading}
          </Label>
          <Content opened={opened} id={unique} aria-hidden={!opened}>
            {data.content}
          </Content>
        </Wrapper>
      );
    });
    return <section>{items}</section>;
  }
}

Accordions.propTypes = {
  /**
   * The Accordions that will be displayed in this list
   */
  accordions: PropTypes.arrayOf(
    PropTypes.shape({
      heading: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
    }),
  ),

  content: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.node,
    PropTypes.element,
  ]).isRequired,

  label: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.node,
    PropTypes.element,
  ]).isRequired,

  wrapper: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.node,
    PropTypes.element,
  ]).isRequired,
};

export default Accordions;
