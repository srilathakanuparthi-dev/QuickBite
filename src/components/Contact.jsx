
import './Contact.css';

function Contact() {
  return (
    <section className="contact-section">
      <div className="contact-heading">
        <p className="contact-subtitle">GET IN TOUCH</p>
        <h1>We'd Love to Hear From You</h1>
        <p>
          Have a question or suggestion? Get in touch with
          the QuickBite team. We're happy to hear from you!
        </p>
      </div>

      <div className="contact-container">
        <div className="contact-info">
          <h2>Let's Talk</h2>
          <p>
            Whether you have feedback or need help,
            feel free to reach out.
          </p>

          <div className="contact-item">
            <span>📧</span>
            <div>
              <h3>Email Us</h3>
              <p>support@quickbite.example</p>
            </div>
          </div>

          <div className="contact-item">
            <span>🕒</span>
            <div>
              <h3>Availability</h3>
              <p>We're here to hear your feedback.</p>
            </div>
          </div>
        </div>

        <form
          className="contact-form"
          onSubmit={(e) => {
            e.preventDefault();
            alert('Thank you for contacting QuickBite!');
            e.target.reset();
          }}
        >
          <label htmlFor="contact-name">Your Name</label>
          <input
            id="contact-name"
            type="text"
            placeholder="Enter your name"
            required
          />

          <label htmlFor="contact-email">Email Address</label>
          <input
            id="contact-email"
            type="email"
            placeholder="Enter your email"
            required
          />

          <label htmlFor="contact-message">Your Message</label>
          <textarea
            id="contact-message"
            placeholder="Write your message..."
            rows="5"
            required
          />

          <button type="submit">Send Message →</button>
        </form>
      </div>
    </section>
  );
}

export default Contact;
