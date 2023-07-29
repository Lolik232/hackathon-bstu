import "bootstrap/dist/css/bootstrap.min.css"

import './App.css';
import {
    CheckableNumeratedListGroup,
    DraggableNumeratedListGroup,
    GetCheckableNumeratedList,
    GetDraggableNumeratedList,
    NumeratedListGroup
} from "./List/List";

import Test from "./Test/Test";
import TestFooter from "./Footer/Footer";

function App() {
    return (
        <div>
            <Test name={"First Test"} questions={[]}/>
            <TestFooter/>
        </div>
    );
}

export default App;
