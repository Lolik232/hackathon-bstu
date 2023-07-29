import './Test.css';
import '../QuestionBox/QuestionBox.css'
import {GetQuestionBoxContent, QuestionBox} from "../QuestionBox/QuestionBox";
import './Test.css';
import TestFooter from "../Footer/Footer";
import React from "react";


function Test(props) {
    return (
        <div className={"Test"}>
            <TestMain name={props.name} questions={props.questions} className={"content"}/>
        </div>
    )
}


function TestName({name}) {
    return (
        <div className={"TestName"}>
            <h2>{name}</h2>
        </div>
    )
}

function TestQuestionList() {
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
        <div>
            <TestName name={props.name}/>
            <TestQuestionList questions={props.questions}/>
        </div>
    )
}


export default Test;

