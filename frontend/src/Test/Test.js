import './Test.css';
import '../QuestionBox/QuestionBox.css'
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import {GetQuestionBoxContent, QuestionBox} from "../QuestionBox/QuestionBox";
import Button from 'react-bootstrap/Button';
import TestFooter from "./Footer";
import './Test.css';


function Test(props) {
    return (

        <body className={"Test"}>
        <article className={"content"} >
                    <TestMain name={props.name} questions={props.questions}/>
        </article>
        <footer ><TestFooter></TestFooter></footer>
        </body>
    )
}

function TestHeader() {
    return (
        <header className="Test_Header">
        </header>
    )
}


function TestName(props) {
    return (
        <div className={"TestName"}>
            <h2>{props.name}</h2>
        </div>
    )
}

function TestQuestionList(props) {
    return (
        <div className="TestQuestionList">
            <QuestionBox content={GetQuestionBoxContent(0, "Сколько?", ["Много", "Мало", "Гоголев"], 1, 1, 123)}/>
            <QuestionBox content={GetQuestionBoxContent(1, "Сколько?", ["Много", "Мало", "Гоголев"], 0, 5, 124)}/>
            <QuestionBox content={GetQuestionBoxContent(2, "Сколько?", ["Много", "Мало", "Гоголев"], 2, 23, 214)}/>
            <QuestionBox content={GetQuestionBoxContent(3, "Где?", [["Саня", "Степа", "Гоголев"], ["Сколько?", "Фурри", "Танки"]], 1, 5, 1244)}/>
        </div>
    )
}

function TestNavigationForm(props) {
    return (
        <div className="TestNavigationForm">
            <button className={"endButton"} type={"submit"}>Завершить тест</button>
        </div>
    )
}

function TestMain(props) {
    return (
        <main>
            <TestName name={props.name}/>
            <TestQuestionList questions={props.questions}/>
        </main>
    )
}


export default Test;

