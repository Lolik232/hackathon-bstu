import "bootstrap/dist/css/bootstrap.min.css"
import "./QuestionBox.css"

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

function App() {
    const list = GetDraggableNumeratedList(["das", "dasd", "ccsdf"])
    return (
        <div>
           <DraggableNumeratedListGroup list={GetDraggableNumeratedList(["das", "dasd", "ccsdf"])}/>
           <DraggableNumeratedListGroup list={GetDraggableNumeratedList(["das", "dasd", "ccsdf"])}/>
        </div>
    )
            {/*<Test name={"First Test"} questions={[]}/>*/}
            {/*<QuestionBox content={GetQuestionBoxContent(2, "Самый крутой вопрос в мире от самое длинной письки в мире", ["my dick is big", "oh, myy", "oh, myy"], 0, 2, '3123')}/>*/}
            {/*<QuestionBox content={GetQuestionBoxContent(1, "Самый крутой вопрос в мире от самое длинной письки в мире", ["my dick is big", "oh, myy"], 1, 1, 'йцуйцу')}/>*/}
            {/*<QuestionBox content={GetQuestionBoxContent(0, "Самый крутой вопрос в мире от самое длинной письки в мире", ["my dick is big", "oh, myy"], 2, 5, 'йуцйцуй')}/>*/}
}

export default App;
