jQuery(document).on 'ready page:load', ->
  # return if not window.story_data?
  jQuery.get 'yaml/test.yaml', (res)->
    story_data = jsyaml.load res
    window.game = new Game story_data