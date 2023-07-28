import './App.css';
import Test from "./Test";
import {QuestionBox} from "./QuestionBox";
import {OneAnswerQuestionBox} from "./QuestionBox";

function App() {
    return (
        <>
            <Test name={"First Test"} questions={[]}/>
            <OneAnswerQuestionBox condition={"Крутое условие"} difficulty={"Сложно"} cost={"5"} answers={["Пися", "Попа", "Член"]} hash={123}/>
        </>
    );
}

export default App;
