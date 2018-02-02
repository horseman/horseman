import styled from "styled-components";

/**
 * The ItemContainer is responsible for spacing out the NavItem components
 * within the NavList
 */
const ItemContainer = styled.li`
  position: relative;
  overflow: visible;
  margin-right: 1em;

  &:last-child {
    margin-right: 0;
  }
`;

export default ItemContainer;
