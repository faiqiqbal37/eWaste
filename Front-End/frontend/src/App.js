import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from "./screens/login/login";

function App() {
    return (
        <BrowserRouter>
            <div>
                <Routes> {/* Change Routes to Route */}
                    <Route path="/" element={<Login />} /> {/* Use element prop instead of component prop */}
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
