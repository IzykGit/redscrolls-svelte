/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_257584141")

  // update collection data
  unmarshal({
    "name": "metadatas"
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_257584141")

  // update collection data
  unmarshal({
    "name": "metadata"
  }, collection)

  return app.save(collection)
})
