[![CircleCI](https://circleci.com/gh/BlendMarketing/horseman-components.svg)](https://circleci.com/gh/BlendMarketing/horseman-components)
![David-DM](https://david-dm.org/blendmarketing/horseman-components.svg)

# Horseman Components

Helper components for working with CMS's in react.

## Installation

`yarn add horseman-components`

or

`npm -i horseman-components`

## Usage

If you are using es6 you can import any of the components using

```
import { ComponentName } from 'horseman-components';
```

If using commonjs you can import components using

```
var ComponentName = require('horseman-components').ComponentName;
```

## Components


### RichText

Use the `RichText` component to render out html content from a CMS.

```js
<RichText html={resource.richTextField} />
```

The RichText component internally uses react's `dangerouslySetInnerHtml` flag
please know what you are doing.

[read more here][0]

[0]: https://facebook.github.io/react/docs/dom-elements.html#dangerouslysetinnerhtml
