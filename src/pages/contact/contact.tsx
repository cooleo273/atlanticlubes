import React, { useState } from "react";
import "./index.css"; // Import the CSS for styling
import Card from "../../components/card/card";
import img from "../../assets/melinda-gimpel-5Ne6mMQtIdo-unsplash (3).jpg"

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
    <div className="contact-us">
    <img src={img} alt="contact" style={{height:"30rem", width:"100%", objectFit:"cover"}}/>
      <h1>Contact Us</h1>

      <div className="contact-page">
        <div style={{ flex: 1 }}>
          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-group">
              <div>
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="input-field"
                />
              </div>
              <div>
                <label htmlFor="phone">Phone:</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="input-field"
                />
              </div>
            </div>

            <div className="form-group">
              <div>
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="input-field"
                />
              </div>
              <div>
                <label htmlFor="subject">Subject:</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="input-field"
                />
              </div>
            </div>

            <div className="form-group">
              <div>
                <label htmlFor="message">Message:</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  className="textarea-field"
                />
              </div>
            </div>

            {/* "I am not a robot" checkbox */}
            <div className="form-group checkbox-group">
              <label>
                <input
                  type="checkbox"
                  name="notARobot"
                  checked={formData.notARobot}
                  onChange={handleInputChange}
                  required
                />
                I am not a robot
              </label>
            </div>

            <button type="submit" className="submit-button">
              Submit
            </button>
          </form>
        </div>

        {/* Embedded Google Map */}
        <div className="map-container">
          <iframe
            title="Google Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.8696803425675!2d144.95605421552427!3d-37.8172091797516!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0x5045675218ceed11!2sMelbourne%20VIC%2C%20Australia!5e0!3m2!1sen!2s!4v1617946844145!5m2!1sen!2s"
            width="600"
            height="560"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
          ></iframe>
        </div>
      </div>
      <div style={{ display: "flex", marginLeft: "6rem",marginTop:"3rem", gap: "8rem", justifyContent:"center"}} className="bottom">
        <div>
          <h2>Atlantic Grease & Lubricant FZC</h2>
          <ul>
            <li>
              <p>
                Hamriyah Freezone
                <br /> P.O.BOX 41583, Sharjah
                <br /> United Arab Emirates
              </p>
            </li>
            <li>Tel: +971-(06)-5264688</li>
            <li>Fax: +971-(06)-5264699</li>
            <li>Email: info@atlanticlubes.com</li>
          </ul>
        </div>
        <div>
          <h2>Atlantic Grease & Lubricant LLC</h2>
          <ul>
            <li>
              <p>
                Ajman Industrial Area 2<br />
                P.O.BOX 9057, Ajman
                <br />
                United Arab Emirates
              </p>
            </li>
            <li>Tel: +971-(06)-7481704</li>
            <li>Fax: +971-(06)-7481805</li>
            <li>Email: info@atlanticlubes.com</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Contact;
