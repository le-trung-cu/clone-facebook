const { Schema, model } = require("mongoose");

const userScheme = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  refreshTokens: {
    type: Array,
    default: [],
  },
}, {
  timestamps: true,
  collection: 'Tokens',
})

module.exports = model('Token', userScheme)