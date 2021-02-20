const mongoose = require("mongoose");

const clientSchema = mongoose.Schema(
  {
    id: {
      type: String,
      required: false,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: false,
    },
    balance: {
      type: Number,
      required: false,
    },
    isVip: {
      type: Boolean,
      required: false,
    },
  },
  { timestamps: true }
);

const Client = mongoose.model("client", clientSchema);

module.exports = Client;
