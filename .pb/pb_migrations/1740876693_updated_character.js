/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_4149302956")

  // remove field
  collection.fields.removeById("json2063623452")

  // add field
  collection.fields.addAt(10, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_1276319826",
    "hidden": false,
    "id": "relation1274027537",
    "maxSelect": 999,
    "minSelect": 0,
    "name": "statuses",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_4149302956")

  // add field
  collection.fields.addAt(8, new Field({
    "hidden": false,
    "id": "json2063623452",
    "maxSize": 0,
    "name": "status",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "json"
  }))

  // remove field
  collection.fields.removeById("relation1274027537")

  return app.save(collection)
})
