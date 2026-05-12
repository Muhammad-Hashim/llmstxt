export default function Contact() {
    return (
        <div className="page">
            <h1>Contact Us</h1>
            <p className="subtitle">We'd love to hear from you</p>

            <div className="contact-container">
                <section className="contact-info">
                    <h2>Get In Touch</h2>
                    <div className="info-item">
                        <h3>Email</h3>
                        <p><a href="mailto:hello@example.com">hello@example.com</a></p>
                    </div>
                    <div className="info-item">
                        <h3>Social Media</h3>
                        <p>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a> ·
                            <a href="https://github.com" target="_blank" rel="noopener noreferrer">GitHub</a> ·
                            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                        </p>
                    </div>
                    <div className="info-item">
                        <h3>Office</h3>
                        <p>123 Developer Lane<br />San Francisco, CA 94105</p>
                    </div>
                </section>

                <section className="contact-form">
                    <h2>Send Us a Message</h2>
                    <form>
                        <div className="form-group">
                            <label>Name</label>
                            <input type="text" placeholder="Your name" />
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input type="email" placeholder="your@email.com" />
                        </div>
                        <div className="form-group">
                            <label>Subject</label>
                            <input type="text" placeholder="What is this about?" />
                        </div>
                        <div className="form-group">
                            <label>Message</label>
                            <textarea placeholder="Tell us more..." rows={5}></textarea>
                        </div>
                        <button type="submit" className="btn btn-primary">Send Message</button>
                    </form>
                </section>
            </div>
        </div>
    )
}
