The navList is a grouping of [NavItems](#navitem).

### Examples
```
const data = [{
  to: "#",
  text: "Tours",
  opened: true,
  subnav: [
    {
      to: "#",
      text: "Submenu Item",
    },
    {
      to: "#",
      text: "Another Submenu Item",
    },
  ],
},{
  to: "#",
  text: "Park Guide",
},{
  hasChildren: true,
  to: "#",
  text: "About",
},{
  to: "#",
  text: "Contact",
},];

<section style={{backgroundColor:"#3c83b8", display:"inline-block"}}>
  <NavList navItems={data} />
</section>
```
