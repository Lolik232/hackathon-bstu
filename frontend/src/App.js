import "bootstrap/dist/css/bootstrap.min.css"

import './App.css';
import Test from "./Test";
import {QuestionBox} from "./QuestionBox";
import {GetQuestionBoxContent} from "./QuestionBox";

function App() {
    return (
        <>
            <Test name={"First Test"} questions={[]}/>
            <QuestionBox content={GetQuestionBoxContent(2, "Самый крутой вопрос в мире от самое длинной письки в мире", ["my dick is big", "oh, myy", "afdsasd"], 0, 2, '3123')}/>
            <QuestionBox content={GetQuestionBoxContent(1, "Самый крутой вопрос в мире от самое длинной письки в мире", ["my dick is big", "oh, myy"], 1, 1, 'йцуйцу')}/>
            <QuestionBox content={GetQuestionBoxContent(0, "Самый крутой вопрос в мире от самое длинной письки в мире", ["my dick is big", "oh, myy"], 2, 5, 'йуцйцуй')}/>
        </>
    );
}

export default App;
