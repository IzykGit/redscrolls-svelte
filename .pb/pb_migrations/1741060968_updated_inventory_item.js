/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_1918279591")

  // add field
  collection.fields.addAt(7, new Field({
    "hidden": false,
    "id": "bool39465324032",
    "name": "deleted",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "bool"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_1918279591")

  // remove field
  collection.fields.removeById("bool39465324032")

  return app.save(collection)
})
