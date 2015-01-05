(function() {
  var ChatSentence;

  window.ChatSentence = ChatSentence = (function() {
    function ChatSentence(data) {
      var _data;
      if (typeof data === 'string') {
        _data = {
          text: data
        };
      } else {
        _data = data;
      }
      this.text = _data.text;
      this.delay = _data.delay;
      if (this.delay == null) {
        this.delay = -1;
      }
      this.linebreak = _data.linebreak;
      if (this.linebreak == null) {
        this.linebreak = true;
      }
      this.style = _data.style;
      this.link = _data.link;
    }

    return ChatSentence;

  })();

}).call(this);

//# sourceMappingURL=../../maps/game/chat_sentence.js.map