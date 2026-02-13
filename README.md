# MindBridge: University Mental Health Platform 🌉

A full-stack web application designed to bridge the gap between university students and mental health counseling services. The platform facilitates secure booking, communication, and support within an educational environment.

---

## ✨ Key Features

| Role | Core Features |
|------|---------------|
| **👨‍🎓 Students** | • Secure registration & OTP verification<br>• Browse & book counseling sessions<br>• Real-time chat with assigned counselors<br>• View session history & provide feedback<br>• Complete personal profile management |
| **🧑‍⚕️ Counseling Personnel** | • Manage available session slots<br>• View student bookings & profiles<br>• Real-time chat with students & colleagues<br>• Receive and analyze session feedback<br>• Professional profile management |
| **🔐 Security** | • JWT-based authentication with HTTP-only cookies<br>• Role-based protected routes (Student/Counselor/Admin)<br>• Encrypted sessions & secure API endpoints |

---

## 🏗️ Project Architecture

```
university-mental-health-app/
├── backend/                    # Node.js + Express API server
│   ├── server.js              # Main application entry point
│   ├── models/                # Mongoose schemas (User, Session, Message, etc.)
│   ├── routes/                # REST API endpoints
|   ├── controllers/           # logic for database interaction and API
│   ├── middleware/            # Auth, validation, error handlers
│   └── config/                # Database, environment configuration
└── client/
    ├── univweb_react/         # Main React app (Students + Counselors)
    ├── admin/                 # Admin dashboard (Separate React app)
    └── univweb_app/           # Next.js version (currently inactive)
```

---

## 🚀 Quick Start (Development)

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas URI)
- pnpm (recommended) or npm

### Backend Setup
```bash
cd backend
cp .env.example .env.local  # Configure your environment variables
pnpm install                # Install dependencies
pnpm dev                   # Start development server (http://localhost:5000)
```

### Frontend Setup
```bash
cd client/univweb_react
cp .env.example .env.local  # Configure frontend environment
pnpm install                # Install dependencies
pnpm dev                   # Start React dev server (http://localhost:5173)
```

**Default Access:**
- **Students**: Self-register with email verification
- **Counselors**: Admin-created accounts only
- **Admin**: Seed via database script or initial setup

---

## 🛠️ Tech Stack

**Backend**
- **Runtime**: Node.js + Express
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT, HTTP-only cookies
- **Real-time**: Socket.IO for live chat
- **Email**: Nodemailer for OTP & notifications
- **Cloudinary**: Upload images to cloudinary service

**Frontend** (Main React App)
- **Framework**: React with Vite
- **State Management**: Redux (auth, global state)
- **Routing**: React Router v6 with protected routes
- **Styling**: Tailwind CSS
- **Real-time**: Socket.IO client

---

## 🔌 API & Integration

### Authentication Flow
```
1. Login → Verify credentials → Generate JWT
2. JWT stored in HTTP-only cookie (secure, sameSite policies)
3. Protected routes validate token via middleware
4. Socket.IO connections authenticated via same tokens
```

### API Endpoints

| Base Route | Description | Main Endpoints |
|------------|-------------|----------------|
| `/api/student` | Authentication & user management | `POST /studentCreate`, `POST /studentLogin`, `POST /getOTP`, `PUT /studentChangePassword`, `POST /resendOTP` |
| `/api/psychiatrist` | Authentication &  Psychiatrist Management | `POST /createPsychatriast`, `POST psychiatristLogin`, `POST /getOtp`, `PUT /updatePsychiatristPassword`  |
| `/api/psychiatristSession` |  Session management for counsellors | `POST /createSession`, `GET /viewSession`, `PUT /updateSession/:sessionId`, `DELETE /deleteSession/:sessionId`, `GET /getPsychFeedback` |
| `/api/studentDetails` | student details management | `POST /createBooking`, `GET /psychiatristViewBooked`, `GET /getStudentBookedSessions`, `DELETE /deleteBooking/:bookingId` |
| `/api/psychiatrist` | Counselor operations | `GET /sessions`, `POST /sessions`, `GET /appointments` |
| ``/api/feedback`` | Feedback management | ``POST /createFeedback``, ``POST /getStudentFeedback`` |
| ``/api/psychiatristDetails`` | Psychiatrist details management |``POST /createPsychDetails``,`` GET /getPsychiatristDetails``, `` PUT /updatePsychiatristDetails``|
| ``/api/messages`` | Messaging operations | ``GET /retrievemessages/:id``, ``GET /retrieveUserChatPartners``, ``GET /getAllPsychiatrist``|
| ``/api/studentSession`` | Student session management |  ``GET /getStudentFutureSessions``, ``GET /getStudentPastSessions``, ``GET /getAllSessions``|

---

## 🔮 Roadmap & Upcoming Features

- **Admin Dashboard** - Comprehensive user & session management
- **Reporting System** - Analytics & insights for counseling staff
- **Video Integration** - Zoom/Google Meet API for virtual sessions
- **Dockerization** - Containerized deployment for backend services
- **Mobile App** - React Native version for on-the-go access
- **Resource Library** - Self-help materials & emergency resources

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Please ensure your code follows the existing style and includes appropriate tests.

---

## 📄 License

Distributed under the GNU General Public License v2.0. See `LICENSE` for more information.

---

## 🙏 Acknowledgments

- University counseling departments for their insights
- Open-source community for amazing tools and libraries
- All contributors who help improve student mental health access

---

**Built with care for student well-being** ❤️
