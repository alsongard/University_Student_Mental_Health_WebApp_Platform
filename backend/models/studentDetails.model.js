const mongoose = require('mongoose');

const studentDetailsSchema = new mongoose.Schema({
    studentId: {ref:mongoose.Schema.Types.ObjectId, required:true}, 
    studentName: {type:String, required:true},
    studentAge: {type:Number, required:true},
});

const StudentDetails = mongoose.model('StudentDetails', studentDetailsSchema);
module.exports = StudentDetails;
