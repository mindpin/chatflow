# 判断脚本类型，并调用对应的执行方法
window.ScriptRunner = class ScriptRunner
  constructor: (@game)->
    @chatbox = new ChatBox @game

  run: (script)->
    callback_holder = new CallbackHolder
    finish = ->
      callback_holder.do 'finish'

    _run = =>
      # sentences
      if script.sentences
        gamelog '[runner] script SENTENCES'
        @chatbox
          .show_sentences script
          .on 'finish', =>
            gamelog '[runner] SENTENCES finished'
            finish()

      if script.select
        gamelog '[runner] script SELECT'
        @chatbox
          .show_question script
          .on 'finish', =>
            gamelog '[runner] SELECT finished'
            finish()

      if script.selected
        selected_idx = @game.vars(script.selected).selected
        selected_text = @game.vars(script.selected).items[selected_idx]

        gamelog '[runner] script SELECTED: ' + selected_idx + ', ' + selected_text
        selected_script = script.response[selected_idx]
        @run(selected_script).on 'finish', finish

    script.clear ?= true
    if script.clear
      @chatbox.clear _run
    else
      _run()

    return callback_holder