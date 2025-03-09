/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_1092069950")

  // add field
  collection.fields.addAt(6, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_3299492639",
    "hidden": false,
    "id": "relation1401378634",
    "maxSelect": 999,
    "minSelect": 0,
    "name": "events",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_1092069950")

  // remove field
  collection.fields.removeById("relation1401378634")

  return app.save(collection)
})
