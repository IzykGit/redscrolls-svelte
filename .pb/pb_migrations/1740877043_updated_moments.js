/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_2997943981")

  // add field
  collection.fields.addAt(4, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_3476745380",
    "hidden": false,
    "id": "relation1519228493",
    "maxSelect": 999,
    "minSelect": 0,
    "name": "moment_tags",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_2997943981")

  // remove field
  collection.fields.removeById("relation1519228493")

  return app.save(collection)
})
