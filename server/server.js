const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const app = require("./app");

//DATABASE CONNECT
const DB = process.env.DB_HOST.replace("<password>", process.env.DB_PASSWORD);
mongoose.set("strictQuery", false);
mongoose.connect(DB).then(() => {
    console.log("Database connection successfull");
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
