const mongoose = require("mongoose");

const AddressSchema = new mongoose.Schema(
  {
    name: String,
    userId: String,
    address: String,
    city: String,
    pincode: String,
    phone: String,
    notes: String,
  },
  { timestamps: true }
);

const Address = mongoose.model("Address", AddressSchema);
module.exports = Address;
