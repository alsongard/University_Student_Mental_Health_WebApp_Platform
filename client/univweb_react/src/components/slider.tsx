import { useEffect, useState } from "react"
import clsx from "clsx";
import { Heart, Shield, Clock, Users, ArrowRight, CheckCircle } from 'lucide-react';

function PractiseSlider()
{
    const slides = [
        {
            image: "/myImages/univ_background_photo1.jpeg",
            alt: "Diverse students studying together"
        },
        {
            image: "/myImages/univ_background_photo3.jpeg",
            alt: "Students collaborating"
        }
    ];

    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(()=>{
        const timer = setInterval(()=>{
            setCurrentSlide((prevValue)=>{return (prevValue + 1) % slides.length});
        },5000);
        return ()=>{clearTimeout(timer)};
    }, [])


    return (
        <section className="w-[100%] mt-[100px] h-[600px] mx-auto relative  border-green-300 border-3  h-[600px]">
            {
                slides.map((slideImage, index)=>{
                    return (
                        <div className={clsx(currentSlide === index ? "opacity-100": "opacity-0", "absolute top-0 left-0  absolute inset-0 transition-opacity duration-1000  border-red-300 border-2 h-full w-full")} key={index}>
                            <img src={slideImage.image}  alt={slideImage.alt} />  
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-blue-900/40" />

                        </div>
                    )
                })
            }
        </section>
    )
}

export default function Slider()
{
     const slides = [
        {
            image: "/myImages/univ_background_photo1.jpeg",
            alt: "Diverse students studying together"
        },
        {
            image: "/myImages/univ_background_photo3.jpeg",
            alt: "Students collaborating"
        }
    ];
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(()=>{
        const timer = setInterval(()=>{
            setCurrentSlide((prevValue)=>{return (prevValue + 1) % slides.length});
        },5000);
        return ()=>{clearTimeout(timer)};
    }, [])
    return (
        // Hero Section with Slideshow 
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

    )
}