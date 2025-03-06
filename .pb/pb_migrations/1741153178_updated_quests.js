/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_2945261690")

  // add field
  collection.fields.addAt(7, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_1308693483",
    "hidden": false,
    "id": "relation3199963017",
    "maxSelect": 999,
    "minSelect": 0,
    "name": "plot",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_2945261690")

  // remove field
  collection.fields.removeById("relation3199963017")

  return app.save(collection)
})
