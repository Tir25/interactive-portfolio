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
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
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
              <h3 className="text-xl font-bold mb-4 font-playfair">Connect With Me</h3>
              <div className="flex space-x-4">
                {/* GitHub */}
                <MotionA 
                  href="https://github.com/Tir25"
                  className="text-gray-300 hover:text-blue-300 dark:text-gray-300 dark:hover:text-blue-300"
                  variants={socialIconAnimation}
                  initial="initial"
                  whileHover="hover"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"></path>
                  </svg>
                </MotionA>

                {/* LinkedIn */}
                <MotionA 
                  href="https://www.linkedin.com/in/tirth-raval-bbbba3210/"
                  className="text-gray-300 hover:text-[#0077b5] dark:text-gray-300 dark:hover:text-[#0077b5]"
                  variants={socialIconAnimation}
                  initial="initial"
                  whileHover="hover"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </MotionA>

                {/* Instagram */}
                <MotionA 
                  href="https://www.instagram.com/tirthraval27/"
                  className="text-gray-300 hover:text-[#E4405F] dark:text-gray-300 dark:hover:text-[#E4405F]"
                  variants={socialIconAnimation}
                  initial="initial"
                  whileHover="hover"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/>
                  </svg>
                </MotionA>
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