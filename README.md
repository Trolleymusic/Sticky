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

## Demo

There's a demo in the /demo folder and [waynedurack.com/Sticky](http://waynedurack.com/Sticky).



## To do:

* Extend to a no-css version.
* Extend cababilities of reference unsticking.
* Document required css.
* Document use properly.