(function() {
  var QuestionPop;

  window.QuestionPop = QuestionPop = (function() {
    function QuestionPop($panel) {
      this.$panel = $panel;
    }

    QuestionPop.prototype.show = function(script, callback) {
      var $a, $item, idx, item, _i, _len, _ref;
      this.$questionpop = buildel('div.questionpop').css({
        'opacity': 0,
        'top': 30
      }).animate({
        'opacity': 1,
        'top': 0
      }, 500).appendTo(this.$panel);
      this.$box = buildel('div.box').appendTo(this.$questionpop);
      this.$label = buildel('div.label').html('那么问题来了 …').appendTo(this.$box);
      this.$text = buildel('div.text').html(script.text).appendTo(this.$box);
      this.$items = buildel('div.items').appendTo(this.$box);
      _ref = script.items;
      for (idx = _i = 0, _len = _ref.length; _i < _len; idx = ++_i) {
        item = _ref[idx];
        $item = buildel('div.item').appendTo(this.$items);
        $a = buildel('a').data('idx', idx).attr({
          href: 'javascript:;'
        }).html(item).appendTo($item);
      }
      return setTimeout((function(_this) {
        return function() {
          var _j, _len1, _ref1, _results;
          _ref1 = script.items;
          _results = [];
          for (idx = _j = 0, _len1 = _ref1.length; _j < _len1; idx = ++_j) {
            item = _ref1[idx];
            $a = _this.$items.find('a').eq(idx);
            _results.push($a.one('click', function() {
              var result;
              result = jQuery(this).data('idx');
              return callback(result);
            }));
          }
          return _results;
        };
      })(this), 500);
    };

    QuestionPop.prototype.remove = function(callback) {
      return this.$questionpop.animate({
        'opacity': 0
      }, 200, (function(_this) {
        return function() {
          _this.$questionpop.remove();
          if (callback) {
            return callback();
          }
        };
      })(this));
    };

    return QuestionPop;

  })();

}).call(this);

//# sourceMappingURL=../../maps/game/questionpop.js.map