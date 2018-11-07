const mongoose = require("mongoose");


mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/marathon_ogonan", () => {
  console.log('connected')
});

const db = mongoose.connection;

