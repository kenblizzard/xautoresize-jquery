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
 */
(function($) {
	//@todo bind events: http://docs.jquery.com/Plugins/Authoring#Events
	//@todo add option: auto resize horizontally.
	$.fn.xautoresize = function(options) {
		options = $.extend({
			autoUp: true, //auto increase height to fit content. Use css max-height to set maximum height.
			autoDown: true //auto reduce height to fit content. Use css min-height to set minimum height.
		}, options);
		
		if (options.autoUp != true) {
			options.autoUp = false;
		}
		if (options.autoDown != true) {
			options.autoDown = false;
		}
		
		return this.each(function() {
			if (options.autoUp || options.autoDown) {
				var oldHeight = $(this).height();
				
				//get content's height. @see https://developer.mozilla.org/en/DOM/element.scrollHeight
				$(this).height(0);
				var newHeight = $(this).prop('scrollHeight');
				
				var update = options.autoDown && oldHeight > newHeight;
				update = update || options.autoUp && oldHeight < newHeight;
				
				if (update) {
					$(this).height(newHeight);
				} else {
					$(this).height(oldHeight);
				}
			}
		});
	};
})(jQuery);