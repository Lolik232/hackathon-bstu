import "bootstrap/dist/css/bootstrap.min.css"

import './App.css';
// import Test from "./Test";
// import {QuestionBox} from "./QuestionBox";
// import {GetQuestionBoxContent} from "./QuestionBox";
import {
    CheckableNumeratedListGroup,
    DraggableNumeratedListGroup,
    GetCheckableNumeratedList,
    GetDraggableNumeratedList,
    NumeratedListGroup
} from "./List";

import Test from "./Test";
import TestFooter from "./Footer";
function App() {
    return (
        <>
            <Test name={"First Test"} questions={[]}/>
            <TestFooter></TestFooter>
        </>
    );
}

export default App;
