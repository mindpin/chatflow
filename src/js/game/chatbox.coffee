# 对话面板
window.ChatBox = class ChatBox
  constructor: (@game)->
    @$chatbox = jQuery('.panel.chatbox')
    @pops = []

  # 清除所有泡泡，再调用回调方法
  clear: (callback)->
    _clear_count = @pops.length
    return callback() if _clear_count is 0

    for pop in @pops
      pop.remove ->
        _clear_count--
        callback() if _clear_count is 0

  # 显示对话脚本
  # 对话脚本可能包括 NPC 头像
  # 依次显示所有子句
  # 当子句全部显示完毕后，执行回调
  show_sentences: (script, callback)->
    callback_holder = new CallbackHolder
    finish = ->
      callback_holder.do 'finish'

    gamelog '[chatbox] show SENTENCES'

    npc =  @game.get_npc script.npc if script.npc

    chatpop = new ChatPop @$chatbox, npc
    chatpop
      .sentences script.sentences
      .on 'finish', ->
        finish()

    @pops.push chatpop

    return callback_holder

  # 显示提问框
  show_question: (script, callback)->
    callback_holder = new CallbackHolder
    finish = ->
      callback_holder.do 'finish'

    questionpop = new QuestionPop @$chatbox
    questionpop.show script, (result)=>
      gamelog '[chatbox] user selected: ' + result
      @game.vars script.select, {
        'items': script.items
        'selected': result
      }
      finish()

    @pops.push questionpop

    return callback_holder

  # # 显示 html 片断
  # show_html: (script, callback)->
  #   htmlpop = new HTMLPop @$chatbox
  #   htmlpop.show script, ->
  #     htmlpop.remove()
  #     callback()