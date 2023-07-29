import "bootstrap/dist/css/bootstrap.min.css"

import './App.css';
import {
    CheckableNumeratedListGroup,
    DraggableNumeratedListGroup,
    GetCheckableNumeratedList,
    GetDraggableNumeratedList,
    NumeratedListGroup
} from "./List/NumeratedList";

import Test from "./Test/Test";
import AppFooter from "./Footer/Footer";

function App() {
    return (
        <div>
            <Test name={"First Test"} questions={[]}/>
            <AppFooter/>
        </div>
    );
}

export default App;
