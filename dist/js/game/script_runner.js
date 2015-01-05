(function() {
  var ScriptRunner;

  window.ScriptRunner = ScriptRunner = (function() {
    function ScriptRunner(game) {
      this.game = game;
      this.chatbox = new ChatBox(this.game);
    }

    ScriptRunner.prototype.run = function(script) {
      var callback_holder, finish, _run;
      callback_holder = new CallbackHolder;
      finish = function() {
        return callback_holder["do"]('finish');
      };
      _run = (function(_this) {
        return function() {
          var selected_idx, selected_script, selected_text;
          if (script.sentences) {
            gamelog('[runner] script SENTENCES');
            _this.chatbox.show_sentences(script).on('finish', function() {
              gamelog('[runner] SENTENCES finished');
              return finish();
            });
          }
          if (script.select) {
            gamelog('[runner] script SELECT');
            _this.chatbox.show_question(script).on('finish', function() {
              gamelog('[runner] SELECT finished');
              return finish();
            });
          }
          if (script.selected) {
            selected_idx = _this.game.vars(script.selected).selected;
            selected_text = _this.game.vars(script.selected).items[selected_idx];
            gamelog('[runner] script SELECTED: ' + selected_idx + ', ' + selected_text);
            selected_script = script.response[selected_idx];
            return _this.run(selected_script).on('finish', finish);
          }
        };
      })(this);
      if (script.clear == null) {
        script.clear = true;
      }
      if (script.clear) {
        this.chatbox.clear(_run);
      } else {
        _run();
      }
      return callback_holder;
    };

    return ScriptRunner;

  })();

}).call(this);

//# sourceMappingURL=../../maps/game/script_runner.js.map