/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_1092069950")

  // update collection data
  unmarshal({
    "listRule": "(user = @request.auth.id && deleted = false) || \"server\" = @request.auth.role",
    "viewRule": "(user = @request.auth.id && deleted = false) || \"server\" = @request.auth.role"
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_1092069950")

  // update collection data
  unmarshal({
    "listRule": "user = @request.auth.id && deleted = false",
    "viewRule": "user = @request.auth.id && deleted = false"
  }, collection)

  return app.save(collection)
})
