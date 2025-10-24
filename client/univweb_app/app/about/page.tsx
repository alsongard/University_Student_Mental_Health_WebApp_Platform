'use client'
import React, { useState, useEffect } from 'react';
import { Heart, Shield, Clock, Users, ArrowRight, CheckCircle } from 'lucide-react';

export default function LandingPage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    {
      image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1200&h=600&fit=crop",
      alt: "Diverse students studying together"
    },
    {
      image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=1200&h=600&fit=crop",
      alt: "Students in university campus"
    },
    {
      image: "https://images.unsplash.com/photo-1543269865-cbf427effbad?w=1200&h=600&fit=crop",
      alt: "Students collaborating"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const stats = [
    { number: "1 in 3", text: "students experience mental health challenges" },
    { number: "75%", text: "of mental health issues begin before age 24" },
    { number: "80%", text: "of students feel overwhelmed by responsibilities" }
  ];

  const features = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Complete Confidentiality",
      description: "Your privacy is our priority. All sessions are completely confidential and secure."
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Flexible Scheduling",
      description: "Book appointments that fit your academic schedule with easy online booking."
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Professional Support",
      description: "Connect with qualified university psychiatrists who understand student life."
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Student-Centered Care",
      description: "Tailored mental health support designed specifically for university students."
    }
  ];

  const benefits = [
    "Free or subsidized sessions for enrolled students",
    "No referral needed - direct access to care",
    "Crisis support available",
    "Individual and group therapy options",
    "Academic accommodation support when needed"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Heart className="w-8 h-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">MindBridge</span>
          </div>
          <div className="flex space-x-4">
            <button className="px-6 py-2 text-blue-600 font-semibold hover:text-blue-700 transition">
              Login
            </button>
            <button className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition shadow-md">
              Sign Up
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section with Slideshow */}
      <section className="relative h-[600px] overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={slide.image}
              alt={slide.alt}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-blue-900/40" />
          </div>
        ))}
        
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Your Mental Health<br />Matters
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-2xl">
              Connect with professional university psychiatrists who understand your journey. 
              Confidential, accessible, and designed for students.
            </p>
            <div className="flex space-x-4">
              <button className="px-8 py-4 bg-white text-blue-600 font-bold rounded-lg hover:bg-gray-100 transition shadow-xl flex items-center space-x-2">
                <span>Get Started</span>
                <ArrowRight className="w-5 h-5" />
              </button>
              <button className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition">
                Learn More
              </button>
            </div>
          </div>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition ${
                index === currentSlide ? 'bg-white' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Why Mental Health Support Matters
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center p-6 bg-blue-50 rounded-xl">
                <div className="text-5xl font-bold text-blue-600 mb-4">{stat.number}</div>
                <p className="text-gray-700 text-lg">{stat.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            How MindBridge Supports You
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition">
                <div className="text-blue-600 mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Student Benefits & Services
              </h2>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <p className="text-gray-700 text-lg">{benefit}</p>
                  </div>
                ))}
              </div>
              <button className="mt-8 px-8 py-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition shadow-md">
                Create Your Account
              </button>
            </div>
            <div className="bg-gradient-to-br from-blue-100 to-blue-50 p-8 rounded-2xl">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Getting Started is Easy</h3>
              <ol className="space-y-4">
                <li className="flex items-start space-x-3">
                  <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">1</span>
                  <p className="text-gray-700 pt-1">Create your free student account</p>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">2</span>
                  <p className="text-gray-700 pt-1">Browse available psychiatrists and time slots</p>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">3</span>
                  <p className="text-gray-700 pt-1">Book your first appointment</p>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Take the First Step Towards Better Mental Health
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of students who have found support through MindBridge
          </p>
          <button className="px-10 py-4 bg-white text-blue-600 font-bold rounded-lg hover:bg-gray-100 transition shadow-xl text-lg">
            Sign Up Now - It's Free
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Heart className="w-6 h-6" />
                <span className="text-xl font-bold">MindBridge</span>
              </div>
              <p className="text-gray-400">Connecting students with mental health support</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition">About Us</a></li>
                <li><a href="#" className="hover:text-white transition">Services</a></li>
                <li><a href="#" className="hover:text-white transition">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Resources</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition">Crisis Support</a></li>
                <li><a href="#" className="hover:text-white transition">Mental Health Tips</a></li>
                <li><a href="#" className="hover:text-white transition">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Emergency</h4>
              <p className="text-gray-400 mb-2">If you're in crisis:</p>
              <p className="text-white font-bold">Call 988 (Suicide & Crisis Lifeline)</p>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 MindBridge. All rights reserved. | Privacy Policy | Terms of Service</p>
          </div>
        </div>
      </footer>
    </div>
  );
}