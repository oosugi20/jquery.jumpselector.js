;(function ($, window, undefined) {
'use script';

var MODULE_NAME = 'JumpSelector';
var PLUGIN_NAME = 'jumpselector';
var Module;

/**
 * Module
 */
Module = function (element, options) {
	this.el = element;
	this.$el = $(element);
	this.options = $.extend({
	}, options);
};

(function (fn) {
	/**
	 * fn.init
	 */
	fn.init = function () {
		this._eventify();
		return this;
	};

	/**
	 * fn._eventify
	 */
	fn._eventify = function () {
		this.$el.on('change', function () {
			var $this = $(this);
			var val = $this.val();
			var $selected = $this.find('option:selected');
			var isBlank = ($selected.attr('data-jumpselector-target') === '_blank') ? true : false;
			if (val) {
				if (isBlank) {
					window.open(val, '');
				} else {
					location.href = val;
				}
			}
		});
	};

})(Module.prototype);


// set jquery.fn
$.fn[PLUGIN_NAME] = function (options) {
	this.each(function () {
		var module;
		if (!$.data(this, PLUGIN_NAME)) {
			module = new Module(this, options);
			$.data(this, PLUGIN_NAME, module);
			module.init();
		}
	});
};

// set global
window[MODULE_NAME] = Module;

})(jQuery, this);
