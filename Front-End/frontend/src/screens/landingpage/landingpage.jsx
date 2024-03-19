import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const LandingPage = () => {
    const navigate = useNavigate();

    return (
        <>
            {/* Navbar Section */}
            <nav className="bg-green-500 p-4 flex justify-between items-center">
                <a href="/" className="text-white text-xl font-bold flex items-center">
                    <span className="w-8 h-8 bg-white rounded-full mr-2"></span>
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

            {/* Hero Section */}
            <div className="bg-green-500 p-8">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                <div className="text-white">
                        <h1 className="text-4xl font-bold">eWaste Hub : Recycle Smart</h1>
                        <p className="mt-4 text-lg">Unlock the potential in your eWaste! Recycle or sell your old devices with eWaste Hub – maximizing value, ensuring security, and promoting sustainable tech practices.</p>
                    </div>
                    <div className="hidden md:block">
                        <img id="main__img" src="../landingpage/ewaste2.jpg" alt="eWaste Hub" className="h-72" />
                    </div>
                </div>
            </div>

            {/* Mission Section */}
            <section className="bg-gray-100 py-12">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl font-semibold mb-6">Mission</h2>
                    <p className="text-lg">Empowering a sustainable future, our mission at eWaste is to revolutionize the lifecycle of electronic devices. We aim to inspire responsible consumption by providing a seamless platform for recycling and selling unused gadgets. Through cutting-edge technology and a commitment to data security, we strive to maximize the value of eWaste, promote environmental stewardship, and contribute to a greener, smarter world.</p>
                </div>
            </section>

            {/* Services Section */}
            <div className="bg-gray-100 py-12">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Environmental Preservation */}
                    <div className="bg-white rounded-lg p-6 shadow-md">
                        <h2 className="text-2xl font-semibold mb-4">Environmental Preservation</h2>
                        <p>Recycle or sell your electronic devices with us to help preserve the environment. By doing so, you contribute to reducing eWaste, minimizing pollution, and conserving valuable resources.</p>
                    </div>

                    {/* Maximize Device Lifespan */}
                    <div className="bg-white rounded-lg p-6 shadow-md">
                        <h2 className="text-2xl font-semibold mb-4">Maximize Device Lifespan</h2>
                        <p>Make your devices count! Recycling or selling through our platform ensures extended use, minimizing electronic waste and promoting resource conservation.</p>
                    </div>

                    {/* Data Security Assurance */}
                    <div className="bg-white rounded-lg p-6 shadow-md">
                        <h2 className="text-2xl font-semibold mb-4">Data Security Assurance</h2>
                        <p>Protect your sensitive information. Our platform guarantees secure data erasure and disposal, ensuring your privacy and peace of mind.</p>
                    </div>
                </div>
            </div>

            {/* Footer Section */}
            <div className="bg-gray-800 text-white py-8">
                <div className="max-w-7xl mx-auto">
                    <p className="text-center">Contact Us: <a href="mailto:ewaste@gmail.com">ewaste@gmail.com</a> | Sheffield, UK | 01099898989</p>
                </div>
            </div>
        </>
    );
};

export default LandingPage;
