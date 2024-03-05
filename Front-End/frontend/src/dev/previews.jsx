import {ComponentPreview, Previews} from '@react-buddy/ide-toolbox'
import {PaletteTree} from './palette'
import Login from "../screens/login/login";
import App from "../App";
import Registration from "../screens/registration/registration";

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
        </Previews>
    )
}

export default ComponentPreviews