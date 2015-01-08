# 换行
_show = ($el, str, idx, speed, callback)->
  d = ~~(1000 / speed)
  if idx < str.length
    $el.append str[idx]
    setTimeout ->
      _show $el, str, idx + 1, speed, callback
      jQuery(document).trigger('chatflow.content-changed')
    , d

  else
    $el.append jQuery('<br/>')
    callback() if callback?

# 不换行
_show_nobr = ($el, str, idx, speed, callback)->
  d = ~~(1000 / speed)
  if idx < str.length
    $el.append str[idx]
    setTimeout ->
      _show_nobr $el, str, idx + 1, speed, callback
      jQuery(document).trigger('chatflow.content-changed')
    , d

  else
    callback() if callback?


# 在指定的 dom 中逐个显示传入的文字
# 显示完毕后，调用指定方法
# speed 是每秒显示的字符个数
jQuery.fn.typing_string = (str, speed, callback)->
  _show this, str, 0, speed, callback
  return this

# 在指定的 dom 中逐个显示传入的文字
# 显示完毕后，调用指定方法
# speed 是每秒显示的字符个数
jQuery.fn.typing_string_nobr = (str, speed, callback)->
  _show_nobr this, str, 0, speed, callback
  return this