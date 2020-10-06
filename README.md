# request-animation-helpers

A small collection of functions building on the capabilities of the `requestAnimationFrame` [browser API](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame), enabling you to fire callbacks _after_ the browser's next repaint (or after several future repaints).

The creation of this package was first dreamed up while writing [this blog post](https://macarthur.me/posts/when-dom-updates-appear-to-be-asynchronous), in which I explore a scenerio when it's necessary to fire code only after outstanding DOM updates have been painted to the screen. Since `requestAnimationFrame` fires a callback _before_ the next repaint, you're required to stack these calls, which can produce somewhat stringy code.

Implementation details are inspired by [Kyle Simpson](https://github.com/getify)'s [work from several years back](https://gist.github.com/getify/3004342), modeled with [permission](https://www.reddit.com/r/javascript/comments/j2dcfw/when_dom_updates_appear_to_be_asynchronous/g7cchd3/?utm_source=reddit&utm_medium=web2x&context=3).

## What's Included

The following functions are exported from this library:

### afterFuturePaint(callbackFunction[, numberOfPaints = 1])

Fire a callback _after_ the browser's next paint. This is handy when you need to perform some sort of action only after previous DOM changes have been painted to the DOM. If a second paramter is passed, the callback will fire only after that many paints have taken place.

### cancelAfterFuturePaint(id)

In the event you need to cancel the callback defined for `afterFuturePaint`, use `cancelAfterFuturePaint` to cancel that callback, preventing it from firing.

## Installation

`npm install request-animation-helpers`

## Usage

### Fire a Callback After Next Repaint

```js
import { afterFuturePaint } from "request-animation-helpers";

afterFuturePaint(() => {
  console.log("will fire after the next repaint!");
});
```

### Fire a Callback After Several Repaints

```js
import { afterFuturePaint } from "request-animation-helpers";

afterFuturePaint(() => {
  console.log("will fire after 5 repaints!");
}, 5);
```

### Cancel a Scheduled Callback

```js
import {
  afterFuturePaint,
  cancelAfterFuturePaint,
} from "request-animation-helpers";

const id = afterFuturePaint(() => {
  console.log("will fire after next repaint!");
});

// will no longer fire after next repaint!
cancelAfterFuturePaint(id);
```

## Non-Module Usage

To use these helpers an old-school environment, or without the help of a bundler, reference the `RAHelpers` object and call the method you desire:

```js
<script src="src/to/request-animation-helpers.js"></script>
<script>
  RAHelpers.afterFuturePaint(() => {
    console.log('done!');
  }, 2);
</script>
```
