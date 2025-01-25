import React, { useState } from "react";
import emailjs from "@emailjs/browser"; // Import emailjs library
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

  const [loading, setLoading] = useState(false); // State to manage loading
  const [success, setSuccess] = useState(false); // State to manage success message
  const [error, setError] = useState<string | null>(null); // State to manage error message

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
      setLoading(true); // Set loading to true when form is submitted
      setSuccess(false); // Reset success message
      setError(null); // Reset error message

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
          "service_hq3atgl", // Service ID
          "template_rnybs0b", // Template ID
          templateParams, // Parameters (mapped to your email template)
          "XKdjkHjDhXBnjODka" // Your EmailJS user ID
        )
        .then(
          (response) => {
            console.log("Email sent successfully:", response);
            setSuccess(true); // Set success to true when email is sent
            setFormData({
              companyName: "",
              name: "",
              phone: "",
              email: "",
              message: "",
              notARobot: false,
            }); // Clear form after successful submission
            setLoading(false); // Set loading to false when email is sent
          },
          (error) => {
            console.log("Failed to send email:", error);
            setError("There was an issue sending your message. Please try again.");
            setLoading(false); // Set loading to false on error
          }
        );
    } else {
      alert("Please confirm you are not a robot.");
    }
  };

  return (
    <div className="contact-us bg-gray-200 min-h-screen flex justify-center items-center px-4 py-12">
      <div className="w-full flex space-x-12">
        {/* Form Section */}
        <div className="flex-1">
          <div className="bg-white p-6 rounded-lg shadow-2xl space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-[#F57F27]">Get in Touch</h2>
              <p className="mt-2 text-md text-gray-600">
                We're here to help! Please fill out the form below and we'll
                get back to you as soon as possible.
              </p>
            </div>

            {/* Success and Error Messages */}
            {success && (
              <div className="text-center text-green-600 font-semibold">
                Your message has been sent successfully!
              </div>
            )}
            {error && (
              <div className="text-center text-red-600 font-semibold">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Company Name */}
              <div>
                <input
                  type="text"
                  id="companyName"
                  placeholder="Company Name"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  style={{fontSize: "0.9rem"}}
                  
                  required
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F57F27] transition-shadow"
                />
              </div>

              {/* Name */}
              <div>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  style={{fontSize: "0.9rem"}}
                  required
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F57F27] transition-shadow"
                />
              </div>

              {/* Phone */}
              <div>
                <input
                  type="tel"
                  id="phone"
                  placeholder="Phone Number"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  style={{fontSize: "0.9rem"}}
                  required
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F57F27] transition-shadow"
                />
              </div>

              {/* Email */}
              <div>
                <input
                  type="email"
                  placeholder="Email Address"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  style={{fontSize: "0.9rem"}}
                  required
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F57F27] transition-shadow"
                />
              </div>

              {/* Message */}
              <div>
                <textarea
                  id="message"
                  placeholder="Your Message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F57F27] transition-shadow"
                  style={{fontSize: "0.9rem"}}
                  rows={2}
                />
              </div>

              {/* CAPTCHA */}
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  name="notARobot"
                  checked={formData.notARobot}
                  onChange={handleInputChange}
                  required
                  className="h-5 w-5 text-[#EF353B] focus:ring-[#EF353B]"
                />
                <label className="text-sm text-gray-600">
                  I am not a robot
                </label>
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  disabled={loading} // Disable button if loading
                  className={`w-full p-3 text-white bg-[#F57F27] rounded-lg font-semibold transition-all hover:bg-[#EF353B] ${
                    loading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  {loading ? (
                    <div className="animate-spin h-5 w-5 border-4 border-t-4 border-white rounded-full"></div>
                  ) : (
                    "Send Message"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Cobe Section */}
        <div className="flex-1 max-w-lg">
          <Cobe />
        </div>
      </div>
    </div>
  );
};

export default Contact;
