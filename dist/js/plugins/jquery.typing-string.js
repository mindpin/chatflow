(function() {
  var _show, _show_nobr;

  _show = function($el, str, idx, speed, callback) {
    var d;
    d = ~~(1000 / speed);
    if (idx < str.length) {
      $el.append(str[idx]);
      return setTimeout(function() {
        _show($el, str, idx + 1, speed, callback);
        return jQuery(document).trigger('chatflow.content-changed');
      }, d);
    } else {
      $el.append(jQuery('<br/>'));
      if (callback != null) {
        return callback();
      }
    }
  };

  _show_nobr = function($el, str, idx, speed, callback) {
    var d;
    d = ~~(1000 / speed);
    if (idx < str.length) {
      $el.append(str[idx]);
      return setTimeout(function() {
        _show_nobr($el, str, idx + 1, speed, callback);
        return jQuery(document).trigger('chatflow.content-changed');
      }, d);
    } else {
      if (callback != null) {
        return callback();
      }
    }
  };

  jQuery.fn.typing_string = function(str, speed, callback) {
    _show(this, str, 0, speed, callback);
    return this;
  };

  jQuery.fn.typing_string_nobr = function(str, speed, callback) {
    _show_nobr(this, str, 0, speed, callback);
    return this;
  };

}).call(this);

//# sourceMappingURL=../../maps/plugins/jquery.typing-string.js.map