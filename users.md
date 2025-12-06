```js
{
    "studentAdmissionNum":"AAA-00-0000/0004",
    "studentName":"Jason Momoa",
    "gender": "Male",
    "phoneNumber": "+1234567890",
    "course": "Barchelor of Science in Computer Science",
    "yearOfStudy": "1",
    "address": "123 Main St, Anytown, USA",
    "emergencyContact": {
			"name": "Jane Doe",
			"phoneNumber": "+0987654321",
			"relationship": "Sister"
		},
    "email":"alsonre@gmail.com",
    "password":"JASON@12j3",
    "gender":"Male"
}

{
    "studentAdmissionNum":"BBB-11-1111/0005",
    "studentName":"Emma Watson",
    "email":"alsonsafo@gmail.com",
    "password":"EMAWATS@123",
    "gender":"Female"
}


/// psychiatrist
{
    psychiatristId:"12349013"
    psychiatristName:"Stephen West"
    psychiatristEmail:"alsonre@gmail.com"
    psychiatristPassword:"12341234"
}


// response
{
	"success": true,
	"data": {
		"emergencyContact": {
			"name": "Jane Doe",
			"phoneNumber": "+0987654321",
			"relationship": "Sister"
		},
		"_id": "690e0b24ab1face93371229c",
		"studentId": {
			"_id": "690362a78d4fa3a14a78a9e3",
			"studentAdmissionNum": "AAA-00-0000/0004",
			"email": "alsonre@gmail.com",
			"isAccountVerified": true
		},
		"studentName": "Jason Momoa",
		"studentAge": 32,
		"gender": "Male",
		"phoneNumber": "+1234567890",
		"course": "Barchelor of Science in Computer Science",
		"yearOfStudy": 1,
		"address": "123 Main St, Anytown, USA",
		"__v": 0
	}
}


{
    "psychiatristId":"",
    "date":"",
    "startTime":"",
    "endTime":"",
    "sessionType":"",
    "sessionStatus":""
}

{
  "psychiatristId": "abc123",
  "date": "2025-11-30T10:00:00.000Z",
  "startTime": "10:00",
  "endTime": "11:00",
  "sessionType": "online",
  "sessionStatus": "scheduled"
}


{
	"success": true,
	"data": {
		"_id": "692bbcb9946ace680fc7e177",
		"psychiatristId": "a726d2d745840ba551f129a",
		"psychiatristName": "Stephen West",
		"psychatriastEmail": "alsonre@gmail.com"
	}
}

// 
{
	"success": true,
	"data": [
		{
			"maxBookings": 1,
			"_id": "692c109b12876bc52b87e490",
			"psychiatristId": "692bbcb9946ace680fc7e177",
			"date": "2025-11-30T10:00:00.000Z",
			"startTime": "10:00 AM",
			"endTime": "11:00 PM",
			"sessionType": "one-on-one",
			"sessionStatus": "Available",
			"__v": 0,
			"sessionMode": "In-Person"
		},
		{
			"_id": "692cbf954399c19ce2b3e6fb",
			"psychiatristId": "692bbcb9946ace680fc7e177",
			"date": "2025-12-02T00:00:00.000Z",
			"startTime": "08:30",
			"endTime": "13:00",
			"sessionMode": "In-Person",
			"sessionDuration": "2 hr",
			"sessionType": "Individual Therapy",
			"sessionStatus": "Available",
			"maxBookings": 1,
			"__v": 0
		}
	]
}

// interesting: you can pass mutliple conditios to className provided: use {} and then followed `` templateString for condition
// lastly ${playWithCondtion}



{
	"currentBookings": 0,
	"_id": "692c109b12876bc52b87e490",
	"psychiatristId": {
		"_id": "692bbcb9946ace680fc7e177",
		"psychiatristName": "Stephen West"
	},
	"date": "2025-11-30T10:00:00.000Z",
	"startTime": "10:00 AM",
	"endTime": "16:00 PM",
	"sessionType": "Individual Therapy",
	"sessionStatus": "Available",
	"__v": 0,
	"sessionMode": "In-Person",
	"sessionDuration": "2 hr",
	"maxBookings": 2
},

{
	id: 1,
	psychiatristName: "Dr. Sarah Mwangi",
	date: "2025-10-28",
	time: "10:00 AM",
	type: "Individual Therapy",
	status: "confirmed",
	mode: "In-Person"
},
```

Stephen West

Counselling and Guidance
Available

Available Time Slots:

Remaining Bookings: 1
Mode: In-Person



