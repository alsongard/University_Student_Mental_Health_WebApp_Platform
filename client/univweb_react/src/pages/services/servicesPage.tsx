import React, { useState } from 'react';
import { Heart, Brain, Users, AlertCircle, Moon, Coffee, BookOpen, UserCheck, Pill, HeartHandshake, Lightbulb, GraduationCap, Clock, CheckCircle, Phone } from 'lucide-react';
export default function ServicesPage()
{
    const [activeService, setActiveService] = useState(null);
    const services = [
        {
            icon: <BookOpen className="w-10 h-10" />,
            title: "Academic Stress & Performance Anxiety",
            description: "Support for exam anxiety, presentation fears, assignment overwhelm, and academic pressure",
            details: [
                "Stress management techniques for exam periods",
                "Coping strategies for academic pressure",
                "Time management and organizational skills",
                "Performance anxiety reduction techniques",
                "Study-life balance counseling"
            ],
            color: "blue"
        },
        {
            icon: <Brain className="w-10 h-10" />,
            title: "Depression and Mood Disorders",
            description: "Professional treatment for persistent sadness, loss of interest, and mood-related challenges",
            details: [
                "Clinical assessment and diagnosis",
                "Evidence-based therapeutic interventions",
                "Medication management when appropriate",
                "Regular monitoring and support",
                "Relapse prevention strategies"
            ],
            color: "purple"
        },
        {
            icon: <Users className="w-10 h-10" />,
            title: "Relationship Issues",
            description: "Counseling for roommate conflicts, family tensions, and romantic relationship challenges",
            details: [
                "Roommate conflict resolution",
                "Family communication improvement",
                "Romantic relationship counseling",
                "Friendship and social dynamics",
                "Boundary-setting skills"
            ],
            color: "pink"
        },
        {
            icon: <AlertCircle className="w-10 h-10" />,
            title: "Anxiety Disorders",
            description: "Treatment for social anxiety, generalized anxiety, panic attacks, and test anxiety",
            details: [
                "Cognitive-behavioral therapy (CBT)",
                "Exposure therapy for specific fears",
                "Relaxation and breathing techniques",
                "Social skills development",
                "Medication evaluation if needed"
            ],
            color: "yellow"
        },
        {
            icon: <Pill className="w-10 h-10" />,
            title: "Substance Abuse Counseling",
            description: "Confidential support for alcohol and drug-related concerns",
            details: [
                "Non-judgmental assessment",
                "Harm reduction strategies",
                "Addiction treatment referrals",
                "Relapse prevention planning",
                "Support group connections"
            ],
            color: "red"
        },
        {
            icon: <HeartHandshake className="w-10 h-10" />,
            title: "Crisis Intervention",
            description: "Immediate support for mental health emergencies and acute distress",
            details: [
                "24/7 crisis line availability",
                "Same-day emergency appointments",
                "Safety planning and assessment",
                "Hospital referrals when necessary",
                "Follow-up care coordination"
            ],
            color: "orange"
        },
        {
            icon: <Heart className="w-10 h-10" />,
            title: "Grief and Loss Counseling",
            description: "Compassionate support through bereavement and significant loss",
            details: [
                "Processing grief and loss",
                "Coping with death of loved ones",
                "Academic adjustment support",
                "Meaning-making and healing",
                "Long-term grief management"
            ],
            color: "gray"
        },
        {
            icon: <Lightbulb className="w-10 h-10" />,
            title: "Identity and Personal Development",
            description: "Exploration of self-identity, values, purpose, and personal growth",
            details: [
                "Self-discovery and exploration",
                "Values clarification",
                "Career and life purpose counseling",
                "LGBTQ+ affirming support",
                "Cultural identity exploration"
            ],
            color: "indigo"
        },
        {
            icon: <Moon className="w-10 h-10" />,
            title: "Sleep Disorders",
            description: "Treatment for insomnia, irregular sleep patterns, and sleep-related issues",
            details: [
                "Sleep hygiene education",
                "Cognitive-behavioral therapy for insomnia",
                "Circadian rhythm management",
                "Stress-related sleep issues",
                "Sleep medication consultation"
            ],
            color: "sky"
        },
        {
            icon: <Coffee className="w-10 h-10" />,
            title: "Eating Disorders",
            description: "Specialized care for disordered eating patterns and body image concerns",
            details: [
                "Assessment and diagnosis",
                "Nutritional counseling referrals",
                "Body image therapy",
                "Family involvement when helpful",
                "Long-term recovery support"
            ],
            color: "green"
        },
        {
            icon: <GraduationCap className="w-10 h-10" />,
            title: "ADHD and Learning Challenges",
            description: "Support for attention difficulties, executive function, and learning strategies",
            details: [
                "ADHD screening and assessment",
                "Medication management",
                "Academic accommodation support",
                "Study skills and organization",
                "Time management strategies"
            ],
            color: "teal"
        },
        {
            icon: <UserCheck className="w-10 h-10" />,
            title: "General Counseling & Wellness",
            description: "Overall mental wellness support and preventative care",
            details: [
                "Stress management",
                "Life transitions support",
                "Self-care strategies",
                "Mental health education",
                "Preventative counseling"
            ],
            color: "cyan"
        }
    ];

    const serviceTypes = [
        {
        title: "Individual Therapy",
        description: "One-on-one sessions with a qualified psychiatrist or psychologist",
        duration: "50-minute sessions",
        icon: <UserCheck className="w-8 h-8" />
        },
        {
        title: "Group Therapy",
        description: "Therapeutic groups focused on specific issues with peer support",
        duration: "90-minute sessions",
        icon: <Users className="w-8 h-8" />
        },
        {
        title: "Crisis Support",
        description: "Immediate intervention for mental health emergencies",
        duration: "As needed",
        icon: <AlertCircle className="w-8 h-8" />
        },
        {
        title: "Medication Management",
        description: "Psychiatric evaluation and medication monitoring",
        duration: "30-minute appointments",
        icon: <Pill className="w-8 h-8" />
        }
    ];

  const getColorClasses = (color:any)=>
    {
        const colors = {
            blue: "bg-blue-100 text-blue-600 hover:bg-blue-200",
            purple: "bg-purple-100 text-purple-600 hover:bg-purple-200",
            pink: "bg-pink-100 text-pink-600 hover:bg-pink-200",
            yellow: "bg-yellow-100 text-yellow-600 hover:bg-yellow-200",
            red: "bg-red-100 text-red-600 hover:bg-red-200",
            orange: "bg-orange-100 text-orange-600 hover:bg-orange-200",
            gray: "bg-gray-100 text-gray-600 hover:bg-gray-200",
            indigo: "bg-indigo-100 text-indigo-600 hover:bg-indigo-200",
            sky: "bg-sky-100 text-sky-600 hover:bg-sky-200",
            green: "bg-green-100 text-green-600 hover:bg-green-200",
            teal: "bg-teal-100 text-teal-600 hover:bg-teal-200",
            cyan: "bg-cyan-100 text-cyan-600 hover:bg-cyan-200"
        };
        return colors[color] || colors.blue;
    };

    return (
        <div className="min-h-screen bg-white">


            {/* Hero Section */}
            <section className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h1 className="text-5xl font-bold mb-6">Our Services</h1>
                <p className="text-xl text-blue-100 max-w-3xl mx-auto">
                Comprehensive mental health support tailored to the unique needs of Zetech University students
                </p>
            </div>
            </section>

            {/* Introduction */}
            <section className="py-16 bg-blue-50">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <p className="text-lg text-gray-700 leading-relaxed">
                At MindBridge, we understand that university life brings diverse challenges. Our experienced 
                team of psychiatrists and psychologists provides specialized treatment for the issues most 
                commonly faced by students. All services are confidential, professional, and designed with 
                your academic success and personal wellbeing in mind.
                </p>
            </div>
            </section>

            {/* Treatment Areas */}
            <section className="py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">Treatment Areas</h2>
                <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
                We provide specialized support for a wide range of mental health concerns common among university students
                </p>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {services.map((service, index) => (
                    <div 
                    key={index}
                    className="bg-white rounded-xl shadow-md hover:shadow-xl transition cursor-pointer overflow-hidden"
                    onClick={() => setActiveService(activeService === index ? null : index)}
                    >
                    <div className="p-6">
                        <div className={`inline-flex items-center justify-center w-16 h-16 rounded-lg mb-4 ${getColorClasses(service.color)}`}>
                        {service.icon}
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                        <p className="text-gray-600 mb-4">{service.description}</p>
                        
                        {activeService === index && (
                        <div className="mt-4 pt-4 border-t border-gray-200">
                            <p className="font-semibold text-gray-900 mb-2">What we offer:</p>
                            <ul className="space-y-2">
                            {service.details.map((detail, idx) => (
                                <li key={idx} className="flex items-start space-x-2 text-sm text-gray-700">
                                <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                                <span>{detail}</span>
                                </li>
                            ))}
                            </ul>
                        </div>
                        )}
                        
                        <button className="mt-4 text-blue-600 font-semibold text-sm hover:text-blue-700">
                        {activeService === index ? 'Show less' : 'Learn more →'}
                        </button>
                    </div>
                    </div>
                ))}
                </div>
            </div>
            </section>

            {/* Service Types */}
            <section className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">Types of Services</h2>
                <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
                We offer multiple formats to meet your individual needs and preferences
                </p>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {serviceTypes.map((type, index) => (
                    <div key={index} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 text-blue-600 rounded-lg mb-4">
                        {type.icon}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{type.title}</h3>
                    <p className="text-gray-600 mb-3">{type.description}</p>
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <Clock className="w-4 h-4" />
                        <span>{type.duration}</span>
                    </div>
                    </div>
                ))}
                </div>
            </div>
            </section>

            {/* How It Works */}
            <section className="py-16">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">How to Access Our Services</h2>
                
                <div className="space-y-8">
                <div className="flex items-start space-x-6">
                    <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
                    1
                    </div>
                    <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Create Your Account</h3>
                    <p className="text-gray-600">Sign up using your Zetech University email. All enrolled students have access to our services.</p>
                    </div>
                </div>

                <div className="flex items-start space-x-6">
                    <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
                    2
                    </div>
                    <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Complete Initial Assessment</h3>
                    <p className="text-gray-600">Fill out a brief questionnaire to help us understand your needs and match you with the right professional.</p>
                    </div>
                </div>

                <div className="flex items-start space-x-6">
                    <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
                    3
                    </div>
                    <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Book Your Appointment</h3>
                    <p className="text-gray-600">Choose from available time slots that work with your class schedule. Online and in-person options available.</p>
                    </div>
                </div>

                <div className="flex items-start space-x-6">
                    <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
                    4
                    </div>
                    <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Attend Your Session</h3>
                    <p className="text-gray-600">Meet with your psychiatrist in a safe, confidential space. Your treatment plan will be tailored to your specific needs.</p>
                    </div>
                </div>
                </div>
            </div>
            </section>

            {/* FAQ Section */}
            <section className="py-16 bg-blue-50">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Frequently Asked Questions</h2>
                
                <div className="space-y-6">
                <div className="bg-white p-6 rounded-xl shadow-md">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Are these services really free for students?</h3>
                    <p className="text-gray-600">Yes! All enrolled Zetech University students have access to counseling and psychiatric services at no cost as part of your student health services.</p>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-md">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">How confidential are the sessions?</h3>
                    <p className="text-gray-600">Completely confidential. Your sessions are protected by medical privacy laws. Information is only shared with your explicit consent, except in cases of imminent danger to yourself or others.</p>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-md">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">What if I need urgent help?</h3>
                    <p className="text-gray-600">Call our 24/7 crisis line at +254 700 000 000 for immediate support. We also offer same-day emergency appointments for urgent situations.</p>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-md">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Can I choose my psychiatrist?</h3>
                    <p className="text-gray-600">Yes! You can view profiles of our team members and select the professional you feel most comfortable with.</p>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-md">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">How long does treatment typically last?</h3>
                    <p className="text-gray-600">This varies by individual needs. Some students benefit from just a few sessions, while others continue throughout their university career. Your psychiatrist will work with you to determine the best approach.</p>
                </div>
                </div>
            </div>
            </section>

            {/* Emergency Contact */}
            <section className="py-16 bg-red-600 text-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <AlertCircle className="w-16 h-16 mx-auto mb-6" />
                <h2 className="text-3xl font-bold mb-4">In a Mental Health Crisis?</h2>
                <p className="text-xl text-red-100 mb-8">
                If you're experiencing thoughts of self-harm or suicide, please reach out immediately
                </p>
                <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
                <a href="tel:+254700000000" className="px-8 py-4 bg-white text-red-600 font-bold rounded-lg hover:bg-red-50 transition shadow-xl flex items-center space-x-2">
                    <Phone className="w-5 h-5" />
                    <span>Call Crisis Line: +254 700 000 000</span>
                </a>
                <button className="px-8 py-4 bg-red-700 text-white font-bold rounded-lg hover:bg-red-800 transition border-2 border-white">
                    Request Emergency Appointment
                </button>
                </div>
                <p className="mt-6 text-red-100">Available 24/7 - You don't have to face this alone</p>
            </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-700">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-3xl font-bold text-white mb-6">
                Ready to Get Started?
                </h2>
                <p className="text-xl text-blue-100 mb-8">
                Take the first step toward better mental health today
                </p>
                <button className="px-10 py-4 bg-white text-blue-600 font-bold rounded-lg hover:bg-gray-100 transition shadow-xl text-lg">
                Book Your First Appointment
                </button>
            </div>
            </section>
        </div>
  );
}