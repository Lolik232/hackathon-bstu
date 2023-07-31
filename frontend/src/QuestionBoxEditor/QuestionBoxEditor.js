import './../App.css';
import AppHeader from "../Header/AppHeader";
import AppFooter from "../Footer/AppFooter";
import {EditableQuestionBox, EditableQuestionBoxWrapper} from "../QuestionBox/EditableQuestionBox";
import Button from "react-bootstrap/Button";
import {Container} from "react-bootstrap";
import React from "react";
import {makeRef} from "../List/List";
import Form from "react-bootstrap/Form";

export const QuestionBoxEditor = () => {

    const question = EditableQuestionBoxWrapper();
    return (<div>
        <AppHeader/>
        <div className={"Content"}>
            {question.body}
            <Container className={"mt-5 mb-5"}>
                <Button onClick={() => {
                    const ref = question.dataRef.ref;
                    console.log(JSON.stringify({
                        type: ref.type,
                        difficulty: ref.difficulty,
                        cost: ref.cost,
                        question: ref.question,
                        annotation: ref.annotation,
                        answerList: ref.answerListRef.ref.map(item => item.value.props.inValueRef.ref),
                        indexList: ref.answerListRef.ref.map(item => item.index),
                        correctIndexList: ref.answerListRef.ref.filter(item => item.checked).map(item => item.index)
                    }))
                }} className={"w-100"}>Подтвердить</Button>
            </Container>
        </div>
        <AppFooter/>
    </div>)
}