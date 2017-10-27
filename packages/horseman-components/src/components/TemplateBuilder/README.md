# TemplateBuilder
The template builder is intended to render out a series of components from json
data. It's primary use case it to build dynamic pages from data returned from a
CMS api.

## Example
```js
import { TemplateBuilder } from "horseman-components";

import Content from "components/Content";
import Header from "components/Header";
import Picture from "components/Picture";
import Carousel from "components/Carousel";

// Map named keys to components to render.
const mappings = {
  content: Content,
  image: Picture,
  carousel: Carousel,
  header: Header,
};

// Most likely this data should originate from an external API.
const data = [
  {
    type: "content",
    body: "Dolor officiis non officiis tenetur debitis eveniet. Hic praesentium dolor."
  },
  {
    type: "carousel",
    images: [
      {
        src: "http://placehold.it/100x100",
      },
      {
        src: "http://placehold.it/200x200",
      },
    ],
  },
  {
    type: "header",
    text: "Foo Bar"
  },
  {
    type: "header",
    text: "Foo Bar"
  },
];


// Render TemplateBuilder component
<TemplateBuilder mapings={mappings}, data={data} />
```
