/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_4149302956")

  // add field
  collection.fields.addAt(9, new Field({
    "hidden": false,
    "id": "bool3946532403",
    "name": "deleted",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "bool"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_4149302956")

  // remove field
  collection.fields.removeById("bool3946532403")

  return app.save(collection)
})
