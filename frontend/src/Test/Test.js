import './Test.css';
import '../QuestionBox/QuestionBox.css'
import {GetQuestionBoxContent, QuestionBox} from "../QuestionBox/QuestionBox";
import './Test.css';
import AppFooter from "../Footer/AppFooter";
import React from "react";
import AppHeader from "../Header/AppHeader";


function Test(props) {
    return (
        <>
            <AppHeader/>
            <div className={"Test"}>
                <TestMain name={props.name} questions={props.questions} className={"content"}/>
            </div>
            <AppFooter/>
        </>
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
    const handleOnChanged = (answer) => {
        console.log(JSON.stringify(answer))
    }

    return (
        <div className="TestQuestionList">
            <QuestionBox content={GetQuestionBoxContent(0, "Сколько?",
                ["Много", "Мало", "Гоголев"],
                1, 1, 123)}
                         onChanged={handleOnChanged}/>
            <QuestionBox content={GetQuestionBoxContent(1, "Сколько?",
                ["Много", "Мало", "Гоголев"],
                0, 5, 124)}
                         onChanged={handleOnChanged}/>
            <QuestionBox content={GetQuestionBoxContent(2, "Сколько?",
                ["Много", "Мало", "Гоголев"],
                2, 23, 214)}
                         onChanged={handleOnChanged}/>
            <QuestionBox content={GetQuestionBoxContent(5, "Как?",
                [],
                1, 23, 12412)}
                         onChanged={handleOnChanged}/>
            <QuestionBox content={GetQuestionBoxContent(4, "Вы кто такие? ",
                [],
                2, 345, 123124)}
                         onChanged={handleOnChanged}/>
            <QuestionBox content={GetQuestionBoxContent(3, "Где?", {
                staticList: ["Саня", "Степа", "Гоголев"],
                draggableList: ["Сколько?", "Фурри", "Танки"]
            }, 1, 5, 1244)}
                         onChanged={handleOnChanged}/>
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
        <div className={"Content"}>
            <TestName name={props.name}/>
            <TestQuestionList questions={props.questions}/>
        </div>
    )
}


export default Test;

