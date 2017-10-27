A BackgroundImage spans the entire width of its container and applies a
background image. By default the background image has no height, it is intended
to be extended.

### Example
```
const image = {
  src: "http://placehold.it/400x400,
}

<div>
  <BackgroundImage
    bgImage={image}
    >
    <div style={{height: '100px', color: 'white'}}>
    Content for the background image
    </div>
  </BackgroundImage>
</div>
```
