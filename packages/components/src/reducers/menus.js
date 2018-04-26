import convertWpMenu from "./convertWpMenu";

const initialState = {};

export default function menus(state = initialState, action) {
  switch (action.type) {
    case "@@horseman/addRemoteMenuSet": {
      const newMenus = Object.assign(
        {},
        ...action.payload.data.map(menu => ({
          [menu.slug]: menu.menuItems,
        })),
      );

      return {
        ...state,
        ...newMenus,
      };
    }

    case "@@horseman/addRemoteWPMenu": {
      return {
        ...state,
        [action.payload.slug]: convertWpMenu(action.payload.items),
      };
    }

    case "@@horseman/addRemoteMenu": {
      return {
        ...state,
        [action.payload.slug]: action.payload.menuItems,
      };
    }

    case "@@horseman/addMenu": {
      return {
        ...state,
        [action.menuName]: action.menu,
      };
    }

    /**
     * Change the state of a menuItem to be the opposite of what it currently
     * is. Also closes all other opened menu items.
     */
    case "@@horseman/toggleMenuItem": {
      const { menuName } = action;
      const selectedMenu = state[menuName];

      const newMenuState = selectedMenu.map(item => {
        const newItem = { ...item };

        // We've found the new item, toggle it.
        if (newItem.text === action.itemTitle) {
          newItem.open = !newItem.open;
        } else if (newItem.open) {
          // All previously opened nav items should be closed.
          newItem.open = false;
        }

        // Immutably copy the subnav to the new item.
        if (newItem.subnav) {
          newItem.subnav = newItem.subnav.map(i => ({ ...i }));
        }

        return newItem;
      });

      return {
        ...state,
        [menuName]: newMenuState,
      };
    }

    /**
     * Update all menuItems to have the `open: closed`
     */
    case "@@horseman/closeMenu": {
      const { menuName } = action;
      const selectedMenu = state[menuName];
      const newMenuState = selectedMenu.map(item => {
        const newItem = { ...item };

        if (newItem.open) {
          newItem.open = false;
        }

        // Immutably copy the subnav to the new item.
        if (newItem.subnav) {
          newItem.subnav = newItem.subnav.map(i => ({ ...i }));
        }

        return newItem;
      });

      return {
        ...state,
        [menuName]: newMenuState,
      };
    }
    default: {
      return state;
    }
  }
}
