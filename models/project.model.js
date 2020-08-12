const mongoose = require("mongoose");

require('./user.model')
require("./comment.model");

const projectSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    projectName: {
      type: String,
      required: true
    },
    body: {
      type: String,
      required: true,
    },
    file: {
      type: [],
    },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

projectSchema.virtual("comments", {
  ref: "Comment",
  localField: "_id",
  foreignField: "project",
  justOne: false,
});

projectSchema.virtual("likes", {
  ref: "Like",
  localField: "_id",
  foreignField: "project",
  justOne: false
});

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;

