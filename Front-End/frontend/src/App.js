import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes, Link} from 'react-router-dom';
import Login from "./screens/login/login";
import Registration from "./screens/registration/registration";
import LandingPage from "./screens/landingpage/landingpage";
import {CustomerDashboard} from "./screens/customer-portal/customerdashboard/customerDashboard";
import PlaceOrder from "./screens/customer-portal/addorder/placeorder";
import ProfilePage from "./screens/profile/profile";

function App() {
    return (
        <BrowserRouter>
            <div>
                <Routes>
                    <Route path="/registration" element={<Registration />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/customer/customerdashboard" element={<CustomerDashboard />} />
                    <Route path="/customer/profile" element={<ProfilePage />} />
                    <Route path="/customer/placeorder" element={<PlaceOrder/>} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;