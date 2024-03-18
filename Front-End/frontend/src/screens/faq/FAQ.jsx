// faq.jsx
import React from 'react';

const FAQ = () => {
    return (
        <div className="faq-page">
            <h1>Frequently Asked Questions</h1>
            <p>Jump to a question:</p>

            <ul>
                <li>
                    <a href="question1">Why should I use the eWaste Hub?</a>
                </li>
                <li>
                    <a href="question2">How does the data retrieval process work?</a>
                </li>
                {/* Add more questions here */}
            </ul>

            <div id="question1">
                <h2>Why should I use the eWaste Hub?</h2>
                <p>
                    The eWaste Hub provides a convenient and ethical solution for recycling and selling your electronic
                    devices. We focus on data security, local recycling, and responsible device reuse.
                </p>
            </div>

            <div id="question2">
                <h2>How does the data retrieval process work?</h2>
                <p>
                    For a fee, we offer data retrieval services for your devices. Once accepted, our team securely retrieves
                    your data, hosts it in the cloud, and provides you with a secure link for download.
                </p>
            </div>

            {/* Add more questions and answers here */}
        </div>
    );
};

export default FAQ;
