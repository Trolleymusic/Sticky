// Sticky
// http://github.com/Trolleymusic/Sticky
;(function( $ ) {
	$.fn.Sticky = (function (settings) {
		var Sticky = (function (element, settings) {
			var _element,
				_offsetTop,
				_offsetTopH,
				_is,
				_force;
				
			this.Init = function(element, settings) {
				var keyword,
					buffer,
					bottom,
					reference,
					touch,
					dimensions,
					justmark,
					onupdate,
					breakpoint,
					parentHeight,
					scrollFn,
					S;
			
				if (!element || !element.length) { return; }
				
				_element = element;
				
				settings = settings || {};
					
				keyword = settings.keyword || 'stuck';
				buffer = settings.buffer || 0;
				bottom = settings.bottom || false;
				reference = settings.reference || null;
				touch = settings.touch || true;
				dimensions = settings.dimensions || false;
				justmark = settings.justmark || false;
				onupdate = settings.onupdate || function () {};
				breakpoint = settings.breakpoint || 720;
			
				this.CalculateOffsets(buffer, reference)

				_is = false;
				
				parentHeight = _element.parent().height() + parseInt(_element.parent().css('padding-top') || 0) - parseInt(_element.parent().css('padding-bottom') || 0);
				if (!justmark) { _element.parent().css('height', parentHeight + 'px'); }
				
				scrollFn = settings.bottom ? function () {
					var scrollTop,
						brokepoint;
					
					scrollTop = $(this).scrollTop();
					brokepoint = (document.width || document.body.clientWidth) >= breakpoint;
					
					// Includes bottom
					if (((scrollTop >= _offsetTop && scrollTop <= _offsetTopH) && !_is) && brokepoint) {
						if (dimensions) { _element.css({ 'width' : _element.width(), 'height' : _element.height() }); }
						_element.addClass(keyword).removeClass('bottom');
						_is = true;
						_element.attr('data-stuck', 'fixed')
								.css({'top':''});
						onupdate.apply(this);
					} else if ((scrollTop < _offsetTop && _is) || !brokepoint) {
						// This is in two because we want to make it stick to the bottom if
						//	we've scrolled to the bottom, otherwise we want to leave it up the top
						_element.removeClass(keyword);
						_is = false;
						_element.removeAttr('data-stuck')
								.css({'top':''});
						if (dimensions) { _element.css({ 'width' : '', 'height' : '' }); }
						onupdate.apply(this);
					} else if ((scrollTop > _offsetTopH && _is) && breakpoint) {
						_element.removeClass(keyword).addClass('bottom');
						_is = false;
						// Stick it to the bottom
						_element.attr('data-stuck', 'bottom')
								.css({'top' : _offsetTopH - _element.offsetParent().offset().top });
						onupdate.apply(this);
					}
				} : function () {
					var brokepoint = (document.width || document.body.clientWidth) >= breakpoint;
					// Regular
					if ($(this).scrollTop() >= _offsetTop && !_is && brokepoint) {
						if (dimensions) { _element.css({ 'width' : _element.width(), 'height' : _element.height() }); }
						_element.addClass(keyword);
						_is = true;
						onupdate.apply(this);
					} else if (($(this).scrollTop() < _offsetTop && _is) || !brokepoint) {
						if (dimensions) { _element.css({ 'width' : '', 'height' : '' }); }
						_element.removeClass(keyword);
						_is = false;
						onupdate.apply(this);
					}
				};

				if (Modernizr.touch && touch) {
					document.addEventListener('touchmove', scrollFn, false);
					document.addEventListener('touchend', function () { requestAnimationFrame(scrollFn); }, false);
					// The onscroll is added because it is called after the page stops scrolling
					//	- this will help tidy up if someone flicks the page
					document.addEventListener('onscroll', function () { requestAnimationFrame(scrollFn); }, false);
				} else {
					$(window).on('scroll', scrollFn);
				}

				// We need to know if the reference element is updated so we can update the offsets.
				//	We *could* recalc the offsets each time, but I don't want to do that.
				
				S = this;
				
				// Recalc after window resize
				$(window).on('resize', function () {
					S.CalculateOffsets(buffer, reference);
					scrollFn();
				});
				
				scrollFn();

			}
		
			this.CalculateOffsets = function (buffer, reference, noTop) {
				if (!noTop) { _offsetTop = _element.offset().top - buffer; }
				_offsetTopH = _offsetTop + _element.height();
				
				if (reference && reference.length && reference.height()) {
					_offsetTopH = reference.height() + reference.offset().top - _element.height();
				}
				_force = [buffer, reference];
			}
			
			this.ForceCalculateOffsets = function (noTop) {
				if (!_force) { return false; }
				this.CalculateOffsets(_force[0], _force[1], noTop);
				return true;
			}
			
			this.GetStickyPadding = function () {
				return _element.height();
			}
			
			this.IncludeStickyPadding = function (i) {
				return i - this.GetStickyPadding();
			}
			
			this.Init(element, settings);
			return this;
		});
		return new Sticky(this, settings);
	});
})( jQuery );