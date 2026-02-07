# STUDENT MENTAL HEALTCHCARE: MINDBRIDGE
I am create a web application that brings student mental health care closer to students.
Pain Point:
Back in school we had a counselling office which i could never see anyone go  into it. 
So i thought to myself, how can i bring the service closer to the students. Boom A Web Application.

The web application i build called mindbridge is used to connect the students and counselling and guidance office closer.

# Features:
- Login 
The login parts has 2 parts
- student: a student can signup or login using login page
- for counselling personell i have set it up to enable only the office personell to only login 
- For account creation this has to be done on the admin dashboard 

## Dashboard
There are 2 dashbaord which can only be accessed by the role given to the user
Student Dashbaord: 
The student dashboard contains of the following features:

### Overview View
- header: username 

**Cards**
- upcoming sessions:these are future sessions that are set for by the counsellor office personell.
- completed sessions: these are the sessions that the student has completed.
- unread messages: messages that the student has not read yet.


- Calendar:
The calendar components shows a session which the student is booked and is happending today

### View Sessions View
**Available Sessions**
Shows all the sessions that the counselling and guidance office has set and one can view  more information on the session through: view session details and book now button
**My Sessions**
Shows any session that you have booked from the current date to the future



### Messages
- search view : you can search for conversatios
- mychats: you can view the users who you have chatted with
- contacts: you can get all contacts for the counselling office

The messaging view enables students to  get in touch with their conselling office personel. The student can message only the conselling office personel only.
These same component:(react component) is also used for the counselling part in which they can communicate with their follow members and the students.


### Feedback
In the feedback view this is where students can view their feedback and also add a feedback
How it happens;
if a student bookes a session and the session is completed an add button will appear upon which the student can add a session.

### Profile
The profile is where all the student details are. When a student signs up he/she is redirected to student details form where she is needed to enter the student details
Example of the student details are:
```
studentName
studentAge
gender
phoneNumber
image
course
yearOfStudy
address
emergencyContact: {
    name
    phoneNumber
    relationship
}
dateofBirth
```

Within the same student view one can also add a change password section where you can reset your password


Other Features include:
- collapse view for the sidebar
- refresh button: 
at any view whereby you perform an action and it requires a fetch of data from the backend one can press this button which refetches the data
- darkmode feature for better view of the website

## Security
- The application uses cookies as with the following configuration.
```tsx
res.cookie('authToken', authToken, {
    httpOnly:true,
    secure: process.env.NODE_ENV === 'production' ? true : false, 
    sameSite: process.env.NODE_ENV === 'production' ? "None" : "lax", 
    maxAge: 6 * 60 *1000, //6 hours
});
```
- Also for the account registration(that is for students), the application uses a tempToken for which it has an expirey time for 25 minutes. Without these a student cannot authenticated
- For any student signup a student receives an email with an otp and these otp is used to verify the student.
- Tokens for the cookie are generated using a random string(generated usign crypto) and JSONWEBTOKENS.
- logout functionality to loguot a user
How: uses dispatch feature for logging out the user and an api route set for logout passes. ``res.clearCookie()``
- For updating, deletion and creating and messaging, a middleware is set to ensure that only authenticated student can perform the operation.

- Dashboard seperation
No local storage is used. The web application uses redux global state management for setting the role and email for the student. 
These global state management is also used for setting protected routes, and only users  with a given role can access a given route
Example:

```tsx
const ProtectedStudentDashboard = requireAuth(StudentDashboard, ['student']);
```


The application uses a single website(interface) for the student and counselling personell for easier maintanance

# Counselling Part
Login Form: 
The counselling personell can only login in.
For account creating this is done on the administration part.

The counselling personell uses a  password and email to login


## Overview
**Cards**
- Today Sessions:
Shows sessions for the counselling personell that are booked for today
- Total Patients:
Shows the total patients(students) for the counselling personell.
- Feedbacks:
Shows the feedback for the counselling personell.

**Today Schedule**
- Shows the student name, adminssion number and image for todays(the current) day sessions.

## Sessions
In the session view we have the following features:
**Cards**
- total sessions: total sessions for today
- available sessions: sessions available from the current date to the futer
- booked session: shows today booked sessions

**Manage Sessions**
- Create sessions
- Update Sessions
- Delete Sessions

Table Component that shows information about a session such as:
Search component for searching session information by date or by type or mode
Status component that displays compnent bases on the status: is it pending, booked or available
```
Date: date for the session
Type: the session type : ["Individual Therapy", "Group Therapy", "Medication Management", "Follow-up Session", "Initial Consultation"]
Mode: mode of session: ['In-Person', "Virtual", "Phone"]
Duration: The time for the session
Status: ["Available", "Booked", "Pending"]
Bookings: total number of bookings
Actions: view, update and delete
```
## Booked Sessions
This is where the counselling personell view all their boooked sessions. 
**Cards**
- Total Bookings:
Total bookings for all the session has booked(past to future)
- Confirmed:
Number of confirmed sessions booked (past to future)
- Completed
Number of completed sessions(past to present)
- Pending
Number of pending session

**Table Component**
The table component shows information about the booked sessions for the counselling personell
```
Student: student admission number
Date: date for the session: 2025-12-16: 14:00
Session: session type: Group therayp adn the session Duration
Mode: In-person, Virtual
Status: status is it completed
Actions
```
For each row(student information) it has a button for which yu can get information about the student details and the session information.

## Messages
The messaging component is the same with the student the only difference is that the counselling personel can communicate to each other and to the student also

## Feedback
**Cards**
- Average Rating: total number of ratings divided by sessions taken
- Total Feedback: shows the total number of feedbacks you have recieved
- Would recomment: 
Percentage of which students recommend
```
	const recommendationRate = Math.round((feedbackList.filter(f => f.wouldRecommend === 'yes').length / totalFeedbacks) * 100);
```
- Found Helpfull
Percentage for which studetns found helpfull
```
	const helpfulRate = Math.round((feedbackList.filter(f => f.sessionHelpful === 'yes').length / totalFeedbacks) * 100);
```
feedback list is the an array of the retrieved feedbacks from the database

You In You have a feedback view component which shows the rating number, and the feedback message from teh student

## Profile
The profile shows the information for the counselling personel information.

**Cards**
- Email for the counselling personel
- Phone: Phone number for the counselling personel
- License Number for practising for counselling personel 
- Office location: Office location counselling personel

**Personal**
```
FullName
Email Address
Phone Nuber
Office location
Biography
```

**Profession**
```
specialization
education
language
licenseNumber
yearsOfExperience
consultationDays
consulationHours
```

**Security**
- The counselling personel can change their password
How: they enter the current password and new password and confirm password 
Before changing the current password is checked and if a match it is accepted otherwise it's not updated.

**Notification**
How you would like to recieve notifications
```
email
sms notifications
appointent reminders
new booking alerts
feedback notifications
```
On the above you can change the options using checkbutton element



## Security:
The security for application works using cookies and redux global state management
```tsx
initialState: {
        role: null,
        email:null,
        isAuthenticated:false
    }

```
For actions on for redux we use isLoggedIn and isLoggedOut reducer

Protected routes are set using Higher Order component(HOC) and redux global state: 
```tsx
	const ProtectedPsychiatristDashboard = requireAuth(PsychiatristDashboard, ['psychiatrist', 'Counselor']);
```
