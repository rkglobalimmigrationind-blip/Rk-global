import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const BrochureModal = ({ isOpen, onClose, brochurePath }) => {
  const [formData, setFormData] = useState({
    name: '',
    number: '',
    email: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);
    
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          access_key: '98fdba67-65ea-48a6-b119-1975493472e4',
          subject: 'New Brochure Download Request',
          name: formData.name,
          phone: formData.number,
          email: formData.email,
          brochure_requested: brochurePath || 'General Brochure'
        })
      });
      
      const result = await response.json();
      
      if (result.success) {
        // Trigger download
        if (brochurePath && brochurePath !== '/contact') {
          const link = document.createElement('a');
          link.href = brochurePath;
          link.target = '_blank';
          link.download = brochurePath.split('/').pop();
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }
        
        setIsSuccess(true);
        setTimeout(() => {
          setIsSuccess(false);
          setFormData({ name: '', number: '', email: '' });
          onClose();
        }, 2500);
      } else {
        setSubmitError(result.message || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      setSubmitError('Failed to submit the form. Please check your connection.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-md overflow-hidden rounded-2xl bg-white p-6 md:p-8 shadow-2xl z-10"
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
            >
              <X size={20} />
            </button>

            {isSuccess ? (
              <div className="flex flex-col items-center justify-center py-8 text-center animate-in fade-in zoom-in duration-300">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600">
                  <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-[#0a2769]">Thank you!</h3>
                <p className="mt-2 text-sm text-gray-600">
                  {brochurePath && brochurePath !== '/contact' 
                    ? "Your brochure download has started." 
                    : "We will email you the brochure shortly."}
                </p>
              </div>
            ) : (
              <>
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-[#0a2769]">
                    Download Brochure
                  </h3>
                  <p className="mt-2 text-sm text-gray-600">
                    Please provide your details to access the brochure.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div>
                    <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-gray-700">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-[#C9A84C] focus:outline-none focus:ring-1 focus:ring-[#C9A84C]"
                      placeholder="xyz"
                    />
                  </div>

                  <div>
                    <label htmlFor="number" className="mb-1.5 block text-sm font-medium text-gray-700">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="number"
                      name="number"
                      required
                      value={formData.number}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-[#C9A84C] focus:outline-none focus:ring-1 focus:ring-[#C9A84C]"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-gray-700">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-[#C9A84C] focus:outline-none focus:ring-1 focus:ring-[#C9A84C]"
                      placeholder="xyz@example.com"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="mt-4 w-full rounded-xl bg-[#0a2769] px-4 py-3 text-sm font-bold uppercase tracking-wider text-white shadow-lg transition-all hover:bg-[#153787] hover:shadow-xl active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {isSubmitting ? (
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    ) : null}
                    {isSubmitting ? 'Processing...' : 'Download Now'}
                  </button>
                  
                  {submitError && (
                    <p className="mt-2 text-sm text-red-500 text-center">
                      {submitError}
                    </p>
                  )}
                </form>
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default BrochureModal;
