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


psychiatristLogin:
```
{
	"success": true,
	"data": {
		"id": "692bbcb9946ace680fc7e177",
		"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OTJiYmNiOTk0NmFjZTY4MGZjN2UxNzciLCJpYXQiOjE3NjUzODk5NTIsImV4cCI6MTc2NTM5NzE1Mn0.o4m5y4F1oxKiCMheTio4GRFvRsKzbtu66WSffgf2xbA"
	},
	"msg": "Login Success"
}
```

psychiatristDetails creation request body:
```js
{
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OTJiYmNiOTk0NmFjZTY4MGZjN2UxNzciLCJpYXQiOjE3NjUzODk5NTIsImV4cCI6MTc2NTM5NzE1Mn0.o4m5y4F1oxKiCMheTio4GRFvRsKzbtu66WSffgf2xbA", 
	"fullName": "Dr. Michael Chen",
	"phoneNumber": "+1-555-0147",
	"officeLocation": "Suite 204, Medical Plaza, Downtown",
	"biography": "Experienced psychiatrist specializing in mood and anxiety disorders with a patient-centered approach.",
	"specialization": "Depression & Anxiety",
	"Education": "MD from State University, Board Certified",
	"yearsExperience": "12",
	"education": "MD from State University, Board Certified",
	"consultationDays": "Monday-Friday",
	"consultationHours": "9:00 AM - 5:00 PM",
	"email": true,
	"sms": true,
	"alerts": true,
	"feedbackNotif": true
}
```

Successfully created psychiatrist details
```
{
"success": true,
"message": "Psychiatrist details created successfully",
"data": {
	"psychiatristId": "692bbcb9946ace680fc7e177",
	"fullName": "Dr. Michael Chen",
	"phoneNumber": "+1-555-0147",
	"officeLocation": "Suite 204, Medical Plaza, Downtown",
	"biography": "Experienced psychiatrist specializing in mood and anxiety disorders with a patient-centered approach.",
	"specilization": "Depression & Anxiety",
	"yearsExperience": 12,
	"Education": "MD from State University, Board Certified",
	"consultationDays": [
		"Monday",
		"Friday"
	],
	"consultationHours": "9:00 AM - 5:00 PM",
	"notifications": {
		"email": true,
		"sms": true,
		"alerts": true,
		"feedbackNotif": "true"
	},
	"_id": "6939c45d446162c08bb9b3da",
	"__v": 0
}
}
```


getPsychiatristDetials
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
    psychiatristPassword:"James123kde"
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



**http://localhost:5000/api/bookSession/psychiatristViewBooked/692bbcb9946ace680fc7e177**



