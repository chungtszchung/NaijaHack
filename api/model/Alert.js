const mongoose = require('mongoose');

const alertSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    location: {
        type: {
          type: String, // Don't do `{ location: { type: String } }`
          enum: ['Point'], // 'location.type' must be 'Point'
          required: true
        },
        coordinates: {
          type: [Number],
          required: true
        }
      },
      timestamp: {
        type: Date,
        default: Date.now
    },
    
})

module.exports = mongoose.model("Alert", alertSchema);