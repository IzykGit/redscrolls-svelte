/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3573984430")

  // remove field
  collection.fields.removeById("relation288800373")

  // add field
  collection.fields.addAt(1, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_1918279591",
    "hidden": false,
    "id": "relation3776899405",
    "maxSelect": 999,
    "minSelect": 0,
    "name": "items",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3573984430")

  // add field
  collection.fields.addAt(1, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_4149302956",
    "hidden": false,
    "id": "relation288800373",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "character_id",
    "presentable": false,
    "required": true,
    "system": false,
    "type": "relation"
  }))

  // remove field
  collection.fields.removeById("relation3776899405")

  return app.save(collection)
})
