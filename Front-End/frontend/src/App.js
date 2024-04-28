import './App.css';
import { BrowserRouter, Route, Routes, useParams, redirect} from 'react-router-dom';
import Login from "./screens/login/login";
import Registration from "./screens/registration/registration";
import LandingPage from "./screens/landingpage/landingpage";
import {CustomerDashboard} from "./screens/customer-portal/customerdashboard/customerDashboard";
import PlaceOrder from "./screens/customer-portal/addorder/placeorder";
import ProfilePage from "./screens/profile/profile";
import EditOrder from "./screens/customer-portal/editorder/editorder";
import AdminStaffPage from "./screens/adminstaffpage/adminstaffpage";
import AdminOrderPage from "./screens/adminorderpage/adminorderpage";
import Sdashboard from "./screens/staffdashboard/sdashboard";
import AdminDashboard from './screens/admindashboard/admindashboard';
import AdminUsers from './screens/adminuserspage/adminusers';
import StaffInfo from "./screens/staffdashboard/staffinfo";
import UserInfo from "./screens/staffdashboard/userinfo";
import {Orders} from "./screens/Order/orders";
import AdminDashboardDrawer from './screens/admindashboard/admindashboarddrawer';
import AdminStaffDrawer from './screens/adminstaffpage/adminstaffdrawer';
import AdminOrderDrawer from './screens/adminorderpage/adminorderdrawer';
import AdminUsersDrawer from './screens/adminuserspage/adminusersdrawer';
import FAQComponent from "./screens/landingpage/faq";
import OrderSuccess from './components/stripeordersuccess';
import GoogleLoginSuccess from './components/googleloginsuccess';
import Forgotpassword from "./screens/forgotpassword/forgotpassword";

function App() {
    return (
        <BrowserRouter>
            <div>
                <Routes>
                    <Route path="/ordersuccess/:orderId/" Component={OrderSuccess}/>
                    <Route path="/googlesuccess/:orderId/" Component={GoogleLoginSuccess}/>
                    <Route path="/sdashboard" element={<Sdashboard/>} />
                    <Route path="/sdashboard/staffinfo" element={<StaffInfo />} />
                    <Route path="/sdashboard/userinfo" element={<UserInfo/>} />
                    <Route path="/registration" element={<Registration />} />
                    <Route path="/forgotpassword" element={<Forgotpassword />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/customer/customerdashboard" element={<CustomerDashboard />} />
                    <Route path="/customer/profile" element={<ProfilePage />} />
                    <Route path="/customer/placeorder" element={<PlaceOrder/>} />
                    <Route path="/customer/editorder" element={<EditOrder/>} />
                    <Route path="/admin/staff" element={<AdminStaffDrawer/>} />
                    <Route path="/admin/orders" element={<AdminOrderDrawer/>} />
                    <Route path="/admin/dashboard" element={<AdminDashboardDrawer />} />
                    <Route path="/admin/users" element={<AdminUsersDrawer />} />
                    <Route path="customer/orders" element={<Orders/>}/>
                    <Route path="/faq" element={<FAQComponent/>}/>

                </Routes>
            </div>
        </BrowserRouter>
    );


}


export default App;