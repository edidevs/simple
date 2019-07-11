const moongoose = require("mongoose");

const DataSchema = moongoose.Schema(
  {
    name: String,
    detail: String,
    info: String
  },
  {
    timestamps: true
  }
);

module.exports = moongoose.model("datas", DataSchema);
