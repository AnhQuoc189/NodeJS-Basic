const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// const slug = require('mongoose-slug-generator');
// mongoose.plugin(slug);

const mongooseDelete = require("mongoose-delete");

const Course = new Schema(
  {
    name: { type: String, require: true },
    description: { type: String },
    image: { type: String },
    videoId: { type: String, require: true },
    story: { type: String },
    slug: { type: String },
  },
  { timestamps: true }
);

Course.plugin(mongooseDelete, { deletedAt: true, overrideMethods: "all" });

module.exports = mongoose.model("Course", Course);
