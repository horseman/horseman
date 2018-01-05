import { ActionFactory } from "horseman-core";

export const fetchMenu = uri => ActionFactory("@@horseman/addRemoteMenu")(uri);

export const addMenu = ({ menuName, menu }) => ({
  menuName,
  menu,
  type: "@@horseman/addMenu",
});

export const toggleMenuItem = ({ menuName, itemTitle }) => ({
  menuName,
  itemTitle,
  type: "@@horseman/toggleMenuItem",
});

export const closeMenu = menuName => ({
  menuName,
  type: "@@horseman/closeMenu",
});
