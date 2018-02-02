This renders a picture element with `<srcset>` and a fallback `<img>` tag.
Props not otherwise specified will be passed to the underlying `<img>` tag.

### Examples
```js
const imageData = {
  "src": "http://placehold.it/800x200",
  "alt": '',
  "srcset": [
    {
      "src": "http://placehold.it/320x200",
      "width": 320,
      "height": 200
    },
    {
      "src": "http://placehold.it/720x200",
      "width": 720,
      "height": 200
    },
  ]
};

<Picture imageData={imageData} />
```
