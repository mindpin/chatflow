window.buildel = (str)->
  arr = str.split('.')
  $re = jQuery("<#{arr.shift()}>")
  for klass in arr
    $re.addClass klass
  return $re

window.gamelog = (param)->
  console.log param

window.CallbackHolder = class CallbackHolder
  constructor: ->
    @funcs = {}

  on: (name, func)->
    @funcs[name] = func

  do: (name)->
    setTimeout =>
      @funcs[name]() if @funcs[name]
    , 1