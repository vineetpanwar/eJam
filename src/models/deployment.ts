const mongoose = require("mongoose");

const DeploymentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  versions: {
    type: Array,
    minItems: 1,
    uniqueItems: true,
    items: {
      type: String,
    },
    required: true,
  },
  deployedAt: {
    type: Date,
    default: Date.now,
  },
});

const Deployment = mongoose.model("Deployment", DeploymentSchema);

module.exports = Deployment;
