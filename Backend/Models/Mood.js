const mongoose = require('mongoose')


const MoodsSchema = new mongoose.Schema({

    mood: {
        type : String,
        enum: [ "happy", "sad", "neutral", "angry", "excited"],
         required: [true, 'please provide your mood'],
        minlength: 3,
        maxlength: 50,
    },

    note: {
        type: String,
        maxlength: 500,
    },

    createdAt : {
        type : Date,
        default: Date.now
    },


    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
  }

})

module.exports = mongoose.model('mood',MoodsSchema)