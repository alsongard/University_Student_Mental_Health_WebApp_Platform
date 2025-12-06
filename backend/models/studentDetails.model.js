const mongoose = require('mongoose');

const studentDetailsSchema = new mongoose.Schema(
    {
        studentId: {ref:"Student", type:mongoose.Schema.Types.ObjectId, required:true}, 
        studentName: {type:String, required:true},
        studentAge: {type:Number, required:true},
        gender: {type:String, required:true},
        phoneNumber: {type:String, required:true},
        course: {type:String, required:true},
        yearOfStudy: {type:Number, required:true},
        address: {type:String, required:true},
        emergencyContact: {
            name: {type:String, required:true},
            phoneNumber: {type:String, required:true},
            relationship: {type:String, required:true}
        },
        dateofBirth: {type:Date, required:false}
    },
    {
        timestamps: true
    }
);

const StudentDetails = mongoose.model('StudentDetails', studentDetailsSchema);
module.exports = StudentDetails;