```js
{
	"sessionId": "", 
	"studentId": "", 
	"psychiatristId": "", 
	"status": ""
}

{
	"success": true,
	"msg": "Booking session created",
	"data": {
		"sessionId": "692c109b12876bc52b87e490",
		"studentId": "690362a78d4fa3a14a78a9e3",
		"psychiatristId": "692bbcb9946ace680fc7e177",
		"status": "scheduled",
		"_id": "692e364e57db98fb8b3ad0fc",
		"createdAt": "2025-12-02T00:43:58.474Z",
		"updatedAt": "2025-12-02T00:43:58.474Z",
		"__v": 0
	}
}
```


```js
{
	"success": true,
	"data": [
		{
			"_id": "692e364e57db98fb8b3ad0fc",
			"sessionId": "692c109b12876bc52b87e490",
			"studentId": "690362a78d4fa3a14a78a9e3",
			"psychiatristId": "692bbcb9946ace680fc7e177",
			"status": "scheduled",
			"createdAt": "2025-12-02T00:43:58.474Z",
			"updatedAt": "2025-12-02T00:43:58.474Z",
			"__v": 0
		}
	]
}
 id: 101,
            psychiatristName: "Dr. Sarah Mwangi",
            specialization: "Anxiety & Depression",
            availableSlots: ["2025-10-30 9:00 AM", "2025-10-30 11:00 AM", "2025-10-31 2:00 PM"],
            mode: "Both"
```


```
http://localhost:5000/api/bookSession/psychiatristViewBooked/692bbcb9946ace680fc7e177



{
	
	"success": true,
	"data": [
		{
			"_id": "692e364e57db98fb8b3ad0fc",
			"sessionId": {
				"_id": "692c109b12876bc52b87e490",
				"date": "2025-11-30T10:00:00.000Z",
				"startTime": "10:00 AM",
				"endTime": "16:00 PM",
				"sessionType": "Individual Therapy",
				"sessionStatus": "Available",
				"sessionMode": "In-Person",
				"sessionDuration": "2 hr"
			},
			"studentId": {
				"_id": "690362a78d4fa3a14a78a9e3",
				"studentAdmissionNum": "AAA-00-0000/0004",
				"email": "alsonre@gmail.com"
			},
			"psychiatristId": "692bbcb9946ace680fc7e177",
			"status": "scheduled",
			"createdAt": "2025-12-02T00:43:58.474Z",
			"updatedAt": "2025-12-02T00:43:58.474Z",
			"__v": 0
		}
	]
}
```


