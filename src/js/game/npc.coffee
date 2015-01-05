# NPC 对象，用于多种逻辑
window.NPC = class NPC
  constructor: (data)->
    @id = data.id
    @name = data.name
    @avatar = data.avatar