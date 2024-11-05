import React, { useState } from "react";
import { User, Phone, Mail, FileText, MessageSquare, CheckSquare } from "lucide-react";
import img from "../../assets/melinda-gimpel-5Ne6mMQtIdo-unsplash (3).jpg";

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    subject: "",
    message: "",
    notARobot: false,
  });

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Data:", formData);
  };

  return (
    <div className="contact-us bg-gray-100 text-gray-800">
      <img src={img} alt="contact" className="w-full h-96 object-cover" />
      <h1 className="text-4xl font-bold text-center mt-10 text-black">Contact Us</h1>

      <div className="flex flex-col lg:flex-row gap-10 px-8 lg:px-32 py-10">
        {/* Contact Form */}
        <div className="flex-1 bg-white p-8 rounded-lg shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
              <div className="relative">
                <label htmlFor="email" className="block font-semibold mb-1">Email:</label>
                <div className="flex items-center">
                  <Mail className="absolute left-3 text-gray-400" />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>
             
            </div>

            <div className="relative">
              <label htmlFor="message" className="block font-semibold mb-1">Message:</label>
              <div className="flex items-start">
                <MessageSquare className="absolute left-3 top-10 text-gray-400" />
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  rows={5}
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <CheckSquare className="text-blue-500" />
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

            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg transition"
            >
              Submit
            </button>
          </form>
        </div>

        {/* Embedded Google Map */}
        <div className="map-container flex-1">
          <iframe
            title="Google Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.8696803425675!2d144.95605421552427!3d-37.8172091797516!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0x5045675218ceed11!2sMelbourne%20VIC%2C%20Australia!5e0!3m2!1sen!2s!4v1617946844145!5m2!1sen!2s"
            width="100%"
            height="100%"
            className="w-full h-80 rounded-lg shadow-lg"
            allowFullScreen={false}
            loading="lazy"
          ></iframe>
        </div>
      </div>

      {/* Contact Information */}
      <div className="flex flex-col md:flex-row gap-8 px-8 lg:px-32 py-10">
        <div className="flex-1 bg-white p-8 rounded-lg shadow-lg space-y-4">
          <h2 className="text-xl font-bold text-gray-700">Atlantic Grease & Lubricant FZC</h2>
          <p>Hamriyah Freezone, P.O.BOX 41583, Sharjah, United Arab Emirates</p>
          <p>Tel: +971-(06)-5264688</p>
          <p>Fax: +971-(06)-5264699</p>
          <p>Email: info@atlanticlubes.com</p>
        </div>
        <div className="flex-1 bg-white p-8 rounded-lg shadow-lg space-y-4">
          <h2 className="text-xl font-bold text-gray-700">Atlantic Grease & Lubricant LLC</h2>
          <p>Ajman Industrial Area 2, P.O.BOX 9057, Ajman, United Arab Emirates</p>
          <p>Tel: +971-(06)-7481704</p>
          <p>Fax: +971-(06)-7481805</p>
          <p>Email: info@atlanticlubes.com</p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
