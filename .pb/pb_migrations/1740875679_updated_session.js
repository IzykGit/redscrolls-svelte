/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_1092069950")

  // add field
  collection.fields.addAt(4, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_2945261690",
    "hidden": false,
    "id": "relation547266292",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "quest_id",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_1092069950")

  // remove field
  collection.fields.removeById("relation547266292")

  return app.save(collection)
})