```
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


psychiatristLogin:
```
{
	"success": true,
	"data": {
		"id": "692bbcb9946ace680fc7e177",
		"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OTJiYmNiOTk0NmFjZTY4MGZjN2UxNzciLCJpYXQiOjE3NjUzODk5NTIsImV4cCI6MTc2NTM5NzE1Mn0.o4m5y4F1oxKiCMheTio4GRFvRsKzbtu66WSffgf2xbA"
	},
	"msg": "Login Success"
}
```

psychiatristDetails creation request body:
```js
{
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OTJiYmNiOTk0NmFjZTY4MGZjN2UxNzciLCJpYXQiOjE3NjUzODk5NTIsImV4cCI6MTc2NTM5NzE1Mn0.o4m5y4F1oxKiCMheTio4GRFvRsKzbtu66WSffgf2xbA", 
	"fullName": "Dr. Michael Chen",
	"phoneNumber": "+1-555-0147",
	"officeLocation": "Suite 204, Medical Plaza, Downtown",
	"biography": "Experienced psychiatrist specializing in mood and anxiety disorders with a patient-centered approach.",
	"specialization": "Depression & Anxiety",
	"Education": "MD from State University, Board Certified",
	"yearsExperience": "12",
	"education": "MD from State University, Board Certified",
	"consultationDays": "Monday-Friday",
	"consultationHours": "9:00 AM - 5:00 PM",
	"email": true,
	"sms": true,
	"alerts": true,
	"feedbackNotif": true
}
```

Successfully created psychiatrist details
```
{
"success": true,
"message": "Psychiatrist details created successfully",
"data": {
	"psychiatristId": "692bbcb9946ace680fc7e177",
	"fullName": "Dr. Michael Chen",
	"phoneNumber": "+1-555-0147",
	"officeLocation": "Suite 204, Medical Plaza, Downtown",
	"biography": "Experienced psychiatrist specializing in mood and anxiety disorders with a patient-centered approach.",
	"specilization": "Depression & Anxiety",
	"yearsExperience": 12,
	"Education": "MD from State University, Board Certified",
	"consultationDays": [
		"Monday",
		"Friday"
	],
	"consultationHours": "9:00 AM - 5:00 PM",
	"notifications": {
		"email": true,
		"sms": true,
		"alerts": true,
		"feedbackNotif": "true"
	},
	"_id": "6939c45d446162c08bb9b3da",
	"__v": 0
}
}
```


getPsychiatristDetials
```js
{
	"success": true,
	"data": {
		"notifications": {
			"email": true,
			"sms": true,
			"alerts": true,
			"feedbackNotif": "true"
		},
		"_id": "6939c45d446162c08bb9b3da",
		"psychiatristId": "692bbcb9946ace680fc7e177",
		"fullName": "Dr. Michael Chen",
		"phoneNumber": "+1-555-0147",
		"officeLocation": "Suite 204, Medical Plaza, Downtown",
		"biography": "Experienced psychiatrist specializing in mood and anxiety disorders with a patient-centered approach.",
		"specilization": "Depression & Anxiety",
		"yearsExperience": 12,
		"Education": "MD from State University, Board Certified",
		"consultationDays": [
			"Monday",
			"Friday"
		],
		"consultationHours": "9:00 AM - 5:00 PM",
		"__v": 0
	},
	"msg": "details found"
}
```

Experienced psychiatrist specializing in mood and anxiety disorders with a patient-centered approach.
12 years of clinical expertise. Dr. Chen employs evidence-based therapeutic techniques including cognitive behavioral therapy and mindfulness-based interventions. Dedicated to providing compassionate, patient-centered care with a focus on depression management, generalized anxiety disorder, panic disorder, and related mood conditions.







```
Date Fri Dec 12 2025 17:23:37 GMT+0200 (Eastern European Standard Time)


Date Tue Dec 16 2025 02:00:00 GMT+0200 (Eastern European Standard Time)
```


1. 
**http://localhost:5000/api/studentSession/getAllSessions**


```json
"data": [
		{
			"currentBookings": 0,
			"_id": "692c109b12876bc52b87e490",
			"psychiatristId": "692bbcb9946ace680fc7e177",
			"date": "2025-11-30T10:00:00.000Z",
			"startTime": "10:00 AM",
			"endTime": "16:00 PM",
			"sessionType": "Individual Therapy",
			"sessionStatus": "Available",
			"__v": 0,
			"sessionMode": "In-Person",
			"sessionDuration": "2 hr",
			"maxBookings": 2,
			"fullName": "Dr. Michael Chen",
			"specialization": "Depression & Anxiety"
		}
]
```


**http://localhost:5000/api/bookSession/getStudentBookedSessions/**
```js


studentBookedSession
[
  {
    _id: new ObjectId('6943f818e97935145fb46924'),
    sessionId: {
      _id: new ObjectId('693c2d7f024e044c1eca3eed'),
      date: 2025-12-31T00:00:00.000Z,
      startTime: '08:00',
      endTime: '12:00',
      sessionMode: 'Virtual',
      sessionDuration: '4h',
      sessionType: 'Group Therapy'
    },
    studentId: new ObjectId('6903a4963253494881272acb'),
    psychiatristId: { _id: new ObjectId('692bbcb9946ace680fc7e177') },
    status: 'scheduled',
    createdAt: 2025-12-18T12:48:24.634Z,
    updatedAt: 2025-12-18T12:48:24.634Z,
    __v: 0,
    studentDetailsInfo: new ObjectId('6930958ab9ea6134b94b7f5d'),
    feedbackExist: false,
    fullName: 'Dr. Michael Chen',
    specilization: 'Depression & Anxiety'
  }
]

