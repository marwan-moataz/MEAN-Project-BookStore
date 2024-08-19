const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
    photo:{
        type:String,
        require:true
    },
    firstName:{
        type:String,
        require:true
    },
    lastName:{
        type:String,
        require:true
    },
    dateOfBirth:{
        type:String,
        require:true
    }
});

module.exports = mongoose.model('Author',authorSchema);