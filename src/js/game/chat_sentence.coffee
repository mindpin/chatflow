window.ChatSentence = class ChatSentence
  constructor: (data)->
    if typeof data is 'string'
      _data = 
        text: data
    else
      _data = data

    @text = _data.text

    @delay = _data.delay
    @delay ?= -1

    @linebreak = _data.linebreak
    @linebreak ?= true

    @style = _data.style

    @link = _data.link

    @image = _data.image