```
**Funny Things: the ``new ObjectId('1234..')`` in the response(browser) will not be seen only the ``_id:'1234..'``

**Payload**
```js
Entering isLoggedIn 
payload: Object { email: "alsonsafo@gmail.com", role: "student" }
```



**Frontend**
```js
const [sessions] = useState([
        {
        _id: '6943f818e97935145fb46924',
        sessionId: {
            _id: '693c2d7f024e044c1eca3eed',
            date: '2025-12-31T00:00:00.000Z',
            sessionType: 'Group Therapy',
            startTime: '10:00 AM', // Add to your response
            endTime: '11:00 AM', // Add to your response
            location: 'Room 201, Wellness Center', // Add to your response
            meetingLink: 'https://meet.mindbridge.com/session-123' // Add to your response
        },
        studentId: '6903a4963253494881272acb',
        psychiatristId: { 
            _id: '692bbcb9946ace680fc7e177',
            phoneNumber: '+254 712 345 678', // Add to your response
            officeLocation: 'Nairobi Wellness Center' // Add to your response
        },
        status: 'scheduled',
        createdAt: '2025-12-18T12:48:24.634Z',
        updatedAt: '2025-12-18T12:48:24.634Z',
        fullName: 'Dr. Michael Chen',
        specilization: 'Depression & Anxiety',
        notes: 'Please arrive 10 minutes early' // Add to your response
        }
    ]);
```

**http://localhost:5000/api/messages/retrieveUserChatPartners**
Will need to add url
```js		
foundPsychiatristDetailsPartners
[
  {
    _id: new ObjectId('6939c45d446162c08bb9b3da'),
    psychiatristId: new ObjectId('692bbcb9946ace680fc7e177'),
    fullName: 'Dr. Michael Chen',
    specilization: 'Depression & Anxiety'
  }
]
```


**http://localhost:5000/api/messages/retrievemessages/692bbcb9946ace680fc7e177**
```js
[
  {
    _id: new ObjectId('69419c6f515546397fbabdbf'),
    senderId: '6903a4963253494881272acb',
    receiverId: '692bbcb9946ace680fc7e177',
    receiverName: 'Dr. Michael Chen',
    recieverRole: 'psychiatrist',
    recieverAvatar: '',
    message: 'tonight',
    image: '',
    createdAt: 2025-12-16T17:52:47.340Z,
    updatedAt: 2025-12-16T17:52:47.340Z,
    __v: 0
  },
  {
    _id: new ObjectId('69419ca2158e59a4b3f6bb88'),
    senderId: '6903a4963253494881272acb',
    receiverId: '692bbcb9946ace680fc7e177',
    receiverName: 'Dr. Michael Chen',
    recieverRole: 'psychiatrist',
    recieverAvatar: '',
    message: 'I know that will be safe and sound',
    image: '',
    createdAt: 2025-12-16T17:53:38.725Z,
    updatedAt: 2025-12-16T17:53:38.725Z,
    __v: 0
  },
  {
    _id: new ObjectId('69419ce498fe53a834a27c64'),
    senderId: '6903a4963253494881272acb',
    receiverId: '692bbcb9946ace680fc7e177',
    receiverName: 'Dr. Michael Chen',
    recieverRole: 'psychiatrist',
    recieverAvatar: '',
    message: 'I can lift you up',
    image: '',
    createdAt: 2025-12-16T17:54:44.631Z,
    updatedAt: 2025-12-16T17:54:44.631Z,
    __v: 0
  },
  {
    _id: new ObjectId('69419d1f870a00c2579c0bdd'),
    senderId: '6903a4963253494881272acb',
    receiverId: '692bbcb9946ace680fc7e177',
    receiverName: 'Dr. Michael Chen',
    recieverRole: 'psychiatrist',
    recieverAvatar: '',
    message: 'Even if the sky is falling down i know will be safe and sound',
    image: '',
    createdAt: 2025-12-16T17:55:43.678Z,
    updatedAt: 2025-12-16T17:55:43.678Z,
    __v: 0
  },
  {
    _id: new ObjectId('6942fd2cb8863477eb16a988'),
    senderId: '6903a4963253494881272acb',
    receiverId: '692bbcb9946ace680fc7e177',
    receiverName: 'Dr. Michael Chen',
    recieverRole: 'psychiatrist',
    recieverAvatar: '',
    message: 'Yani wacha tu',
    image: '',
    createdAt: 2025-12-17T18:57:48.898Z,
    updatedAt: 2025-12-17T18:57:48.898Z,
    __v: 0
  }
]
```


# Tasks
Why you need to modify your message Model is because of this?

Student ----> send Message = Psychiatrist


Now on the student chat message View:
just having the receiver
```
receiverId
receiverName
recieverRole
recieverAvatar
```

Sure this will work for the student chat app

Now in the Psychiatrist :
He/She needs to know who contacted her/him
Therefore we need to have senderDetails


New  Message Model:
```js
senderId: { type: String, required: true }
senderName: { type: String, required: true }
senderRole: { type: String, required: true }
senderAvatar: { type: String, default: "" }

