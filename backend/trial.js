const BookedSession = require("./models/bookSession.model");
const PsychiatristSession = require("./models/psychiatristSession.model")
const connectDB = require("./config/connectDB");
const dotenv = require("dotenv").config();



const today = new Date();

today.setUTCHours(0, 0, 0,0);

const checkConnectTrial = async ()=>{
    const results = await BookedSession.aggregate([
        {
            $project: {status: 1, _id: 1, studentId: 1, psychiatristId: 1} 
        }
    ])

    console.log("results");
    for (let i = 0; i < results.length; i++)
    {
        console.log(results[i]);
    }
}


const runQueryOnLeftJoin = async ()=>{
    const pastBookedSessionSheduleTrue = await BookedSession.aggregate([
        // extract only the sessionId, maybe add status
        // {$project: {sessionId: 1, _id: 1, status:1}},
        {
            $lookup: {
                from: "psychiatristsessions",//databaseName
                localField: "sessionId",
                foreignField: "_id",
                as: "sessionInfo"
            }
        },
        {
            $unwind: "$sessionInfo" // this unwinds the PsychiatristSession e.g Date,  psychiatristId
        },
        { 
            $match: {
                'sessionInfo.date': {$lt: today}, // in this match we check if Date is less than today    
                status: 'scheduled'
            }
        },
        {
            $project: {_id: 1} // get the id for the BookedSession._id only 
        }
    ])
    console.log("pastBookedSessionSheduleTrue");
    for (let i = 0; i < pastBookedSessionSheduleTrue.length; i++)
    {
        console.log(pastBookedSessionSheduleTrue[i]);
    }
    const resultAfterUpate = await BookedSession.updateMany(
        {_id: {$in: pastBookedSessionSheduleTrue.map((doc)=>{
            console.log("doc");
            console.log(doc);
            return doc._id})}},
        {$set: {status:"completed"}},
        {new: true}
    );

    console.log("resultAfterUpate");
    for (let i = 0; i < resultAfterUpate.length; i++)
    {
        console.log(resultAfterUpate[i]);
    }
};


 

const serverConnect = async ()=>{
    try
    {
        await connectDB();
        // await checkConnectTrial(); // TESTING: WORKING
        await runQueryOnLeftJoin();
    }
    catch(err)
    {
        console.log(`Error: ${err}`);
    }

}





serverConnect();
