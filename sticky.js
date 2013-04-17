// Sticky
// http://github.com/Trolleymusic/Sticky
(function( $ ) {
	$.fn.Sticky = (function (settings) {
		var Sticky = (function (element, settings) {
			var _element,
				_offsetTop,
				_offsetTopH,
				_is;
				
			this.Init = function(element, settings) {
				var keyword,
					buffer,
					bottom,
					reference,
					parentHeight,
					scrollFn;
			
				if (!element || !element.length) { return; }
				
				_element = element;
				
				settings = settings || {};
					
				keyword = settings.keyword || 'stuck';
				buffer = settings.buffer || 0;
				bottom = settings.bottom || false;
				reference = settings.reference || null;
			
				this.CalculateOffsets(buffer, reference)

				_is = false;
				
				parentHeight = _element.parent().height() - parseInt(_element.parent().css('padding-bottom') || 0);
				_element.parent().css('height', parentHeight + 'px');
				
				scrollFn = settings.bottom ? function () {
					var scrollTop = $(this).scrollTop();
					// Includes bottom
					if ((scrollTop >= _offsetTop && scrollTop <= _offsetTopH) && !_is) {
						_element.addClass(keyword);
						_is = true;
						_element.attr('data-stuck', 'fixed')
								.css({'top':''});
					} else if (scrollTop < _offsetTop && _is) {
						// This is in two because we want to make it stick to the bottom if
						//	we've scrolled to the bottom, otherwise we want to leave it up the top
						_element.removeClass(keyword);
						_is = false;
						_element.removeAttr('data-stuck')
								.css({'top':''});
					} else if (scrollTop > _offsetTopH && _is) {
						_element.removeClass(keyword);
						_is = false;
						// Stick it to the bottom
						_element.attr('data-stuck', 'bottom')
								.css({'top' : _offsetTopH - _element.offsetParent().offset().top });
					}
				} : function () {
					// Regular
					if ($(this).scrollTop() >= _offsetTop && !_is) {
						_element.addClass(keyword);
						_is = true;
					} else if ($(this).scrollTop() < _offsetTop && _is) {
						_element.removeClass(keyword);
						_is = false;
					}
				};
				
				$(window).on('scroll', scrollFn);

				// We need to know if the reference element is updated so we can update the offsets.
				//	We *could* recalc the offsets each time, but I don't want to do that.
											
			}
		
			this.CalculateOffsets = function (buffer, reference) {
				_offsetTop = _element.offset().top - buffer;
				_offsetTopH = _offsetTop + _element.height();
				
				if (reference && reference.length && reference.height()) {
					_offsetTopH = _offsetTop + reference.height() - _element.height();
				}
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