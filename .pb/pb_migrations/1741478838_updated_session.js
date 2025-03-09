/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_1092069950")

  // update collection data
  unmarshal({
    "name": "sessions"
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_1092069950")

  // update collection data
  unmarshal({
    "name": "session"
  }, collection)

  return app.save(collection)
})
