const mongoose = require("mongoose");


mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/marathon_ogonan", { useNewUrlParser: true, useFindAndModify: false }, () => {
  console.log('connected')
});

const db = mongoose.connection;