receiverId: { type: String, required: true }
receiverName: { type: String, required: true }
receiverRole: { type: String, required: true }
receiverAvatar: { type: String, default: "" }


// Message Content
message: { type: String, required: true },
image: { type: String, default: "" },

// Metadata
isRead: { type: Boolean, default: false },
readAt: { type: Date },

// Conversation ID for grouping
conversationId: { type: String, required: true}
```


**Frontend**
Chat claude AI structure
```js
    // Sample chat data
    const chats = [
        {
            id: 1,
            name: "Dr. Sarah Mwangi",
            role: "Psychiatrist",
            avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop",
            lastMessage: "Hi John, just checking in to see how you're doing with the strategies we discussed.",
            timestamp: "10:30 AM",
            unread: 2,
            online: true,
            messages: [
                {
                    id: 1,
                    sender: "them",
                    text: "Good morning John! How are you feeling today?",
                    timestamp: "9:15 AM",
                    status: "read"
                },
                {
                    id: 2,
                    sender: "me",
                    text: "Good morning Dr. Mwangi! I'm doing much better, thank you.",
                    timestamp: "9:20 AM",
                    status: "read"
                },
                {
                    id: 3,
                    sender: "them",
                    text: "That's great to hear! Have you been practicing the breathing exercises we talked about?",
                    timestamp: "9:22 AM",
                    status: "read"
                },
                {
                    id: 4,
                    sender: "me",
                    text: "Yes, I've been doing them every morning and they really help with my anxiety.",
                    timestamp: "9:25 AM",
                    status: "read"
                },
                {
                    id: 5,
                    sender: "them",
                    text: "Excellent! Keep up the good work. Remember, consistency is key.",
                    timestamp: "9:30 AM",
                    status: "read"
                },
                {
                    id: 6,
                    sender: "them",
                    text: "Hi John, just checking in to see how you're doing with the strategies we discussed.",
                    timestamp: "10:30 AM",
                    status: "delivered"
                }
            ]
        },
        {
            id: 2,
            name: "Dr. James Ochieng",
            role: "Clinical Psychologist",
            avatar: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop",
            lastMessage: "Our next session is scheduled for Thursday at 2 PM.",
            timestamp: "Yesterday",
            unread: 0,
            online: false,
            messages: [
                {
                id: 1,
                sender: "them",
                text: "Hello John, I hope you're doing well.",
                timestamp: "Yesterday, 3:00 PM",
                status: "read"
                },
                {
                id: 2,
                sender: "me",
                text: "Hi Dr. Ochieng, yes I'm doing well. Thank you for asking.",
                timestamp: "Yesterday, 3:15 PM",
                status: "read"
                },
                {
                id: 3,
                sender: "them",
                text: "Our next session is scheduled for Thursday at 2 PM.",
                timestamp: "Yesterday, 3:20 PM",
                status: "read"
                }
            ]
        },
        {
            id: 3,
            name: "Dr. Amina Hassan",
            role: "Counseling Psychiatrist",
            avatar: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=150&h=150&fit=crop",
            lastMessage: "Thank you for sharing that with me. Your courage is admirable.",
            timestamp: "Monday",
            unread: 0,
            online: true,
            messages: [
                {
                id: 1,
                sender: "me",
                text: "Dr. Hassan, I wanted to talk about the issues I've been having with my roommate.",
                timestamp: "Monday, 11:00 AM",
                status: "read"
                },
                {
                id: 2,
                sender: "them",
                text: "Of course, I'm here to listen. Please tell me what's been happening.",
                timestamp: "Monday, 11:05 AM",
                status: "read"
                },
                {
                id: 3,
                sender: "them",
                text: "Thank you for sharing that with me. Your courage is admirable.",
                timestamp: "Monday, 11:45 AM",
                status: "read"
                }
            ]
        },
        {
            id: 4,
            name: "MindBridge Support",
            role: "Support Team",
            avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop",
            lastMessage: "Your appointment for October 28th has been confirmed.",
            timestamp: "Oct 20",
            unread: 0,
            online: true,
            messages: [
                {
                id: 1,
                sender: "them",
                text: "Welcome to MindBridge! We're here to support your mental health journey.",
                timestamp: "Oct 15, 9:00 AM",
                status: "read"
                },
                {
                id: 2,
                sender: "them",
                text: "Your appointment for October 28th has been confirmed.",
                timestamp: "Oct 20, 2:30 PM",
                status: "read"
                }
            ]
        }
    ];
