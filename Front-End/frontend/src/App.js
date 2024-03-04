import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes, Link} from 'react-router-dom';
import Login from "./screens/login/login";
import Registration from "./screens/registration/registration";

function App() {
    return (
        <BrowserRouter>
            <div>
                <Routes>
                    <Route path="/registration" element={<Registration />} />
                    <Route path="/" element={<Login />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;