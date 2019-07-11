const faker = require("faker");
const appRouter = function(app) {
  const data = require("../controllers/data-controller");

  // Create a new data
  app.post("/data", data.create);

  // Fetch all created datas
  app.get("/users", data.findAll);

  // Fetch a single user using its ID
  app.get("/users/:userID", data.findOne);

  // Update a user with noteId
  app.put("/users/:userID", data.update);

  // Delete a user
  app.delete("/users/:userID", data.delete);
};

module.exports = appRouter;
