interface PersonalInfo {
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

interface SecuritySettings {
    currentPassword: string,
    newPassword: string,
    confirmNewPassword: string,
}

interface NotificationPreferences {
    emailNotification: boolean,
    smsNotification: boolean,
    appointMentReminders: boolean,
    newBookingAlerts: boolean,
    newFeedBackNotification: boolean
}

interface PsychiatristData {
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