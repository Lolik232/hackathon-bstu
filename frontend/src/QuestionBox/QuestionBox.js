import React from "react";
import {Badge, Card, Container} from "react-bootstrap";
import {MatchAnswer} from "../Answer/MatchAnswer";
import {makeCheckable, makeRef} from "../List/List";
import {SingleAnswer} from "../Answer/SingleAnswer";
import {MultipleAnswer} from "../Answer/MultipleAnswer";
import {SequenceAnswer} from "../Answer/SequenceAnswer";
import {GetNoun} from "../Utility/Utility";
import {LongAnswer} from "../Answer/LongAnswer";
import {ComplementAnswer} from "../Answer/ComplementAnswer";

export const SingleQuestionBoxWrapper = ({question, annotation, answer, difficulty, cost, hash}) => {
    return QuestionBoxWrapper({
        typeName: "Вопрос с выбором одного ответа",
        question: question,
        annotation: annotation,
        answerBodyCreator: ({answerRef}) => (<SingleAnswer answerRef={answerRef}/>),
        answerRef: makeRef(makeCheckable(answer)),
        difficulty: difficulty,
        cost: cost,
        hash: hash,
        type: 0,
        getBeautifulAnswer: (answerRef) => (answerRef.ref.filter(element => element.checked).map(element => element.index))
    })
}

export const MultipleQuestionBoxWrapper = ({question, annotation, answer, difficulty, cost, hash}) => {
    return QuestionBoxWrapper({
        typeName: "Вопрос с выбором множественного ответа",
        question: question,
        annotation: annotation,
        answerBodyCreator: ({answerRef}) => (<MultipleAnswer answerRef={answerRef}/>),
        answerRef: makeRef(makeCheckable(answer)),
        difficulty: difficulty,
        cost: cost,
        hash: hash,
        type: 1,
        getBeautifulAnswer: (answerRef) => (answerRef.ref.filter(element => element.checked).map(element => element.index))
    })
}

export const SequenceQuestionBoxWrapper = ({question, annotation, answer, difficulty, cost, hash}) => {
    return QuestionBoxWrapper({
        typeName: "Вопрос на установление последовательности",
        question: question,
        annotation: annotation,
        answerBodyCreator: ({answerRef}) => (<SequenceAnswer answerRef={answerRef}/>),
        answerRef: makeRef(answer),
        difficulty: difficulty,
        cost: cost,
        hash: hash,
        type: 2,
        getBeautifulAnswer: (answerRef) => (answerRef.ref.map(element => element.index))
    })
}

export const MatchQuestionBoxWrapper = ({question, annotation, answer, difficulty, cost, hash}) => {
    return QuestionBoxWrapper({
        typeName: "Вопрос на установление соответствия",
        question: question,
        annotation: annotation,
        answerBodyCreator: ({answerRef}) => (
            <MatchAnswer staticRef={answerRef.ref.staticRef} draggableRef={answerRef.ref.draggableRef}/>),
        answerRef: makeRef({
            staticRef: makeRef(answer.static),
            draggableRef: makeRef(answer.draggable),
        }),
        difficulty: difficulty,
        cost: cost,
        hash: hash,
        type: 3,
        getBeautifulAnswer: (answerRef) => (answerRef.ref.draggableRef.ref.map(element => element.index))
    })
}

export const ComplementQuestionBoxWrapper = ({question, annotation, difficulty, cost, hash}) => {
    return QuestionBoxWrapper({
        typeName: "Вопрос с развернутым ответом",
        question: question,
        annotation: annotation,
        answerBodyCreator: ({answerRef}) => (<ComplementAnswer answerRef={answerRef}/>),
        answerRef: makeRef(""),
        difficulty: difficulty,
        cost: cost,
        hash: hash,
        type: 4,
        getBeautifulAnswer: (answerRef) => (answerRef.ref)
    })
}

export const LongQuestionBoxWrapper = ({question, annotation, difficulty, cost, hash}) => {
    return QuestionBoxWrapper({
        typeName: "Вопрос с развернутым ответом",
        question: question,
        annotation: annotation,
        answerBodyCreator: ({answerRef}) => (<LongAnswer answerRef={answerRef}/>),
        answerRef: makeRef(""),
        difficulty: difficulty,
        cost: cost,
        hash: hash,
        type: 5,
        getBeautifulAnswer: (answerRef) => (answerRef.ref)
    })
}

const QuestionBoxWrapper = ({
                                typeName,
                                question,
                                annotation,
                                answerBodyCreator,
                                answerRef,
                                difficulty,
                                cost,
                                hash,
                                type,
                                getBeautifulAnswer
                            }) => {
    return ({
        body: <QuestionBoxBody typeName={typeName}
                               question={question}
                               annotation={annotation}
                               answerBody={answerBodyCreator({answerRef: answerRef})}
                               difficulty={difficulty}
                               cost={cost}/>,
        answerRef: answerRef,
        id: hash,
        type: type,
        getBeautifulAnswer: getBeautifulAnswer
    })
}

const QuestionBoxBody = ({typeName, question, annotation, answerBody, difficulty, cost}) => {
    return (
        <Container className="CardBox">
            <Card>
                <Card.Header>
                    <QuestionBoxBodyHeader typeName={typeName} difficulty={difficulty}/>
                </Card.Header>
                <Card.Body>
                    <QuestionBoxBodyQuestion question={question}/>
                    <QuestionBoxBodyAnnotation annotation={annotation}/>
                    {answerBody}
                </Card.Body>
                <Card.Footer>
                    <QuestionBoxBodyFooter cost={cost}/>
                </Card.Footer>
            </Card>
        </Container>
    )
}

const QuestionBoxBodyHeader = ({typeName, difficulty}) => {
    return (
        <div className="d-flex justify-content-between">
            <i>{typeName}</i>
            <Badge className={"DifficultyBadge"} pill
                   bg={GetDifficultyColor(difficulty)}>{GetDifficultyName(difficulty)}</Badge>
        </div>
    )
}

const QuestionBoxBodyQuestion = ({question}) => {
    return (
        <div>
            <p>{question}</p>
        </div>
    )
}

const QuestionBoxBodyAnnotation = ({annotation}) => {
    return (
        <div>
            <i className={"Annotation"}>
                Пояснение: {annotation === "" || annotation === undefined || annotation === null
                ? "нет"
                : annotation}
            </i>
        </div>
    )
}

const QuestionBoxBodyFooter = ({cost}) => {
    return (
        <div className="d-flex justify-content-end">
            <i>{cost} {GetNoun(cost, "балл", "балла", "баллов")}</i>
        </div>
    )
}


const GetDifficultyColor = (difficulty) => {
    switch (difficulty) {
        case 0:
            return "success";
        case 1:
            return "warning";
        case 2:
            return "danger";
    }
}

const GetDifficultyName = (difficulty) => {
    switch (difficulty) {
        case 0:
            return "Легко";
        case 1:
            return "Средне";
        case 2:
            return "Сложно";
    }
}

