/**
 * Will transform a WP menu from the API into the "horseman standard"
 * version of a menu
 */
const menuTransform = menuData =>
  menuData.map(menuItem => {
    const { title, url, target, children = [] } = menuItem;
    const hasChildren = children.length > 0 || false;

    const item = {
      to: url.replace("http://wp.curechm.org/index.php/", "/"),
      text: title,
    };

    if (target) {
      item.target = target;
    }
    if (hasChildren) {
      item.subnav = menuTransform(children);
    }

    return item;
  });

export default menuTransform;
