/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_1308693483")

  // update collection data
  unmarshal({
    "name": "quest_plots"
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_1308693483")

  // update collection data
  unmarshal({
    "name": "quest_plot"
  }, collection)

  return app.save(collection)
})
