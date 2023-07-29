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
import AppHeader from "./Header/AppHeader";

function App() {
    return (
        <div>
            <AppHeader/>
            <Test questions={[]}/>
            <TestFooter/>
        </div>
    );
}

export default App;
