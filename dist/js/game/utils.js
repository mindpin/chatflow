(function() {
  var CallbackHolder;

  window.buildel = function(str) {
    var $re, arr, klass, _i, _len;
    arr = str.split('.');
    $re = jQuery("<" + (arr.shift()) + ">");
    for (_i = 0, _len = arr.length; _i < _len; _i++) {
      klass = arr[_i];
      $re.addClass(klass);
    }
    return $re;
  };

  window.gamelog = function(param) {
    return console.log(param);
  };

  window.CallbackHolder = CallbackHolder = (function() {
    function CallbackHolder() {
      this.funcs = {};
    }

    CallbackHolder.prototype.on = function(name, func) {
      return this.funcs[name] = func;
    };

    CallbackHolder.prototype["do"] = function(name) {
      return setTimeout((function(_this) {
        return function() {
          if (_this.funcs[name]) {
            return _this.funcs[name]();
          }
        };
      })(this), 1);
    };

    return CallbackHolder;

  })();

}).call(this);

//# sourceMappingURL=../../maps/game/utils.js.map