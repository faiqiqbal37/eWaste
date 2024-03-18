import {ComponentPreview, Previews} from '@react-buddy/ide-toolbox'
import {PaletteTree} from './palette'
import Login from "../screens/login/login";
import App from "../App";
import Registration from "../screens/registration/registration";
import {Drawer} from "../components/drawer";
import Navbar from "../components/navbar";
import UserProfile from "../screens/profile/profile";
import LandingPage from "../screens/landingpage/landingpage";
import FAQ from "../screens/faq/FAQ";

const ComponentPreviews = () => {
    return (
        <Previews palette={<PaletteTree/>}>
            <ComponentPreview path="/Login">
                <Login/>
            </ComponentPreview>
            <ComponentPreview path="/App">
                <App/>
            </ComponentPreview>
            <ComponentPreview path="/Registration">
                <Registration/>
            </ComponentPreview>
            <ComponentPreview path="/Drawer">
                <Drawer/>
            </ComponentPreview>
            <ComponentPreview path="/Navbar">
                <Navbar/>
            </ComponentPreview>
            <ComponentPreview path="/UserProfile">
                <UserProfile/>
            </ComponentPreview>
            <ComponentPreview path="/LandingPage">
                <LandingPage/>
            </ComponentPreview>
            <ComponentPreview path="/FAQ">
                <FAQ/>
            </ComponentPreview>
        </Previews>
    )
}

export default ComponentPreviews