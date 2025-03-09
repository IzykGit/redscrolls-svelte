/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_1549668336")

  // add field
  collection.fields.addAt(1, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_3299492639",
    "hidden": false,
    "id": "relation986965820",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "chat_event",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_1549668336")

  // remove field
  collection.fields.removeById("relation986965820")

  return app.save(collection)
})
