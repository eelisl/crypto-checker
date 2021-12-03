import React from 'react'
import "./Contact.css"

//Contact-info

export default function Contact() {
    return (
        <div className="contact-wrapper">
            <div className="contact-container title">
                <div className="contact-module">
                    <h1>Thank you for using my Crypto Checker!</h1>
                    <p>This app was made as a preliminary assignment for job application.</p>
                    <p>Total development time with the app - 12 hours</p>
                </div>
            </div>
            <div className="contact-container">
                <div className="contact-module">
                    <h2>Contact info:</h2>
                    <p>Eelis Loikkanen</p>
                    <tel>040 76 000 99</tel>
                    <p>eelis@eelisloikkanen.fi</p>
                    <div className="button-row">
                        <a href="https://linkedin.com/in/eelisloikkanen" rel="noreferrer" target="_blank"><p>LinkedIn</p></a>
                        <a href="https://github.com/b4thinking" rel="noreferrer" target="_blank"><p>Github</p></a>
                    </div>
                    <div className="button-row">
                        <a className="back-button" href="/"><p>Back to App</p></a>
                    </div>
                </div>
            </div>
        </div>
    )
}
