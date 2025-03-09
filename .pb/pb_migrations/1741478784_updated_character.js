/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_4149302956")

  // update collection data
  unmarshal({
    "name": "characters"
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_4149302956")

  // update collection data
  unmarshal({
    "name": "character"
  }, collection)

  return app.save(collection)
})
