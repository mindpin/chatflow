(function() {
  jQuery(document).on('ready page:load', function() {
    return jQuery.get('yaml/test.yaml', function(res) {
      var story_data;
      story_data = jsyaml.load(res);
      return window.game = new Game(story_data);
    });
  });

}).call(this);

//# sourceMappingURL=../maps/ui.js.map