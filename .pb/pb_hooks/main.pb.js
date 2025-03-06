/// <reference path="../pb_data/types.d.ts" />


routerAdd("GET", "/full_character/{id}", (e) => {

  const id = e.request.pathValue("id") || null;
  if (!id) return e.json(400, { error: "id is required", url: e.request.url });

  let test = $app.findRecordById("character", id);
  $app.expandRecord(test, ["metadata", "status", "inventory", "inventory.metadata", "inventory.items"], null);

  return e.json(200, test)

  // let characters = $app.db()
  //   .select("*")
  //   .from("character")
  //   .orderBy("created", "desc")
  //   .bind({
  //     id: "{:id}"
  //   })
  //   .limit(1)

  // return e.json(200, characters);

});
