/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_4149302956")

  // remove field
  collection.fields.removeById("text3664755631")

  // remove field
  collection.fields.removeById("text3981121951")

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_4149302956")

  // add field
  collection.fields.addAt(4, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "text3664755631",
    "max": 0,
    "min": 0,
    "name": "race",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": true,
    "system": false,
    "type": "text"
  }))

  // add field
  collection.fields.addAt(5, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "text3981121951",
    "max": 0,
    "min": 0,
    "name": "class",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": true,
    "system": false,
    "type": "text"
  }))

  return app.save(collection)
})
