/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3294877612")

  // update collection data
  unmarshal({
    "name": "chat_events"
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3294877612")

  // update collection data
  unmarshal({
    "name": "chat_event"
  }, collection)

  return app.save(collection)
})