```


**Create New Mesage Response **
```js
New Message Created:
{
  senderId: '6903a4963253494881272acb',
  senderName: 'Emma Watson',
  senderRole: 'student',
  senderAvatar: '',
  receiverId: '692bbcb9946ace680fc7e177',
  receiverName: 'Dr. Michael Chen',
  receiverRole: 'pschiatrist',
  receiverAvatar: '',
  message: 'jjj',
  image: '',
  isRead: false,
  conversationId: 'conv_6903a4963253494881272acb_692bbcb9946ace680fc7e177',
  _id: new ObjectId('6946d4568e0b35290de55977'),
  createdAt: 2025-12-20T16:52:38.493Z,
  updatedAt: 2025-12-20T16:52:38.493Z,
  __v: 0
}
```
  {
    _id: new ObjectId('6942fd2cb8863477eb16a988'),
    senderId: '6903a4963253494881272acb',
    receiverId: '692bbcb9946ace680fc7e177',
    receiverName: 'Dr. Michael Chen',
    recieverRole: 'psychiatrist',
    recieverAvatar: '',
    message: 'Yani wacha tu',
    image: '',
    createdAt: 2025-12-17T18:57:48.898Z,
    updatedAt: 2025-12-17T18:57:48.898Z,
    __v: 0
  }


**Messages Approach**

Approach 2: Emit and Add to State (Push)
How it works: The server emits an event (e.g., newMessage) with the newly created message object. The frontend listens for this event and adds the message to the local state (chatMessages) if it belongs to the current conversation.
Pros:
	Real-time update without extra request.
	Better user experience (message appears instantly).
	Reduces server load (no extra fetch).

Cons:
	Requires careful state management to avoid duplicates or missing messages.
	If the user is not in the correct conversation, we still update the state (or we conditionally update).
	Must handle errors (e.g., message not saved on server) and roll back.

Approach 3: Hybrid (Optimistic Update + Confirmation)
How it works:
	Optimistic Update: When the user sends a message, immediately add it to the local state (with a temporary ID) and show it in the UI.
	Emit and Confirm: Send the message to the server. On success, the server emits an event with the saved message (with real ID). The frontend replaces the temporary message with the confirmed one (or updates the ID and status).
	Error Handling: If the server fails, show an error and remove the optimistic message (or mark it as failed).

Pros:
	Best user experience (message appears instantly, then confirmed by server).
	Handles network issues gracefully.
Cons:
	More complex state management (temporary IDs, rollback on failure).





**http://localhost:5000/api/bookSession/psychiatristViewBooked**
```js
foundPsychiatristBookedSessions
[
  {
    _id: new ObjectId('6936b893ffe855db16b4f72f'),
    sessionId: {
      _id: new ObjectId('692db102b44b69bc8646b750'),
      date: 2025-12-16T00:00:00.000Z,
      startTime: '14:00',
      endTime: '16:30',
      sessionMode: 'In-Person',
      sessionDuration: '2h 30min',
      sessionType: 'Group Therapy',
      sessionStatus: 'Available'
    },
    studentId: {
      _id: new ObjectId('69360cd7001a399b72c0b961'),
      studentAdmissionNum: 'AAA-00-0000/0032',
      email: 'alsonre@gmail.com'
    },
    psychiatristId: new ObjectId('692bbcb9946ace680fc7e177'),
    status: 'scheduled',
    createdAt: 2025-12-08T11:37:55.171Z,
    updatedAt: 2025-12-08T11:37:55.171Z,
    __v: 0,
    'studentDetailsInfo ': '6936157179e13bc81a7f27b0'
  },
  
  {
    _id: new ObjectId('6943f818e97935145fb46924'),
    sessionId: {
      _id: new ObjectId('693c2d7f024e044c1eca3eed'),
      date: 2025-12-31T00:00:00.000Z,
      startTime: '08:00',
      endTime: '12:00',
      sessionMode: 'Virtual',
      sessionDuration: '4h',
      sessionType: 'Group Therapy',
      sessionStatus: 'Available'
    },
    studentId: {
      _id: new ObjectId('6903a4963253494881272acb'),
      studentAdmissionNum: 'BBB-11-1111/0005',
      email: 'alsonsafo@gmail.com'
    },
    psychiatristId: new ObjectId('692bbcb9946ace680fc7e177'),
    status: 'scheduled',
    createdAt: 2025-12-18T12:48:24.634Z,
    updatedAt: 2025-12-18T12:48:24.634Z,
    __v: 0,
    studentDetailsInfo: {
      _id: new ObjectId('6930958ab9ea6134b94b7f5d'),
      studentName: 'Emma Watson',
      studentAge: 25,
      gender: 'Female',
      phoneNumber: '01113223'
    }
  }
]
```


Pychiatrist GEtChatParters:
```json
​
_id: "6930958ab9ea6134b94b7f5d"
course: "Computer Science"
​​studentId: "6903a4963253494881272acb"
​studentName: "Emma Watson"
​​```


**http://localhost:5000/api/feedback/getStudentFeedback**

```js
// foundStudentFeedback
[
  {
    _id: new ObjectId('6932ae40f648d8d17eeaa572'),
    bookingId: null,
    studentId: new ObjectId('6903a4963253494881272acb'),
    rating: 9,
    feedbackMessage: 'Cool and Awasome session.. I loved the way you  breaked down things and open minded.',
    anonymity: true,
    __v: 0,
    psychiatristId: new ObjectId('692bbcb9946ace680fc7e177'),
    fullName: 'Dr. Michael Chen',
    specilization: 'Depression & Anxiety'
  },
  {
    _id: new ObjectId('69585670f8aceeb8342a69f7'),
    bookingId: {
      _id: new ObjectId('6943f818e97935145fb46924'),
      sessionId: new ObjectId('693c2d7f024e044c1eca3eed')
    },
    studentId: new ObjectId('6903a4963253494881272acb'),
    rating: 4,
    feedbackMessage: 'I resolved my issues on what was pulling me down. I loved the way Dr. Michael braked down things like solving the dragon\n' +
      'learning how to replace my bad habits was interesting',
    anonymity: true,
    createdAt: 2026-01-02T23:36:16.134Z,
    updatedAt: 2026-01-02T23:36:16.134Z,
    __v: 0,
    psychiatristId: new ObjectId('692bbcb9946ace680fc7e177'),
    fullName: 'Dr. Michael Chen',
    specilization: 'Depression & Anxiety'
  }
]
```

**http://localhost:5000/api/psychiatristSession/getPsychFeedback**
```js
foundFeedBacks
[
  {
    _id: new ObjectId('6932ae40f648d8d17eeaa572'),
    bookingId: new ObjectId('692e364e57db98fb8b3ad0fc'),
    studentId: new ObjectId('6903a4963253494881272acb'),
    rating: 5,
    feedbackMessage: 'Cool and Awasome session.. I loved the way you  breaked down things and open minded.',
    anonymity: true,
    __v: 0,
    psychiatristId: new ObjectId('692bbcb9946ace680fc7e177')
  },
  {
    _id: new ObjectId('69585670f8aceeb8342a69f7'),
    bookingId: new ObjectId('6943f818e97935145fb46924'),
    studentId: new ObjectId('6903a4963253494881272acb'),
    rating: 4,
    feedbackMessage: 'I resolved my issues on what was pulling me down. I loved the way Dr. Michael braked down things like solving the dragon\n' +
      'learning how to replace my bad habits was interesting',
    anonymity: true,
    createdAt: 2026-01-02T23:36:16.134Z,
    updatedAt: 2026-01-02T23:36:16.134Z,
    __v: 0,
    psychiatristId: new ObjectId('692bbcb9946ace680fc7e177')
  }
]
```