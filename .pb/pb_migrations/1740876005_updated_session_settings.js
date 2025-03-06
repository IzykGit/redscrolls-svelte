/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_1887862312")

  // update field
  collection.fields.addAt(1, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_257584141",
    "hidden": false,
    "id": "relation1326724116",
    "maxSelect": 999,
    "minSelect": 0,
    "name": "metadata",
    "presentable": false,
    "required": true,
    "system": false,
    "type": "relation"
  }))

  // update field
  collection.fields.addAt(2, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_1092069950",
    "hidden": false,
    "id": "relation1631579359",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "session_id",
    "presentable": false,
    "required": true,
    "system": false,
    "type": "relation"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_1887862312")

  // update field
  collection.fields.addAt(1, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_257584141",
    "hidden": false,
    "id": "relation1326724116",
    "maxSelect": 999,
    "minSelect": 0,
    "name": "metadata",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  // update field
  collection.fields.addAt(2, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_1092069950",
    "hidden": false,
    "id": "relation1631579359",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "session_id",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  return app.save(collection)
})
