const mongoose = require("mongoose");
const app = require("./app");
const dotenv = require("dotenv");
//
dotenv.config({ path: "./.env" });

// handle the uncaught exception
process.on("uncaughtException", (err) => {
  console.log(`error ${err.stack}`);
  console.log(`shutting down server due to uncaught exceptions`);
  process.exit(1);
});

const DB = process.env.DATABASE_LOCAL;

mongoose
  .connect(DB, {
    // useNewurlParser: true,
    // useCreateIndex: true,
    // useFindAndmodify: true,
  })
  .then((conn) => {
    console.log(conn.connections);
  });

const port = process.env || 4000;

const server = app.listen(port, () => {
  console.log(`app running on port ${port}`);
});

// handle unhandled rejction

process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.stack}`);
  console.log(`shutting dowm due to unhandled promises`);
  server.close(() => {
    process.exit(1);
  });
});
// this is amazing uncaught exception for example "console.log(a)" and we break our code
