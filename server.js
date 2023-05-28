const mongoose = require("mongoose");
const app = require("./app");
const { DB_HOST, PORT } = process.env;

(async () => {
  await mongoose
    .connect(DB_HOST, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      console.log("Database connection successful");
      app.listen(PORT, () => {
        console.log(`Server is up and running on port ${PORT}`);
      });
    })
    .catch((error) => {
      console.log(error.message);
      process.exit(1);
    });
})();
