/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_2997943981")

  // add field
  collection.fields.addAt(5, new Field({
    "hidden": false,
    "id": "bool2110015341",
    "name": "backstory",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "bool"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_2997943981")

  // remove field
  collection.fields.removeById("bool2110015341")

  return app.save(collection)
})
