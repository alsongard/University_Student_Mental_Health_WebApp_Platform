export interface PersonalInfo {
    fullName:string,
    email: string,
    phoneNumber: string,
    officeLocation: string,
    biography: string
}

interface ProfessionalDetails {
    specialization: string,
    education: string,
    language: Array<string>,
    licenseNumber: string,
    yearsOfExperience: string,
    consultationDays: string,
    consulationHours:string,
}

export interface SecuritySettings {
    currentPassword: string,
    newPassword: string,
    confirmNewPassword: string,
}

export interface NotificationPreferences {
    emailNotification: boolean,
    smsNotification: boolean,
    appointMentReminders: boolean,
    newBookingAlerts: boolean,
    newFeedBackNotification: boolean
}

export interface PsychiatristData {
    psychiatristId: string,
    psychiatristName: string,
    psychiatristEmail: string,
    image: string,
    psychiatristPassword: string,
    psychiatristImageUrl: string,
    //: string,
    specialization: string,
    licenseNumber: string,
    yearsOfExperience: number,
    phoneNumber: string,
    officeLocation: string,
    education: string,
    bio: string,
    consultationDays: Array<string>,
    consultationHours: string,
    languages: string,
}

export interface SingleSession {
    fullName:string, 
    date:string,
    startTime:string,
    endTime:string,
    sessionDuration:string,
    sessionType:string,
    sessionMode:string,
    maxBookings:number,
    sessionStatus:string,
}


export interface AllSessionData {
    currentBookings: number,
    _id: string,
    psychiatristId: string,
    date: string,
    startTime: string,
    endTime: string,
    sessionType: string,
    sessionStatus: string,
    sessionMode: string,
    sessionDuration: string,
    maxBookings: number,
    fullName: string,
    specialization: string,
}

export interface StudentProfile {
    name: string,
    admissionNumber: string,
    email: string,
    avatar: string,
    phoneNumber: string,
    course: string,
    image: string,
    yearOfStudy: string,
    address: string,
    emergencyContactName: string,
    emergencyContactPhoneNumber: string,
    emergencyContactRelation: string,
}

export interface PsychiatristBookedSession {
    _id: string,
    sessionId : {
        _id: string,
        date: string,
        startTime: string,
        endTime: string,
        sessionType: string,
        sessionStatus: string,
        sessionMode: string,
        sessionDuration: string,
    },
    studentId: {
        _id: string,
        studentAdmissionNum: string,
        email: string,
    },
    psychiatristId: string,
    status: string,
    createdAt: string,
    updatedAt: string
}

export interface RefreshViews {
    overview: number,
    sessions: number,
    messages: number,
    feedback: number,
    profile: number  
}