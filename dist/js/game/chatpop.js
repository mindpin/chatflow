(function() {
  var ChatPop;

  window.ChatPop = ChatPop = (function() {
    function ChatPop($panel, npc) {
      this.$panel = $panel;
      this.npc = npc;
      this.$chatpop = buildel('div.chatpop').css({
        'opacity': 0,
        'top': 30
      }).animate({
        'opacity': 1,
        'top': 0
      }, 500).appendTo(this.$panel);
      if (this.npc != null) {
        this.$npc_avatar = buildel('img.avatar').attr('src', npc.avatar).appendTo(this.$chatpop);
      } else {
        this.$chatpop.addClass('no-npc');
      }
      this.$area = buildel('div.area').appendTo(this.$chatpop);
      this.$pop = buildel('div.pop').appendTo(this.$area);
      if (this.npc != null) {
        this.$npc_name = buildel('div.name').html(this.npc.name + ":").appendTo(this.$pop);
      }
    }

    ChatPop.prototype.text = function(string, callback, config) {
      var $text;
      if (config == null) {
        config = {};
      }
      if (config.link != null) {
        $text = buildel('a.text.link').attr('href', config.link).attr('target', '_blank').appendTo(this.$pop).on('click', function(evt) {
          return evt.stopPropagation();
        });
      } else {
        $text = buildel('span.text').appendTo(this.$pop);
      }
      if (config.style != null) {
        $text.css(config.style);
      }
      if (config.linebreak === true) {
        return $text.typing_string(string, callback);
      } else {
        return $text.typing_string_nobr(string, callback);
      }
    };

    ChatPop.prototype.append = function(sentence) {
      var callback_holder, finish, textdone;
      callback_holder = new CallbackHolder;
      finish = function() {
        return callback_holder["do"]('appended');
      };
      if (sentence.delay === -1) {
        textdone = (function(_this) {
          return function() {
            return _this.wait(finish);
          };
        })(this);
      } else {
        textdone = function() {
          return setTimeout(finish, sentence.delay);
        };
      }
      this.text(sentence.text, textdone, {
        linebreak: sentence.linebreak,
        style: sentence.style,
        link: sentence.link
      });
      return callback_holder;
    };

    ChatPop.prototype.wait = function(callback) {
      var $wait;
      $wait = buildel('div.click-to-continue').append(buildel('span').html('点击屏幕任意位置继续')).hide().fadeIn(100).appendTo(this.$area);
      return jQuery(document).one('click', function() {
        $wait.remove();
        return callback();
      });
    };

    ChatPop.prototype.remove = function(callback) {
      return this.$chatpop.animate({
        'opacity': 0
      }, 200, (function(_this) {
        return function() {
          _this.$chatpop.remove();
          if (callback) {
            return callback();
          }
        };
      })(this));
    };

    ChatPop.prototype.sentences = function(sentences_data) {
      var callback_holder, finish;
      callback_holder = new CallbackHolder;
      finish = function() {
        return callback_holder["do"]('finish');
      };
      this._sentences(sentences_data, 0, finish);
      return callback_holder;
    };

    ChatPop.prototype._sentences = function(data, idx, callback) {
      var sentence;
      if (idx < data.length) {
        gamelog("[chatpop][sentence] #" + idx);
        sentence = new ChatSentence(data[idx]);
        this.append(sentence).on('appended', (function(_this) {
          return function() {
            return _this._sentences(data, idx + 1, callback);
          };
        })(this));
        return;
      }
      gamelog('[chatpop] sentences finished');
      return callback();
    };

    return ChatPop;

  })();

}).call(this);

//# sourceMappingURL=../../maps/game/chatpop.js.map