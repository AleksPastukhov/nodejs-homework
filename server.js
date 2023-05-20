const mongoose = require("mongoose");

const app = require("./app");
// aleks;
// kJ5hdBBRtqRRlBuF;
const DB_HOST =
  "mongodb+srv://aleks:kJ5hdBBRtqRRlBuF@cluster0.maspzch.mongodb.net/db_contacts?retryWrites=true&w=majority";
mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(3000, () => {
      console.log("Database connection successful");
    });
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
