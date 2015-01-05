(function() {
  var Game;

  window.Game = Game = (function() {
    function Game(data) {
      this.data = data;
      this.scripts = this.data.scripts;
      this.load_npcs();
      this._vars = {};
      this.init();
      this.start();
    }

    Game.prototype.vars = function(key, value) {
      if (value != null) {
        this._vars[key] = value;
        return this;
      }
      return this._vars[key];
    };

    Game.prototype.load_npcs = function() {
      var npc_data, _i, _len, _ref, _results;
      this.npcs = {};
      _ref = this.data.npcs;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        npc_data = _ref[_i];
        _results.push(this.npcs[npc_data.id] = new NPC(npc_data));
      }
      return _results;
    };

    Game.prototype.get_npc = function(id) {
      return this.npcs[id];
    };

    Game.prototype.init = function() {
      return this.runner = new ScriptRunner(this);
    };

    Game.prototype.start = function() {
      this.idx = 0;
      return this.run_next();
    };

    Game.prototype.run_next = function() {
      if (this.idx < this.scripts.length) {
        gamelog("[game] run script #" + this.idx);
        return this.runner.run(this.scripts[this.idx]).on('finish', (function(_this) {
          return function() {
            gamelog('[game] a script finished');
            gamelog('');
            _this.idx++;
            return _this.run_next();
          };
        })(this));
      } else {
        return gamelog('脚本运行结束');
      }
    };

    return Game;

  })();

}).call(this);

//# sourceMappingURL=../../maps/game/game.js.map