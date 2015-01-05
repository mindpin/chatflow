(function() {
  var _show, _show_nobr;

  _show = function($el, str, idx, callback) {
    if (idx < str.length) {
      $el.append(str[idx]);
      return setTimeout(function() {
        return _show($el, str, idx + 1, callback);
      }, 20);
    } else {
      $el.append(jQuery('<br/>'));
      if (callback != null) {
        return callback();
      }
    }
  };

  _show_nobr = function($el, str, idx, callback) {
    if (idx < str.length) {
      $el.append(str[idx]);
      return setTimeout(function() {
        return _show_nobr($el, str, idx + 1, callback);
      }, 20);
    } else {
      if (callback != null) {
        return callback();
      }
    }
  };

  jQuery.fn.typing_string = function(str, callback) {
    _show(this, str, 0, callback);
    return this;
  };

  jQuery.fn.typing_string_nobr = function(str, callback) {
    _show_nobr(this, str, 0, callback);
    return this;
  };

}).call(this);

//# sourceMappingURL=../../maps/plugins/jquery.typing-string.js.map