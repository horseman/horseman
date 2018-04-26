This layout is 50/50 by default. It has props that allow either the right or
left side to 70/30, it also has a prop that will flip the columns on mobile
viewports.


### Example
```

const image = <img src="https://plachehold.it/800x400" />;
const content = (
  <div>
    <h3>Test Heading</h3>
    <p>
      Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo
      ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis
      dis parturient montes, nascetur ridiculus mus. Donec quam felis,
      ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa
      quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget,
      arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo.
      Nullam dictum felis eu pede mollis pretium.
    </p>
  </div>;
);

<TwoColumn firstCol={image} secondCol={content} mobileFlip noMargin="left"/>
```

### Example with the 'wide' prop
The wide prop changes the layout from 50/50 to 30/70.

```
const image = <img src="https://plachehold.it/800x400" />;
const content = (
  <div>
    <h3>Test Heading</h3>
    <p>
      Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo
      ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis
      dis parturient montes, nascetur ridiculus mus. Donec quam felis,
      ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa
      quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget,
      arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo.
      Nullam dictum felis eu pede mollis pretium.
    </p>
  </div>;
);
<TwoColumn firstCol={image} secondCol={content} wide="right"/>
```
