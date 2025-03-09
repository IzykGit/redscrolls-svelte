/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_1549668336")

  // update collection data
  unmarshal({
    "name": "chat_states"
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_1549668336")

  // update collection data
  unmarshal({
    "name": "chat_state"
  }, collection)

  return app.save(collection)
})
