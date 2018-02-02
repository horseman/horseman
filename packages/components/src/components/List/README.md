A list is a structural component intended to render a list of items. You can
supply a mobile and desktop base that provide the number of items that will be
spread across a single line on mobile and desktop respectively.

The list will never allow an item to exist on a line by itself, so it will
always ensure that multiple items are on a line.

### Examples
```
<List base={5} mobileBase={2}>
  <div style={{background: 'gray', height: '100px'}}></div>
  <div style={{background: 'gray', height: '100px'}}></div>
  <div style={{background: 'gray', height: '100px'}}></div>
  <div style={{background: 'gray', height: '100px'}}></div>
  <div style={{background: 'gray', height: '100px'}}></div>
  <div style={{background: 'gray', height: '100px'}}></div>
</List>
```
