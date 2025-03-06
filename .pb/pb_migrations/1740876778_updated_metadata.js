/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_257584141")

  // remove field
  collection.fields.removeById("text2546616235")

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_257584141")

  // add field
  collection.fields.addAt(3, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "text2546616235",
    "max": 0,
    "min": 0,
    "name": "mode",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  return app.save(collection)
})
