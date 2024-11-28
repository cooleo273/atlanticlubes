import React, { useState } from "react";
import { User, Phone, Mail, MessageSquare, CheckSquare } from "lucide-react";
import emailjs from '@emailjs/browser'; // Import emailjs library
import img from "../../assets/melinda-gimpel-5Ne6mMQtIdo-unsplash (3).jpg";
import { Cobe } from "../../components/ui/globe";


const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    companyName: "",
    name: "",
    phone: "",
    email: "",
    message: "",
    notARobot: false,
  });

  // Handle form input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const { checked } = e.target as HTMLInputElement;
      setFormData((prevState) => ({
        ...prevState,
        [name]: checked,
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.notARobot) {
      const templateParams = {
        companyName: formData.companyName,
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        message: formData.message,
      };

      // Send email using EmailJS with send method (not sendForm)
      emailjs
        .send(
          "service_hq3atgl",        // Service ID
          "template_rnybs0b",        // Template ID
          templateParams,            // Parameters (mapped to your email template)
          "XKdjkHjDhXBnjODka"       // Your EmailJS user ID
        )
        .then(
          (response) => {
            console.log("Email sent successfully:", response);
            alert("Your message has been sent successfully!");
          },
          (error) => {
            console.log("Failed to send email:", error);
            alert("There was an issue sending your message. Please try again.");
          }
        );
    } else {
      alert("Please confirm you are not a robot.");
    }
  };

  return (
    <div className="contact-us text-gray-800">


      <div className="flex flex-col lg:flex-row gap-10 px-8 lg:px-10 py-4">
        {/* Contact Form */}
        <div className="flex-1 bg-white p-8 rounded-lg shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-3">
            {/* Company Name */}
            <div className="relative">
              <label htmlFor="companyName" className="block font-semibold mb-1">Company Name:</label>
              <input
                type="text"
                id="companyName"
                name="companyName"
                value={formData.companyName}
                onChange={handleInputChange}
                required
                className="w-full p-1 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* Name */}
            <div className="relative">
              <label htmlFor="name" className="block font-semibold mb-1">Your Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full p-1 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* Phone */}
            <div className="relative">
              <label htmlFor="phone" className="block font-semibold mb-1">Phone Number:</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
                className="w-full p-1 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* Email */}
            <div className="relative">
              <label htmlFor="email" className="block font-semibold mb-1">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full p-1 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* Message */}
            <div className="relative">
              <label htmlFor="message" className="block font-semibold mb-1">Message:</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                rows={1}
              />
            </div>

            {/* CAPTCHA */}
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="notARobot"
                checked={formData.notARobot}
                onChange={handleInputChange}
                required
                className="h-5 w-5 text-blue-500 focus:ring-blue-500"
              />
              <label className="font-semibold">I am not a robot</label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg transition"
            >
              Send Message
            </button>
          </form>
          
        </div>

       <div className="flex justify-center items-start flex-1">
        <Cobe/>
       </div>
        


       
      </div>
    </div>
  );
};

export default Contact;
