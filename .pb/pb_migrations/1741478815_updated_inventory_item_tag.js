/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_989567690")

  // update collection data
  unmarshal({
    "indexes": [
      "CREATE UNIQUE INDEX `idx_0gGmHZItpP` ON `inventory_item_tags` (`name`)"
    ],
    "name": "inventory_item_tags"
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_989567690")

  // update collection data
  unmarshal({
    "indexes": [
      "CREATE UNIQUE INDEX `idx_0gGmHZItpP` ON `inventory_item_tag` (`name`)"
    ],
    "name": "inventory_item_tag"
  }, collection)

  return app.save(collection)
})
