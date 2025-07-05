const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: {
    filename: String,
    url: {
      type: String,
      default:
        "https://i.pinimg.com/originals/45/6a/83/456a83165720517e45f48603b6678161.jpg",
      set: (v) =>
        v === ""
          ? "https://i.pinimg.com/originals/45/6a/83/456a83165720517e45f48603b6678161.jpg"
          : v,
    },
  },
  price: {
    type: Number,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  country: String,
});
const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
