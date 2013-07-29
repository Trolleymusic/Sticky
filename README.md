# Sticky
## jQuery plugin for making things stick

Elements get stuck as you scroll. A regular call to Sticky will keep the element fixed as long as your scrollTop is greater than its starting point.

	$(element).Sticky();

You can cause elements to become unstuck when they've traveled their own height

	$(element).Sticky({ bottom : true });

Or you can specify a reference and they will get unstuck when they reach the bottom of that.

	$(element).Sticky({ bottom : true, reference : $(container) });

At the moment the reference has to be an element with a common ancestor, or an ancestor.

Usually the element will sit flush against the top of the window but you can specify a buffer:

	$(element).Sticky({ bottom : true, reference : $(container), buffer : 50 });

Your CSS will position the element in the correct place, but a buffer means that the element will not jump to the fixed position.

At the moment you *must* include some CSS to specify the stuck state, it can be as simple as

	.stuck { position : fixed; top : 0; }
	
But something needs to be there. The only positioning that sticky does at the moment is sticking `bottom : true` elements to the bottom. You can change the class name by defining `keyword` in the settings:

	$(element).Sticky({ keyword : "some-class-name" });

### The full list of settings, all are optional.

* `animate` - number of ms to animate using jQueryUI if it's available, doesn't do anything if `Modernizr.csstransitions == true`. `default: 0`
* `bottom` - the element becomes unstuck when it's traveled its own height `default: false`
* `breakpoint` - do nothing if the document width in pixels is below this value `default: 720`
* `buffer` - the additional scroll in pixels required before the element is stuck `default: 0`
* `dimensions` - set the dimensions of the element when the plugin runs for the first time `default: false`
* `justmark` - set the height of the parent element when the plugin runs for the first time `default: false`
* `keyword` - the css class is used to indicate stuckness `default: stuck`
* `onupdate` - a callback function to run whenever the element changes its state, no arguments are passed
* `reference` - another element that is used as a guide for when the sticky element should become stuck and unstuck `default: null`
* `touch` - call `scrollFn` (the main should-I-be-stuck-or-not function) on `touchmove` and `touchend` on `Modernizr.touch` devices which means that the element can be stuck/unstuck while someone is scrolling without having to wait for the touch to finish. This can be a bit buggy sometimes, in particular I can't work out how to cause scrollFn to run when the status bar is tapped as this action does not cause a `window.scroll` event.
  
  On `!Modernizr.touch` or `touch: false` this will only run on `window.scroll` `default: true`


## Demo

There's a demo in the /demo folder and [waynedurack.com/Sticky](http://waynedurack.com/Sticky).

## To do:

* Extend to a no-css version.
* Extend cababilities of reference unsticking.
* Document required css.
* Document use properly.