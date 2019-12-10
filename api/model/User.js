const mongoose = require("mongoose");


const userSchema = mongoose.Schema({
        mat_no: {
            type: String,
            unique: true,
            lowercase: true,
            trim: true,
        },
        name: {
            type: String,
        },
        faculty: {
            type: String
        },
        department: {
            type: String
        },
        phone_number: {
            type: Number
        },
        next_of_kin: {
            type: Number
        }
})


module.exports = mongoose.model("User", userSchema);