import './Test.css';
import '../QuestionBox/QuestionBox.css'
import {GetQuestionBoxContent, QuestionBox} from "../QuestionBox/QuestionBox";
import './Test.css';
import AppFooter from "../Footer/AppFooter";
import React from "react";
import {createNumeratedList, CreateObject, makeCheckable, makeIndexed, makeRef} from "../List/List";


function Test(props) {
    return (
        <TestMain name={props.name} questions={props.questions}/>
    )
}

function TestHeader() {
    return (
        <header className="TestHeader">
        </header>
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
            {/*<QuestionBox content={GetQuestionBoxContent(0, "Сколько?", ["Много", "Мало", "Гоголев"], 1, 1, 123)}/>*/}
            {/*<QuestionBox content={GetQuestionBoxContent(1, "Сколько?", ["Много", "Мало", "Гоголев"], 0, 5, 124)}/>*/}
            {/*<QuestionBox content={GetQuestionBoxContent(2, "Сколько?", ["Много", "Мало", "Гоголев"], 2, 23, 214)}/>*/}
            <QuestionBox content={GetQuestionBoxContent(3, "Где?", {
                staticList: ["Саня", "Степа", "Гоголев"],
                draggableList: ["Сколько?", "Фурри", "Танки"]
            }, 1, 5, 1244)} onChanged={(answer)=>{
                console.log(JSON.stringify(answer))
            }}/>
            {/*<QuestionBox content={GetQuestionBoxContent(3, "Где?", {*/}
            {/*    staticList: ["Саня", "Степа", "Гоголев"],*/}
            {/*    draggableList: ["Сколько?", "Фурри", "Танки"]*/}
            {/*}, 2, 5, 1244)}/>*/}
            {/*<QuestionBox content={GetQuestionBoxContent(3, "Где?", {*/}
            {/*    staticList: ["Саня", "Степа", "Гоголев"],*/}
            {/*    draggableList: ["Сколько?", "Фурри", "Танки"]*/}
            {/*}, 0, 5, 1244)}/>*/}
            {/*{listObj.value.map((obj) => <p>{obj.value} {obj.index}</p>)}*/}
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

