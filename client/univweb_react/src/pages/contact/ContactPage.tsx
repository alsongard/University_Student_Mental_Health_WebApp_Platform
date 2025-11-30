import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, AlertCircle, MessageSquare, Send, CheckCircle, Calendar, Navigation } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    urgent: false
  });
  const [submitted, setSubmitted] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);

//   const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  const handleSubmit = (event:any) => {
    event.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  const handleChange = (e:any) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const officeHours = [
    { day: "Monday - Friday", time: "8:00 AM - 5:00 PM", available: "Walk-ins & Appointments" },
    { day: "Saturday", time: "9:00 AM - 1:00 PM", available: "Appointments Only" },
    { day: "Sunday", time: "Closed", available: "Emergency Line Available" },
    { day: "24/7 Crisis Line", time: "Always Available", available: "+254 700 000 000" }
  ];

  const contactMethods = [
    {
      icon: <Phone className="w-8 h-8" />,
      title: "Phone",
      primary: "+254 709 668 000",
      secondary: "Main Office Line",
      details: "Mon-Fri: 8AM-5PM",
      action: "tel:+254709668000"
    },
    {
      icon: <Mail className="w-8 h-8" />,
      title: "Email",
      primary: "mindbridge@zetech.ac.ke",
      secondary: "General Inquiries",
      details: "Response within 24 hours",
      action: "mailto:mindbridge@zetech.ac.ke"
    },
    {
      icon: <MessageSquare className="w-8 h-8" />,
      title: "WhatsApp",
      primary: "+254 712 345 678",
      secondary: "Quick Messages",
      details: "Mon-Fri: 8AM-5PM",
      action: "https://wa.me/254712345678"
    },
    {
      icon: <MapPin className="w-8 h-8" />,
      title: "Visit Us",
      primary: "Student Wellness Center",
      secondary: "Block B, 2nd Floor, Room 201",
      details: "Zetech University Main Campus",
      action: null
    }
  ];

  const crisisResources = [
    {
      name: "MindBridge 24/7 Crisis Line",
      contact: "+254 700 000 000",
      description: "Immediate support for Zetech students in mental health crisis",
      availability: "24/7"
    },
    {
      name: "Kenya National Crisis Helpline",
      contact: "1192 or 0800 221 221",
      description: "Free nationwide mental health support",
      availability: "24/7"
    },
    {
      name: "Befrienders Kenya",
      contact: "+254 722 178 177",
      description: "Emotional support and suicide prevention",
      availability: "24/7"
    },
    {
      name: "Emergency Medical Services",
      contact: "999 or 112",
      description: "For life-threatening emergencies",
      availability: "24/7"
    }
  ];

  const faqs = [
    {
      question: "Is counseling really confidential?",
      answer: "Yes, absolutely. All sessions are protected by medical confidentiality laws. Information is only shared with your written consent, except in rare cases of imminent danger to yourself or others. Your academic records remain completely separate from your mental health records."
    },
    {
      question: "How much do services cost?",
      answer: "All mental health services through MindBridge are completely free for enrolled Zetech University students. This includes individual counseling, group therapy, crisis intervention, and psychiatric medication consultations."
    },
    {
      question: "Do I need a referral?",
      answer: "No referral is needed. Any enrolled Zetech student can access our services directly by creating an account and booking an appointment through our platform or by calling our office."
    },
    {
      question: "How quickly can I get an appointment?",
      answer: "For routine appointments, we typically have availability within 3-5 business days. For urgent situations, we offer same-day appointments. Crisis support is available 24/7 through our emergency line."
    },
    {
      question: "What if I miss my appointment?",
      answer: "Please try to give us at least 24 hours notice if you need to cancel or reschedule. We understand that emergencies happen. You can reschedule through the platform or by calling our office."
    },
    {
      question: "Can I see a specific psychiatrist?",
      answer: "Yes! When booking, you can view profiles of our team members and select the professional you feel most comfortable with. You're also welcome to request a change if the match isn't right."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">Get In Touch</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            We're here to support you. Reach out using any of the methods below or send us a message
          </p>
        </div>
      </section>

      {/* Crisis Alert Banner */}
      <section className="bg-red-600 text-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center space-x-4">
            <AlertCircle className="w-8 h-8 flex-shrink-0" />
            <div className="text-center">
              <p className="font-bold text-lg">In Crisis? Need Immediate Help?</p>
              <p className="text-red-100">Call our 24/7 Crisis Line: <a href="tel:+254700000000" className="underline font-bold hover:text-white">+254 700 000 000</a></p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Contact Methods</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactMethods.map((method, index) => (
              <div key={index} className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-blue-600 hover:shadow-lg transition">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 text-blue-600 rounded-lg mb-4">
                  {method.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{method.title}</h3>
                {method.action ? (
                  <a href={method.action} className="text-blue-600 font-semibold text-lg hover:text-blue-700 block mb-1">
                    {method.primary}
                  </a>
                ) : (
                  <p className="text-gray-900 font-semibold text-lg mb-1">{method.primary}</p>
                )}
                <p className="text-gray-600 text-sm mb-1">{method.secondary}</p>
                <p className="text-gray-500 text-xs">{method.details}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Office Hours */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Send Us a Message</h2>
              
              {submitted ? (
                <div className="bg-green-50 border-2 border-green-500 rounded-lg p-6 text-center">
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Message Sent!</h3>
                  <p className="text-gray-600">We'll get back to you within 24 hours.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                      placeholder="your.email@zetech.ac.ke"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                      placeholder="+254 700 000 000"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Subject *</label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    >
                      <option value="">Select a subject</option>
                      <option value="appointment">Appointment Inquiry</option>
                      <option value="services">Questions About Services</option>
                      <option value="billing">Billing/Insurance</option>
                      <option value="feedback">Feedback</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Message *</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                      placeholder="How can we help you?"
                    />
                  </div>

                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      name="urgent"
                      checked={formData.urgent}
                      onChange={handleChange}
                      id="urgent"
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-600"
                    />
                    <label htmlFor="urgent" className="text-sm text-gray-700">
                      This is urgent (we'll prioritize your message)
                    </label>
                  </div>

                  <button
                    onClick={handleSubmit}
                    className="w-full px-6 py-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition shadow-md flex items-center justify-center space-x-2"
                  >
                    <Send className="w-5 h-5" />
                    <span>Send Message</span>
                  </button>

                  <p className="text-xs text-gray-500 text-center mt-4">
                    * Required fields. We typically respond within 24 hours.
                  </p>
                </div>
              )}
            </div>

            {/* Office Hours */}
            <div>
              <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
                <div className="flex items-center space-x-3 mb-6">
                  <Clock className="w-8 h-8 text-blue-600" />
                  <h2 className="text-2xl font-bold text-gray-900">Office Hours</h2>
                </div>
                
                <div className="space-y-4">
                  {officeHours.map((schedule, index) => (
                    <div key={index} className="flex justify-between items-start pb-4 border-b border-gray-200 last:border-0">
                      <div>
                        <p className="font-semibold text-gray-900">{schedule.day}</p>
                        <p className="text-sm text-gray-600">{schedule.available}</p>
                      </div>
                      <p className="text-blue-600 font-semibold text-right">{schedule.time}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-gray-700">
                    <strong>Note:</strong> Walk-ins are welcome during office hours, but appointments are recommended to minimize wait times.
                  </p>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl shadow-lg p-8 text-white">
                <h3 className="text-xl font-bold mb-4">Need Immediate Assistance?</h3>
                <div className="space-y-3">
                  <a href="tel:+254700000000" className="block w-full px-6 py-3 bg-white text-blue-600 font-bold rounded-lg hover:bg-blue-50 transition text-center">
                    <Phone className="w-5 h-5 inline mr-2" />
                    Call Crisis Line
                  </a>
                  <button className="block w-full px-6 py-3 bg-blue-700 text-white font-bold rounded-lg hover:bg-blue-800 transition border-2 border-white">
                    <Calendar className="w-5 h-5 inline mr-2" />
                    Book Emergency Appointment
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Campus Map */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Find Us on Campus</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              The Student Wellness Center is conveniently located in the heart of Zetech University's main campus
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 items-start">
            {/* Map */}
            <div className="bg-gray-100 rounded-2xl overflow-hidden shadow-lg h-96">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.7947205346595!2d36.89203631475393!3d-1.2990831990643834!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f148d5e441f1d%3A0x3e92c7d09c8c8aa!2sZetech%20University!5e0!3m2!1sen!2ske!4v1234567890123!5m2!1sen!2ske"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                title="Zetech University Location"
              />
            </div>

            {/* Directions */}
            <div className="space-y-6">
              <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
                <div className="flex items-start space-x-4">
                  <MapPin className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">Physical Address</h3>
                    <p className="text-gray-700">Student Wellness Center</p>
                    <p className="text-gray-700">Block B, 2nd Floor, Room 201</p>
                    <p className="text-gray-700">Zetech University</p>
                    <p className="text-gray-700">Ruiru, Kenya</p>
                  </div>
                </div>
              </div>

              <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
                <div className="flex items-start space-x-4">
                  <Navigation className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">How to Find Us</h3>
                    <div className="space-y-2 text-gray-700">
                      <div className="flex items-start space-x-2">
                        <span className="text-blue-600 font-bold">1.</span>
                        <span>Enter the main campus through the front gate</span>
                      </div>
                      <div className="flex items-start space-x-2">
                        <span className="text-blue-600 font-bold">2.</span>
                        <span>Walk straight to Block B (Academic Block)</span>
                      </div>
                      <div className="flex items-start space-x-2">
                        <span className="text-blue-600 font-bold">3.</span>
                        <span>Take the stairs or elevator to the 2nd floor</span>
                      </div>
                      <div className="flex items-start space-x-2">
                        <span className="text-blue-600 font-bold">4.</span>
                        <span>Look for Room 201 - MindBridge signage</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 rounded-xl p-6">
                <p className="text-sm text-gray-700">
                  <strong>Parking:</strong> Visitor parking available near Block B. 
                  <strong className="ml-2">Accessibility:</strong> Elevator access available for wheelchair users.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Crisis Resources */}
      <section className="py-16 bg-red-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <AlertCircle className="w-16 h-16 text-red-600 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Crisis Resources</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              If you or someone you know is in crisis, please reach out immediately. Help is available 24/7.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {crisisResources.map((resource, index) => (
              <div key={index} className="bg-white border-2 border-red-200 rounded-xl p-6 hover:border-red-600 hover:shadow-lg transition">
                <h3 className="font-bold text-gray-900 text-lg mb-2">{resource.name}</h3>
                <a href={`tel:${resource.contact.replace(/\s/g, '')}`} className="text-2xl font-bold text-red-600 hover:text-red-700 block mb-2">
                  {resource.contact}
                </a>
                <p className="text-gray-600 text-sm mb-2">{resource.description}</p>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <Clock className="w-4 h-4" />
                  <span>{resource.availability}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-700 font-semibold">
              Remember: Reaching out for help is a sign of strength, not weakness.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">Frequently Asked Questions</h2>
          <p className="text-center text-gray-600 mb-12">
            Quick answers to common questions about MindBridge services
          </p>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white border-2 border-gray-200 rounded-xl overflow-hidden hover:border-blue-600 transition">
                <button
                  onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                  className="w-full px-6 py-4 text-left flex justify-between items-center"
                >
                  <span className="font-bold text-gray-900">{faq.question}</span>
                  <span className="text-blue-600 text-2xl">{activeFaq === index ? '−' : '+'}</span>
                </button>
                {activeFaq === index && (
                  <div className="px-6 pb-4 text-gray-600">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-600 mb-4">Still have questions?</p>
            <a href="mailto:mindbridge@zetech.ac.ke" className="text-blue-600 font-semibold hover:text-blue-700">
              Email us at mindbridge@zetech.ac.ke
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}