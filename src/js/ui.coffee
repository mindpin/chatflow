jQuery(document).on 'ready page:load', ->
  # return if not window.story_data?
  yaml = jQuery('.panel.chatbox').data('yaml')
  jQuery.get yaml, (res)->
    story_data = jsyaml.load res
    window.game = new Game story_data