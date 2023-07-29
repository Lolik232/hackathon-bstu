import "bootstrap/dist/css/bootstrap.min.css"

import "./Test/Test.css"
import './App.css';
import {
    CheckableNumeratedListGroup,
    DraggableNumeratedListGroup,
    GetCheckableNumeratedList,
    GetDraggableNumeratedList,
    NumeratedListGroup
} from "./List/List";

import Test from "./Test/Test";
import AppFooter from "./Footer/AppFooter";

function App() {
    return (
        <div>
            <Test name={"First Test"} questions={[]}/>
            <AppFooter/>
        </div>
    );
}

export default App;
