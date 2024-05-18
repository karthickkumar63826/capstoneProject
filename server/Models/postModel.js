const mongoose = require("mongoose");

const postShcema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    category: {
      type: String,
      enum: [
        "Agriculture",
        "Business",
        "Education",
        "Entertainment",
        "Art",
        "Investment",
        " UnCategorized",
        "Weather",
      ],
      message: "Value is not supported",
    },
    description: { type: String, required: true },
    creator: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    thumbnail: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Posts", postShcema);
