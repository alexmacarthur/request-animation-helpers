# request-animation-helpers

A small collection of functions to help build on the capabilities of the `requestAnimationFrame` browser API, enabling you to navigate the browser's repaint cycle a little more easily.

The creation of this package was first inspired while writing [this blog post](https://macarthur.me/posts/when-dom-updates-appear-to-be-asynchronous), and the implementation details are modeled after [Kyle Simpson](https://github.com/getify)'s [work from several years back](https://gist.github.com/getify/3004342), modeled with [permission](https://www.reddit.com/r/javascript/comments/j2dcfw/when_dom_updates_appear_to_be_asynchronous/g7cchd3/?utm_source=reddit&utm_medium=web2x&context=3).

## What's Included

The following functions are exported from this library:

### requestNextAnimationFrame(callbackFunction)

Fire a callback _after_ the browser's next paint. This is handy when you need to perform some sort of action only after previous DOM changes have been painted to the DOM.

### cancelNextAnimationFrame(id)

In the event you need to cancel the callback defined for `requestNextAnimationFrame`, use `cancelNextAnimationFrame` to cancel that callback, preventing it from firing.

## Installation

`npm install request-animation-helpers`

## Usage

Coming soon...
