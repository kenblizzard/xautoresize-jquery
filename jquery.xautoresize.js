/*!
 * The xautoresize-jquery plugin is released under the terms of the following BSD License.
 *
 * Copyright (c) 2012, Xuan Dai Nguyen (http://code.google.com/p/xautoresize-jquery)
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *  - Redistributions of source code must retain the above copyright notice,
 *  this list of conditions and the following disclaimer.
 *  - Redistributions in binary form must reproduce the above copyright notice,
 *  this list of conditions and the following disclaimer in the documentation
 *  and/or other materials provided with the distribution.
 *  - Neither the name of Xuan Dai Nguyen nor the names of its contributors
 *  may be used to endorse or promote products derived from this software
 *  without specific prior written permission.
 *  
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 * ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE
 * LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
 * THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN
 * IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

/**
 * This jQuery plugin auto resize to fit content of a element (textarea, div and so on).
 * 
 * @author Xuan Dai Nguyen <nguyenxndaidev@gmail.com>
 * 
 * @todo auto resize horizontally
 * @todo For a very long text, the scrollHeight is mostly incorrect. That is the browser's bug. We cannot fix it totally ultil now.
 */
(function($) {
	var methods = {
		resize: function(el, options) {
			var updateHeight = false;
			if (options.autoHeightUp || options.autoHeightDown) {
				var oldOverflowY = el.css("overflowY");
				el.css("overflowY", "scroll");
				var oldHeight = el.height();
				
				//get content's height. @see https://developer.mozilla.org/en/DOM/element.scrollHeight
				var newHeight = el.prop("scrollHeight");
				updateHeight = options.autoHeightUp && oldHeight < newHeight;
				if (!updateHeight && options.autoHeightDown && (el.prop("scrollHeight") == el.prop("clientHeight"))) {
					//@todo check if content's height is smaller than current height without change height to "0"
					//reset height to "0" can effect the scroll position of the parent element.
					el.height(0);
					newHeight = el.prop("scrollHeight");
					updateHeight = oldHeight > newHeight;
				}
				if (updateHeight) {
					el.height(newHeight);
				} else {
					el.height(oldHeight);
				}
				el.css("overflowY", oldOverflowY);
			}
			
			//after update height, it is possible to appear horizontal scrollbar.
			//The height need to be increased by the height of the scrollbar.
			if (options.autoHeightUp) {
				var horScrollbarHeight = el.height() - el.prop("clientHeight");
				if (horScrollbarHeight > 0) {
					el.height(el.height() + horScrollbarHeight);
				}
			}
		}
	};
	var actions = {
		init: function(options) {
			return this.each(function(index) {
				methods.resize($(this), options);
				var events = [];
				if (options.keyup) {
					events.push("keyup.xautoresize");
				}
				if (options.keydown) {
					events.push("keydown.xautoresize");
				}
				if (options.focus) {
					events.push("focus.xautoresize");
				}
				if (options.change) {
					events.push("change.xautoresize");
				}
				if (events.length > 0) {
					events = events.join(" ");
					$(this).unbind(events);
					$(this).bind(events, function() {
						methods.resize($(this), options);
					});
				}
			});
		},
		destroy: function() {
			return this.each(function(index){
				$(this).unbind(".xautoresize");
			});
		},
		resize: function(options) {
			return this.each(function(index){
				methods.resize($(this), options);
			});
		}
	};
	
	$.fn.xautoresize = function(options) {
		options = $.extend({
			action: "init",
			autoHeightUp: true, //auto increase height to fit content. Use css max-height to set maximum height.
			autoHeightDown: false, //auto reduce height to fit content. Use css min-height to set minimum height.
			keyup: true,
			keydown: true,
			focus: true,
			change: true
		}, options);
		
		if (options.autoHeightUp !== true) {
			options.autoHeightUp = false;
		}
		if (options.autoHeightDown !== true) {
			options.autoHeightDown = false;
		}
		if (options.keyup !== true) {
			options.keyup = false;
		}
		if (options.keydown !== true) {
			options.keydown = false;
		}
		if (options.focus !== true) {
			options.focus = false;
		}
		if (options.change !== true) {
			options.change = false;
		}
		
		if (actions[options.action]) {
			return actions[options.action].apply(this, [options]);
		} else {
			return actions.init.apply(this, [options]);
		}
	};
})(jQuery);