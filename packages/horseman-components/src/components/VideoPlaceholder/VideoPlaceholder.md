This is a documentation Stub. Each component is required to be documented with
examples

### Examples
Example of a default VideoPlaceholder. Update the `playPosition` prop to see
how that is able to shift 'left', 'right', or 'center'.
```
const imageObject = require('styleguide/fixtures/imageObject').default;

<VideoPlaceholder
  playPosition="center"
  bgImage={imageObject}
  video={{
    id: '9ytei6bu7kQ',
    source: 'youtube',
  }}
/>
```
Example of a VideoPlaceholder filling it's relatively positioned container.


```
const imageObject = require('styleguide/fixtures/imageObject').default;

<div style={{position: 'relative', overflow: 'visible', height: '400px', maxWidth: '300px' }}>
  <VideoPlaceholder
    playPosition="right"
    bgImage={imageObject}
    video={{
      id: '9ytei6bu7kQ',
      source: 'youtube',
    }}
    fill
  />
</div>
```
