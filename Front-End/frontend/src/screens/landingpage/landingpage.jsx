// landingpage.jsx
import React from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import { Routes} from 'react-router-dom';
import './landingpage.css';
import FAQ from "../faq/FAQ";

const LandingPage = () => {
    return (
        <Router>
            <div className="landing-page">
                <nav>
                    <Link to="/">
                        <img src="logo.jpg" alt="Logo" className="logo" />
                    </Link>
                    <Link to="/" className="nav-button">
                        eWaste
                    </Link>
                    <Link to="/faq" className="nav-button">
                        FAQs
                    </Link>
                </nav>

                <Route path="/" element={<FAQ />} />
                    <Route path="/">
                        {/* Landing Page Content */}
                        <section className="landing-section">
                            <img src="ewaste2.jpg" alt="Landing Image" className="landing-image" />
                            <div className="landing-text">
                                <h1>eWaste Hub: Recycle Smart</h1>
                                <p>
                                    Unlock the potential in your eWaste! Recycle or sell your old devices with eWaste Hub – maximizing
                                    value, ensuring security, and promoting sustainable tech practices.
                                </p>
                            </div>
                        </section>
                        <section className="mission-section">
                            <h2>Mission</h2>
                            <p>
                                Empowering a sustainable future, our mission at eWaste is to revolutionize the lifecycle of electronic
                                devices. We aim to inspire responsible consumption by providing a seamless platform for recycling and
                                selling unused gadgets. Through cutting-edge technology and a commitment to data security, we strive to
                                maximize the value of eWaste, promote environmental stewardship, and contribute to a greener, smarter world.
                            </p>
                        </section>
                        <section className="features-section">
                            <div className="feature">
                                <img src="ewaste3.jpg" alt="Environmental Preservation" />
                                <p>
                                    Recycle or sell your electronic devices with us to help preserve the environment. By doing so, you
                                    contribute to reducing eWaste, minimizing pollution, and conserving valuable resources.
                                </p>
                            </div>
                            <div className="feature">
                                <img src="ewaste4.png" alt="Maximize Device Lifespan" />
                                <p>
                                    Make your devices count! Recycling or selling through our platform ensures extended use, minimizing
                                    electronic waste and promoting resource conservation.
                                </p>
                            </div>
                        </section>
                        <footer>
                            <p>ewaste@gmail.com | Sheffield, UK | 01099898989</p>
                        </footer>
                    </Route>

            </div>
        </Router>
    );
};

export default LandingPage;
