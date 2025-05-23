import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { fadeIn, slideUp, socialIconAnimation, inputAnimation } from '../utils/animations';
import emailjs from '@emailjs/browser';

// Use "as any" to work around TypeScript errors with motion components
const MotionDiv = motion.div as any;
const MotionH2 = motion.h2 as any;
const MotionP = motion.p as any;
const MotionA = motion.a as any;
const MotionForm = motion.form as any;
const MotionInput = motion.input as any;
const MotionTextarea = motion.textarea as any;
const MotionButton = motion.button as any;

// EmailJS configuration
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

const Contact: React.FC = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  const [focusedInput, setFocusedInput] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFocus = (inputName: string) => {
    setFocusedInput(inputName);
  };

  const handleBlur = () => {
    setFocusedInput(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const result = await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        formRef.current as HTMLFormElement,
        EMAILJS_PUBLIC_KEY
      );

      if (result.text === 'OK') {
        setSubmitStatus({
          success: true,
          message: 'Message sent successfully! I\'ll get back to you soon.'
        });
        setFormData({ name: '', email: '', message: '' });
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      console.error('Error sending email:', error);
      setSubmitStatus({
        success: false,
        message: 'Failed to send message. Please try again later or contact me directly at tirthraval27@gmail.com'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="min-h-screen flex items-center justify-center py-20">
      <MotionDiv 
        className="max-w-4xl mx-auto px-4"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeIn}
      >
        <MotionH2 
          className="text-4xl font-bold mb-8 text-center font-playfair"
          variants={slideUp}
        >
          Get In Touch
        </MotionH2>
        <MotionP 
          className="text-center mb-12 max-w-lg mx-auto backdrop-blur-sm font-inter"
          variants={slideUp}
        >
          Have a question or want to work together? Feel free to reach out!
        </MotionP>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <MotionDiv 
            className="bg-white/10 dark:bg-gray-800/10 p-6 rounded-lg backdrop-blur-sm text-white"
            variants={slideUp}
            custom={1}
          >
            <h3 className="text-xl font-bold mb-4 font-playfair">Contact Information</h3>
            <div className="space-y-4">
              <MotionP 
                className="flex items-center"
                whileHover={{ x: 5 }}
              >
                <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                </svg>
                <MotionA 
                  href="mailto:tirthraval27@gmail.com" 
                  className="hover:underline font-inter"
                  whileHover={{ scale: 1.02 }}
                >
                  tirthraval27@gmail.com
                </MotionA>
              </MotionP>
              <MotionP 
                className="flex items-center"
                whileHover={{ x: 5 }}
              >
                <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path>
                </svg>
                <span className="font-inter">+91 8735092881</span>
              </MotionP>
              <MotionP 
                className="flex items-center"
                whileHover={{ x: 5 }}
              >
                <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path>
                </svg>
                <span className="font-inter">Mehsana, Gujarat, India</span>
              </MotionP>
            </div>
            
            <div className="mt-8">
              <h3 className="text-xl font-bold mb-4 font-playfair">Follow Me</h3>
              <div className="flex space-x-4">
                {[1, 2, 3, 4].map((i) => (
                  <MotionA 
                    key={i}
                    href={i === 3 ? "https://github.com/Tir25" : "#"} 
                    className="text-gray-300 hover:text-blue-300 dark:text-gray-300 dark:hover:text-blue-300"
                    variants={socialIconAnimation}
                    initial="initial"
                    whileHover="hover"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      {i === 1 && (
                        <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"></path>
                      )}
                      {i === 2 && (
                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                      )}
                      {i === 3 && (
                        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"></path>
                      )}
                      {i === 4 && (
                        <path fillRule="evenodd" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z" clipRule="evenodd"></path>
                      )}
                    </svg>
                  </MotionA>
                ))}
              </div>
            </div>
          </MotionDiv>
          
          <MotionForm
            ref={formRef}
            onSubmit={handleSubmit} 
            className="bg-white/10 dark:bg-gray-800/10 p-6 rounded-lg shadow-md backdrop-blur-sm"
            variants={slideUp}
            custom={2}
          >
            {submitStatus && (
              <MotionDiv 
                className={`mb-4 p-3 rounded-md ${submitStatus.success ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'}`}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {submitStatus.message}
              </MotionDiv>
            )}
            
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium mb-2 font-inter">Name</label>
              <MotionInput
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                onFocus={() => handleFocus('name')}
                onBlur={handleBlur}
                className="w-full px-3 py-2 border border-gray-300/30 dark:border-gray-600/30 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800/30 bg-white/10 font-inter"
                required
                animate={focusedInput === 'name' ? 'focus' : 'initial'}
                variants={inputAnimation}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium mb-2 font-inter">Email</label>
              <MotionInput
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onFocus={() => handleFocus('email')}
                onBlur={handleBlur}
                className="w-full px-3 py-2 border border-gray-300/30 dark:border-gray-600/30 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800/30 bg-white/10 font-inter"
                required
                animate={focusedInput === 'email' ? 'focus' : 'initial'}
                variants={inputAnimation}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="message" className="block text-sm font-medium mb-2 font-inter">Message</label>
              <MotionTextarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                onFocus={() => handleFocus('message')}
                onBlur={handleBlur}
                rows={5}
                className="w-full px-3 py-2 border border-gray-300/30 dark:border-gray-600/30 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800/30 bg-white/10 font-inter"
                required
                animate={focusedInput === 'message' ? 'focus' : 'initial'}
                variants={inputAnimation}
              />
            </div>
            <MotionButton
              type="submit"
              className="w-full bg-blue-600/80 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 font-inter"
              whileHover={{ scale: 1.02, backgroundColor: 'rgba(37, 99, 235, 0.9)' }}
              whileTap={{ scale: 0.98 }}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </MotionButton>
          </MotionForm>
        </div>
      </MotionDiv>
    </section>
  );
};

export default Contact; 