# delay = (time, func)->
#   setTimeout ->
#     func()
#   , time

# class Chat
#   constructor: (@game)->
#     @$avatar = jQuery('.panel.tips .avatar')
#     @$dialog = jQuery('.panel.tips .dialog')
#     @$dbox = @$dialog.find('.dbox')

#     @$ctc = jQuery('.panel.tips .click-to-continue')

#     @bind_events()

#   # 显示一个对话脚本
#   # 传入的 script 必须是对话脚本
#   show: (script)->
#     # 显示头像
#     # 如果头像相同就不进行动画切换
#     npc = @game.get_npc script.npc
#     if @$avatar.data('npc') != script.npc
#       $img = jQuery '<img>'
#         .appendTo @$avatar.html('').data('npc', script.npc)
#         .attr 'src', npc.avatar
#         .hide().fadeIn 400
    
#     # 显示对话框
#     @$dbox.html ''

#     # 添加NPC名字
#     jQuery '<div>'
#       .addClass 'npc-name'
#       .html npc.name + ' :'
#       .prependTo @$dbox

#     @$dbox.hide().fadeIn 400, =>
#       @show_content script.content, 0

#   # 显示一段对话中的一句话
#   show_content: (content, idx)->
#     @$ctc.hide()
#     if idx < content.length
#       $span = jQuery '<span>'
#         .appendTo @$dbox

#       str = content[idx]

#       if str == ':shake'
#         # 头像摇晃
#         @$avatar.find('img').addClass('shake')
#         @show_content content, idx + 1
#         return

#       if str.indexOf(':animation') is 0
#         ani_name = str.split(':animation:')[1]
#         jQuery(document).trigger "animation.#{ani_name}", =>
#           @show_content content, idx + 1
#         return

#       @show_str $span, str, 0, =>
#         setTimeout =>
#           @$ctc.show()
#           @_continue =
#             content: content
#             idx: idx + 1
#         , 300

#     else
#       # 显示下一段对话
#       jQuery(document).trigger 'game.next_script'

#   # 动态地（一个一个字地）显示一句话
#   # 显示结束后，显示“点击继续”的提示
#   show_str: ($span, str, idx, func)->
#     if idx < str.length
#       # $span.append jQuery('<span>').html(str[idx]).hide().fadeIn(40)
#       $span.append str[idx]
#       setTimeout =>
#         @show_str $span, str, idx + 1, func
#       , 10

#     else
#       $span.append jQuery('<br/>')
#       func()

#   bind_events: ->
#     # 对话继续
#     jQuery(document).on 'click', =>
#       return if not @_continue
#       @show_content @_continue.content, @_continue.idx
#       @_continue = null

#     jQuery(document).on 'game.chat-continue', =>
#       return if not @_continue
#       @show_content @_continue.content, @_continue.idx
#       @_continue = null









    # $css_textarea = jQuery('textarea.code.css').val @data.init.css
    # $html_textarea = jQuery('textarea.code.html').val @data.init.html

    # @cm_css = CodeMirror.fromTextArea $css_textarea[0], {
    #   mode: 'css'
    #   lineNumbers: true
    #   theme: 'vibrant-ink'
    #   lineWrapping: true
    # }

    # @cm_html = CodeMirror.fromTextArea $html_textarea[0], {
    #   mode: 'htmlmixed'
    #   lineNumbers: true
    #   theme: 'vibrant-ink'
    #   lineWrapping: true
    # }