(function() {
  var ChatBox;

  window.ChatBox = ChatBox = (function() {
    function ChatBox(game) {
      this.game = game;
      this.$chatbox = jQuery('.panel.chatbox');
      this.pops = [];
    }

    ChatBox.prototype.clear = function(callback) {
      var pop, _clear_count, _i, _len, _ref, _results;
      _clear_count = this.pops.length;
      if (_clear_count === 0) {
        return callback();
      }
      _ref = this.pops;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        pop = _ref[_i];
        _results.push(pop.remove(function() {
          _clear_count--;
          if (_clear_count === 0) {
            return callback();
          }
        }));
      }
      return _results;
    };

    ChatBox.prototype.show_sentences = function(script, callback) {
      var callback_holder, chatpop, finish, npc;
      callback_holder = new CallbackHolder;
      finish = function() {
        return callback_holder["do"]('finish');
      };
      gamelog('[chatbox] show SENTENCES');
      if (script.npc) {
        npc = this.game.get_npc(script.npc);
      }
      chatpop = new ChatPop(this.$chatbox, npc);
      chatpop.sentences(script.sentences).on('finish', function() {
        return finish();
      });
      this.pops.push(chatpop);
      return callback_holder;
    };

    ChatBox.prototype.show_question = function(script, callback) {
      var callback_holder, finish, questionpop;
      callback_holder = new CallbackHolder;
      finish = function() {
        return callback_holder["do"]('finish');
      };
      questionpop = new QuestionPop(this.$chatbox);
      questionpop.show(script, (function(_this) {
        return function(result) {
          gamelog('[chatbox] user selected: ' + result);
          _this.game.vars(script.select, {
            'items': script.items,
            'selected': result
          });
          return finish();
        };
      })(this));
      this.pops.push(questionpop);
      return callback_holder;
    };

    return ChatBox;

  })();

}).call(this);

//# sourceMappingURL=../../maps/game/chatbox.js.map