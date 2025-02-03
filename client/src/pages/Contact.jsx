import React, { useState } from 'react';
import { FiMail, FiPhone, FiMapPin, FiSend } from 'react-icons/fi';
import { toast } from 'react-hot-toast';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.name || !formData.email || !formData.subject || !formData.message) {
            toast.error('Please fill all fields');
            return;
        }
        try {
            setLoading(true);
            // Here you would typically make an API call to send the message
            await new Promise(resolve => setTimeout(resolve, 1000)); // Simulating API call
            toast.success('Message sent successfully! We will get back to you soon.');
            setFormData({
                name: '',
                email: '',
                subject: '',
                message: ''
            });
        } catch (error) {
            toast.error('Failed to send message. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const contactInfo = [
        {
            icon: <FiMail className="w-6 h-6" />,
            title: 'Email',
            value: 'support@kidtouter.com',
            link: 'mailto:support@kidtouter.com'
        },
        {
            icon: <FiPhone className="w-6 h-6" />,
            title: 'Phone',
            value: '+1 (555) 123-4567',
            link: 'tel:+15551234567'
        },
        {
            icon: <FiMapPin className="w-6 h-6" />,
            title: 'Address',
            value: '123 Education Street, Learning City, ED 12345',
            link: 'https://maps.google.com'
        }
    ];

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent mb-4">
                    Get in Touch
                </h1>
                <p className="text-gray-600 max-w-2xl mx-auto">
                    Have questions about our platform? Want to partner with us? We'd love to hear from you.
                    Send us a message and we'll respond as soon as possible.
                </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
                {contactInfo.map((info, index) => (
                    <a
                        key={index}
                        href={info.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                    >
                        <div className="flex items-center space-x-4">
                            <div className="p-3 bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-lg shadow-md group-hover:scale-110 transition-transform duration-300">
                                {info.icon}
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-800 mb-1">{info.title}</h3>
                                <p className="text-gray-600">{info.value}</p>
                            </div>
                        </div>
                    </a>
                ))}
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
                <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300"
                            placeholder="Your name"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300"
                            placeholder="your@email.com"
                        />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                        <input
                            type="text"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300"
                            placeholder="What's this about?"
                        />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                        <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            rows="6"
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 resize-none"
                            placeholder="Your message..."
                        />
                    </div>
                    <div className="md:col-span-2 flex justify-end">
                        <button
                            type="submit"
                            disabled={loading}
                            className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-medium rounded-xl shadow-lg hover:shadow-orange-200 transform hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                                    Sending...
                                </>
                            ) : (
                                <>
                                    <FiSend className="mr-2" />
                                    Send Message
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>

            <div className="mt-12 rounded-2xl overflow-hidden shadow-xl">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.1!2d-73.98!3d40.75!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zM40zMCcwMC4wIk4gNzPCsDU4JzQ4LjAiVw!5e0!3m2!1sen!2sus!4v1234567890"
                    width="100%"
                    height="400"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="map"
                />
            </div>
        </div>
    );
};

export default Contact;
