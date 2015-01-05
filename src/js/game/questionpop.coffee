# 提问泡泡

# 用法
# pop = new QuestionPop($panel, npc)
# pop.show(script, callback)
# 选择了任何选项后，将调用 callback 方法
# pop.remove()

window.QuestionPop = class QuestionPop
  constructor: (@$panel)->

  show: (script, callback)->
    @$questionpop = buildel 'div.questionpop'
      .css
        'opacity': 0
        'top': 30
      .animate
        'opacity': 1
        'top': 0
      , 500
      .appendTo @$panel

    @$box = buildel 'div.box'
      .appendTo @$questionpop

    @$label = buildel 'div.label'
      .html '那么问题来了 …'
      .appendTo @$box

    @$text = buildel 'div.text'
      .html script.text
      .appendTo @$box

    @$items = buildel 'div.items'
      .appendTo @$box

    for item, idx in script.items
      $item = buildel 'div.item'
        .appendTo @$items

      $a = buildel 'a'
        .data 'idx', idx
        .attr
          href: 'javascript:;'
        .html item
        .appendTo $item

    setTimeout =>
      for item, idx in script.items
        $a = @$items.find('a').eq(idx)
        $a.one 'click', ->
          result = jQuery(this).data('idx')
          callback(result)
    , 500

  # show_selected: ->


  remove: (callback)->
    @$questionpop
      .animate
        'opacity': 0
      , 200, =>
        @$questionpop.remove()
        callback() if callback