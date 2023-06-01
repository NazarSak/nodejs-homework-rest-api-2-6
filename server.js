const app = require("./app");

const mongoose = require("mongoose");

const DB_HOST = "mongodb+srv://Nazar:f3idUlg2XNWWPHnW@cluster0.hhlsnkj.mongodb.net/db-contacts?retryWrites=true&w=majority";

mongoose
  .connect(DB_HOST)
  .then(() => {
    console.log("Database connection successful");
    app.listen(3000);
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
