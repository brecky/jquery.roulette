/*! jQuery Roulette - v0.1.0 - 2014-12-30
* https://github.com/cuizuoli/jquery.roulette
* Copyright (c) 2014 cuizuoli; Licensed MIT */
(function($) {
	Class('cn.cuizuoli.Roulette', {
		init: function(options) {
			var _this = this;
			_this._options = $.extend({
				id: 'body',
				rouletteId: '#image',
				num: 4,
				pos: -45,
				isClockwise: true,
				afterSpin: function(num) {}
			}, options);
			_this._root = $(_this._options.id);
			_this._rouletteId = _this._options.rouletteId;
			_this._num = _this._options.num;
			_this._pos = _this._options.pos;
			_this._clockwise = _this._options.isClockwise ? -1 : 1;
			_this._afterSpin = _this._options.afterSpin;
			_this._block = 360 / _this._num;
		},
		spin: function(num) {
			var _this = this;
			if (num <= _this._num) {
				var min = _this._min(num);
				var max = _this._max(num);
				_this._root.find(_this._rouletteId).rotate({
					angle: 0,
					animateTo: _this._clockwise * (360 * 5 + _this._random(min, max)),
					center: ["50%", "50%"],
					easing: $.easing.easeInOutElastic,
					callback: function() {
						_this._afterSpin(num);
					}
				});
			}
		},
		_min: function(num) {
			var _this = this;
			return _this._block * (num - 1) + _this._pos + 5;
		},
		_max: function(num) {
			var _this = this;
			return _this._block * num + _this._pos - 5;
		},
		_random: function($min, $max) {
			return Math.floor(Math.random() * ($max - $min + 1)) + $min;
		}
	});
})(jQuery);
/**
 * Demo
 * var roulette = new cn.cuizuoli.Roulette({id:'#ct',afterSpin:function() {
 * 		//TODO callback logic}});
 * }
 * roulette(prizeNo);
 */