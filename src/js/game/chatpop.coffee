# 对话泡泡

# 用法
# pop = new ChatPop($panel, npc)
# pop.append(str1, callback)
# pop.append(str2, callback)
# pop.remove()

# 旁白对话
# pop = new ChatPop($panel)

# 显示等待提示
# pop.wait(callback)

window.ChatPop = class ChatPop
  constructor: (@$panel, @npc)->
    @$chatpop = buildel 'div.chatpop'
      .css
        'opacity': 0
        'top': 30
      .animate
        'opacity': 1
        'top': 0
      , 500
      .appendTo @$panel

    if @npc?
      @$npc_avatar = buildel 'img.avatar'
        .attr 'src', npc.avatar
        .appendTo @$chatpop
    else
      @$chatpop.addClass 'no-npc'

    @$area = buildel 'div.area'
      .appendTo @$chatpop

    @$pop = buildel 'div.pop'
      .appendTo @$area

    if @npc?
      @$npc_name = buildel 'div.name'
        .html @npc.name + ":"
        .appendTo @$pop

  text: (string, callback, config={})->
    if config.link?
      $text = buildel 'a.text.link'
        .attr 'href', config.link
        .attr 'target', '_blank'
        .appendTo @$pop
        .on 'click', (evt)->
          evt.stopPropagation()
    else
      $text = buildel 'span.text'
        .appendTo @$pop

    # 样式
    if config.style?
      $text.css config.style
    
    # 换行或不换行
    if config.linebreak is true
      $text.typing_string string, callback
    else
      $text.typing_string_nobr string, callback

  append: (sentence)->
    callback_holder = new CallbackHolder
    finish = ->
      callback_holder.do 'appended'

    if sentence.delay is -1
      textdone = =>
        @wait finish
    else
      textdone = ->
        setTimeout finish, sentence.delay

    @text sentence.text, textdone, {
      linebreak: sentence.linebreak
      style: sentence.style
      link: sentence.link
    }

    return callback_holder

  wait: (callback)->
    $wait = buildel 'div.click-to-continue'
      .append buildel('span').html('点击屏幕任意位置继续')
      .hide().fadeIn 100
      .appendTo @$area

    jQuery(document).one 'click', ->
      $wait.remove()
      callback()

  remove: (callback)->
    @$chatpop
      .animate
        'opacity': 0
      , 200, =>
        @$chatpop.remove()
        callback() if callback


  # 执行一系列子句
  # 全部执行完毕后，调用回调方法
  sentences: (sentences_data)->
    callback_holder = new CallbackHolder
    finish = ->
      callback_holder.do 'finish'

    @_sentences sentences_data, 0, finish

    return callback_holder

  _sentences: (data, idx, callback)->
    if idx < data.length
      gamelog "[chatpop][sentence] ##{idx}"
      sentence = new ChatSentence data[idx]
      @append(sentence).on 'appended', =>
        @_sentences data, idx + 1, callback
      return

    gamelog '[chatpop] sentences finished'
    # @remove -> callback()
    callback()