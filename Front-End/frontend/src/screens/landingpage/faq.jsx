import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import Link if you're using React Router

const FAQComponent = () => {
    const navigate = useNavigate()
    return (
        <div>
            <nav className="bg-green-500 p-4 flex justify-between items-center">
                <a href="/" className="text-white text-xl font-bold flex items-center">
                    <span className="font-semibold text-lg">eWaste</span>
                </a>
                <ul className="flex justify-between items-center">
                    <li className="mx-4">
                        <Link to="/" className="text-white">Home</Link>
                    </li>
                    <li className="mx-4">
                        <Link to="/faq" className="text-white">FAQ</Link>
                    </li>
                    <li className="mx-4">
                        <button
                            onClick={() => {
                                navigate("/login")
                            }} className="btn btn-ghost">Sign In
                        </button>
                    </li>
                </ul>
            </nav>

            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="px-4 py-6 sm:px-0">
                    <div className="max-w-3xl mx-auto">
                        <h1 className="text-3xl font-bold mb-4">FAQ SECTION</h1>
                        <p className="text-lg mb-8">Find answers to commonly asked questions</p>
                        <h3 className="text-xl font-bold mb-4">Jump to a question:</h3>
                        <ul className="mb-8">
                            <li><a href="#question2" className="text-blue-500 hover:underline">Why should I use the
                                eWaste Hub?</a></li>
                            <li><a href="#question3" className="text-blue-500 hover:underline">How does the data
                                retrieval process work?</a></li>
                            <li><a href="#question4" className="text-blue-500 hover:underline">Can I trust the data
                                wiping process?</a></li>
                            <li><a href="#question5" className="text-blue-500 hover:underline">What happens to devices
                                marked as 'Recycle'?</a></li>
                            <li><a href="#question6" className="text-blue-500 hover:underline">How are 'Current' devices
                                valued?</a></li>
                            <li><a href="#question7" className="text-blue-500 hover:underline">What if my device is
                                'Rare' or 'Unknown'?</a></li>
                            <li><a href="#question8" className="text-blue-500 hover:underline">How can I track the
                                processing of my device?</a></li>
                            <li><a href="#question9" className="text-blue-500 hover:underline">How are payments
                                processed for data transfer services?</a></li>
                        </ul>
                        <div className="faq-content">
                            <h2 id="question2" className="text-2xl font-bold mb-2">Why should I use the eWaste Hub?</h2>
                            <p className="mb-6">The eWaste Hub provides a convenient and ethical solution for recycling
                                and selling your electronic devices. We focus on data security, local recycling, and
                                responsible device reuse.</p>

                            <h2 id="question3" className="text-2xl font-bold mb-2">How does the data retrieval process
                                work?</h2>
                            <p className="mb-6">For a fee, we offer data retrieval services for your devices. Once
                                accepted, our team securely retrieves your data, hosts it in the cloud, and provides you
                                with a secure link for download.</p>

                            <h2 id="question4" className="text-2xl font-bold mb-2">Can I trust the data wiping
                                process?</h2>
                            <p className="mb-6">Absolutely. We partner with reputable third parties for secure data
                                wiping. Your privacy and security are our top priorities.</p>

                            <h2 id="question5" className="text-2xl font-bold mb-2">What happens to devices marked as
                                'Recycle'?</h2>
                            <p className="mb-6">'Recycle' devices undergo ethical recycling, ensuring responsible
                                disposal of electronic waste. Data retrieval and wiping services are available at a fee
                                for these devices.</p>

                            <h2 id="question6" className="text-2xl font-bold mb-2">How are 'Current' devices
                                valued?</h2>
                            <p className="mb-6">'Current' devices have listings for expected value from third parties
                                like CeX. We provide QR codes for bonus vouchers, simplifying the process for you and
                                potentially earning referral fees.</p>

                            <h2 id="question7" className="text-2xl font-bold mb-2">What if my device is 'Rare' or
                                'Unknown'?</h2>
                            <p className="mb-6">'Rare' and 'Unknown' devices are handled similarly to 'Current' devices.
                                Our team will work with you to update the database and explore appropriate third-party
                                options.</p>

                            <h2 id="question8" className="text-2xl font-bold mb-2">How can I track the processing of my
                                device?</h2>
                            <p className="mb-6">You can track the status of your device in your account dashboard.
                                Updates include received, transferring, wiping, and dispatch to the recycling party.</p>

                            <h2 id="question9" className="text-2xl font-bold mb-2">How are payments processed for data
                                transfer services?</h2>
                            <p className="mb-6">Payments for data transfer services are securely processed through
                                PayPal and Stripe (sandbox only) for your convenience and peace of mind.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FAQComponent;