id
sessionId // session Model  : auto
studentName  //student Model: email
studentAdmissionNum // student Model
studentEmail // student Model
studentPhone //studentDetails Model
studentAge //studentDetails model
date // session Model
time // session Model
duration // session Model
type // session Model
mode // session Model
status // session Model
location
reason
bookedDate //session Model: updatedAt
studentAvatar
```



http://localhost:5000/api/studentDetails/createDetails/690362a78d4fa3a14a78a9e3
```
{
	"success": true,
	"msg": "Student details created successfully",
	"data": {
		"studentId": "690362a78d4fa3a14a78a9e3",
		"studentName": "Emma Watson",
		"studentAge": 25,
		"gender": "Female",
		"phoneNumber": "01113223",
		"course": "Computer Science",
		"yearOfStudy": 4,
		"address": "Nairobi Umoja Face 2",
		"emergencyContact": {
			"name": "Jupiter",
			"phoneNumber": "01117889",
			"relationship": "Bestiee"
		},
		"_id": "692f6c70823bd655d7877144",
		"__v": 0
	}
}
```


```
{"_id":{"$oid":"690362a78d4fa3a14a78a9e3"},"studentAdmissionNum":"AAA-00-0000/0004","email":"alsonre@gmail.com","password":"$2b$10$LHqSwTYolu2nOpTcOu7SquKq1mfIb3VxNZhoU6ZLozISgQ8zcUYmW","gender":"Male","isAccountVerified":true,"verifyOtp":"0","verifyOtpExpiresIn":{"$numberInt":"0"},"resentOTP":"0","resetOtpExpiresIn":{"$numberInt":"0"},"createdAt":{"$date":{"$numberLong":"1761829543534"}},"updatedAt":{"$date":{"$numberLong":"1761829751436"}},"__v":{"$numberInt":"0"},"role":"student"}
```

```
{"_id":{"$oid":"6903a4963253494881272acb"},"studentAdmissionNum":"BBB-11-1111/0005","email":"alsonsafo@gmail.com","password":"$2b$10$y1ut6Pc/JmwLwi4s80.WbuMwbGADtgl.2Phjt5k3noiXTU9hibMhK","isAccountVerified":true,"verifyOtp":"7ef5d84fa58","verifyOtpExpiresIn":{"$numberDouble":"1761847323128.0"},"resentOTP":"0","resetOtpExpiresIn":{"$numberInt":"0"},"createdAt":{"$date":{"$numberLong":"1761846422695"}},"updatedAt":{"$date":{"$numberLong":"1761846423129"}},"__v":{"$numberInt":"0"},"role":"student"}
```


```
{"_id":{"$oid":"690e0b24ab1face93371229c"},"studentId":{"$oid":"690362a78d4fa3a14a78a9e3"},"studentName":"Jason Momoa","studentAge":{"$numberInt":"32"},"gender":"Male","phoneNumber":"+1234567890","course":"Barchelor of Science in Computer Science","yearOfStudy":{"$numberInt":"1"},"address":"123 Main St, Anytown, USA","emergencyContact":{"name":"Jane Doe","phoneNumber":"+0987654321","relationship":"Sister"},"__v":{"$numberInt":"0"}}
```



Emma Wats:alsonsafo
```
{"_id":{"$oid":"6930958ab9ea6134b94b7f5d"},"studentId":{"$oid":"6903a4963253494881272acb"},"studentName":"Emma Watson","studentAge":{"$numberInt":"25"},"gender":"Female","phoneNumber":"01113223","course":"Computer Science","yearOfStudy":{"$numberInt":"4"},"address":"Nairobi Umoja Face 2","emergencyContact":{"name":"Jupiter","phoneNumber":"01117889","relationship":"Bestiee"},"__v":{"$numberInt":"0"}}
```


retrievedStudentDetails:
```
{
	"success": true,
	"data": {
		"emergencyContact": {
			"name": "Jupiter",
			"phoneNumber": "01117889",
			"relationship": "Bestiee"
		},
		"_id": "6930958ab9ea6134b94b7f5d",
		"studentId": {
			"_id": "6903a4963253494881272acb",
			"studentAdmissionNum": "BBB-11-1111/0005",
			"email": "alsonsafo@gmail.com",
			"password": "$2b$10$y1ut6Pc/JmwLwi4s80.WbuMwbGADtgl.2Phjt5k3noiXTU9hibMhK"
		},
		"studentName": "Emma Watson",
		"studentAge": 25,
		"gender": "Female",
		"phoneNumber": "01113223",
		"course": "Computer Science",
		"yearOfStudy": 4,
		"address": "Nairobi Umoja Face 2",
		"__v": 0
	}
}
```


**update password**
```js
{
	"currentPassword": "EMAWATS@123",
	"currentPassword":"Jupiter@123",
	"password": "Jupiter@123"
}
```
response:
```js
{
	"success": true,
	"msg": "Password Updated Successfully"
}
```

```js
{
	id: 1,
	sessionDate: "2025-10-15",
	psychiatristName: "Dr. Sarah Mwangi",
	rating: 5,
	comment: "Very helpful session. Dr. Mwangi was understanding and provided practical strategies.",
	response: "Thank you for your feedback! I'm glad our session was beneficial."
}
```

```
{
	"success": true,
	"data": [
		{
			"_id": "6932ae40f648d8d17eeaa572",
			"bookingId": {
				"_id": "692e364e57db98fb8b3ad0fc",
				"sessionId": "692c109b12876bc52b87e490"
			},
			"studentId": "6903a4963253494881272acb",
			"pyschiatricId": {
				"_id": "692bbcb9946ace680fc7e177",
				"psychiatristName": "Stephen West"
			},
			"rating": 9,
			"feedbackMessage": "Cool and Awasome session.. I loved the way you  breaked down things and open minded.",
			"anonymity": true,
			"__v": 0
		}
	]
}
```



```
id : id for  feedback on student: _id
studentName: 'studentId' student Email // anonymity is flase
studentAdmissionNum: 'studentId' student Email // anonymity is false
studentAvatar: 'studentId' student Email // anonymity is false
sessionDate : 
sessionType
rating
feedbackMessage
anonymity
sessionHelpful
wouldRecommend
specificPositives
areasOfImprovement
submittedDate
```



```
studentId
studentName
studentAge
gender
phoneNumber
course
yearOfStudy
address
emergencyContact
	name
	phoneNumber
	relationship

```